const mongoose = require("mongoose");

const userSChema = new mongoose.Schema({
  distributer_name: {
    type: String,
    required: true,
  },
  licence_number: {
    type: Number,
    required: true,
  },
  phonenumber: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  is_block: {
    type: Boolean,
    default: false,
  },
  is_verified: {
    type: Boolean,
    default: false,
  },
});

const distributor = mongoose.model("distributor", userSChema);

module.exports = distributor;
