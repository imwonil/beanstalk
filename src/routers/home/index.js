const  express = require("express");
const ctrl = require("./home.ctrl")
const  router = express.Router();
const fs =  require('fs').promises
const path = require('path')





// const ADminGoodsKiosk = path.join("/home/hosting_users/emc22wonil2/apps/emc22wonil2_emc33wonil/src/adminUser/adminGoodsKiosk.json") 
// const UserGoodsKinds = path.join("/home/hosting_users/emc22wonil2/apps/emc22wonil2_emc33wonil/src/database/userGoodsKinds.json") 
// const AdminNext = path.join("/home/hosting_users/emc22wonil2/apps/emc22wonil2_emc33wonil/src/adminSetKinds/adminNext.json") 
// const kokoTime = path.join("/home/hosting_users/emc22wonil2/apps/emc22wonil2_emc33wonil/src/adminSetKinds/kokoTime.json") 

fs.readFile("./src/adminUser/adminGoodsKiosk.json")
.then((data) => {

const datas = JSON.parse(data)



router.get('/adminGoodsKiosk', (req,res) =>{
  res.sendfile("./src/adminUser/adminGoodsKiosk.json") 
})

}).catch((err) => console.error(err));

fs.readFile("./src/database/users.json")
.then((data) => {
  const a = JSON.parse(data);

  router.get('/Users', (req, res) => {
    res.sendfile("./src/database/users.json");
  });
})


fs.readFile("./src/database/paymentHistory.json")
.then((data) => {
  const a = JSON.parse(data);

  router.get('/paymentHistory', (req, res) => {
    res.sendfile("./src/database/paymentHistory.json");
  });
})

fs.readFile("./src/database/userGoodsKinds.json")
.then((data) => {
  const a = JSON.parse(data);

  router.get('/userGoodsKinds', (req, res) => {
    res.sendfile("./src/database/userGoodsKinds.json");
  });
})
.catch((err) => console.error(err));


fs. readFile("./src/database/first.json")
.then((data) => {
const d = JSON.parse(data)

router.get('/certifications', (req,res) =>{
  res.sendfile("./src/database/first.json");
})
}).catch((err) => console.error(err));

fs.readFile("./src/adminSetKinds/adminSeet.json")
        .then((data) => {

     const b = JSON.parse(data)

     router.get('/setKind', (req,res) =>{
      res.sendfile("./src/adminSetKinds/adminSeet.json") 
     })
}).catch((err) => console.error(err));


fs.readFile("./src/adminUser/adminGoodsKiosk.json")
.then((data) => {

const datas = JSON.parse(data)



router.get('/adminGoodsKiosk', (req,res) =>{
res.sendfile("./src/adminUser/adminGoodsKiosk.json") 
})
}).catch((err) => console.error(err));


fs.readFile("./src/database/kokoTime.json")
  .then((data) => {
    const a = JSON.parse(data);
    router.get('/kokoTime', (req, res) => {
      res.sendfile("./src/database/kokoTime.json") 
    });
  })
  .catch((err) => console.error(err));


router.get("/adminindex", ctrl.output.adminindex)
router.get("/adminSetinfo", ctrl.output.adminSetinfo)
router.get("/adminViews", ctrl.output.adminViews)
router.get("/idChange", ctrl.output.idChange)
router.get("/", ctrl.output.index)
router.get("/certification", ctrl.output.certification)
router.get("/login", ctrl.output.login)
router.get("/register", ctrl.output.register)
router.get("/certification", ctrl.output.certification)
router.get("/adminProductlist", ctrl.output.adminProductlist)
router.get("/productlist", ctrl.output.productlist)
router.get("/adminSetproduct", ctrl.output.adminSetproduct)
router.get("/calender", ctrl.output.calender)
router.get("/adminMessage", ctrl.output.adminMessage)
////////////poset/////////////////

router.post("/login", ctrl.process.login)
router.post("/logout", ctrl.process.logout)
router.post("/logoutTime", ctrl.process.logoutTime)
router.post("/register", ctrl.process.register)
router.post("/certification", ctrl.process.certification)
router.post("/",ctrl.process.index)
router.post("/adminindex", ctrl.process.adminindex)

router.post("/adminBench", ctrl.process.adminBench)
router.post("/adminSetproduct", ctrl.process.adminSetproduct)
router.post("/adminViews", ctrl.process.adminViews)
router.post("/adminProductlist", ctrl.process.adminProductlist)
router.get("/adminSetinfo", ctrl.process.adminSetinfo)
router.post("/productlist", ctrl.process.productlist)
router.post("/search", ctrl.process.search)
router.post("/enter", ctrl.process.enter)
router.post("/forcibley", ctrl.process.forcibley) 
router.post("/calender", ctrl.process.calender)
router.post("/changeSeat", ctrl.process.changeSeat)
router.post("/adminMessage", ctrl.process.adminMessage)

 module.exports = router      