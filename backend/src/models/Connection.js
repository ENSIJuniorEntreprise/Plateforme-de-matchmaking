const mongoose = require("mongoose");

// Représente une mise en relation ("match") entre deux utilisateurs,
// initiée depuis la page Matchmaking (bouton "Contacter" / "Match").
const connectionSchema = new mongoose.Schema(
  {
    requester: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    recipient: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    status: {
      type: String,
      enum: ["pending", "accepted", "declined"],
      default: "pending",
    },
    compatibilityScore: { type: Number, min: 0, max: 100, default: 0 },
    message: { type: String, default: "" },
  },
  { timestamps: true }
);

connectionSchema.index({ requester: 1, recipient: 1 }, { unique: true });

module.exports = mongoose.model("Connection", connectionSchema);
