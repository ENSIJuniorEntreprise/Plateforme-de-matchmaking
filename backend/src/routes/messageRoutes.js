const express = require("express");
const { body } = require("express-validator");
const { getConversations, getMessagesWith, sendMessage } = require("../controllers/messageController");
const { protect } = require("../middleware/auth");
const { validate } = require("../middleware/validate");

const router = express.Router();

router.use(protect);

const sendMessageRules = [
  body("content").trim().isLength({ min: 1, max: 4000 }).withMessage("Message vide ou trop long (max 4000 caractères)"),
];

router.get("/conversations", getConversations);
router.get("/:userId", getMessagesWith);
router.post("/:userId", sendMessageRules, validate, sendMessage);

module.exports = router;
