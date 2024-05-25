const productModel = require("../model/productModal");
const cartModel    = require("../model/cartModel")

//===================== LOAD PRODUCT =======================//
const loadProduct = async (req, res, next) => {
  try {
    const productData = await productModel.find({distributor_id:req.session.distributer_id,is_delete:false})
    res.render("productList",{productData});
  } catch (error) {
    next(error);
  }
};

//======================== LOAD ADD PRODUCT ==================== //
const insertProduct = async (req, res, next) => {
  try {
    const {
      productname,
      price,
      brand,
      modelnumber,
      quantity,
      warranty,
      discription,
    } = req.body;
    if (!productname || !price || !brand || !modelnumber || !quantity || !warranty || !discription) {
      return res.render('errorPage', { message: 'All fields are required.' });
    }
    const image = [];
    if (req.files && req.files.length > 0) {
      for (let i = 0; i < req.files.length; i++) {
        image.push(req.files[i].filename);
      }
    }

    const product = new productModel({
      productName: productname,
      price,
      modelNumber: modelnumber,
      brand,
      quantity: quantity,
      description: discription,
      warranty: warranty,
      image,
      distributor_id: req.session.distributer_id,
    });
    const productData = await product.save();
    if (productData) return res.redirect("/distributor/productList");
  } catch (error) {
    next(error);
  }
};

const removeProduct = async (req,res) =>{
  try{
    await productModel.updateOne({_id:req.params.id},{$set:{is_delete:true}});
    res.redirect('/distributor/productlist');
  }catch(err){
    console.log(err)
  }
}

module.exports = {
  loadProduct,
  insertProduct,
  removeProduct,
};
