const express = require("express");
const adminRoute = express();
const adminController = require("../controller/adminController");
// const productController = require("../controller/productController");


adminRoute.set("view engine", "ejs");
adminRoute.set("views", "./views/admin");

//=================== ADMIN DASH BOARD AND HOME =============//

adminRoute.get("/", adminController.loadLogin);
adminRoute.get("/home", adminController.loadDashboard);

//=================== ADMIN USERLIST AND BLOCK & UN-BLOCK============= //

adminRoute.get("/userlist", adminController.userList);


//====================== ADMIN PRODUCT SECTION ==================== //

// adminRoute.get("/productList", productController.loadProduct);
// adminRoute.get("/addProduct", productController.addProduct);

//======================= ADMIN ORDER SECTION ==================== //


adminRoute.get("*", function (req, res) {
  res.redirect("/admin");
});

module.exports = adminRoute;
