const redisClient = require("../redisClient");

const clearCacheForRoute = async (route, prefix) => {
  const pattern = prefix ? `${prefix}:${route}` : `${route}`;
  try {
    const keys = await redisClient.keys(pattern);

    if (keys.length > 0) {
      await redisClient.del(keys);
    }
  } catch (err) {
    console.error("Redis error:", err);
  }
};

module.exports = { clearCacheForRoute, redisClient };
