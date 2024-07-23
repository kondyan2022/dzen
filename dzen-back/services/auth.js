const jwt = require("jsonwebtoken");
const redisService = require("./redis");

const { SECRET_KEY } = process.env;
console.log({ SECRET_KEY });
const tokenList = {};

const getToken = async (id) => {
  const payload = { id };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: 10000 }); //10s
  if (redisService.redisClient.isReady) {
    await redisService.redisClient.set(id, token, { EX: 10 });
  } else {
    tokenList[id] = token;
    setInterval(() => {
      delete tokenList[id];
    }, 10000);
  }
  return token;
};

const checkToken = async (token) => {
  const { id } = jwt.verify(token, SECRET_KEY);
  if (id) {
    if (redisService.redisClient.isReady) {
      if (token === (await redisService.redisClient.get(id))) {
        await redisService.clearCacheForRoute(id);
        return true;
      }
    } else if (tokenList[id] === token) {
      delete tokenList[id];
      return true;
    }
  }
  return false;
};

module.exports = {
  checkToken,
  getToken,
};
