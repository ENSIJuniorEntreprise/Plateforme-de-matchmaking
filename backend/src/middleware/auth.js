const jwt = require("jsonwebtoken");
const User = require("../models/User");

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

module.exports = { protect, restrictTo };
