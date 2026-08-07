const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const rateLimit = require("express-rate-limit");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const matchRoutes = require("./routes/matchRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const messageRoutes = require("./routes/messageRoutes");
const { notFound, errorHandler } = require("./middleware/errorHandler");

const app = express();

// ── Middlewares globaux ──────────────────────────────────────────────
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

// Limite le nombre de requêtes pour prévenir les abus (login/register notamment)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use("/api/auth", authLimiter);

// Fichiers statiques (CVs, avatars uploadés)
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

// ── Routes API ────────────────────────────────────────────────────────
app.get("/api/health", (req, res) => res.json({ success: true, message: "API MatchHub opérationnelle" }));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/matches", matchRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/messages", messageRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
