const express = require("express");
const router = express.Router();
const {
  search,
  searchAutoComplete,
  getRandom,
  checkPayment,
  getPaidMovies,
  getFavorites,
} = require("../controller/searchController");

router.get("/search/:id", search);
router.get("/random", getRandom);
router.get("/checkPayment", checkPayment);
router.get("/autocomplete", searchAutoComplete);
router.get("/getPaidMovies", getPaidMovies);
router.post("/favorites", getFavorites);

module.exports = router;
