const redisClient = require("../redisClient");
const { generateCacheKey } = require("../utils");

const cacheMiddleware = (prefix) => async (req, res, next) => {
  if (req.method !== "GET") {
    return next();
  }

  if (!redisClient.isReady) {
    return next();
  }

  const cacheKey = generateCacheKey(req, prefix);
  console.log(cacheKey);
  try {
    const data = await redisClient.get(cacheKey);

    if (data) {
      console.log("cache response");
      return res.send(JSON.parse(data));
    } else {
      res.sendResponse = res.send;
      res.send = async (body) => {
        try {
          await redisClient.set(cacheKey, JSON.stringify(body), "EX", 600);
          console.log("cache save");
        } catch (err) {
          console.error("Error setting cache:", err);
        }
        res.sendResponse(body);
      };
      next();
    }
  } catch (err) {
    console.error("Redis error:", err);
    next();
  }
};

module.exports = cacheMiddleware;
