const express = require("express");
const { body } = require("express-validator");
const {
  searchMatches,
  sendConnectionRequest,
  respondToConnection,
  getMyConnections,
} = require("../controllers/matchController");
const { protect } = require("../middleware/auth");
const { validate } = require("../middleware/validate");
const { ROLES, STAGES, BUDGET_RANGES } = require("../models/User");

const router = express.Router();

router.use(protect);

const searchMatchesRules = [
  body("profileType").optional({ checkFalsy: true }).isIn(ROLES),
  body("stage").optional({ checkFalsy: true }).isIn(STAGES),
  body("budgetRange").optional({ checkFalsy: true }).isIn(BUDGET_RANGES),
  body("sectors").optional().isArray({ max: 30 }),
  body("location").optional().isString().isLength({ max: 120 }),
  body("query").optional().isString().isLength({ max: 200 }),
  body("sortBy").optional().isIn(["compatibilite", "proximite", "budget"]),
  body("page").optional().isInt({ min: 1, max: 1000 }).toInt(),
  body("limit").optional().isInt({ min: 1, max: 100 }).toInt(),
];

router.post("/search", searchMatchesRules, validate, searchMatches);
router.post("/connect/:userId", sendConnectionRequest);
router.patch("/connections/:id", respondToConnection);
router.get("/connections", getMyConnections);

module.exports = router;
