const express = require("express");

const ctrlPosts = require("../controllers/posts");
const {
  authentificate,
  upload,
  validateBody,
  resizeImage,
  validateQuery,
  checkParentId,
} = require("../middleware");
const { postsSchema } = require("../schemas");
const validateParams = require("../middleware/validateParams");

const router = express.Router();

router.post(
  "/",
  // authentificate,
  upload.single("file"),
  validateBody(postsSchema.addPost),
  checkParentId,
  resizeImage,
  ctrlPosts.addPost
);
router.get("/", validateQuery(postsSchema.getAll), ctrlPosts.getAllPosts);
router.get(
  "/:parentId",
  validateParams(postsSchema.getByParent),
  ctrlPosts.getPostsByParent
);

module.exports = router;
