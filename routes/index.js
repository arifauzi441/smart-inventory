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
    let users = await Model_Users.getUser()
  } catch (error) {
    console.log(error)
    res.redirect(`/login`)
  }
})

module.exports = router;
