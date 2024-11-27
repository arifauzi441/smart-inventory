const express = require(`express`);
const router = express.Router();
const Model_Users = require(`../model/Model_Users`);
const Model_Transaction = require("../model/Model_Transaction");
const Model_Transaction_Detail = require("../model/Model_Transaction_Detail");

let auth = async (req, res, next) => {
  if (req.session.userId) {
    let user = await Model_Users.getUserById(req.session.userId);
    if (user.level_user === `admin`) return next();
    return res.redirect(`/login`);
  }
  res.redirect(`/login`);
};

router.use(auth);

router.get(`/dashboard`, async (req, res) => {
  res.render(`admin/dashboardadm`);
});

router.get(`/users`, async (req, res) => {
  let data = await Model_Users.getAll();
  res.render(`admin/users/akun`, {
    data,
  });
});

router.get(`/edit-users/:id`, async (req, res) => {
  let users = await Model_Users.getUserById(req.params.id);

  res.render(`admin/users/form-akun-edit`, { users });
});

router.post("/update-users/:id", async (req, res) => {
  let id_user = req.params.id;
  try {
    let { username, password, level_user } = req.body;
    let data = { username, password, level_user };
    await Model_Users.updateUsers(data, id_user);
    res.redirect("/admin/users");
  } catch (error) {
    console.log(error);
    res.redirect(`/admin/edit-users/${id_user}`);
  }
});

router.get(`/create-users`, async (req, res) => {
  res.render(`admin/users/form-akun-create`);
});

router.post("/store-users", async (req, res) => {
  try {
    let { username, password, level_user } = req.body;
    let data = { username, password, level_user };
    await Model_Users.storeUsers(data);
    res.redirect("/admin/users");
  } catch (error) {
    console.log(error);
    res.redirect("/admin/store-users");
  }
});

router.get(`/delete-users/:id`, async (req, res) => {
  try {
    await Model_Users.deleteUsers(req.params.id);

    res.redirect(`/admin/users`);
  } catch (error) {
    console.log(error);
    res.redirect(`/admin/users`);
  }
});

router.get(`/transaction-history`, async(req, res) => {
  let data = req.query.search || ``
  let salesData = []

  if(data !== ``){
    salesData = await Model_Transaction.getBySearch(data);
  } else{
    salesData = await Model_Transaction.getAll();
  }

  function changeToRupiah(data){
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR"
    }).format(data)
  }

  for (let i = 0; i < salesData.length; i++) {
    salesData[i].detail = await Model_Transaction_Detail.getByTransId(salesData[i].transaction_id)
    
    salesData[i].transaction_date = salesData[i].transaction_date.toLocaleDateString(`en-CA`)
    salesData[i].total_price = changeToRupiah(salesData[i].total_price)
    salesData[i].payment = changeToRupiah(salesData[i].payment)
    salesData[i].return_payment = changeToRupiah(salesData[i].return_payment)

    for (let j = 0; j < salesData[i].detail.length; j++) {
      salesData[i].detail[j].price = changeToRupiah(salesData[i].detail[j].price)
    }
  }
  res.render(`admin/riwayat`, { salesData, data })
})

router.get(`/graph`, async(req, res) => {
  let bestSellerDatas = await Model_Transaction_Detail.getBestSeller()

  let month = ["januari","februari","maret","april","mei","juni","juli","juli","agustus","september","oktober","november","desember"]
  let salesData = {}
  for (let i = 0; i < month.length; i++) {
    salesData[month[i]] = await Model_Transaction_Detail.getByMonth(i+1) || {product_name: "", amount: 0}
  }

  let event = ['Ramadhan','Imlek','Natal','Valentine','Kemerdekaan','Tahun Baru']
  let salesDataEvent = {}
  for (let i = 0; i < event.length; i++) {
    salesDataEvent[event[i]] = await Model_Transaction_Detail.getByEvent(event[i]) || {product_name: "", amount: 0}
  }

  let day = ['monday','tuesday','wednesday','thursday','friday','saturday','sunday']
  let salesDataDay = {}
  for (let i = 0; i < day.length; i++) {
    salesDataDay[day[i]] = await Model_Transaction_Detail.getByDay(day[i]) || {product_name: "", amount: 0}
  }

  res.render(`admin/grafik`, {
    salesData: JSON.stringify(salesData),
    salesDataEvent: JSON.stringify(salesDataEvent),
    salesDataDay: JSON.stringify(salesDataDay),
    bestSellerDatas: JSON.stringify(bestSellerDatas)
  })
})

module.exports = router;
