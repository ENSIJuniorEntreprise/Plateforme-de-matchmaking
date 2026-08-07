require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Serveur MatchHub démarré sur le port ${PORT} (${process.env.NODE_ENV || "development"})`);
  });
});

process.on("unhandledRejection", (err) => {
  console.error(`Erreur non gérée: ${err.message}`);
  process.exit(1);
});
