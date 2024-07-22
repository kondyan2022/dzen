const validateBody = require("./validateBody");
const validateQuery = require("./validateQuery");
const validateParams = require("./validateParams");
const upload = require("./upload");
const resizeImage = require("./resizeImage");
const authentificate = require("./autentificate");
const checkParentId = require("./checkParentId");
const attachSocketServer = require("./attachSocketServer");
const cacheMiddleware = require("./cacheMiddleware");
module.exports = {
  validateBody,
  validateQuery,
  upload,
  resizeImage,
  authentificate,
  checkParentId,
  attachSocketServer,
  cacheMiddleware,
  validateParams,
};
