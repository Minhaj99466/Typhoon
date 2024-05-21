const express=require('express')
const userRoute=express();
const userController=require('../controller/userController')
const auth = require('../middleware/userAuth')


userRoute.set('view engine','ejs')
userRoute.set('views','./views/user')


//======================= USER HOME SECTION ============================================= //

userRoute.get('/',auth.userIsLogin,userController.loadHome)
userRoute.get('/home',auth.userIsLogin,userController.loadHome)
userRoute.post('/register',userController.insertUser)
userRoute.get('/register',auth.userIsLogout,userController.loadRegister)
userRoute.get('/login',auth.userIsLogout,userController.loadLogin)
userRoute.post('/login',userController.verifyLogin)
userRoute.get('/logout',auth.userIsLogin,userController.userLogout);


userRoute.get('/cart',userController.loadCart)
userRoute.get('/about',userController.loadAbout)
userRoute.get('/checkout',userController.loadCheckOut)
userRoute.get('/contact',userController.loadContactUs)
userRoute.get('/error',userController.loadError)
userRoute.get('/service',userController.loadService)
userRoute.get('/shop',userController.loadShop)



module.exports= userRoute