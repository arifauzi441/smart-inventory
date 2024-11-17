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
        if(user.level_user === `cashier`) return next()
        res.redirect(`/login`)
    }
    res.redirect(`/login`)
}

router.use(auth)

router.get(`/dashboard`, async (req, res) => {
    res.render(`cashier/dashboard-kasir/dashboardkas`)
})

router.get(`/POS`, async(req, res) => {
    res.render(`cashier/pembelian`)
})

router.get(`/nota`, async(req, res) => {
    res.render(`cashier/nota`)
})

module.exports = router