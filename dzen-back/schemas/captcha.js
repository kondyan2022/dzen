const Joi = require("joi");
const { captchaPattern } = require("./validate");

const check = Joi.object({
  text: Joi.string().pattern(captchaPattern).required(),
  uuid: Joi.string().required(),
});

module.exports = { check };
