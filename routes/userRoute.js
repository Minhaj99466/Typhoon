const express = require("express");
const userRoute = express();
const userController = require("../controller/userController");
const authUserController = require("../controller/authUserController");
const auth = require("../middleware/userAuth");

userRoute.set("view engine", "ejs");
userRoute.set("views", "./views/user");

//======================= USER HOME SECTION ============================================= //
userRoute.get("/", auth.userIsLogin, authUserController.loadHome);
userRoute.get("/landing", authUserController.loadLanding);
userRoute.get("/home", auth.userIsLogin, authUserController.loadHome);
userRoute.post("/register", authUserController.insertUser);
userRoute.get("/register", auth.userIsLogout, authUserController.loadRegister);
userRoute.get("/login", auth.userIsLogout, authUserController.loadLogin);
userRoute.post("/login", authUserController.verifyLogin);
userRoute.get("/logout", auth.userIsLogin, authUserController.userLogout);

userRoute.get("/cart", auth.userIsLogin,userController.loadCart);
userRoute.get("/about", auth.userIsLogin,userController.loadAbout);
userRoute.get("/checkout",auth.userIsLogin, userController.loadCheckOut);
userRoute.get("/contact", auth.userIsLogin,userController.loadContactUs);
userRoute.get("/error", auth.userIsLogin,userController.loadError);
userRoute.get("/service", auth.userIsLogin,userController.loadService);
userRoute.get("/shop",auth.userIsLogin, userController.loadShop);
userRoute.get("/singleProduct/:id",auth.userIsLogin, userController.loadSingle);
userRoute.post("/addtocart", userController.addToCart)

module.exports = userRoute;