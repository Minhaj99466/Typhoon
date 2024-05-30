const User = require("../model/userModel");

const adminIsLogin = async (req, res, next) => {
  try {
    if (req.session.admin_id) {
      const adminData = await User.findById({ _id: req.session.admin_id });
      if (adminData) {
        req.adminData = adminData;  // Store adminData in req object
        next();
      } else {
        res.redirect("/admin");
      }
    } else {
      res.redirect("/admin");
    }
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

const adminIsLogout = async (req, res, next) => {
  try {
    if (req.session.admin_id) {
      res.redirect("/admin/dashboard");
    } else {
      next();
    }
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
    adminIsLogin,
    adminIsLogout,
};
