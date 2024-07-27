// const { createCanvas } = require("canvas");
const { Worker } = require("worker_threads");

const redisService = require("./redis");

// const FONT_BASE = 200;
// const FONT_SIZE = 35;

const captchaList = {};

// const randomText = () => Math.random().toString(36).substring(2, 6);
// const getRandomInt = (low, high) =>
//   Math.floor(Math.random() * (high - low) + low);

// const backgroundCharsDefault = [..."0123456789"];
// const backgroundColorDefault = 0xffffffff;

// const getCaptchaPicture = async (
//   code,
//   backgroundChars = backgroundCharsDefault,
//   backgroundColor = backgroundColorDefault
// ) => {
//   const font = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
//   const image = await new Jimp(
//     String(code).length * 30 + 30,
//     50,
//     backgroundColor
//   );
//   const cimage = await new Jimp(30, 30, 0xffffff00);
//   const x = getRandomInt(20, 30);
//   String(code)
//     .split("")
//     .map(async (cp, i) => {
//       const chr = [...Array(1)].map(
//         () => backgroundChars[(Math.random() * backgroundChars.length) | 0]
//       )[0]; // eslint-disable-line no-bitwise
//       cimage
//         .crop(0, 0, 30, 30)
//         .print(font, 0, 0, chr)
//         .rotate(getRandomInt(1, getRandomInt(1, 60), true))
//         .opacity(0)
//         .print(font, 0, 0, cp)
//         .resize(20, 20, Jimp.RESIZE_BEZIER)
//         .rotate(getRandomInt(1, 15))
//         .resize(getRandomInt(40, 42), getRandomInt(40, 42), Jimp.RESIZE_HERMITE)
//         .opacity(1)
//         .dither16();
//       image.composite(
//         cimage,
//         x + i * 20 - getRandomInt(5, 10),
//         getRandomInt(2, 8)
//       );
//     });
//   // image.autocrop();
//   const buffer = await getImageBuffer(image);
//   return buffer;
// };

const getCaptchaGimp = async (respFn) => {
  const worker = new Worker("./workers/captcha.js");
  // const image = await getCaptchaPicture(text);
  const uuid = crypto.randomUUID();
  worker.on("message", async ({ text, image }) => {
    if (redisService.redisClient.isReady) {
      await redisService.redisClient.set(uuid, text, { EX: 120 });
    } else {
      captchaList[uuid] = text;
      setTimeout(() => {
        delete captchaList[uuid];
      }, 120000);
    }
    respFn({ image, uuid });
  });
};

const checkCaptcha = async (text, uuid) => {
  if (text) {
    if (redisService.redisClient.isReady) {
      if (text === (await redisService.redisClient.get(uuid))) {
        await redisService.clearCacheForRoute(uuid);
        return true;
      }
    } else if (captchaList[uuid] === text) {
      delete captchaList[uuid];
      return true;
    }
  }
  return false;
};

// Old captcha version: problem canvas vs docker and font

// const relativeFont = (width) => {
//   const ratio = FONT_SIZE / FONT_BASE;
//   const size = width * ratio;
//   return `${size}px`;
// };
// const angleRandom = (min, max) => Math.random() * (max - min) + min;
// const randomRotation = (degrees = 10) =>
//   (angleRandom(-degrees, degrees) * Math.PI) / 180;

// const configureText = (ctx, width, height) => {
//   ctx.font = relativeFont(width);
//   // ctx.textBaseline = "bottom";
//   ctx.textAlign = "center";
//   const text = randomText();
//   ctx.fillText(text, width / 2, height / 2);
//   return text;
// };

// const getCaptcha = async (width, height) => {
//   const canvas = createCanvas(width, height);
//   const ctx = canvas.getContext("2d");
//   ctx.rotate(randomRotation());
//   const text = configureText(ctx, width, height);
//   const uuid = crypto.randomUUID();

//   if (redisService.redisClient.isReady) {
//     await redisService.redisClient.set(uuid, text, { EX: 120 });
//   } else {
//     captchaList[uuid] = text;
//     setTimeout(() => {
//       delete captchaList[uuid];
//     }, 120000);
//   }
//   console.log(text);
//   return { image: canvas.toDataURL(), uuid };
// };

module.exports = {
  // getCaptcha,
  getCaptchaGimp,
  checkCaptcha,
};
