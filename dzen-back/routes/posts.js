const express = require("express");

const ctrlPosts = require("../controllers/posts");
const {
  authentificate,
  upload,
  validateBody,
  resizeImage,
  validateQuery,
  checkParentId,
  cacheMiddleware,
  validateParams,
} = require("../middleware");
const { postsSchema } = require("../schemas");

const router = express.Router();

router.post(
  "/",
  authentificate,
  upload.single("file"),
  validateBody(postsSchema.addPost),
  checkParentId,
  resizeImage,
  ctrlPosts.addPost
);
router.get(
  "/",
  validateQuery(postsSchema.getAll),
  cacheMiddleware("posts"),
  ctrlPosts.getAllPosts
);
router.get(
  "/:parentId",
  validateParams(postsSchema.getByParent),
  cacheMiddleware(),
  ctrlPosts.getPostsByParent
);

module.exports = router;
