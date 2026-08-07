const Message = require("../models/Message");
const Notification = require("../models/Notification");
const mongoose = require("mongoose");

// @desc    Liste des conversations de l'utilisateur (dernier message par contact)
// @route   GET /api/messages/conversations
// @access  Private
const getConversations = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const conversations = await Message.aggregate([
      { $match: { $or: [{ sender: userId }, { recipient: userId }] } },
      { $sort: { createdAt: -1 } },
      {
        $group: {
          _id: {
            $cond: [{ $eq: ["$sender", userId] }, "$recipient", "$sender"],
          },
          lastMessage: { $first: "$$ROOT" },
          unreadCount: {
            $sum: {
              $cond: [{ $and: [{ $eq: ["$recipient", userId] }, { $eq: ["$read", false] }] }, 1, 0],
            },
          },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "contact",
        },
      },
      { $unwind: "$contact" },
      { $sort: { "lastMessage.createdAt": -1 } },
      {
        $project: {
          _id: 0,
          contactId: "$_id",
          firstName: "$contact.firstName",
          lastName: "$contact.lastName",
          company: "$contact.company",
          avatarUrl: "$contact.avatarUrl",
          role: "$contact.role",
          lastMessage: "$lastMessage.content",
          lastMessageAt: "$lastMessage.createdAt",
          unreadCount: 1,
        },
      },
    ]);

    res.json({ success: true, conversations });
  } catch (err) {
    next(err);
  }
};

// @desc    Historique des messages avec un utilisateur donné
// @route   GET /api/messages/:userId
// @access  Private
const getMessagesWith = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const messages = await Message.find({
      $or: [
        { sender: req.user._id, recipient: userId },
        { sender: userId, recipient: req.user._id },
      ],
    }).sort({ createdAt: 1 });

    // Marque comme lus les messages reçus dans cette conversation
    await Message.updateMany(
      { sender: userId, recipient: req.user._id, read: false },
      { read: true }
    );

    res.json({ success: true, messages });
  } catch (err) {
    next(err);
  }
};

// @desc    Envoyer un message
// @route   POST /api/messages/:userId
// @access  Private
const sendMessage = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { content } = req.body;

    if (!content || !content.trim()) {
      return res.status(400).json({ success: false, message: "Le message ne peut pas être vide" });
    }
    if (!mongoose.isValidObjectId(userId)) {
      return res.status(400).json({ success: false, message: "Destinataire invalide" });
    }

    const message = await Message.create({
      sender: req.user._id,
      recipient: userId,
      content: content.trim(),
    });

    await Notification.create({
      user: userId,
      type: "message",
      title: "Message reçu",
      detail: `${req.user.fullName || req.user.firstName} vous a envoyé un message : « ${content.trim().slice(0, 80)} »`,
      icon: "💬",
      relatedUser: req.user._id,
    });

    res.status(201).json({ success: true, message });
  } catch (err) {
    next(err);
  }
};

module.exports = { getConversations, getMessagesWith, sendMessage };
