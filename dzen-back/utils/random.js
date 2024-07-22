const { AvatarGenerator } = require("random-avatar-generator");

const generator = new AvatarGenerator();

const fs = require("fs");
const { mkdir } = require("fs/promises");
const { Readable } = require("stream");
const { finished } = require("stream/promises");
const path = require("path");
const downloadFile = async (url, fileName) => {
  const res = await fetch(url);
  if (!fs.existsSync("downloads")) await mkdir("downloads");
  const destination = path.resolve("./downloads", fileName);
  const fileStream = fs.createWriteStream(destination, { flags: "wx" });
  await finished(Readable.fromWeb(res.body).pipe(fileStream));
};

(async () => {
  for (let i = 1; i <= 50; i += 1) {
    const url = generator.generateRandomAvatar(i);
    await downloadFile(url, `avatar${i}.svg`);
  }
})();
