const express = require("express");
const ctrlCaptcha = require("../controllers/captcha");
const { validateBody } = require("../middleware");
const { captchaSchema } = require("../schemas");

const router = express.Router();

router.post("/", ctrlCaptcha.createCaptcha);
router.get("/test", ctrlCaptcha.getCaptchaTest);
router.post(
  "/check",
  validateBody(captchaSchema.check),
  ctrlCaptcha.checkCaptcha
);

module.exports = router;
