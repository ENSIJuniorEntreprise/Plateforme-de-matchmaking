const User = require("../models/User");

// @desc    Profil public d'un utilisateur (page Profile.jsx)
// @route   GET /api/users/:id
// @access  Public
const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "Utilisateur introuvable" });
    }

    // Incrémente les vues de profil si ce n'est pas le propriétaire qui consulte
    if (!req.user || String(req.user._id) !== String(user._id)) {
      user.profileViews += 1;
      await user.save({ validateBeforeSave: false });
    }

    res.json({ success: true, user: user.toPublicProfile() });
  } catch (err) {
    next(err);
  }
};

// @desc    Met à jour le profil de l'utilisateur connecté
// @route   PATCH /api/users/me
// @access  Private
const updateMe = async (req, res, next) => {
  try {
    const editable = [
      "firstName",
      "lastName",
      "company",
      "location",
      "link",
      "description",
      "interests",
      "stage",
      "budgetRange",
      "tagline",
      "founded",
      "size",
      "tags",
      "accomplishments",
      "about",
      "skills",
      "parcours",
    ];

    const updates = {};
    editable.forEach((field) => {
      if (req.body[field] !== undefined) updates[field] = req.body[field];
    });

    const user = await User.findByIdAndUpdate(req.user._id, updates, {
      new: true,
      runValidators: true,
    });

    res.json({ success: true, user: user.toPublicProfile() });
  } catch (err) {
    next(err);
  }
};

// @desc    Upload / remplace le CV
// @route   POST /api/users/me/cv
// @access  Private
const uploadCv = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "Aucun fichier reçu" });
    }
    req.user.cvUrl = `/uploads/cv/${req.file.filename}`;
    await req.user.save({ validateBeforeSave: false });
    res.json({ success: true, cvUrl: req.user.cvUrl });
  } catch (err) {
    next(err);
  }
};

// @desc    Upload / remplace l'avatar
// @route   POST /api/users/me/avatar
// @access  Private
const uploadAvatar = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "Aucun fichier reçu" });
    }
    req.user.avatarUrl = `/uploads/avatars/${req.file.filename}`;
    await req.user.save({ validateBeforeSave: false });
    res.json({ success: true, avatarUrl: req.user.avatarUrl });
  } catch (err) {
    next(err);
  }
};

// @desc    Liste paginée des utilisateurs (annuaire / admin)
// @route   GET /api/users?role=&page=&limit=
// @access  Public
const listUsers = async (req, res, next) => {
  try {
    const { role, page = 1, limit = 20 } = req.query;
    const filter = {};
    if (role) filter.role = role;

    const skip = (Number(page) - 1) * Number(limit);
    const [users, total] = await Promise.all([
      User.find(filter).skip(skip).limit(Number(limit)).sort({ createdAt: -1 }),
      User.countDocuments(filter),
    ]);

    res.json({
      success: true,
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
      users: users.map((u) => u.toPublicProfile()),
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Ajouter un utilisateur aux favoris
// @route   POST /api/users/me/favorites/:userId
// @access  Private
const addFavorite = async (req, res, next) => {
  try {
    const { userId } = req.params;
    if (userId === String(req.user._id)) {
      return res.status(400).json({ success: false, message: "Action impossible sur son propre profil" });
    }

    const target = await User.findById(userId);
    if (!target) {
      return res.status(404).json({ success: false, message: "Utilisateur introuvable" });
    }

    await User.findByIdAndUpdate(req.user._id, { $addToSet: { favorites: userId } });
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};

// @desc    Retirer un utilisateur des favoris
// @route   DELETE /api/users/me/favorites/:userId
// @access  Private
const removeFavorite = async (req, res, next) => {
  try {
    const { userId } = req.params;
    await User.findByIdAndUpdate(req.user._id, { $pull: { favorites: userId } });
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};

// @desc    Liste des profils favoris de l'utilisateur connecté (peuplés, pas juste les IDs)
// @route   GET /api/users/me/favorites
// @access  Private
const getFavorites = async (req, res, next) => {
  try {
    const me = await User.findById(req.user._id).populate("favorites");
    const favorites = (me.favorites || []).map((u) => u.toPublicProfile());
    res.json({ success: true, favorites });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getUserById,
  updateMe,
  uploadCv,
  uploadAvatar,
  listUsers,
  addFavorite,
  removeFavorite,
  getFavorites,
};
