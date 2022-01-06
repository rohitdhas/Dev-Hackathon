const Rating = require("../model/ratingSchema");

const submitRatings = async (req, res) => {
  try {
    const ratingDoc = new Rating(req.body);
    ratingDoc.save();
    res.status(200).json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false });
  }
};

module.exports = { submitRatings };
