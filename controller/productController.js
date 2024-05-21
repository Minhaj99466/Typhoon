
//===================== LOAD PRODUCT =======================//

const loadProduct = async (req, res, next) => {
  try {
    res.render("productList");
  } catch (error) {
    next(error);
  }
};

//======================== LOAD ADD PRODUCT ==================== //

const addProduct = async (req, res, next) => {
  try {
    res.render("addProduct")
  } catch (error) {
    next(error);
  }
};


module.exports = {
  loadProduct,
  addProduct
};
