const fs = require("fs/promises");
const path = require("path");
const { Post, User, sequelize } = require("../models");
const { HttpError } = require("../utils");

const uploadDir = path.join(__dirname, "../", "upload");

const checkParentId = async (parentId) => {
  return await Post.findByPk(parentId);
};

const fetchAllRootPosts = async ({ page, limit, field, direction }) => {
  const offset = (page - 1) * limit;
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
    order,
    offset,
    limit,
  });

  const postCount = await Post.count({ where: { parentId: null } });
  const pageCount = Math.ceil(postCount / limit);

  return {
    page,
    limit,
    pageCount,
    postCount,
    sort: { field, direction },
    posts,
  };
};

const fetchPostsByParent = async (parentId) => {
  const posts = await Post.findAll({
    where: { parentId },
    include: [
      { model: sequelize.models.User, as: "user" },
      { model: sequelize.models.Answers, as: "answers_count" },
    ],
    order: [["createdAt", "DESC"]],
  });
  return posts;
};

const createPost = async ({
  username,
  email,
  homepage,
  text,
  parentId,
  file,
}) => {
  const transaction = await sequelize.transaction();
  try {
    let user = await User.findOne({ where: { email } }, { transaction });
    if (!user) {
      const avatar = `avatar${Math.floor(Math.random() * (50 - 1) + 1)}.svg`;
      user = await User.create(
        { username, email, homepage, avatar },
        { transaction }
      );
    }
    const { dataValues: userData } = user;
    const postData = { userId: userData.id, parentId, messageText: text };
    if (file) {
      postData["attachedFile"] = file.filename;
    }

    const post = await Post.create(postData, { transaction });

    if (file) {
      await fs.rename(file.path, path.join(uploadDir, file.filename));
    }
    await transaction.commit();
    return { post };
  } catch (error) {
    console.log(error);
    await transaction.rollback();
    throw HttpError(500);
  }
};

module.exports = {
  checkParentId,
  fetchAllRootPosts,
  fetchPostsByParent,
  createPost,
};
