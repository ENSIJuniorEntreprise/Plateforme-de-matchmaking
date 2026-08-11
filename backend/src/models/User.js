const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const ROLES = ["startup", "talent", "investisseur", "incubateur"];
const STAGES = ["Pre-seed", "Seed", "Serie A", "Serie B", "Croissance"];
const BUDGET_RANGES = ["0-10M DT", "10M-50M DT", "50M-100M DT", "100M+ DT"];

const accomplishmentSchema = new mongoose.Schema(
  {
    icon: { type: String, default: "🏆" },
    label: { type: String, required: true },
  },
  { _id: false }
);

const skillSchema = new mongoose.Schema(
  {
    label: { type: String, required: true },
    value: { type: Number, min: 0, max: 100, default: 50 },
  },
  { _id: false }
);

const timelineSchema = new mongoose.Schema(
  {
    date: { type: String, required: true },
    title: { type: String, required: true },
    desc: { type: String, default: "" },
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    role: { type: String, enum: ROLES, required: true },

    // Étape 2 - informations personnelles
    firstName: { type: String, required: true, trim: true }, // Prenom
    lastName: { type: String, required: true, trim: true }, // Nom
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Email invalide"],
    },
    password: { type: String, required: true, minlength: 6, select: false },
    cvUrl: { type: String, default: null },
    avatarUrl: { type: String, default: null },

    // Étape 3 - organisation
    company: { type: String, default: "" }, // Entreprise
    location: { type: String, default: "" }, // Localisation
    link: { type: String, default: "" }, // Lien site web / LinkedIn
    description: { type: String, default: "" },

    // Étape 4 - centres d'intérêt / secteurs
    interests: [{ type: String }],

    // Champs spécifiques par rôle (utilisés côté Matchmaking)
    stage: { type: String, enum: [...STAGES, ""], default: "" }, // pour startup
    budgetRange: { type: String, enum: [...BUDGET_RANGES, ""], default: "" }, // pour investisseur

    // Contenu du profil public (page Profile.jsx)
    tagline: { type: String, default: "" },
    founded: { type: String, default: "" },
    size: { type: String, default: "" },
    tags: [{ type: String }],
    accomplishments: [accomplishmentSchema],
    about: [{ type: String }],
    skills: [skillSchema],
    parcours: [timelineSchema],

    profileViews: { type: Number, default: 0 },
    isVerified: { type: Boolean, default: false },
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

    // Auth utils
    resetPasswordToken: { type: String, select: false },
    resetPasswordExpire: { type: Date, select: false },
  },
  { timestamps: true }
);

userSchema.index({ role: 1 });
userSchema.index({ interests: 1 });
userSchema.index({ location: 1 });

userSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`.trim();
});

userSchema.set("toJSON", { virtuals: true });

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = function (candidate) {
  return bcrypt.compare(candidate, this.password);
};

userSchema.methods.toPublicProfile = function () {
  const obj = this.toObject();
  delete obj.password;
  delete obj.resetPasswordToken;
  delete obj.resetPasswordExpire;
  return obj;
};

module.exports = mongoose.model("User", userSchema);
module.exports.ROLES = ROLES;
module.exports.STAGES = STAGES;
module.exports.BUDGET_RANGES = BUDGET_RANGES;
