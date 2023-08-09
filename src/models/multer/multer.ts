import multer from "multer";
import path from "path";
import fs from "fs";

if (!fs.existsSync(path.join(__dirname, "images"))) {
  fs.mkdirSync(path.join(__dirname, "images"));
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "images"));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

export const upload = multer({ storage });
