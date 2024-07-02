const express = require("express");
const userRoute = express();
const userController = require("../controller/userController");
const cartController = require("../controller/cartController")
const authUserController = require("../controller/authUserController");
const auth = require("../middleware/userAuth");

userRoute.set("view engine", "ejs");
userRoute.set("views", "./views/user");

//======================= USER HOME SECTION ============================================= //
userRoute.get("/home", auth.userIsLogin, authUserController.loadHome);
userRoute.get("/",auth.userIsLogout, authUserController.loadLanding);
userRoute.get("/landing",auth.userIsLogout, authUserController.loadLanding);
userRoute.get("/home", auth.userIsLogin, authUserController.loadHome);
userRoute.post("/register", authUserController.insertUser);
userRoute.get("/register", auth.userIsLogout, authUserController.loadRegister);
userRoute.get("/login", auth.userIsLogout, authUserController.loadLogin);
userRoute.post("/login", authUserController.verifyLogin);
userRoute.get("/logout", auth.userIsLogin, authUserController.userLogout);

userRoute.get("/order", auth.userIsLogin,userController.loadOrder);
userRoute.get("/success", auth.userIsLogin,userController.loadSuccess);
userRoute.get("/about", auth.userIsLogin,userController.loadAbout);
userRoute.get("/checkout",auth.userIsLogin, userController.loadCheckOut);
userRoute.get("/contact", auth.userIsLogin,userController.loadContactUs);
userRoute.get("/error", auth.userIsLogin,userController.loadError);
userRoute.get("/service", auth.userIsLogin,userController.loadService);

userRoute.get("/shop",auth.userIsLogin, userController.loadShop);
userRoute.get("/singleProduct/:id",auth.userIsLogin, userController.loadSingle);
userRoute.post("/singleProduct",auth.userIsLogin, userController.addRating)

userRoute.post("/addtocart", cartController.addToCart)
userRoute.get("/cart",auth.userIsLogin,cartController.loadCart)
userRoute.post("/deletecart",cartController.deleteProductFromCart)
userRoute.post("/changeQuantity",cartController.changeProductCount)
userRoute.post("/checkout",cartController.placeOrder)
userRoute.post("/orderplace",cartController.postOrder)


module.exports = userRoute;