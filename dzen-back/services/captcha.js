const { createCanvas } = require("canvas");
const redisService = require("./redis");

const FONT_BASE = 200;
const FONT_SIZE = 35;

const captchaList = {};

const randomText = () => Math.random().toString(36).substring(2, 8);

const relativeFont = (width) => {
  const ratio = FONT_SIZE / FONT_BASE;
  const size = width * ratio;
  return `${size}px`;
};
const angleRandom = (min, max) => Math.random() * (max - min) + min;
const randomRotation = (degrees = 10) =>
  (angleRandom(-degrees, degrees) * Math.PI) / 180;

const configureText = (ctx, width, height) => {
  ctx.font = relativeFont(width);
  // ctx.textBaseline = "bottom";
  ctx.textAlign = "center";
  const text = randomText();
  ctx.fillText(text, width / 2, height / 2);
  return text;
};

const getCaptcha = async (width, height) => {
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");
  ctx.rotate(randomRotation());
  const text = configureText(ctx, width, height);
  const uuid = crypto.randomUUID();

  if (redisService.redisClient.isReady) {
    await redisService.redisClient.set(uuid, text, { EX: 120 });
  } else {
    captchaList[uuid] = text;
    setTimeout(() => {
      delete captchaList[uuid];
    }, 120000);
  }
  console.log(text);
  return { image: canvas.toDataURL(), uuid };
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
module.exports = {
  getCaptcha,
  checkCaptcha,
};
