const fs = require("fs/promises");
const path = require("path");
const { Post, User, Answers, sequelize } = require("../models");
const { HttpError } = require("../utils");
const redisService = require("./redis");

// eslint-disable-next-line no-undef
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
  io,
}) => {
  let post;
  let userData;
  const transaction = await sequelize.transaction();
  try {
    let user = await User.findOne({ where: { email } }, { transaction });
    if (!user) {
      const avatar = `avatar${Math.floor(Math.random() * (20 - 1) + 1)}.svg`;
      user = await User.create(
        { username, email, homepage, avatar },
        { transaction }
      );
    }
    userData = user.dataValues;

    const postData = { userId: userData.id, parentId, messageText: text };
    if (file) {
      postData["attachedFile"] = file.filename;
    }

    post = await Post.create(postData, { transaction });

    if (file) {
      await fs.copyFile(file.path, path.join(uploadDir, file.filename));
      await fs.unlink(file.path);
    }
    await transaction.commit();
  } catch (error) {
    console.log(error);
    await transaction.rollback();
    throw HttpError(500);
  }
  if (redisService.redisClient.isReady) {
    try {
      if (post.parentId) {
        await redisService.clearCacheForRoute(`/posts/${post.parentId}*`);
        const parentPost = await Post.findByPk(post.parentId);
        if (parentPost.dataValues.parentId) {
          await redisService.clearCacheForRoute(
            `/posts/${parentPost.dataValues.parentId}*`
          );
        } else {
          await redisService.clearCacheForRoute(`/posts*`, "posts");
        }
      } else {
        await redisService.clearCacheForRoute(`/posts*`, "posts");
      }
    } catch (error) {
      console.log(error);
    }
  }

  io.emit("new-post", { post, user: userData });
  if (post.parentId) {
    const count = await Answers.findOne({ where: { postId: post.parentId } });
    io.emit("child-count-update", { ...count.dataValues });
  }
  return { post };
};

module.exports = {
  checkParentId,
  fetchAllRootPosts,
  fetchPostsByParent,
  createPost,
};
