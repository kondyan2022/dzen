const getImageBuffer = (image) =>
  new Promise((resolve) =>
    image.getBuffer("image/png", (err, buf) => resolve(buf))
  );

module.exports = getImageBuffer ;
