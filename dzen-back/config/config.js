require("dotenv").config();

// eslint-disable-next-line no-undef
let { DB_USER, DB_NAME, DB_HOST, DB_PASSWORD } = process.env;
DB_PASSWORD = String(DB_PASSWORD);
module.exports = {
  development: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    dialect: "postgres",
  },
  test: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    dialect: "postgres",
  },
  production: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    dialect: "postgres",
  },
};
