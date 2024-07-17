const { ctrlWrapper } = require("../utils");
const { Post, sequelize } = require("../models");

const getAllPosts = async (req, res, next) => {
  const {
    page = 0,
    limit = 25,
    field = "createdAt",
    direction = "DESC",
  } = req.query;
  const offset = page * limit;
  const order = [["user", field, direction]];
  if (field === "createdAt") {
    order[0].shift();
  }

  const posts = await Post.findAll({
    where: { parentId: null },
    include: [
      { model: sequelize.models.User, as: "user" },
      { model: sequelize.models.Answers, as: "answers_count" },
    ],
    // order: [["user", "username", direction]],
    order,
    offset,
    limit,
  });
  const postCount = await Post.count({ where: { parentId: null } });
  const pageCount = Math.ceil(postCount / limit);
  return res.json({
    page,
    limit,
    pageCount,
    postCount,
    sort: { field, direction },
    posts,
  });
};

const getPostsByParent = async (req, res, next) => {
  const { parentId } = req.params;

  const posts = await Post.findAll({
    where: { parentId },
    include: [
      { model: sequelize.models.User, as: "user" },
      { model: sequelize.models.Answers, as: "answers_count" },
    ],
  });
  return res.json(posts);
};

const addPost = async (req, res, next) => {
  const { username, email, homepage, id } = req.body;
  const file = req?.file;

  const files = req?.files;
  console.log("Controllers", files);
  return res
    .status(201)
    .json({ message: " post ok", username, email, homepage });
};

module.exports = {
  addPost: ctrlWrapper(addPost),
  getAllPosts: ctrlWrapper(getAllPosts),
  getPostsByParent: ctrlWrapper(getPostsByParent),
};
