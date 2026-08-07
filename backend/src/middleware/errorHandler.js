const notFound = (req, res, next) => {
  res.status(404).json({ success: false, message: `Route non trouvée: ${req.originalUrl}` });
};

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  let statusCode = err.statusCode || 500;
  let message = err.message || "Erreur serveur";

  // Mongoose - id invalide
  if (err.name === "CastError") {
    statusCode = 400;
    message = "Identifiant invalide";
  }

  // Mongoose - validation
  if (err.name === "ValidationError") {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((e) => e.message)
      .join(", ");
  }

  // Mongoose - clé dupliquée
  if (err.code === 11000) {
    statusCode = 409;
    const field = Object.keys(err.keyValue || {})[0];
    message = `La valeur pour "${field}" existe déjà`;
  }

  res.status(statusCode).json({
    success: false,
    message,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};

module.exports = { notFound, errorHandler };
