// const eventService = require("../services/event");

const generate = require("../services/captcha");
const { ctrlWrapper } = require("../utils");
const crypto = require("crypto");

const getCaptcha = async (req, res, next) => {
  //   alte;

  //   const randomText = () => addListener;
  const random = Math.random().toString(36).substring(2, 8);
  return res.status(201).json({ message: random });
};

const getCaptchaTest = async (req, res, next) => {
  const { image } = generate(200, 150);
  return res.status(201).send(`<img src="${image}" alt='captcha'/>`);
};

module.exports = {
  getCaptcha: ctrlWrapper(getCaptcha),
  getCaptchaTest: ctrlWrapper(getCaptchaTest),
};
