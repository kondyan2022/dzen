const express = require("express");

const ctrlPosts = require("../controllers/posts");
const { authentificate, upload, validateBody } = require("../middleware");
const { postsSchema } = require("../schemas");

const router = express.Router();

router.post(
  "/",
  authentificate,
  upload.single("image"),
  validateBody(postsSchema.addPost),
  ctrlPosts.addPost
);
// router.get("/:postId", ctrlCaptcha.createCaptcha);
// router.post("/", ctrlCaptcha.getCaptchaTest);

module.exports = router;
