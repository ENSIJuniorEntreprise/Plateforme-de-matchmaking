const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const matchRoutes = require("./routes/matchRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const messageRoutes = require("./routes/messageRoutes");
const adminRoutes = require("./routes/adminRoutes");
const { notFound, errorHandler } = require("./middleware/errorHandler");
const { authLimiter, apiLimiter } = require("./middleware/rateLimiters");

const app = express();

// ── Middlewares globaux ──────────────────────────────────────────────
app.use(helmet());

// En production, un CLIENT_URL manquant ne doit jamais retomber silencieusement
// sur une origine ouverte ("*") alors que credentials:true est actif.
if (!process.env.CLIENT_URL && process.env.NODE_ENV === "production") {
  throw new Error("CLIENT_URL doit être défini en production (CORS ne peut pas retomber sur '*' avec credentials).");
}
app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== "test") {
  app.use(morgan(process.env.NODE_ENV === "development" ? "dev" : "combined"));
}

// Limite le nombre de requêtes pour prévenir les abus.
// /api/auth (force brute login/register) reste sur un seuil plus strict que le reste de l'API.
app.use("/api/auth", authLimiter);
app.use("/api/matches", apiLimiter);
app.use("/api/messages", apiLimiter);
app.use("/api/users", apiLimiter);
app.use("/api/admin", apiLimiter);

// Fichiers statiques (CVs, avatars uploadés)
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

// ── Routes API ────────────────────────────────────────────────────────
app.get("/api/health", (req, res) => res.json({ success: true, message: "API MatchHub opérationnelle" }));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/matches", matchRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/admin", adminRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
