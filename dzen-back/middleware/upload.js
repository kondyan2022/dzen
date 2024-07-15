const { randomUUID } = require("crypto");
const multer = require("multer");
const path = require("path");

const tempDir = path.join(__dirname, "../", "temp");
const allowedImageMimeType = [
  "image/png",
  "image/jpg",
  "image/jpeg",
  "image/gif",
];

const allowedDocumentMimeType = ["text/plain"];

maxSize = 2000 * 1024;
maxDocSize = (100 + 5) * 1024;

const multerConfig = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, cb) => {
    console.log("multer-config", file);
    const filename = randomUUID();
    cb(null, filename + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  if (allowedImageMimeType.includes(file.mimetype)) {
    return cb(null, true);
  }
  if (allowedDocumentMimeType.includes(file.mimetype)) {
    const raw = Array.from(req.rawHeaders);
    const found_index = raw.findIndex(
      (elem) => elem.toLowerCase() === "content-length"
    );
    const size = parseInt(raw[found_index + 1]);
    if (size > maxDocSize) {
      return cb(new Error("Invalid document size"));
    }
    return cb(null, true);
  }
  return cb(new Error("Invalid mime type"));
};

const upload = multer({
  storage: multerConfig,
  limits: { fileSize: maxSize },
  fileFilter: fileFilter,
});

module.exports = upload;
