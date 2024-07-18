const fs = require("fs/promises");

const cleanUpload = async (path) => {
  //   console.log("file present", fs.existsSync(path));
  try {
    await fs.unlink(path);
  } catch (error) {
    console.log(error);
  }
};

module.exports = cleanUpload;
