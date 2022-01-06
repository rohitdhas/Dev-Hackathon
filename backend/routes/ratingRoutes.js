const express = require("express");
const router = express.Router();
const { submitRatings } = require("../controller/ratingController");

router.post("/ratings", submitRatings);

module.exports = router;
