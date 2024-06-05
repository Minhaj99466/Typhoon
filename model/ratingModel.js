const mongoose = require("mongoose");

const { Schema } = mongoose;

const RatingSchema = new Schema({
  ReviewDescription: {
    type: String,
    required: true,
  },
  Users: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Rating = mongoose.model("Rating", RatingSchema);

module.exports = Rating;
