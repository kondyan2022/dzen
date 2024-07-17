const Sequilize = require("sequelize");

module.exports = new Sequilize("dzen-posts", "postgres", "123", {
  host: "localhost",
  dialect: "postgres",
});
