const User = require("../models/User");
const Connection = require("../models/Connection");
const Message = require("../models/Message");
const Notification = require("../models/Notification");
const { ROLES } = require("../models/User");

// Échappe les caractères spéciaux regex pour un usage sûr dans une recherche "contains".
const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// @desc    Statistiques globales de la plateforme (cartes de la vue d'ensemble admin)
// @route   GET /api/admin/stats
// @access  Private (admin)
const getOverview = async (req, res, next) => {
  try {
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    const [
      totalUsers,
      verifiedUsers,
      bannedUsers,
      adminUsers,
      newUsers7d,
      newUsers30d,
      usersByRole,
      totalConnections,
      acceptedConnections,
      pendingConnections,
      totalMessages,
    ] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ isVerified: true }),
      User.countDocuments({ isBanned: true }),
      User.countDocuments({ isAdmin: true }),
      User.countDocuments({ createdAt: { $gte: sevenDaysAgo } }),
      User.countDocuments({ createdAt: { $gte: thirtyDaysAgo } }),
      User.aggregate([{ $group: { _id: "$role", count: { $sum: 1 } } }]),
      Connection.countDocuments(),
      Connection.countDocuments({ status: "accepted" }),
      Connection.countDocuments({ status: "pending" }),
      Message.countDocuments(),
    ]);

    const roleCounts = ROLES.reduce((acc, role) => ({ ...acc, [role]: 0 }), {});
    usersByRole.forEach((r) => {
      if (r._id) roleCounts[r._id] = r.count;
    });

    res.json({
      success: true,
      stats: {
        totalUsers,
        verifiedUsers,
        bannedUsers,
        adminUsers,
        newUsers7d,
        newUsers30d,
        roleCounts,
        totalConnections,
        acceptedConnections,
        pendingConnections,
        totalMessages,
      },
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Liste paginée/filtrée des utilisateurs (recherche nom/email/entreprise)
// @route   GET /api/admin/users?search=&role=&verified=&banned=&admin=&page=&limit=
// @access  Private (admin)
const listUsersAdmin = async (req, res, next) => {
  try {
    const { search = "", role, verified, banned, admin, page = 1, limit = 20 } = req.query;
    const filter = {};
    if (role) filter.role = role;
    if (verified !== undefined) filter.isVerified = verified === "true";
    if (banned !== undefined) filter.isBanned = banned === "true";
    if (admin !== undefined) filter.isAdmin = admin === "true";
    if (search.trim()) {
      const re = new RegExp(escapeRegex(search.trim()), "i");
      filter.$or = [{ firstName: re }, { lastName: re }, { email: re }, { company: re }];
    }

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

// @desc    Détail d'un utilisateur (vue admin)
// @route   GET /api/admin/users/:id
// @access  Private (admin)
const getUserAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "Utilisateur introuvable" });
    }
    res.json({ success: true, user: user.toPublicProfile() });
  } catch (err) {
    next(err);
  }
};

const ADMIN_EDITABLE_FIELDS = ["isVerified", "isBanned", "isAdmin", "role"];

// @desc    Modère un utilisateur : vérifier / suspendre / promouvoir admin / changer de rôle
// @route   PATCH /api/admin/users/:id
// @access  Private (admin)
const updateUserAdmin = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Un admin ne peut pas se bannir ou se retirer ses propres droits admin
    // (évite de se retrouver bloqué hors du CMS sans autre admin pour l'aider).
    if (String(id) === String(req.user._id)) {
      const touchesSelfSensitive = ["isBanned", "isAdmin"].some((f) => req.body[f] !== undefined);
      if (touchesSelfSensitive) {
        return res.status(400).json({ success: false, message: "Action impossible sur votre propre compte" });
      }
    }

    const updates = {};
    ADMIN_EDITABLE_FIELDS.forEach((field) => {
      if (req.body[field] !== undefined) updates[field] = req.body[field];
    });
    if (updates.role && !ROLES.includes(updates.role)) {
      return res.status(400).json({ success: false, message: "Rôle invalide" });
    }

    const user = await User.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
    if (!user) {
      return res.status(404).json({ success: false, message: "Utilisateur introuvable" });
    }
    res.json({ success: true, user: user.toPublicProfile() });
  } catch (err) {
    next(err);
  }
};

// @desc    Supprime un utilisateur et nettoie ses données liées (connexions, messages, notifications, favoris)
// @route   DELETE /api/admin/users/:id
// @access  Private (admin)
const deleteUserAdmin = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (String(id) === String(req.user._id)) {
      return res.status(400).json({ success: false, message: "Action impossible sur votre propre compte" });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ success: false, message: "Utilisateur introuvable" });
    }

    await Promise.all([
      User.updateMany({ favorites: id }, { $pull: { favorites: id } }),
      Connection.deleteMany({ $or: [{ requester: id }, { recipient: id }] }),
      Message.deleteMany({ $or: [{ sender: id }, { recipient: id }] }),
      Notification.deleteMany({ $or: [{ user: id }, { relatedUser: id }] }),
      user.deleteOne(),
    ]);

    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};

// @desc    Liste paginée/filtrée des connexions (matchs) pour modération
// @route   GET /api/admin/connections?status=&page=&limit=
// @access  Private (admin)
const listConnectionsAdmin = async (req, res, next) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const filter = {};
    if (status) filter.status = status;

    const skip = (Number(page) - 1) * Number(limit);
    const [connections, total] = await Promise.all([
      Connection.find(filter)
        .skip(skip)
        .limit(Number(limit))
        .sort({ createdAt: -1 })
        .populate("requester", "firstName lastName email company role avatarUrl")
        .populate("recipient", "firstName lastName email company role avatarUrl"),
      Connection.countDocuments(filter),
    ]);

    res.json({
      success: true,
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
      connections,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Supprime une connexion (match)
// @route   DELETE /api/admin/connections/:id
// @access  Private (admin)
const deleteConnectionAdmin = async (req, res, next) => {
  try {
    const connection = await Connection.findByIdAndDelete(req.params.id);
    if (!connection) {
      return res.status(404).json({ success: false, message: "Connexion introuvable" });
    }
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};

// @desc    Liste paginée/filtrée des messages pour modération
// @route   GET /api/admin/messages?search=&page=&limit=
// @access  Private (admin)
const listMessagesAdmin = async (req, res, next) => {
  try {
    const { search = "", page = 1, limit = 30 } = req.query;
    const filter = {};
    if (search.trim()) {
      filter.content = new RegExp(escapeRegex(search.trim()), "i");
    }

    const skip = (Number(page) - 1) * Number(limit);
    const [messages, total] = await Promise.all([
      Message.find(filter)
        .skip(skip)
        .limit(Number(limit))
        .sort({ createdAt: -1 })
        .populate("sender", "firstName lastName email company avatarUrl")
        .populate("recipient", "firstName lastName email company avatarUrl"),
      Message.countDocuments(filter),
    ]);

    res.json({
      success: true,
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
      messages,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Supprime un message
// @route   DELETE /api/admin/messages/:id
// @access  Private (admin)
const deleteMessageAdmin = async (req, res, next) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);
    if (!message) {
      return res.status(404).json({ success: false, message: "Message introuvable" });
    }
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getOverview,
  listUsersAdmin,
  getUserAdmin,
  updateUserAdmin,
  deleteUserAdmin,
  listConnectionsAdmin,
  deleteConnectionAdmin,
  listMessagesAdmin,
  deleteMessageAdmin,
};
