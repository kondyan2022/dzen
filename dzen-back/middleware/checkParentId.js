const { postService } = require("../services");
const { HttpError } = require("../utils");

const checkParentId = async (req, res, next) => {
  const { parentId } = req.body;
  if (!parentId) {
    return next();
  }

  try {
    if (!(await postService.checkParentId(parentId))) {
      next(HttpError(422, "parent is absent"));
    }
    next();
  } catch {
    next(HttpError(422, "parent is absent!"));
  }
};

module.exports = checkParentId;
