const express = require("express");
const router = express.Router();
const { webhook, createCheckout } = require("../controller/stripeController");

router.post("/checkout", createCheckout);
router.post("/webhook", express.raw({ type: "application/json" }), webhook);

module.exports = router;
