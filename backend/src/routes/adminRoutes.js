const express = require("express");
const { body } = require("express-validator");
const {
  getOverview,
  listUsersAdmin,
  getUserAdmin,
  updateUserAdmin,
  deleteUserAdmin,
  listConnectionsAdmin,
  deleteConnectionAdmin,
  listMessagesAdmin,
  deleteMessageAdmin,
} = require("../controllers/adminController");
const { protect, requireAdmin } = require("../middleware/auth");
const { validate } = require("../middleware/validate");
const { ROLES } = require("../models/User");

const router = express.Router();

// Toutes les routes admin exigent un utilisateur connecté ET administrateur.
router.use(protect, requireAdmin);

const updateUserRules = [
  body("isVerified").optional().isBoolean().withMessage("isVerified doit être un booléen"),
  body("isBanned").optional().isBoolean().withMessage("isBanned doit être un booléen"),
  body("isAdmin").optional().isBoolean().withMessage("isAdmin doit être un booléen"),
  body("role").optional().isIn(ROLES).withMessage("Rôle invalide"),
];

router.get("/stats", getOverview);

router.get("/users", listUsersAdmin);
router.get("/users/:id", getUserAdmin);
router.patch("/users/:id", updateUserRules, validate, updateUserAdmin);
router.delete("/users/:id", deleteUserAdmin);

router.get("/connections", listConnectionsAdmin);
router.delete("/connections/:id", deleteConnectionAdmin);

router.get("/messages", listMessagesAdmin);
router.delete("/messages/:id", deleteMessageAdmin);

module.exports = router;
