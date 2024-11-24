const express = require(`express`)
const router = express.Router()
const multer = require(`multer`)
const path = require(`path`)
const fs = require(`fs`)
const Model_Product = require(`../model/Model_Product`)
const Model_Users = require(`../model/Model_Users`)
const Model_Transaction = require("../model/Model_Transaction")
const Model_Transaction_Detail = require("../model/Model_Transaction_Detail")
const { DEFAULT_CIPHERS } = require("tls")

let auth = async (req, res, next) => {
    if(req.session.userId){
        let user = await Model_Users.getUserById(req.session.userId)
        if(user.level_user === `cashier`) return next()
        return res.redirect(`/login`)
    }
    res.redirect(`/login`)
}

router.use(auth)

router.get(`/dashboard`, async (req, res) => {
    res.render(`cashier/dashboard-kasir/dashboardkas`)
})

router.get(`/POS`, async(req, res) => {
    let product = await Model_Product.getProduct()
    let user = await Model_Users.getUserById(req.session.userId)

    for (let i = 0; i < product.length; i++) {
        product[i].product_price = new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR"
        }).format(product[i].product_price)

        product[i].pair = await Model_Product.getProductPair(product[i].product_id)
    }

    res.render(`cashier/pembelian`, {product, user})
})

router.post(`/transaction`, async(req, res) => {
    let {product_id, price, amount_product, id_user, total_price, payment, transaction_event} = req.body
    try {
        let cashier_id = id_user
        let return_payment = payment - total_price

        let caseStatement = '';
        let data = [];
        if(product_id instanceof Array){
            product_id.forEach((product_id, index) => {
                caseStatement += 'WHEN product_id = ? && product_stock >= ? THEN product_stock - ?'
                data.push(product_id, amount_product[index], amount_product[index]);
            });
            data = [...data, ...product_id]
            updates = [...product_id]
        }else{
            caseStatement = 'WHEN product_id = ? && product_stock >= ? THEN product_stock - ?'
            data.push(product_id, amount_product, amount_product)
            data = [...data, product_id]
            updates = [product_id]
        }
        await Model_Product.reduceStock(updates, caseStatement, data)

        let time = new Date()
        let hour = String(time.getHours()).padStart(2, `0`)
        let minute = String(time.getMinutes()).padStart(2, `0`)
        let second = String(time.getSeconds()).padStart(2, `0`)
        let transaction_time = `${hour}:${minute}:${second}`

        let year = time.getFullYear()
        let month = String(time.getMonth() + 1).padStart(2, `0`)
        let date = String(time.getDate()).padStart(2, `0`)
        let transaction_date = `${year}-${month}-${date}`

        let transactionData = [[
            transaction_date, 
            transaction_time, 
            cashier_id, 
            transaction_event,
            total_price,
            payment,
            `${return_payment}` 
        ]]
        await Model_Transaction.insertData(transactionData)

        let transaction_id = await Model_Transaction.getNewestId()
        let Detaildata = []
        if(product_id instanceof Array){
            Detaildata = product_id.map((product_id, index) => [amount_product[index], price[index], product_id, transaction_id])
        }else{
            Detaildata = [[amount_product, price, product_id, transaction_id]]
        }
        await Model_Transaction_Detail.insertDetail(Detaildata)

        res.redirect(`/cashier/nota/${transaction_id}`)
    } catch (error) {
        console.log(error)
        res.redirect(`/cashier/POS`)
    }
})

router.get(`/nota/:id`, async(req, res) => {
    try {
        let transaction = await Model_Transaction.getById(req.params.id);

        function changeToRupiah(data){
            return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR"
            }).format(data)
        }
        transaction.detail = await Model_Transaction_Detail.getByTransId(transaction.transaction_id)
        transaction.transaction_date = transaction.transaction_date.toLocaleDateString(`en-CA`)
        transaction.payment = changeToRupiah(transaction.payment)
        transaction.return_payment = changeToRupiah(transaction.return_payment)
        transaction.total_price = changeToRupiah(transaction.total_price)

        for (let j = 0; j < transaction.detail.length; j++) {
            transaction.detail[j].price = changeToRupiah(transaction.detail[j].price)
            transaction.detail[j].product_price = changeToRupiah(transaction.detail[j].product_price)
        }
        
        res.render(`cashier/nota`, {transaction})
    } catch (error) {
        console.log(error)
        res.redirect(`/cashier/POS`)
    }
})

module.exports = router