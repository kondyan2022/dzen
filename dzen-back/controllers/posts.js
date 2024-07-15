const { ctrlWrapper } = require("../utils");

const addPost = async (req, res, next) => {
  const { username, email, homepage } = req.body;
  const file = req.file;
  console.log(file);
  return res
    .status(201)
    .json({ message: " post ok", username, email, homepage });
  //   console.log(captchaService.getCaptcha(200, 150));
  //   return res.status(201).json({ message: "Hello" });
};

module.exports = {
  addPost: ctrlWrapper(addPost),
};
