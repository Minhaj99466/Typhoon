const express = require("express");
const adminRoute = express();
const adminController = require("../controller/adminController");
const auth = require('../middleware/adminAuth')

adminRoute.set("view engine", "ejs");
adminRoute.set("views", "./views/admin");

//=================== ADMIN DASH BOARD AND HOME =============//
adminRoute.get("/",auth.adminIsLogout,adminController.loadLogin);
adminRoute.post('/', adminController.verifyLogin)
adminRoute.get("/dashboard", auth.adminIsLogin,adminController.loadDashboard);
adminRoute.get("/logout",adminController.adminLogout)

//=================== ADMIN USERLIST AND BLOCK & UN-BLOCK============= //
adminRoute.get("/userlist",auth.adminIsLogin,adminController.userList);
adminRoute.get("/blockuser/:id",adminController.userBlock)
adminRoute.get('/unblockuser/:id',adminController.userUnblock)

adminRoute.get('/distributerlist',auth.adminIsLogin,adminController.distributerList)
adminRoute.get("/blockdistributer/:id",adminController.distributerBlock)
adminRoute.get('/unblockdistributer/:id',adminController.distributerUnblock)

adminRoute.get("/productapprove", auth.adminIsLogin,adminController.loadProductApprovePage)
adminRoute.get("/productdetails/:id",adminController.productDetails)
adminRoute.post('/product/approval',adminController.productApproval)

adminRoute.get("*", function (req, res) {
  res.redirect("/admin");
});

module.exports = adminRoute;