const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  price: {
    type: Number,
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  modelNumber: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  warranty: {
    type: Number,
    required: true,
  },
  image: [{ type: String }],
  action: {
    type: String,
    default: "pendding",
  },
  reason: {
    type: String,
  },
  distributor_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "distributor",
    required: true,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;