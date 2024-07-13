const express = require("express");
const ctrlCaptcha = require("../controllers/captcha");

const router = express.Router();

router.post("/", ctrlCaptcha.getCaptcha);
router.get("/test", ctrlCaptcha.getCaptchaTest);

module.exports = router;
