//===================== USER LIST =======================//

const userList = async (req, res, next) => {
  try {
    res.render("userList");
  } catch (error) {
    next(error);
  }
};

const loadSalesReport = async (req, res, next) => {
  try {
    res.render("salesReport");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  userList,
  loadSalesReport,
};
