const securePassword = require("../utils/securepassword");
const userModel = require("../model/userModel");

//============================  HOME PAGE LOAD ========================//

const loadHome = async (req, res, next) => {
  try {
    res.render("home", { session: req.session });
  } catch (error) {
    next(error);
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
    const spassword = await securePassword(req.body.password);
    const existingUser = await userModel.exists({ email: req.body.email });
    if (existingUser) {
      return res.render("register", { message: "Email is already registered" });
    }

    const user = new userModel({
      username: req.body.username,
      adharnumber: req.body.adharnumber,
      phonenumber: req.body.phonenumber,
      email: req.body.email,
      password: spassword,
      is_admin: 0,
    });
    const userData = await user.save();
    if (userData) {
      const userVerification = await userModel.findOneAndUpdate(
        { email: req.body.email },
        { $set: { is_verified: true } }
      );
      req.session.user_id = userVerification._id;
      if (userVerification) {
        console.log(userVerification);
        res.redirect("/home");
      }
    } else {
      return res.render("register", {
        message: "Your registration has failed",
      });
    }
  } catch (err) {
    console.log(err);
  }
};

//=============================   CART PAGE LOAD  ========================//

const loadCart = async (req, res, next) => {
  try {
    res.render("cart");
  } catch {
    next(error);
  }
};

//=============================   ABOUT PAGE LOAD  ========================//

const loadAbout = async (req, res, next) => {
  try {
    res.render("about_us");
  } catch {
    next(error);
  }
};

//=============================   CHECKOUT PAGE LOAD  ========================//

const loadCheckOut = async (req, res, next) => {
  try {
    res.render("checkout");
  } catch {
    next(error);
  }
};

//=============================   CONTACT-US PAGE LOAD  ========================//

const loadContactUs = async (req, res, next) => {
  try {
    res.render("contact_us");
  } catch {
    next(error);
  }
};

//=============================   ERROR PAGE LOAD  ========================//

const loadError = async (req, res, next) => {
  try {
    res.render("error");
  } catch {
    next(error);
  }
};

//=============================   SERVICE PAGE LOAD  ========================//

const loadService = async (req, res, next) => {
  try {
    res.render("services");
  } catch {
    next(error);
  }
};

//=============================   SHOP PAGE LOAD  ========================//

const loadShop = async (req, res, next) => {
  try {
    res.render("shop_sidebar");
  } catch {
    next(error);
  }
};

module.exports = {
  loadLogin,
  loadHome,
  loadCart,
  loadAbout,
  loadCheckOut,
  loadContactUs,
  loadError,
  loadRegister,
  loadService,
  loadShop,
  insertUser,
};
