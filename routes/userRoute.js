const express = require("express");
const userRoute = express();
const userController = require("../controller/userController");
const authUserController = require("../controller/authUserController");
const auth = require("../middleware/userAuth");

userRoute.set("view engine", "ejs");
userRoute.set("views", "./views/user");

//======================= USER HOME SECTION ============================================= //
userRoute.get("/", auth.userIsLogin, authUserController.loadHome);
userRoute.get("/home", auth.userIsLogin, authUserController.loadHome);
userRoute.post("/register", authUserController.insertUser);
userRoute.get("/register", auth.userIsLogout, authUserController.loadRegister);
userRoute.get("/login", auth.userIsLogout, authUserController.loadLogin);
userRoute.post("/login", authUserController.verifyLogin);
userRoute.get("/logout", auth.userIsLogin, authUserController.userLogout);

userRoute.get("/cart", userController.loadCart);
userRoute.get("/about", userController.loadAbout);
userRoute.get("/checkout", userController.loadCheckOut);
userRoute.get("/contact", userController.loadContactUs);
userRoute.get("/error", userController.loadError);
userRoute.get("/service", userController.loadService);
userRoute.get("/shop", userController.loadShop);

module.exports = userRoute;