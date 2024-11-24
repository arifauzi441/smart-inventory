const express = require(`express`)
const router = express.Router()
const multer = require(`multer`)
const path = require(`path`)
const fs = require(`fs`)
const Model_Product = require(`../model/Model_Product`)
const Model_Users = require(`../model/Model_Users`)

let auth = async (req, res, next) => {
    if(req.session.userId){
        let user = await Model_Users.getUserById(req.session.userId)
        if(user.level_user === `supplier`) return next()
        return res.redirect(`/login`)
    }
    res.redirect(`/login`)
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
       cb(null, `public/images/produk-images`) 
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()} - ${file.originalname}`)
    }
})

const fileFilter = (req, file, cb) => {
    if([`.jpg`, `.png`].includes(path.extname(file.originalname))){
        cb(null, true)
    }else{
        cb(new Error(`Extensi tidak valid`), false)
    }
}

const upload = multer({storage, fileFilter})

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

    product.forEach(p => {
        p.product_price = new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR"
        }).format(p.product_price)
    });
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

router.post(`/save-product`, upload.single(`product_image`), async(req, res) => {
    let {product_name, product_price, product_stock, product_minimum_stock} = req.body
    try {
        if(!req.file) return res.redirect(`/supplier/input-product`)
        let product_image = `/images/produk-images/${req.file.filename}`

        let data = {product_name, product_price, product_stock, product_minimum_stock, product_image}
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

router.post(`/update-product/:id`, upload.single(`product_image`), async (req, res) => {
    let data = req.body
    try {
        let product = await Model_Product.getProductById(req.params.id)

        let old_image = product.product_image
        let product_image = ``
        if(req.file){
            product_image = `/images/produk-images/${req.file.filename}`
        }else{
            product_image = old_image
            old_image = ``
        }

        data.product_image = product_image
        await Model_Product.updateProduct(data,req.params.id)

        if(!old_image) return res.redirect(`/supplier/product`)
        fs.unlinkSync(`./public/${old_image}`)

        res.redirect(`/supplier/product`)
    } catch (error) {
        console.log(error)
        res.redirect(`/supplier/edit-product/${req.params.id}`)
    }
})

router.get(`/delete-product/:id`, async(req, res) => {
    try {
        let product = await Model_Product.getProductById(req.params.id)
        await Model_Product.deleteProduct(req.params.id)

        fs.unlinkSync(`./public/${product.product_image}`)

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