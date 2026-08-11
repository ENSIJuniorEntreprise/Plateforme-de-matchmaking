// Configuration des providers OAuth "Sign in with..." (Google, LinkedIn OpenID Connect).
// Tant que les variables d'env correspondantes ne sont pas renseignées, isConfigured()
// renvoie false et les routes redirigent proprement vers le frontend avec une erreur
// au lieu de tenter un appel qui échouerait avec des identifiants vides.

const PROVIDERS = {
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackUrl: process.env.GOOGLE_CALLBACK_URL,
    authUrl: "https://accounts.google.com/o/oauth2/v2/auth",
    tokenUrl: "https://oauth2.googleapis.com/token",
    userInfoUrl: "https://www.googleapis.com/oauth2/v3/userinfo",
    scope: "openid email profile",
  },
  linkedin: {
    // "Sign In with LinkedIn using OpenID Connect" (produit à activer sur l'app LinkedIn Developer)
    clientId: process.env.LINKEDIN_CLIENT_ID,
    clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
    callbackUrl: process.env.LINKEDIN_CALLBACK_URL,
    authUrl: "https://www.linkedin.com/oauth/v2/authorization",
    tokenUrl: "https://www.linkedin.com/oauth/v2/accessToken",
    userInfoUrl: "https://api.linkedin.com/v2/userinfo",
    scope: "openid profile email",
  },
};

const isConfigured = (provider) => {
  const cfg = PROVIDERS[provider];
  return Boolean(cfg?.clientId && cfg?.clientSecret && cfg?.callbackUrl);
};

module.exports = { PROVIDERS, isConfigured };
