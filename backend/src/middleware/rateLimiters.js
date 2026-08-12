const rateLimit = require("express-rate-limit");

const makeLimiter = (max, windowMs = 15 * 60 * 1000) =>
  rateLimit({
    windowMs,
    max,
    standardHeaders: true,
    legacyHeaders: false,
  });

// Login/register — surface la plus sensible aux attaques par force brute.
const authLimiter = makeLimiter(100);

// Recherche de matchs, messagerie, annuaire — non protégées jusqu'ici,
// donc ouvertes au scraping/spam en masse.
const apiLimiter = makeLimiter(300);

module.exports = { authLimiter, apiLimiter };
