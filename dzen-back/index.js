const { server } = require("./app");
const { sequelize } = require("./models");

const { PORT = 3000 } = process.env;

sequelize
  .authenticate()
  .then(() => {
    console.log("DB Connection has been established successfully.");
    server.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error);
  });
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
