const { createCanvas } = require("canvas");

const FONT_BASE = 200;
const FONT_SIZE = 35;

const randomText = () => Math.random().toString(36).substring(2, 8);

const relativeFont = (width) => {
  const ratio = FONT_SIZE / FONT_BASE;
  size = width * ratio * 1.5;
  return `${size}px serif`;
};
const arbitraryRandom = (min, max) => Math.random() * (max - min) + min;
const randomRotation = (degrees = 15) =>
  (arbitraryRandom(-degrees, degrees) * Math.PI) / 180;

const configureText = (ctx, width, height) => {
  ctx.font = relativeFont(width);
  ctx.textBaseline = "bottom";
  ctx.textAlign = "center";
  const text = randomText();
  ctx.fillText(text, width / 2, height / 2);
  return text;
};

const generate = (width, height) => {
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");
  ctx.rotate(randomRotation());
  const text = configureText(ctx, width, height);

  return { image: canvas.toDataURL(), text: text };
};

module.exports = generate;
