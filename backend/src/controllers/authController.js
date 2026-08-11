const crypto = require("crypto");
const User = require("../models/User");
const { ROLES } = require("../models/User");
const { signToken } = require("../utils/token");

const sendAuthResponse = (user, statusCode, res) => {
  const token = signToken(user._id);
  res.status(statusCode).json({
    success: true,
    token,
    user: user.toPublicProfile(),
  });
};

// @desc    Inscription (correspond aux 4 étapes du frontend : step1 à step4)
// @route   POST /api/auth/register
// @access  Public
const register = async (req, res, next) => {
  try {
    const {
      role,
      Nom,
      Prenom,
      Email,
      Mot_de_passe,
      Entreprise,
      Localisation,
      Lien,
      Description,
      interests,
      stage,
      budgetRange,
    } = req.body;

    if (!role || !ROLES.includes(role)) {
      return res.status(400).json({ success: false, message: "Rôle invalide ou manquant" });
    }
    if (!Nom || !Prenom || !Email || !Mot_de_passe) {
      return res.status(400).json({ success: false, message: "Champs obligatoires manquants" });
    }

    const existing = await User.findOne({ email: Email.toLowerCase() });
    if (existing) {
      return res.status(409).json({ success: false, message: "Un compte existe déjà avec cet email" });
    }

    const parsedInterests =
      typeof interests === "string" ? JSON.parse(interests) : interests || [];

    const user = await User.create({
      role,
      lastName: Nom,
      firstName: Prenom,
      email: Email.toLowerCase(),
      password: Mot_de_passe,
      company: Entreprise || "",
      location: Localisation || "",
      link: Lien || "",
      description: Description || "",
      interests: parsedInterests,
      stage: stage || "",
      budgetRange: budgetRange || "",
      cvUrl: req.file ? `/uploads/cv/${req.file.filename}` : null,
    });

    sendAuthResponse(user, 201, res);
  } catch (err) {
    next(err);
  }
};

// @desc    Connexion
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email et mot de passe requis" });
    }

    const user = await User.findOne({ email: email.toLowerCase() }).select("+password");
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ success: false, message: "Email ou mot de passe incorrect" });
    }

    sendAuthResponse(user, 200, res);
  } catch (err) {
    next(err);
  }
};

// @desc    Récupérer l'utilisateur connecté
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res, next) => {
  try {
    res.json({ success: true, user: req.user.toPublicProfile() });
  } catch (err) {
    next(err);
  }
};

// @desc    Demande de réinitialisation de mot de passe
// @route   POST /api/auth/forgot-password
// @access  Public
const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: (email || "").toLowerCase() });

    // Réponse identique que l'utilisateur existe ou non (sécurité)
    if (!user) {
      return res.json({
        success: true,
        message: "Si ce compte existe, un email de réinitialisation a été envoyé.",
      });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    user.resetPasswordExpire = Date.now() + 30 * 60 * 1000; // 30 min
    await user.save({ validateBeforeSave: false });

    // NOTE: brancher ici un service d'envoi d'email (Nodemailer, SendGrid, etc.)
    // pour envoyer resetToken à l'utilisateur par email.

    res.json({
      success: true,
      message: "Si ce compte existe, un email de réinitialisation a été envoyé.",
      // resetToken renvoyé uniquement en développement pour faciliter les tests
      ...(process.env.NODE_ENV === "development" && { resetToken }),
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Réinitialiser le mot de passe
// @route   POST /api/auth/reset-password/:token
// @access  Public
const resetPassword = async (req, res, next) => {
  try {
    const hashedToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() },
    }).select("+resetPasswordToken +resetPasswordExpire");

    if (!user) {
      return res.status(400).json({ success: false, message: "Token invalide ou expiré" });
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    sendAuthResponse(user, 200, res);
  } catch (err) {
    next(err);
  }
};

module.exports = { register, login, getMe, forgotPassword, resetPassword };
