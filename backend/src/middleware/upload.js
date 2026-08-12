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

// Extension ET mimetype doivent correspondre — un fichier renommé en .pdf mais dont le
// Content-Type ne colle pas à un format attendu est rejeté (l'extension seule est falsifiable).
const CV_MIME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
const IMAGE_MIME_TYPES = ["image/png", "image/jpeg", "image/webp", "image/svg+xml", "image/avif"];

const cvFileFilter = (req, file, cb) => {
  const allowedExt = [".pdf", ".doc", ".docx"];
  const extOk = allowedExt.includes(path.extname(file.originalname).toLowerCase());
  const mimeOk = CV_MIME_TYPES.includes(file.mimetype);
  if (extOk && mimeOk) {
    cb(null, true);
  } else {
    cb(new Error("Format de CV non supporté (pdf, doc, docx uniquement)"));
  }
};

const imageFileFilter = (req, file, cb) => {
  const allowedExt = [".png", ".jpg", ".jpeg", ".webp", ".svg", ".avif"];
  const extOk = allowedExt.includes(path.extname(file.originalname).toLowerCase());
  const mimeOk = IMAGE_MIME_TYPES.includes(file.mimetype);
  if (extOk && mimeOk) {
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
