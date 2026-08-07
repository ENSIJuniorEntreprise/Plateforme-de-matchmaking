const express = require("express");
const { getUserById, updateMe, uploadCv, uploadAvatar, listUsers } = require("../controllers/userController");
const { protect } = require("../middleware/auth");
const { uploadCV, uploadAvatar: uploadAvatarMw } = require("../middleware/upload");

const router = express.Router();

router.get("/", listUsers);
router.patch("/me", protect, updateMe);
router.post("/me/cv", protect, uploadCV.single("CV"), uploadCv);
router.post("/me/avatar", protect, uploadAvatarMw.single("avatar"), uploadAvatar);
router.get("/:id", getUserById);

module.exports = router;
