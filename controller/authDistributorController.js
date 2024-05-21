const distributerModel = require("../model/distributorModel");
const utils = require("../utils/securepassword");

//============== LOGIN PAGE LOAD ===============//

const loadLogin = async (req, res, next) => {
  try {
    res.render("login");
  } catch (error) {
    next(error);
  }
};

const loadRegister = async (req, res, next) => {
  try {
    res.render("register");
  } catch (err) {
    console.log(err);
  }
};

const insertDistributor = async (req, res, next) => {
  try {
    console.log(req.body);
    const { distributer_name, licence_number, phonenumber, email, password } = req.body;
    if ( !distributer_name || !licence_number || !phonenumber || !email || !password) {
      return res.render("register", { message: "All fields are required" });
    }
    const existingUser = await distributerModel.exists({ email });
    if (existingUser) {
      return res.render("register", { message: "Email is already registered" });
    }
    const securePassword = await utils.securePassword(password);
    const newDistributer = new distributerModel({
      distributer_name,
      licence_number,
      phonenumber,
      email,
      password: securePassword,
    });
    const distributerData = await newDistributer.save();
    if (!distributerData) {
      return res.render("register", {
        message: "Your registration has failed",
      });
    }
    const distributerVerification = await distributerModel.findByIdAndUpdate(
      distributerData._id,
      { $set: { is_verified: true } },
      { new: true }
    );
    if (!distributerVerification) {
      return res.render("register", {
        message: "User verification has failed",
      });
    }
    req.session.distributer_id = distributerVerification._id;
    res.redirect("/distributor/home");
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

const verifyLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const distributerData = await distributerModel.findOne(
      { email },
      { email: 1, password: 1, is_verified: 1, is_block: 1 }
    );
    if (!distributerData) {
      return res.render("login", { message: "Email is incorrect." });
    }
    const passwordMatch = await utils.comparePassword(
      password,
      distributerData.password
    );
    if (!passwordMatch) {
      return res.render("login", { message: "Password is incorrect." });
    }
    if (!distributerData.is_verified) {
      return res.render("login", {
        message: "User is not verified. Please register.",
      });
    }
    if (distributerData.is_block) {
      return res.render("login", { message: "User is blocked." });
    }
    req.session.distributer_id = distributerData._id;
    return res.redirect("/distributor/home");
  } catch (error) {
    console.error(error);
  }
};

const distrubuterLogout = async (req,res,next) =>{
    try{
        req.session.destroy();
        res.redirect("/distributor");
    }catch(err){
        console.log(err)
    }
}

module.exports = {
  loadDashboard,
  insertDistributor,
  verifyLogin,
  loadRegister,
  distrubuterLogout,
  loadLogin,
};
