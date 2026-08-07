const express = require("express");
const {
  searchMatches,
  sendConnectionRequest,
  respondToConnection,
  getMyConnections,
} = require("../controllers/matchController");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.use(protect);

router.post("/search", searchMatches);
router.post("/connect/:userId", sendConnectionRequest);
router.patch("/connections/:id", respondToConnection);
router.get("/connections", getMyConnections);

module.exports = router;
