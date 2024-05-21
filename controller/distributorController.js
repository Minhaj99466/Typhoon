//============== LOGIN PAGE LOAD ===============//

const loadLogin = async (req, res, next) => {
    try {
      res.render("login");
    } catch (error) {
      next(error);
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
    loadLogin,
    loadDashboard,
    userList,
    loadSalesReport,
  };
  