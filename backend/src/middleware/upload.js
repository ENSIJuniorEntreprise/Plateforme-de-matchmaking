const multer = require("multer");
const path = require("path");
const fs = require("fs");

const makeStorage = (subfolder) => {
  const dest = path.join(__dirname, "..", "..", "uploads", subfolder);
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });

  return multer.diskStorage({
    destination: (req, file, cb) => cb(null, dest),
    filename: (req, file, cb) => {
      const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      cb(null, `${unique}${path.extname(file.originalname)}`);
    },
  });
};

const cvFileFilter = (req, file, cb) => {
  const allowed = [".pdf", ".doc", ".docx"];
  if (allowed.includes(path.extname(file.originalname).toLowerCase())) {
    cb(null, true);
  } else {
    cb(new Error("Format de CV non supporté (pdf, doc, docx uniquement)"));
  }
};

const imageFileFilter = (req, file, cb) => {
  const allowed = [".png", ".jpg", ".jpeg", ".webp", ".svg", ".avif"];
  if (allowed.includes(path.extname(file.originalname).toLowerCase())) {
    cb(null, true);
  } else {
    cb(new Error("Format d'image non supporté"));
  }
};

const maxSize = (parseInt(process.env.MAX_FILE_SIZE_MB, 10) || 5) * 1024 * 1024;

const uploadCV = multer({
  storage: makeStorage("cv"),
  fileFilter: cvFileFilter,
  limits: { fileSize: maxSize },
});

const uploadAvatar = multer({
  storage: makeStorage("avatars"),
  fileFilter: imageFileFilter,
  limits: { fileSize: maxSize },
});

module.exports = { uploadCV, uploadAvatar };
