const Jimp = require("jimp");
const { parentPort } = require("worker_threads");

const generateCaptchaText = () => {
  return Math.random().toString(36).substring(2, 6);
};

const addNoise = (image) => {
  const noiseIntensity = 200;
  for (let i = 0; i < noiseIntensity; i++) {
    const x = Math.floor(Math.random() * image.bitmap.width);
    const y = Math.floor(Math.random() * image.bitmap.height);
    const color = Jimp.rgbaToInt(
      Math.floor(Math.random() * 256),
      Math.floor(Math.random() * 256),
      Math.floor(Math.random() * 256),
      255
    );
    image.setPixelColor(color, x, y);
  }
};

const captchaText = generateCaptchaText();

const getRandomInt = (low, high) =>
  Math.floor(Math.random() * (high - low) + low);
(async () => {
  const image = new Jimp(String(captchaText).length * 30 + 30, 50, 0xffffffff);

  const font = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);

  const getLetterImage = (letter, font) => {
    const letterImage = new Jimp(30, 30, 0xffffff00);
    letterImage.print(font, 0, 0, letter).rotate(getRandomInt(-60, 60));
    return letterImage;
  };

  captchaText
    .split("")
    .map(
      (letter, index) =>
        image.composite(getLetterImage(letter, font), 10 + index * 30, 0),
      0
    );
  addNoise(image);
  image.getBuffer(Jimp.MIME_PNG, (err, buffer) => {
    if (err) {
      throw Error("Error generating CAPTCHA");
    }
    parentPort.postMessage({
      text: captchaText,
      image: `data:image/png;base64,${buffer.toString("base64")}`,
    });
  });
})();
