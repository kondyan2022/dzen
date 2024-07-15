const Joi = require("joi");
const {
  usernamePattern,
  emailPattern,
  urlPattern,
  validateHtmlTags,
} = require("./validate");

const addPost = Joi.object({
  username: Joi.string().pattern(usernamePattern).required(),
  email: Joi.string().pattern(emailPattern).required(),
  homepage: Joi.string().pattern(urlPattern),
  text: Joi.string()
    .required()
    .custom((value, helper) => {
      const result = validateHtmlTags(value);
      if (typeof result === "string") {
        return helper.message(`"text":${result}`);
      }
      return true;
    }),
});

const getAll = Joi.object({
  page: Joi.number(),
});

module.exports = { addPost };
