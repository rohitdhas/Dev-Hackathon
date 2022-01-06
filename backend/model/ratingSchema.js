const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ratingSchema = new Schema({
  movieId: String,
  email: String,
  ratings: Number,
});

const Rating = mongoose.model("Rating", ratingSchema);
module.exports = Rating;
