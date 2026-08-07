const express = require("express");
const { register, login, getMe, forgotPassword, resetPassword } = require("../controllers/authController");
const { protect } = require("../middleware/auth");
const { uploadCV } = require("../middleware/upload");

const router = express.Router();

// "CV" correspond au champ input file de step2.jsx (optionnel selon le rôle)
router.post("/register", uploadCV.single("CV"), register);
router.post("/login", login);
router.get("/me", protect, getMe);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

module.exports = router;
