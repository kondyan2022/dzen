const { AvatarGenerator } = require("random-avatar-generator");

const generator = new AvatarGenerator();

// //random

// Optionally specify a seed for the avatar. e.g. for always getting the same avatar for a user id.
// With seed 'avatar', always returns https://avataaars.io/?accessoriesType=Kurt&avatarStyle=Circle&clotheColor=Blue01&clotheType=Hoodie&eyeType=EyeRoll&eyebrowType=RaisedExcitedNatural&facialHairColor=Blonde&facialHairType=BeardMagestic&hairColor=Black&hatColor=White&mouthType=Sad&skinColor=Yellow&topType=ShortHairShortWaved

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
    console.log(i);
  }
})();
