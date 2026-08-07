const express = require("express");
const { getConversations, getMessagesWith, sendMessage } = require("../controllers/messageController");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.use(protect);

router.get("/conversations", getConversations);
router.get("/:userId", getMessagesWith);
router.post("/:userId", sendMessage);

module.exports = router;
