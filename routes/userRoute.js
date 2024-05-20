const express=require('express')
const userRoute=express();
const userController=require('../controller/userController')


userRoute.set('view engine','ejs')
userRoute.set('views','./views/user')


//======================= USER HOME SECTION ============================================= //

userRoute.get('/',userController.loadHome)
userRoute.get('/cart',userController.loadCart)
userRoute.get('/about',userController.loadAbout)
userRoute.get('/checkout',userController.loadCheckOut)
userRoute.get('/contact',userController.loadContactUs)
userRoute.get('/error',userController.loadError)
userRoute.get('/login',userController.loadLogin)
userRoute.get('/register',userController.loadRegister)
userRoute.get('/service',userController.loadService)
userRoute.get('/shop',userController.loadShop)


module.exports= userRoute