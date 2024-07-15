const express = require("express");

const ctrlPosts = require("../controllers/posts");
const {
  authentificate,
  upload,
  validateBody,
  resizeImage,
} = require("../middleware");
const { postsSchema } = require("../schemas");

const router = express.Router();

router.post(
  "/",
  //   authentificate,
  upload.single("file"),
  resizeImage,
  validateBody(postsSchema.addPost),
  ctrlPosts.addPost
);
// router.get("/:postId", ctrlCaptcha.createCaptcha);
// router.post("/", ctrlCaptcha.getCaptchaTest);

module.exports = router;
