const express = require("express");
const {
  getUserById,
  updateMe,
  uploadCv,
  uploadAvatar,
  listUsers,
  addFavorite,
  removeFavorite,
  getFavorites,
} = require("../controllers/userController");
const { protect } = require("../middleware/auth");
const { uploadCV, uploadAvatar: uploadAvatarMw } = require("../middleware/upload");

const router = express.Router();

router.get("/", listUsers);
router.patch("/me", protect, updateMe);
router.post("/me/cv", protect, uploadCV.single("CV"), uploadCv);
router.post("/me/avatar", protect, uploadAvatarMw.single("avatar"), uploadAvatar);
router.get("/me/favorites", protect, getFavorites);
router.post("/me/favorites/:userId", protect, addFavorite);
router.delete("/me/favorites/:userId", protect, removeFavorite);
router.get("/:id", getUserById);

module.exports = router;
