require("dotenv").config();

const { DB_USER, DB_NAME, DB_HOST, DB_PASSWORD } = process.env;

module.exports = {
  development: {
    username: "postgres",
    password: "123",
    database: "dzen-posts",
    host: "localhost",
    dialect: "postgres",
  },
  test: {
    username: DB_USER,
    password: String(DB_PASSWORD),
    database: DB_NAME,
    host: DB_HOST,
    dialect: "postgres",
  },
  production: {
    username: DB_USER,
    password: String(DB_PASSWORD),
    database: DB_NAME,
    host: DB_HOST,
    dialect: "postgres",
  },
};
