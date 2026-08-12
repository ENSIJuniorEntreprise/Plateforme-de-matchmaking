// Matrice de complémentarité entre rôles.
// Ex: un "startup" cherche prioritairement des "investisseur", "talent", "incubateur".
const ROLE_AFFINITY = {
  startup: { investisseur: 1, talent: 1, incubateur: 0.9, startup: 0.3 },
  investisseur: { startup: 1, incubateur: 0.6, talent: 0.3, investisseur: 0.2 },
  talent: { startup: 1, incubateur: 0.5, investisseur: 0.3, talent: 0.2 },
  incubateur: { startup: 1, investisseur: 0.6, talent: 0.5, incubateur: 0.3 },
};

// Affinité entre le stade de financement d'une startup (`User.stage`) et la fourchette
// d'investissement typique d'un investisseur/incubateur (`User.budgetRange`). 1 = fourchette
// idéale pour ce stade, décroissant avec la distance. Les deux champs existaient déjà sur le
// modèle mais n'étaient jamais comparés l'un à l'autre — un pré-seed et un investisseur
// 100M+ DT scoraient donc aussi bien qu'une paire parfaitement alignée.
const STAGE_BUDGET_AFFINITY = {
  "Pre-seed":   { "0-10M DT": 1,   "10M-50M DT": 0.6, "50M-100M DT": 0.3, "100M+ DT": 0.1 },
  "Seed":       { "0-10M DT": 0.8, "10M-50M DT": 1,   "50M-100M DT": 0.5, "100M+ DT": 0.2 },
  "Serie A":    { "0-10M DT": 0.4, "10M-50M DT": 0.8, "50M-100M DT": 1,   "100M+ DT": 0.5 },
  "Serie B":    { "0-10M DT": 0.2, "10M-50M DT": 0.5, "50M-100M DT": 1,   "100M+ DT": 0.8 },
  "Croissance": { "0-10M DT": 0.1, "10M-50M DT": 0.3, "50M-100M DT": 0.6, "100M+ DT": 1   },
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

const roleScore = (userA, userB) => (ROLE_AFFINITY[userA.role]?.[userB.role] ?? 0.3) * 100;

const sectorScore = (userA, userB) => jaccard(userA.interests, userB.interests) * 100;

const locationScore = (userA, userB) =>
  userA.location &&
  userB.location &&
  userA.location.trim().toLowerCase() === userB.location.trim().toLowerCase()
    ? 100
    : userB.location?.toLowerCase() === "remote" || userB.location?.toLowerCase() === "worldwide"
    ? 70
    : 40;

// Score directionnel stade × budget. Neutre (50) quand la paire ne s'applique pas
// (ex: deux startups entre elles, ou aucun des deux champs renseigné) plutôt que de
// pénaliser des profils pour lesquels ce signal n'a simplement pas de sens.
const stageBudgetScore = (userA, userB) => {
  const stage = userA.stage || userB.stage;
  const budget = userA.budgetRange || userB.budgetRange;
  if (!stage || !budget) return 50;
  const affinity = STAGE_BUDGET_AFFINITY[stage]?.[budget];
  return affinity === undefined ? 50 : affinity * 100;
};

/**
 * Calcule le détail du score de compatibilité (0-100 par facteur + total pondéré) entre
 * deux profils utilisateurs. Pondération : rôle 40%, secteurs 30%, stade×budget 20%, localisation 10%.
 */
const computeCompatibilityBreakdown = (userA, userB) => {
  const role = Math.round(roleScore(userA, userB));
  const sector = Math.round(sectorScore(userA, userB));
  const stageBudget = Math.round(stageBudgetScore(userA, userB));
  const location = Math.round(locationScore(userA, userB));

  const total = Math.round(
    Math.min(100, Math.max(0, role * 0.4 + sector * 0.3 + stageBudget * 0.2 + location * 0.1))
  );

  return { role, sector, stageBudget, location, total };
};

/** Raccourci pratique quand seul le score agrégé (0-100) est nécessaire. */
const computeCompatibility = (userA, userB) => computeCompatibilityBreakdown(userA, userB).total;

module.exports = {
  computeCompatibility,
  computeCompatibilityBreakdown,
  jaccard,
  ROLE_AFFINITY,
  STAGE_BUDGET_AFFINITY,
};
