import multer from "multer";
import path from "path";
import fs from "fs";

// ---------------- Setup Upload Folder ----------------
const uploadFolder = path.join(process.cwd(), "public/uploads");
if (!fs.existsSync(uploadFolder)) fs.mkdirSync(uploadFolder, { recursive: true });

// ---------------- Storage Configuration ----------------
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadFolder);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  }
});

// ---------------- Multer Instance ----------------
const upload = multer({ storage });

// ---------------- Helper to Wrap Multer in a Promise ----------------
export const multerPromise = (fieldName = "images") => (req, res) =>
  new Promise((resolve, reject) => {
    upload.array(fieldName)(req, res, (err) => {
      if (err) reject(err);
      else resolve(req);
    });
  });

export default upload;
