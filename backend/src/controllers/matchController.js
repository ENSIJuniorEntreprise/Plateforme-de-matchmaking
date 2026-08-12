const User = require("../models/User");
const Connection = require("../models/Connection");
const Notification = require("../models/Notification");
const { computeCompatibilityBreakdown } = require("../utils/compatibility");

// Échappe les métacaractères regex avant d'injecter une entrée utilisateur dans un `new RegExp()`,
// sinon une entrée comme "(a+)+$" atteint le moteur regex de Mongo tel quel (ReDoS / regex injection).
const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// @desc    Recherche de profils avec filtres (page Matchmaking.jsx)
// @route   POST /api/matches/search
// @access  Private
// body: { profileType, sectors: [], stage, location, budgetRange, query, sortBy }
const searchMatches = async (req, res, next) => {
  try {
    const {
      profileType,
      sectors = [],
      stage,
      location,
      budgetRange,
      query,
      sortBy = "compatibilite", // compatibilite | proximite | budget
      page = 1,
      limit = 20,
    } = req.body;

    const filter = { _id: { $ne: req.user._id } };

    if (profileType) filter.role = profileType;
    if (sectors.length) filter.interests = { $in: sectors };
    // `stage` n'a de sens que côté startup et `budgetRange` que côté investisseur/incubateur :
    // les appliquer au rôle recherché quand il ne porte pas ce champ (toujours vide) reviendrait
    // à garantir zéro résultat, ex. chercher des investisseurs avec un filtre `stage` renseigné.
    if (stage && profileType === "startup") filter.stage = stage;
    if (budgetRange && ["investisseur", "incubateur"].includes(profileType)) filter.budgetRange = budgetRange;
    if (location) {
      // Le frontend envoie plusieurs localisations jointes par "|" pour un OU logique
      // (ex: "Tunisia|MENA"). On échappe chaque terme séparément puis on rejoint avec "|"
      // pour garder l'alternance regex sans réintroduire l'injection.
      const alternatives = location
        .split("|")
        .map((part) => escapeRegex(part.trim()))
        .filter(Boolean);
      if (alternatives.length) filter.location = new RegExp(alternatives.join("|"), "i");
    }
    if (query) {
      const safeQuery = new RegExp(escapeRegex(query), "i");
      filter.$or = [
        { firstName: safeQuery },
        { lastName: safeQuery },
        { company: safeQuery },
        { description: safeQuery },
        { tags: safeQuery },
      ];
    }

    let candidates = await User.find(filter);

    let results = candidates.map((candidate) => {
      const breakdown = computeCompatibilityBreakdown(req.user, candidate);
      return {
        ...candidate.toPublicProfile(),
        compatibilityScore: breakdown.total,
        compatibilityBreakdown: breakdown,
      };
    });

    if (sortBy === "compatibilite") {
      results.sort((a, b) => b.compatibilityScore - a.compatibilityScore);
    } else if (sortBy === "proximite") {
      const sameLocation = (loc) =>
        loc?.toLowerCase() === req.user.location?.toLowerCase() ? 0 : 1;
      results.sort((a, b) => sameLocation(a.location) - sameLocation(b.location));
    } else if (sortBy === "budget") {
      const order = ["0-10M DT", "10M-50M DT", "50M-100M DT", "100M+ DT"];
      results.sort((a, b) => order.indexOf(b.budgetRange) - order.indexOf(a.budgetRange));
    }

    const start = (Number(page) - 1) * Number(limit);
    const paginated = results.slice(start, start + Number(limit));

    res.json({
      success: true,
      total: results.length,
      page: Number(page),
      pages: Math.ceil(results.length / Number(limit)),
      results: paginated,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Envoyer une demande de mise en relation ("Match" / "Contacter")
// @route   POST /api/matches/connect/:userId
// @access  Private
const sendConnectionRequest = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { message = "" } = req.body;

    if (userId === String(req.user._id)) {
      return res.status(400).json({ success: false, message: "Action impossible sur son propre profil" });
    }

    const recipient = await User.findById(userId);
    if (!recipient) {
      return res.status(404).json({ success: false, message: "Utilisateur introuvable" });
    }

    const existing = await Connection.findOne({ requester: req.user._id, recipient: userId });
    if (existing) {
      return res.status(409).json({ success: false, message: "Demande déjà envoyée", connection: existing });
    }

    const breakdown = computeCompatibilityBreakdown(req.user, recipient);

    const connection = await Connection.create({
      requester: req.user._id,
      recipient: userId,
      compatibilityScore: breakdown.total,
      message,
    });

    await Notification.create({
      user: userId,
      type: "match",
      title: "Nouveau match !",
      detail: `${req.user.fullName || req.user.firstName} souhaite se connecter avec vous (${breakdown.total}% de compatibilité).`,
      icon: "🎯",
      relatedUser: req.user._id,
    });

    res.status(201).json({ success: true, connection, compatibilityBreakdown: breakdown });
  } catch (err) {
    next(err);
  }
};

// @desc    Répondre à une demande de connexion (accepter / refuser)
// @route   PATCH /api/matches/connections/:id
// @access  Private
const respondToConnection = async (req, res, next) => {
  try {
    const { status } = req.body; // "accepted" | "declined"
    if (!["accepted", "declined"].includes(status)) {
      return res.status(400).json({ success: false, message: "Statut invalide" });
    }

    const connection = await Connection.findById(req.params.id);
    if (!connection) {
      return res.status(404).json({ success: false, message: "Demande introuvable" });
    }
    if (String(connection.recipient) !== String(req.user._id)) {
      return res.status(403).json({ success: false, message: "Action non autorisée" });
    }

    connection.status = status;
    await connection.save();

    if (status === "accepted") {
      await Notification.create({
        user: connection.requester,
        type: "match",
        title: "Match confirmé !",
        detail: `${req.user.fullName || req.user.firstName} a accepté votre demande de mise en relation.`,
        icon: "✅",
        relatedUser: req.user._id,
      });
    }

    res.json({ success: true, connection });
  } catch (err) {
    next(err);
  }
};

// @desc    Liste des connexions (matches) de l'utilisateur connecté
// @route   GET /api/matches/connections?status=
// @access  Private
const getMyConnections = async (req, res, next) => {
  try {
    const { status } = req.query;
    const filter = {
      $or: [{ requester: req.user._id }, { recipient: req.user._id }],
    };
    if (status) filter.status = status;

    const connections = await Connection.find(filter)
      .populate("requester", "firstName lastName company role avatarUrl")
      .populate("recipient", "firstName lastName company role avatarUrl")
      .sort({ createdAt: -1 });

    res.json({ success: true, connections });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  searchMatches,
  sendConnectionRequest,
  respondToConnection,
  getMyConnections,
};
