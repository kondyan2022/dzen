const { captchaService, authService } = require("../services");
const { ctrlWrapper, HttpError } = require("../utils");

const createCaptcha = async (req, res, next) => {
  await captchaService.getCaptchaGimp((data) => res.status(201).json(data));
};

const checkCaptcha = async (req, res, next) => {
  const { text, uuid } = req.body;
  if (!(await captchaService.checkCaptcha(text, uuid))) {
    throw HttpError(401, "Invalid captcha");
  }
  return res.json({ token: await authService.getToken(uuid) });
};

const getCaptchaTest = async (req, res, next) => {
  const { image, text, uuid } = captchaService.getCaptchaGimp(100, 40);
  return res.status(201).send(`<img src="${image}" alt='captcha'/>`);
};

module.exports = {
  createCaptcha: ctrlWrapper(createCaptcha),
  getCaptchaTest: ctrlWrapper(getCaptchaTest),
  checkCaptcha: ctrlWrapper(checkCaptcha),
};
