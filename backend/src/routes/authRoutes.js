const express = require("express");
const { register, login, getMe, forgotPassword, resetPassword } = require("../controllers/authController");
const {
  googleRedirect,
  googleCallback,
  linkedinRedirect,
  linkedinCallback,
} = require("../controllers/oauthController");
const { protect } = require("../middleware/auth");
const { uploadCV } = require("../middleware/upload");

const router = express.Router();

// "CV" correspond au champ input file de step2.jsx (optionnel selon le rôle)
router.post("/register", uploadCV.single("CV"), register);
router.post("/login", login);
router.get("/me", protect, getMe);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

// OAuth "Se connecter avec..." — redirige vers le provider, non fonctionnel tant que
// GOOGLE_CLIENT_ID/SECRET ou LINKEDIN_CLIENT_ID/SECRET ne sont pas renseignés (voir .env.example)
router.get("/google", googleRedirect);
router.get("/google/callback", googleCallback);
router.get("/linkedin", linkedinRedirect);
router.get("/linkedin/callback", linkedinCallback);

module.exports = router;
