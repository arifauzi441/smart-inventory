const express = require(`express`);
const router = express.Router();
const Model_Users = require(`../model/Model_Users`);

let auth = async (req, res, next) => {
  if (req.session.userId) {
    let user = await Model_Users.getUserById(req.session.userId);
    if (user.level_user === `supplier`) return next();
    res.redirect(`/login`);
  }
  res.redirect(`/login`);
};

// router.use(auth);

router.get(`/`, async (req, res) => {
  // let notification = "available"
  // if(productLowStock.length === 0) notification = "not available"
  let data = await Model_Users.getAll();
  res.render(`admin/users/index`, {
    // product,
    // notification
    data,
  });
});

router.get(`/edit-users/:id`, async (req, res) => {
  let users = await Model_Users.getUserById(req.params.id);

  res.render(`admin/users/edit`, { users });
});

router.post("/update-users/:id", async (req, res) => {
  let id_user = req.params.id;
  try {
    let { username, password, level_user } = req.body;
    let data = { username, password, level_user };
    await Model_Users.updateUsers(data, id_user);
    res.redirect("/admin");
  } catch (error) {
    console.log(error);
    res.redirect("/admin");
  }
});

router.get(`/create-users`, async (req, res) => {
  res.render(`admin/users/create`);
});

router.post("/store-users", async (req, res) => {
  try {
    let { username, password, level_user } = req.body;
    let data = { username, password, level_user };
    await Model_Users.storeUsers(data);
    res.redirect("/admin");
  } catch (error) {
    console.log(error);
    res.redirect("/admin");
  }
});

router.get(`/delete-users/:id`, async (req, res) => {
  try {
    await Model_Users.deleteUsers(req.params.id);

    res.redirect(`/admin`);
  } catch (error) {
    console.log(error);
    res.redirect(`/admin`);
  }
});

module.exports = router;
