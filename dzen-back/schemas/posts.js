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
  page: Joi.number().min(0),
  limit: Joi.number().min(1),
  field: Joi.string().valid("username", "email", "createdAt"),
  direction: Joi.string().valid("ASC", "DESC"),
});

const getByParent = Joi.object({
  parentId: Joi.number().min(1).required(),
});

module.exports = { addPost, getAll, getByParent };
