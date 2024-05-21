const utils = require("../utils/securepassword");
const userModel = require("../model/userModel");

//============================= REGISTRATION PAGE LOAD ==================//

const loadRegister = async (req, res, next) => {
  try {
    res.render("register");
  } catch {
    next(error);
  }
};

const insertUser = async (req, res, next) => {
  try {
    const { username, adharnumber, phonenumber, email, password } = req.body;
    if (!username || !adharnumber || !phonenumber || !email || !password) {
      return res.render("register", { message: "All fields are required" });
    }
    const existingUser = await userModel.exists({ email });
    if (existingUser) {
      return res.render("register", { message: "Email is already registered" });
    }
    const securePassword = await utils.securePassword(password);
    const newUser = new userModel({
      username,
      adharnumber,
      phonenumber,
      email,
      password: securePassword,
      is_admin: 0,
      is_verified: false,
    });
    const userData = await newUser.save();
    if (!userData) {
      return res.render("register", {
        message: "Your registration has failed",
      });
    }
    const userVerification = await userModel.findByIdAndUpdate(
      userData._id,
      { $set: { is_verified: true } },
      { new: true }
    );
    if (!userVerification) {
      return res.render("register", {
        message: "User verification has failed",
      });
    }
    req.session.user_id = userVerification._id;
    res.redirect("/home");
  } catch (error) {
    console.error(error);
  }
};

//============================  HOME PAGE LOAD ========================//

const loadHome = async (req, res, next) => {
  try {
    res.render("home", { session: req.session.user_id });
  } catch (error) {
    next(error);
  }
};

const userLogout = async (req, res, next) => {
  try {
    req.session.destroy();
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
};

//============================  LOGIN PAGE LOAD ========================//

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
      { email: 1, password: 1, is_verified: 1, is_block: 1 }
    );
    if (!userData) {
      return res.render("login", { message: "Email is incorrect." });
    }
    const passwordMatch = await utils.comparePassword(
      password,
      userData.password
    );
    if (!passwordMatch) {
      return res.render("login", { message: "Password is incorrect." });
    }
    if (!userData.is_verified) {
      return res.render("login", {
        message: "User is not verified. Please register.",
      });
    }
    if (userData.is_block) {
      return res.render("login", { message: "User is blocked." });
    }
    req.session.user_id = userData._id;
    return res.redirect("/home");
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  loadLogin,
  loadHome,
  userLogout,
  verifyLogin,
  loadRegister,
  insertUser,
};
