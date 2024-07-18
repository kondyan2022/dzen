const express = require("express");
const logger = require("morgan");
const cors = require("cors");

require("dotenv").config();

const app = express();

const captchaRouter = require("./routes/captcha");
const postsRouter = require("./routes/posts");
const { cleanUpload } = require("./utils");

const loggerFormat = app.get("env") === "development" ? "dev" : "short";

app.use(logger(loggerFormat));
app.use(cors());

app.use(express.json());
app.use("/files", express.static("upload"));

app.use("/captcha", captchaRouter);
app.use("/posts", postsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  const { method, url } = req;
  if (method === "POST" && url === "/posts") {
    if (req.file) {
      const { path } = req.file;
      if (path) {
        cleanUpload(path);
      }
    }
  }
  res.status(status).json({ message });
});

module.exports = app;
