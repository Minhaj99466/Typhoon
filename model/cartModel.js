const mongoose =require('mongoose');
const cartSchema = new mongoose.Schema({
    userId: {
      type: String,
      required: true,
      ref: "User",
    },
    userName: {
      type: String,
      required: true,
    },
    products: [
      {
        productId: {
          type: String,
          ref: "Product",
        },
        count: {
          type: Number,
          default: 0,
        },
        productPrice: {
          type: Number,
        },
        totalPrice: {
          type: Number,
          default: 0,
        },
      },
    ],
  });
  

module.exports = mongoose.model('cart',cartSchema);