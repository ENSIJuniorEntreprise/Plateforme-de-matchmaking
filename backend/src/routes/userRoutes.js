const express = require("express");
const { body } = require("express-validator");
const {
  getUserById,
  updateMe,
  uploadCv,
  uploadAvatar,
  listUsers,
  addFavorite,
  removeFavorite,
  getFavorites,
  verifyUser,
} = require("../controllers/userController");
const { protect, requireAdmin } = require("../middleware/auth");
const { validate } = require("../middleware/validate");
const { uploadCV, uploadAvatar: uploadAvatarMw } = require("../middleware/upload");
const { STAGES, BUDGET_RANGES } = require("../models/User");

const router = express.Router();

// Bornes anti-abus : ces champs sont éditables librement par l'utilisateur et n'avaient
// jusqu'ici aucune validation, ouvrant la voie à un stockage de payloads arbitrairement volumineux.
const updateMeRules = [
  body("firstName").optional().trim().isLength({ min: 1, max: 80 }),
  body("lastName").optional().trim().isLength({ min: 1, max: 80 }),
  body("company").optional().trim().isLength({ max: 120 }),
  body("location").optional().trim().isLength({ max: 120 }),
  body("link").optional({ checkFalsy: true }).isURL().withMessage("Lien invalide"),
  body("description").optional().trim().isLength({ max: 2000 }),
  body("tagline").optional().trim().isLength({ max: 200 }),
  body("founded").optional().trim().isLength({ max: 20 }),
  body("size").optional().trim().isLength({ max: 40 }),
  body("stage").optional({ checkFalsy: true }).isIn(STAGES).withMessage("Stage invalide"),
  body("budgetRange").optional({ checkFalsy: true }).isIn(BUDGET_RANGES).withMessage("Budget invalide"),
  body("interests").optional().isArray({ max: 30 }).withMessage("Trop d'intérêts (max 30)"),
  body("tags").optional().isArray({ max: 30 }).withMessage("Trop de tags (max 30)"),
  body("about").optional().isArray({ max: 20 }).withMessage("Section 'about' trop longue (max 20)"),
  body("skills").optional().isArray({ max: 30 }).withMessage("Trop de compétences (max 30)"),
  body("parcours").optional().isArray({ max: 30 }).withMessage("Parcours trop long (max 30 entrées)"),
  body("accomplishments").optional().isArray({ max: 30 }).withMessage("Trop de réalisations (max 30)"),
];

router.get("/", listUsers);
router.patch("/me", protect, updateMeRules, validate, updateMe);
router.post("/me/cv", protect, uploadCV.single("CV"), uploadCv);
router.post("/me/avatar", protect, uploadAvatarMw.single("avatar"), uploadAvatar);
router.get("/me/favorites", protect, getFavorites);
router.post("/me/favorites/:userId", protect, addFavorite);
router.delete("/me/favorites/:userId", protect, removeFavorite);
router.patch("/:id/verify", protect, requireAdmin, verifyUser);
router.get("/:id", getUserById);

module.exports = router;
