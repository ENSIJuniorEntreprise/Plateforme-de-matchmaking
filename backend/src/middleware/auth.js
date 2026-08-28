const jwt = require("jsonwebtoken");
const User = require("../models/User");

const isBootstrapAdminEmail = (email) => {
  const adminEmails = (process.env.ADMIN_EMAILS || "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  return adminEmails.includes(email.toLowerCase());
};

// Vérifie le token JWT et attache l'utilisateur à req.user
const protect = async (req, res, next) => {
  try {
    let token;
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ success: false, message: "Non autorisé, token manquant" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ success: false, message: "Utilisateur introuvable" });
    }

    if (user.isBanned) {
      return res.status(403).json({ success: false, message: "Ce compte a été suspendu" });
    }

    // Synchronise le flag isAdmin en base pour un compte listé dans ADMIN_EMAILS : sans ça,
    // req.user.isAdmin resterait false partout ailleurs (frontend, réponses API) alors que
    // requireAdmin lui donne déjà accès au CMS via le bootstrap email.
    if (!user.isAdmin && isBootstrapAdminEmail(user.email)) {
      user.isAdmin = true;
      await user.save({ validateBeforeSave: false });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "Non autorisé, token invalide" });
  }
};

// Restreint l'accès à certains rôles
const restrictTo = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ success: false, message: "Accès interdit pour ce rôle" });
  }
  next();
};

// Restreint l'accès aux administrateurs : soit le champ isAdmin en base (géré depuis le
// CMS admin), soit un email listé dans ADMIN_EMAILS (.env) qui sert de bootstrap pour
// promouvoir le tout premier admin sans accès direct à la base (voir aussi protect,
// qui synchronise isAdmin en base dès la première requête authentifiée).
const requireAdmin = (req, res, next) => {
  if (!req.user.isAdmin && !isBootstrapAdminEmail(req.user.email)) {
    return res.status(403).json({ success: false, message: "Accès réservé aux administrateurs" });
  }
  next();
};

module.exports = { protect, restrictTo, requireAdmin, isBootstrapAdminEmail };
