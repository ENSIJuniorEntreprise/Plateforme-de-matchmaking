const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const User = require("../models/User");
const { signToken } = require("../utils/token");
const { PROVIDERS, isConfigured } = require("../config/oauth");

const clientUrl = () => process.env.CLIENT_URL || "http://localhost:5173";

// "state" anti-CSRF autoporté (JWT signé) : pas besoin de session/cookie côté serveur,
// cohérent avec le reste de l'auth qui est 100% stateless.
function createState(provider) {
  return jwt.sign(
    { provider, nonce: crypto.randomBytes(8).toString("hex") },
    process.env.JWT_SECRET,
    { expiresIn: "10m" }
  );
}

function verifyState(state, provider) {
  const payload = jwt.verify(state, process.env.JWT_SECRET);
  if (payload.provider !== provider) throw new Error("state invalide");
}

// @desc    Démarre le flux OAuth (redirige vers l'écran de consentement du provider)
// @route   GET /api/auth/google | /api/auth/linkedin
// @access  Public
function redirectToProvider(provider) {
  return (req, res) => {
    if (!isConfigured(provider)) {
      return res.redirect(`${clientUrl()}/?oauth_error=${provider}_not_configured`);
    }
    const cfg = PROVIDERS[provider];
    const params = new URLSearchParams({
      response_type: "code",
      client_id: cfg.clientId,
      redirect_uri: cfg.callbackUrl,
      scope: cfg.scope,
      state: createState(provider),
    });
    res.redirect(`${cfg.authUrl}?${params.toString()}`);
  };
}

async function exchangeCodeForProfile(provider, code) {
  const cfg = PROVIDERS[provider];

  const tokenRes = await fetch(cfg.tokenUrl, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: cfg.callbackUrl,
      client_id: cfg.clientId,
      client_secret: cfg.clientSecret,
    }),
  });
  const tokenData = await tokenRes.json();
  if (!tokenRes.ok || !tokenData.access_token) {
    throw new Error(tokenData.error_description || "Échec de l'échange du code OAuth");
  }

  const profileRes = await fetch(cfg.userInfoUrl, {
    headers: { Authorization: `Bearer ${tokenData.access_token}` },
  });
  const profile = await profileRes.json();
  if (!profileRes.ok || !profile.email) {
    throw new Error("Impossible de récupérer le profil OAuth");
  }
  return profile;
}

// Associe le compte OAuth à un utilisateur existant (même email) ou en crée un nouveau.
// Rôle par défaut "talent" : le flux OAuth ne collecte pas le rôle (contrairement à
// l'inscription classique en 4 étapes), l'utilisateur peut l'ajuster ensuite.
async function findOrCreateOAuthUser(profile) {
  const email = profile.email.toLowerCase();
  const existing = await User.findOne({ email });
  if (existing) return existing;

  return User.create({
    role: "talent",
    firstName: profile.given_name || profile.name?.split(" ")[0] || "Utilisateur",
    lastName: profile.family_name || profile.name?.split(" ").slice(1).join(" ") || "MatchHub",
    email,
    password: crypto.randomBytes(32).toString("hex"), // compte OAuth : jamais utilisé pour une connexion locale
    avatarUrl: profile.picture || null,
    isVerified: Boolean(profile.email_verified),
  });
}

// @desc    Callback OAuth : échange le code, (re)trouve l'utilisateur, émet un JWT MatchHub
// @route   GET /api/auth/google/callback | /api/auth/linkedin/callback
// @access  Public
function oauthCallback(provider) {
  return async (req, res) => {
    try {
      const { code, state, error: providerError } = req.query;
      if (providerError) {
        return res.redirect(`${clientUrl()}/?oauth_error=oauth_failed`);
      }
      if (!isConfigured(provider)) {
        return res.redirect(`${clientUrl()}/?oauth_error=${provider}_not_configured`);
      }
      verifyState(state, provider);

      const profile = await exchangeCodeForProfile(provider, code);
      const user = await findOrCreateOAuthUser(profile);
      const token = signToken(user._id);

      res.redirect(`${clientUrl()}/?oauth_token=${token}`);
    } catch {
      res.redirect(`${clientUrl()}/?oauth_error=oauth_failed`);
    }
  };
}

module.exports = {
  googleRedirect: redirectToProvider("google"),
  googleCallback: oauthCallback("google"),
  linkedinRedirect: redirectToProvider("linkedin"),
  linkedinCallback: oauthCallback("linkedin"),
};
