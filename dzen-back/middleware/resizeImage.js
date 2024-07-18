const Jimp = require("jimp");
const { allowedImageMimeType } = require("../utils/allowedMimeTypes");

const IMAGE_SIZE = { width: 320, height: 240 };

const resizeAvatar = async (req, res, next) => {
  if (!req.file) {
    return next();
  }
  const { path, mimetype } = req.file;
  if (!path) {
    return next();
  }
  if (!allowedImageMimeType.includes(mimetype)) {
    return next();
  }
  try {
    const image = await Jimp.read(path);
    const { width, height } = image.bitmap;
    if (width > 320 || height > 240) {
      image.scaleToFit(IMAGE_SIZE.width, IMAGE_SIZE.height);
      await image.writeAsync(path);
    }
    next();
  } catch (error) {
    error.status = 400;
    console.log(error);
    // await fs.unlink(path);
    next(error);
  }
};

module.exports = resizeAvatar;
