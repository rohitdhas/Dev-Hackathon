const express = require("express");
const router = express.Router();
const {
  search,
  searchAutoComplete,
  getRandom,
  getFirstHundred,
  getByActor,
  getByCategory,
} = require("../controller/searchController");

router.get("/search/:id", search);
router.get("/random", getRandom);
router.get("/getFirstHundred", getFirstHundred);
router.get("/autocomplete", searchAutoComplete);
router.get("/category/:category", getByCategory);
router.get("/actor/:actor", getByActor);

module.exports = router;
