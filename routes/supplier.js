const express = require(`express`)
const router = express.Router()
const Model_Product = require(`../model/Model_Product`)
const Model_Users = require(`../model/Model_Users`)

let auth = async (req, res, next) => {
    if(req.session.userId){
        let user = await Model_Users.getUserById(req.session.userId)
        if(user.level_user === `supplier`) return next()
        res.redirect(`/login`)
    }
    res.redirect(`/login`)
}

router.use(auth)

router.get(`/dashboard`, async(req, res) => {
    let productLowStock = await Model_Product.getProductByStock()

    let notification = "available"
    if(productLowStock.length === 0) notification = "not available"
    res.render(`supplier/dashboard-supplier/dashboardsup`,{notification})
})

router.get(`/product`, async(req, res) => {
    let product = await Model_Product.getProduct()
    let productLowStock = await Model_Product.getProductByStock()

    let notification = "available"
    if(productLowStock.length === 0) notification = "not available"
    res.render(`supplier/input-stok-sup/stok`, {product, notification})
})

router.get(`/input-product`, async(req, res) => {
    let productLowStock = await Model_Product.getProductByStock()

    let notification = "available"
    if(productLowStock.length === 0) notification = "not available"
    res.render(`supplier/input-barang/barang`,{notification})
})

router.post(`/save-product`, async(req, res) => {
    let {product_name, product_price, product_stock, product_minimum_stock} = req.body
    try {
        let data = {product_name, product_price, product_stock, product_minimum_stock}
        await Model_Product.storeProduct(data)

        res.redirect(`/supplier/product`)
    } catch (error) {
        console.log(error)
        res.redirect(`/supplier/input-product`)        
    }
})

router.get(`/edit-product/:id`, async (req, res) => {
    let product = await Model_Product.getProductById(req.params.id)
    let productLowStock = await Model_Product.getProductByStock()

    let notification = "available"
    if(productLowStock.length === 0) notification = "not available"
    res.render(`supplier/input-barang/edit`, {product, notification})
})

router.post(`/update-product/:id`, async (req, res) => {
    let data = req.body
    try {
        await Model_Product.updateProduct(data,req.params.id)

        res.redirect(`/supplier/product`)
    } catch (error) {
        console.log(error)
        res.redirect(`/supplier/edit-product/${req.params.id}`)
    }
})

router.get(`/delete-product/:id`, async(req, res) => {
    try {
        await Model_Product.deleteProduct(req.params.id)

        res.redirect(`/supplier/product`)
    } catch (error) {
        console.log(error)
        res.redirect(`/supplier/product`)
    }
})

router.post(`/update-stock`, async (req, res) => {
    let {product_stock, product_id} = req.body

    try {
        await Model_Product.updateStock(product_stock, product_id)

        res.redirect(`/supplier/product`)
    } catch (error) {
        console.log(error)
        res.redirect(`/supplier/product`)
    }
})

router.get(`/low-stock`, async(req, res) => {
    let product = await Model_Product.getProductByStock()

    let notification = "available"
    if(product.length === 0) notification = "not available"

    res.render(`supplier/notifikasi-stok/notif`, {product, notification})
})

module.exports = router