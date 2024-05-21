const express = require("express");
const distributorRoute = express();
const distributorController = require("../controller/distributorController");
const authUserController = require("../controller/authDistributorController");
const productController = require("../controller/productController");

distributorRoute.set("view engine", "ejs");
distributorRoute.set("views", "./views/distributor");

//=================== ADMIN DASH BOARD AND HOME =============//

distributorRoute.get("/", authUserController.loadLogin);
distributorRoute.post("/", authUserController.verifyLogin);
distributorRoute.get("/register", authUserController.loadRegister);
distributorRoute.post("/register", authUserController.insertDistributor);
distributorRoute.get("/home", authUserController.loadDashboard);
distributorRoute.get("/logout", authUserController.distrubuterLogout);

//=================== ADMIN USERLIST AND BLOCK & UN-BLOCK============= //

distributorRoute.get("/userlist", distributorController.userList);

//====================== ADMIN PRODUCT SECTION ==================== //

distributorRoute.get("/productList", productController.loadProduct);
distributorRoute.get("/addProduct", productController.addProduct);

//======================= ADMIN ORDER SECTION ==================== //

distributorRoute.get("*", function (req, res) {
  res.redirect("/distributor");
});

module.exports = distributorRoute;
