const Connection = require("../models/Connection");
const Message = require("../models/Message");
const Notification = require("../models/Notification");
const User = require("../models/User");
const { computeCompatibility } = require("../utils/compatibility");

// @desc    Statistiques du tableau de bord (cartes Matchs / Vues / Messages / Score)
// @route   GET /api/dashboard/stats
// @access  Private
const getStats = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const [matchesCount, messagesCount, connections] = await Promise.all([
      Connection.countDocuments({
        $or: [{ requester: userId }, { recipient: userId }],
        status: "accepted",
      }),
      Message.countDocuments({ recipient: userId, read: false }),
      Connection.find({
        $or: [{ requester: userId }, { recipient: userId }],
        status: "accepted",
      }),
    ]);

    const avgScore = connections.length
      ? Math.round(connections.reduce((sum, c) => sum + c.compatibilityScore, 0) / connections.length)
      : 0;

    res.json({
      success: true,
      stats: {
        matches: matchesCount,
        profileViews: req.user.profileViews,
        unreadMessages: messagesCount,
        averageScore: avgScore,
      },
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Matchs récents (les N derniers profils avec meilleur score)
// @route   GET /api/dashboard/recent-matches
// @access  Private
const getRecentMatches = async (req, res, next) => {
  try {
    const limit = Number(req.query.limit) || 5;

    const connections = await Connection.find({
      $or: [{ requester: req.user._id }, { recipient: req.user._id }],
      status: "accepted",
    })
      .sort({ compatibilityScore: -1 })
      .limit(limit)
      .populate("requester", "firstName lastName company role avatarUrl")
      .populate("recipient", "firstName lastName company role avatarUrl");

    const matches = connections.map((c) => {
      const other =
        String(c.requester._id) === String(req.user._id) ? c.recipient : c.requester;
      return {
        id: other._id,
        name: other.company || `${other.firstName} ${other.lastName}`,
        role: other.role,
        avatarUrl: other.avatarUrl,
        match: c.compatibilityScore,
      };
    });

    res.json({ success: true, matches });
  } catch (err) {
    next(err);
  }
};

// @desc    Notifications de l'utilisateur connecté
// @route   GET /api/dashboard/notifications
// @access  Private
const getNotifications = async (req, res, next) => {
  try {
    const notifications = await Notification.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .limit(50)
      .populate("relatedUser", "firstName lastName company avatarUrl");

    res.json({ success: true, notifications });
  } catch (err) {
    next(err);
  }
};

// @desc    Marquer une notification comme lue
// @route   PATCH /api/dashboard/notifications/:id/read
// @access  Private
const markNotificationRead = async (req, res, next) => {
  try {
    const notif = await Notification.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { read: true },
      { new: true }
    );
    if (!notif) return res.status(404).json({ success: false, message: "Notification introuvable" });
    res.json({ success: true, notification: notif });
  } catch (err) {
    next(err);
  }
};

// @desc    Marquer toutes les notifications comme lues
// @route   PATCH /api/dashboard/notifications/read-all
// @access  Private
const markAllNotificationsRead = async (req, res, next) => {
  try {
    await Notification.updateMany({ user: req.user._id, read: false }, { read: true });
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getStats,
  getRecentMatches,
  getNotifications,
  markNotificationRead,
  markAllNotificationsRead,
};
