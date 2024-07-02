const productModel = require("../model/productModal");
const Cart = require("../model/cartModel");
const Order = require("../model/orderModel");
const Rating = require("../model/ratingModel")


//=============================   ABOUT PAGE LOAD  ========================//

const loadAbout = async (req, res, next) => {
  try {
    res.render("about_us", { session: req.session.user_id });
  } catch (error) {
    next(error);
  }
};

//=============================   CHECKOUT PAGE LOAD  ========================//

const loadCheckOut = async (req, res, next) => {
  try {
    const subTotal = await Cart.aggregate([
      { $match: { userId: req.session.user_id } },
      { $unwind: "$products" },
      { $group: { _id: null, total: { $sum: "$products.totalPrice" } } },
      { $project: { _id: 0 } },
    ]);
    totalAmount = subTotal.length > 0 ? subTotal[0].total : 0;
    res.render("checkout", { session: req.session.user_id, totalAmount });
  } catch (error) {
    next(error);
  }
};
//=============================   ORDER PAGE LOAD  ========================//

const loadOrder = async (req, res, next) => {
  try {
    const orderData = await Order.find({
      userId: req.session.user_id,
    }).populate("products.productId");

    if (orderData) {
      res.render("order", {
        session: req.session.user_id,
        order: orderData ? orderData : [],
      });
    }
  } catch (error) {
    next(error);
  }
};
//=============================   ORDER PAGE LOAD  ========================//

const loadSuccess = async (req, res, next) => {
  try {
    res.render("orderplace", { session: req.session.user_id });
  } catch (error) {
    next(error);
  }
};

//=============================   CONTACT-US PAGE LOAD  ========================//

const loadContactUs = async (req, res, next) => {
  try {
    res.render("contact_us", { session: req.session.user_id });
  } catch (error) {
    next(error);
  }
};

//=============================   ERROR PAGE LOAD  ========================//

const loadError = async (req, res, next) => {
  try {
    res.render("error", { session: req.session.user_id });
  } catch (error) {
    next(error);
  }
};

//=============================   SERVICE PAGE LOAD  ========================//

const loadService = async (req, res, next) => {
  try {
    res.render("services", { session: req.session.user_id });
  } catch (error) {
    next(error);
  }
};

//=============================   SHOP PAGE LOAD  ========================//

const loadShop = async (req, res, next) => {
  try {
    const productData = await productModel.find({
      action: "approve",
      is_delete: false,
    });
    res.render("shop_sidebar", { session: req.session.user_id, productData });
  } catch (error) {
    next(error);
  }
};
//=============================   SinglePRODUCT PAGE LOAD  ========================//

const loadSingle = async (req, res, next) => {
  try {
    const productData = await productModel.findOne({
      _id: req.params.id,
      action: "approve",
      is_delete: false,
    });
    const ratingData = await Rating.find().populate("Users")
    res.render("singleshop", { session: req.session.user_id, productData ,ratingData});
  } catch (error) {
    next(error);
  }
};

const addRating = async(req,res,next) =>{
  try{
    const rating = new Rating({
      ReviewDescription:req.body.description,
      Users:req.session.user_id,
    })
    ratingData = await rating.save()
    if (ratingData) {
      return res.status(200).json({ error: "Cart is empty" });
    }
    return res.status(400).json({ error: "Cart is empty" });
  }catch(err){
    next(err)
  }
}


module.exports = {
  loadAbout,
  loadCheckOut,
  loadContactUs,
  loadError,
  loadService,
  loadShop,
  loadSingle,
  loadOrder,
  loadSuccess,
  addRating,
};
