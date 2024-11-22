var express = require('express');
var router = express.Router();
let Model_Users = require(`../model/Model_Users`)

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get(`/login`, async(req, res) => {
  res.render(`auth/login`)
})

router.post(`/log`, async(req, res) => {
  let {username, password} = req.body
  try {
    let users = await Model_Users.getUser(username, password)
    if(!users) {
      req.flash(`error`,`password / username salah`)
      return res.redirect(`/login`)
    }
    req.session.userId = users.id_user
    if(users.level_user === `admin`) return res.redirect(`/admin/dashboard`)
    if(users.level_user === `supplier`) return res.redirect(`/supplier/dashboard`)
    if(users.level_user === `cashier`) return res.redirect(`/cashier/dashboard`)
  } catch (error) {
    console.log(error)
    res.redirect(`/login`)
  }
})

router.get(`/logout`, (req, res) => {
  req.session.destroy(err => {
    console.log(err)
    if(err) return res.redirect(`/login`)
    res.redirect(`/login`)
  })
})

module.exports = router;
