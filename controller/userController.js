
//============================  HOME PAGE LOAD ========================//

const loadHome = async (req, res, next) => {
  try {
    res.render('home')
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
};
