const Distributor = require("../model/distributorModel");

const distributerLogin = async (req, res, next) => {
  try {
    if (req.session.distributer_id) {
      const adminData = await Distributor.findById({ _id: req.session.distributer_id});
      if (adminData) {
        req.adminData = adminData; // Store adminData in req object
        next();
      } else {
        res.redirect("/distributor");
      }
    } else {
      res.redirect("/distributor");
    }
  } catch (error) {
    console.log(error.message);
  }
};

const distributerLogout = async (req, res, next) => {
  try {
    if (req.session.distributer_id) {
      res.redirect("/distributor/home");
    } else {
      next();
    }
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  distributerLogin,
  distributerLogout,
};
