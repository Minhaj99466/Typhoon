const Product = require("../model/productModal")
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

const loadOrderDetails = async(req,res) =>{
    try {
        const orderData = await Product.aggregate([
            {
              $match: {
                distributor_id: new ObjectId(req.session.distributer_id),
              },
            },
            {
              $lookup: {
                from: "orders", // Refers to the 'orders' collection in MongoDB
                localField: "_id",
                foreignField: "products.productId",
                as: "details",
              },
            },
            {
              $unwind: {
                path: "$details",
              },
            },
          ]);
          console.log(orderData);
        res.render("order",{orderData})
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    loadOrderDetails,
}