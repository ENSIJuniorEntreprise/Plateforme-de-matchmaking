const express = require("express");
const { body } = require("express-validator");
const { register, login, getMe, forgotPassword, resetPassword } = require("../controllers/authController");
const {
  googleRedirect,
  googleCallback,
  linkedinRedirect,
  linkedinCallback,
} = require("../controllers/oauthController");
const { protect } = require("../middleware/auth");
const { validate } = require("../middleware/validate");
const { uploadCV } = require("../middleware/upload");
const { ROLES, STAGES, BUDGET_RANGES } = require("../models/User");

const router = express.Router();

const registerRules = [
  body("role").isIn(ROLES).withMessage("Rôle invalide ou manquant"),
  body("Nom").trim().notEmpty().withMessage("Nom requis"),
  body("Prenom").trim().notEmpty().withMessage("Prénom requis"),
  body("Email").isEmail().withMessage("Email invalide").normalizeEmail(),
  body("Mot_de_passe").isLength({ min: 6 }).withMessage("Le mot de passe doit contenir au moins 6 caractères"),
  body("Lien").optional({ checkFalsy: true }).isURL().withMessage("Lien invalide"),
  body("stage").optional({ checkFalsy: true }).isIn(STAGES).withMessage("Stage invalide"),
  body("budgetRange").optional({ checkFalsy: true }).isIn(BUDGET_RANGES).withMessage("Budget invalide"),
];

// "CV" correspond au champ input file de step2.jsx (optionnel selon le rôle)
router.post("/register", uploadCV.single("CV"), registerRules, validate, register);
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
