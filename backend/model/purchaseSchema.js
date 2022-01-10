const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const purchaseSchema = new Schema({
  movieId: String,
  uid: String,
  paymentSuccess: Boolean,
  purchaseId: String,
  email: String,
  movieName: String,
});

const Purchase = mongoose.model("Purchase", purchaseSchema);
module.exports = Purchase;
