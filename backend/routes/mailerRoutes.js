const express = require("express");
const router = express.Router();
const { sendMail } = require("../controller/mailHandler");

router.get("/sendmail", sendMail);

module.exports = router;
