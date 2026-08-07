// Matrice de complémentarité entre rôles.
// Ex: un "startup" cherche prioritairement des "investisseur", "talent", "incubateur".
const ROLE_AFFINITY = {
  startup: { investisseur: 1, talent: 1, incubateur: 0.9, startup: 0.3 },
  investisseur: { startup: 1, incubateur: 0.6, talent: 0.3, investisseur: 0.2 },
  talent: { startup: 1, incubateur: 0.5, investisseur: 0.3, talent: 0.2 },
  incubateur: { startup: 1, investisseur: 0.6, talent: 0.5, incubateur: 0.3 },
};

const jaccard = (a = [], b = []) => {
  const setA = new Set(a.map((s) => s.toLowerCase()));
  const setB = new Set(b.map((s) => s.toLowerCase()));
  if (setA.size === 0 || setB.size === 0) return 0;
  let intersection = 0;
  for (const item of setA) if (setB.has(item)) intersection++;
  const union = new Set([...setA, ...setB]).size;
  return intersection / union;
};

/**
 * Calcule un score de compatibilité (0-100) entre deux profils utilisateurs,
 * basé sur : complémentarité des rôles, secteurs/intérêts communs et localisation.
 */
const computeCompatibility = (userA, userB) => {
  const roleScore = (ROLE_AFFINITY[userA.role]?.[userB.role] ?? 0.3) * 100;
  const sectorScore = jaccard(userA.interests, userB.interests) * 100;
  const locationScore =
    userA.location &&
    userB.location &&
    userA.location.trim().toLowerCase() === userB.location.trim().toLowerCase()
      ? 100
      : userB.location?.toLowerCase() === "remote" || userB.location?.toLowerCase() === "worldwide"
      ? 70
      : 40;

  // Pondération: rôle 50%, secteurs 35%, localisation 15%
  const score = roleScore * 0.5 + sectorScore * 0.35 + locationScore * 0.15;
  return Math.round(Math.min(100, Math.max(0, score)));
};

module.exports = { computeCompatibility, jaccard, ROLE_AFFINITY };
