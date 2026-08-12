const { validationResult } = require("express-validator");

// À placer après une liste de chaînes express-validator : renvoie 400 avec le détail
// des erreurs si la validation échoue, sinon laisse passer vers le controller.
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Requête invalide",
      errors: errors.array().map((e) => ({ field: e.path, message: e.msg })),
    });
  }
  next();
};

module.exports = { validate };
