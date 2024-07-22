const redis = require("redis");

// eslint-disable-next-line no-undef
const redisClient = redis.createClient({ url: process.env.URL_REDIS });

redisClient.on("error", () => {
  console.error("Redis Client Error");
});

redisClient.on("connect", () => {
  console.log("Redis client connected");
});

(async () => {
  await redisClient.connect();
})();

module.exports = redisClient;
