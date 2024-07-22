const authService = require("./auth");
const captchaService = require("./captcha");
const postService = require("./post");
const redisService = require("./redis");

module.exports = {
  authService,
  captchaService,
  postService,
  redisService,
};
