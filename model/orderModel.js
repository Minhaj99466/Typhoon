const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  deliveryAddress: {
    name: {
      type: String,
      required: true,
    },
    number: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    postcode: {
      type: Number,
      required: true,
    },
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  products: [{
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Product",
    },
    count: {
      type: Number,
      default: 1,
    },
    productPrice: {
      type: Number,
      required: false,
    },
    totalPrice: {
      type: Number,
      default:0
    },
    status: {
      type: String,
      default: 'placed',
    },
    cancelReason: {
      type: String,
    },
    returnReason: {
      type: String,
    },
    deliveryDate: {
      type: Date,
    },
  }],
  totalAmount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    default: 'pending',
  },
});

// Create the Order model
const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
