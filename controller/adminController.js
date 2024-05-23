const utils = require("../utils/securepassword");
const userModel = require("../model/userModel");
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
      { email: email },
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
    if (!userData.is_admin === 0) {
      res.render("login", { message: "this user is not an admin" });
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
    res.render("home");
  } catch (error) {
    next(error);
  }
};

//===================== USER LIST =======================//

const userList = async (req, res, next) => {
  try {
    const userData = await userModel.find({ is_admin: 0 });
    res.render("userList", { userData });
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
    const distributerData = await distributerModel.find({ is_verified: true});
    res.render("distributerList", { distributerData });
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
    const productData = await productModel.find({action:"pendding"}).populate("distributor_id")
    res.render("productApprove",{productData})
  }catch(err){
    console.log(err)
  }
}

const productDetails = async (req,res) =>{
  try{
    const productData = await productModel.findOne({_id:req.params.id}).populate("distributor_id")
    res.render("productDetails",{productData})
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
};
