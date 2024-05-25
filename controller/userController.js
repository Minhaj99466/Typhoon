const productModel = require("../model/productModal");

//=============================   ABOUT PAGE LOAD  ========================//

const loadAbout = async (req, res, next) => {
  try {
    res.render("about_us", { session: req.session.user_id });
  } catch {
    next(error);
  }
};

//=============================   CHECKOUT PAGE LOAD  ========================//

const loadCheckOut = async (req, res, next) => {
  try {
    res.render("checkout", { session: req.session.user_id });
  } catch {
    next(error);
  }
};
//=============================   ORDER PAGE LOAD  ========================//

const loadOrder = async (req, res, next) => {
  try {
    res.render("order", { session: req.session.user_id });
  } catch {
    next(error);
  }
};

//=============================   CONTACT-US PAGE LOAD  ========================//

const loadContactUs = async (req, res, next) => {
  try {
    res.render("contact_us", { session: req.session.user_id });
  } catch {
    next(error);
  }
};

//=============================   ERROR PAGE LOAD  ========================//

const loadError = async (req, res, next) => {
  try {
    res.render("error", { session: req.session.user_id });
  } catch {
    next(error);
  }
};

//=============================   SERVICE PAGE LOAD  ========================//

const loadService = async (req, res, next) => {
  try {
    res.render("services", { session: req.session.user_id });
  } catch {
    next(error);
  }
};

//=============================   SHOP PAGE LOAD  ========================//

const loadShop = async (req, res, next) => {
  try {
    const productData = await productModel.find({action:"approve",is_delete:false})
    res.render("shop_sidebar",{ session: req.session.user_id, productData });
  } catch {
    next(error);
  }
};
//=============================   SinglePRODUCT PAGE LOAD  ========================//

const loadSingle = async (req, res, next) => {
  try {
    const productData = await productModel.findOne({_id:req.params.id,action:"approve",is_delete:false})
    res.render("singleshop", { session: req.session.user_id , productData});
  } catch(error) {
    next(error);
  }
};

module.exports = {
  loadAbout,
  loadCheckOut,
  loadContactUs,
  loadError,
  loadService,
  loadShop,
  loadSingle,
};
