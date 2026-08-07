const express = require("express");
const {
  getStats,
  getRecentMatches,
  getNotifications,
  markNotificationRead,
  markAllNotificationsRead,
} = require("../controllers/dashboardController");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.use(protect);

router.get("/stats", getStats);
router.get("/recent-matches", getRecentMatches);
router.get("/notifications", getNotifications);
router.patch("/notifications/read-all", markAllNotificationsRead);
router.patch("/notifications/:id/read", markNotificationRead);

module.exports = router;
