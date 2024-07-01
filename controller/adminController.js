const utils = require("../utils/securepassword");
const userModel = require("../model/userModel");
const reviewModel = require("../model/ratingModel");
const distributerModel = require("../model/distributorModel");
const productModel = require("../model/productModal")


//============== LOGIN PAGE LOAD ===============//

const loadLogin = async (req, res, next) => {
  try {
    res.render("login");
  } catch (error) {
    next(error);
  }
};

const verifyLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userData = await userModel.findOne(
      { email },
      { email: 1, password: 1, is_admin: 1 }
    );
    if (!userData) {
      return res.render("login", { message: "email in incorrect" });
    }
    const passwordMatch = await utils.comparePassword(
      password,
      userData.password
    );
    if (!passwordMatch) {
      return res.render("login", { message: "password is incorrect" });
    }
    if (userData.is_admin === 0) {
      return res.render("login", { message: "this user is not an admin" });
    }
    req.session.admin_id = userData._id;
    res.redirect("/admin/dashboard");
  } catch (err) {
    console.log(err);
  }
};

const adminLogout = async (req, res, next) => {
  try {
    req.session.destroy();
    res.redirect("/admin");
  } catch (err) {
    console.log(err);
  }
};

//=================== DASHBOARD LOAD ===============//

const loadDashboard = async (req, res, next) => {
  try {
    const adminData = req.adminData || {};  // Retrieve adminData from req object
    res.render("home", { admin: adminData });
  } catch (error) {
    next(error);
  }
};

//===================== USER LIST =======================//

const userList = async (req, res, next) => {
  try {
    const adminData = req.adminData || {};
    const userData = await userModel.find({ is_admin: 0 });
    res.render("userList", { userData ,  admin: adminData });
  } catch (error) {
    next(error);
  }
};

const userBlock = async (req, res, next) => {
  try {
    await userModel.updateOne({_id:req.params.id},{ $set: { is_block: true } });
    return res.redirect("/admin/userlist");
  } catch (err) {
    console.log(err);
  }
};

const userUnblock = async (req,res,next) => {
  try{
    await userModel.updateOne({_id:req.params.id},{$set:{is_block: false}})
    return res.redirect("/admin/userlist")
  }catch(err){
    console.log(err)
  }
}

const distributerList = async(req,res,next) =>{
  try{
    const adminData = req.adminData || {};
    const distributerData = await distributerModel.find({ is_verified: true});
    res.render("distributerList", { distributerData,  admin: adminData });
  }catch(err){
    console.log(err)
  }
}

const distributerBlock = async(req,res,next) =>{
  try{
    await distributerModel.updateOne({_id:req.params.id},{ $set: { is_block: true } });
    return res.redirect("/admin/distributerlist");
  }catch(err){
    console.log(err)
  }
}

const distributerUnblock = async(req,res,next) =>{
  try{
    await distributerModel.updateOne({_id:req.params.id},{$set:{is_block: false}})
    return res.redirect("/admin/distributerlist")
  }catch(err){
    console.log(err)
  }
}

const loadProductApprovePage = async (req,res) =>{
  try{
    const adminData = req.adminData || {};
    const productData = await productModel.find({action:"pendding",is_delete:false}).populate("distributor_id")
    res.render("productApprove",{productData,  admin: adminData})
  }catch(err){
    console.log(err)
  }
}

const productDetails = async (req,res) =>{
  try{
    const adminData = req.adminData || {};
    const productData = await productModel.findOne({_id:req.params.id}).populate("distributor_id")
    res.render("productDetails",{productData,  admin: adminData})
  }catch(err){
    console.log(err)
  }
}


const productApproval = async (req,res) =>{
  try{
    const { action, reason, productId } = req.body;
    const updateData = await productModel.updateOne({ _id: productId }, { $set: { action, reason } });
     if (updateData) {
      return res.status(200).json({ success: true });
    } else {
      return res.status(400).json({ success: false, message: 'Failed to update the product.' });
    }
  }catch(err){
    console.log(err)
  }
}

const reviewList=async(req,res)=>{
  try{
    const adminData = req.adminData || {};
    const userData = await reviewModel.find().populate('Users', 'username');
    console.log(userData);
    res.render("reviewList", { userData ,  admin: adminData });
  }catch(error){
    console.log(error);
  }
}

module.exports = {
  loadLogin,
  verifyLogin,
  loadDashboard,
  adminLogout,
  userBlock,
  userUnblock,
  userList,
  distributerList,
  distributerBlock,
  distributerUnblock,
  loadProductApprovePage,
  productDetails,
  productApproval,
  reviewList
};
