const express = require("express");
const distributorRoute = express();
const distributorController = require("../controller/distributorController");
const authUserController = require("../controller/authDistributorController");
const productController = require("../controller/productController");
const auth = require("../middleware/distributerAuth")
const update = require("../configration/multer")

distributorRoute.set("view engine", "ejs");
distributorRoute.set("views", "./views/distributor");

//=================== ADMIN DASH BOARD AND HOME =============//
distributorRoute.get("/", auth.distributerLogout,authUserController.loadLogin);
distributorRoute.post("/", authUserController.verifyLogin);
distributorRoute.get("/register", auth.distributerLogout,authUserController.loadRegister);
distributorRoute.post("/register", authUserController.insertDistributor);
distributorRoute.get("/home", auth.distributerLogin,authUserController.loadDashboard);
distributorRoute.get("/logout", auth.distributerLogin,authUserController.distrubuterLogout);

//====================== ADMIN PRODUCT SECTION ==================== //
distributorRoute.get("/productlist", auth.distributerLogin,productController.loadProduct);
distributorRoute.post("/productlist",update.upload.array("image",10),productController.insertProduct);
distributorRoute.get("/deleteproduct/:id",productController.removeProduct)

//======================= ADMIN ORDER SECTION ==================== //

distributorRoute.get("*", function (req, res) {
  res.redirect("/distributor");
});

module.exports = distributorRoute;
