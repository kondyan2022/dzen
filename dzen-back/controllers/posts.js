const { ctrlWrapper } = require("../utils");
const { postService } = require("../services");

const getAllPosts = async (req, res, next) => {
  const {
    page = 0,
    limit = 25,
    field = "createdAt",
    direction = "DESC",
  } = req.query;

  return res.json(
    await postService.fetchAllRootPosts({ page, limit, field, direction })
  );
};

const getPostsByParent = async (req, res, next) => {
  const { parentId } = req.params;
  return res.json(await postService.fetchPostsByParent(parentId));
};

const addPost = async (req, res, next) => {
  const { username, email, homepage, text, parentId } = req.body;
  const file = req?.file;
  return res.status(201).json(
    await postService.createPost({
      username,
      email,
      homepage,
      text,
      parentId,
      file,
    })
  );
};

module.exports = {
  addPost: ctrlWrapper(addPost),
  getAllPosts: ctrlWrapper(getAllPosts),
  getPostsByParent: ctrlWrapper(getPostsByParent),
};
