const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movieSchema = new Schema({
  title: String,
  poster: String,
  plot: String,
  fullplot: String,
  genres: Array,
  year: Number,
  type: String,
  imdb: Object,
  cast: Array,
  price: Number,
});

const Movie = mongoose.model("Movie", movieSchema);
module.exports = Movie;
