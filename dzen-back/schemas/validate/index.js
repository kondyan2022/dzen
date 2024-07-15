const { validateHtmlTags } = require("./validateHtmlTag");
const {
  aTagPattern,
  emailPattern,
  tagPattern,
  urlPattern,
  usernamePattern,
  captchaPattern,
} = require("./validatePattern");

module.exports = {
  validateHtmlTags,
  aTagPattern,
  emailPattern,
  tagPattern,
  urlPattern,
  usernamePattern,
  captchaPattern,
};
