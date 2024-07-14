const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();

const captchaRouter = require("./routes/captcha");

const loggerFormat = app.get("env") === "development" ? "dev" : "short";

app.use(logger(loggerFormat));
app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use("/captcha", captchaRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
