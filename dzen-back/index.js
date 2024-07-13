const app = require("./app");
// const redisClient = require("./redis");

const { PORT = 3000 } = process.env;

// redisClient.on("error", (err) => {
//   console.log("Redis Client Error", err);
//   redisClient.disconnect();
// });
// redisClient.on("connect", function () {
//   console.log("Database connection successful");
//   app.listen(PORT, () => {
//     console.log(`Server running. Use our API on port: ${PORT}`);
//   });
// });
app.listen(PORT, () => {
  console.log(`Server running. Use our API on port: ${PORT}`);
});
