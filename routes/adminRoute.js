const express = require("express");
const adminRoute = express();
const adminController = require("../controller/adminController");
const auth = require('../middleware/adminAuth')
// const productController = require("../controller/productController");


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



adminRoute.get("*", function (req, res) {
  res.redirect("/admin");
});

module.exports = adminRoute;
