const jwt = require("jsonwebtoken");
const redisClient = require("../redisClient");

const { SECRET_KEY } = process.env;

const tokenList = {};

const getToken = async (id) => {
  const payload = { id };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: 10000 }); //10s
  if (redisClient.isReady) {
    await redisClient.set(id, token, "EX", 10);
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
    if (redisClient.isReady) {
      if (token === (await redisClient.get(id))) {
        await clearCacheForRoute(id);
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
