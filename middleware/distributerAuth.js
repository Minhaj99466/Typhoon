const distributerLogin = async (req, res, next) => {
  try {
    if (req.session.distributer_id) {
      next();
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
