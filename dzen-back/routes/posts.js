const express = require("express");

const ctrlPosts = require("../controllers/posts");
const { authentificate, upload } = require("../middleware");

const router = express.Router();

router.post("/", authentificate, upload.none(), ctrlPosts.addPost);
// router.get("/:postId", ctrlCaptcha.createCaptcha);
// router.post("/", ctrlCaptcha.getCaptchaTest);

module.exports = router;
