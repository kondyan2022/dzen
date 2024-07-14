const express = require("express");
const ctrlCaptcha = require("../controllers/captcha");

const router = express.Router();

router.post("/", ctrlCaptcha.createCaptcha);
router.get("/test", ctrlCaptcha.getCaptchaTest);
router.post("/check", ctrlCaptcha.checkCaptcha);

module.exports = router;
