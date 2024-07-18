const validateBody = require("./validateBody");
const validateQuery = require("./validateQuery");
// // const upload = require("./upload_old");
const upload = require("./upload");
const resizeImage = require("./resizeImage");
// const isSingleFileExist = require("./isSingleFileExist");
const authentificate = require("./autentificate");
// const validateAndConvertDateBody = require("./validateAndConvertDateBody");
// const isUserHaveProfile = require("./isUserHaveProfile");
const checkParentId = require("./checkParentId");
module.exports = {
  validateBody,
  validateQuery,
  upload,
  resizeImage,
  //   isSingleFileExist,
  authentificate,
  //   validateAndConvertDateBody,
  //   isUserHaveProfile,
  checkParentId,
};
