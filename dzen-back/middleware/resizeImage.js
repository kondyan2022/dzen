const Jimp = require("jimp");
const fs = require("fs/promises");

const IMAGE_SIZE = { width: 320, height: 240 };

const resizeAvatar = async (req, res, next) => {
  const { path } = req.file;
  if (!path) {
    next();
  }
  try {
    const image = await Jimp.read(path);
    const { width, height } = image.bitmap;
    if (width > 320 || height > 240) {
      await image.scaleToFit(IMAGE_SIZE.width, IMAGE_SIZE.height);
      await image.writeAsync(path);
    }
    next();
  } catch (error) {
    error.status = 400;
    console.log(error);
    await fs.unlink(path);
    next(error);
  }
};

module.exports = resizeAvatar;
