const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    type: {
      type: String,
      enum: ["match", "message", "profile_view", "system"],
      required: true,
    },
    title: { type: String, required: true },
    detail: { type: String, default: "" },
    icon: { type: String, default: "🔔" },
    relatedUser: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    read: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notification", notificationSchema);
