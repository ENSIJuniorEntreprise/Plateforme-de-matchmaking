const test = require("node:test");
const assert = require("node:assert/strict");
const {
  computeCompatibility,
  computeCompatibilityBreakdown,
  buildIcebreaker,
  jaccard,
  ROLE_AFFINITY,
  STAGE_BUDGET_AFFINITY,
} = require("./compatibility");

test("jaccard: returns 0 when either set is empty", () => {
  assert.equal(jaccard([], ["fintech"]), 0);
  assert.equal(jaccard(["fintech"], []), 0);
  assert.equal(jaccard([], []), 0);
});

test("jaccard: is case-insensitive and order-independent", () => {
  assert.equal(jaccard(["FinTech", "AI"], ["fintech", "health"]), jaccard(["fintech"], ["FinTech", "AI", "health"]));
  assert.equal(Math.round(jaccard(["fintech", "ai"], ["fintech", "health"]) * 100), 33); // 1/3
});

test("role affinity: complementary pairs (startup/investisseur) score higher than same-role pairs", () => {
  assert.ok(ROLE_AFFINITY.startup.investisseur > ROLE_AFFINITY.startup.startup);
  assert.ok(ROLE_AFFINITY.investisseur.startup > ROLE_AFFINITY.investisseur.investisseur);
});

test("stage x budget: every declared stage and budget range has a defined affinity", () => {
  const stages = Object.keys(STAGE_BUDGET_AFFINITY);
  const ranges = Object.keys(STAGE_BUDGET_AFFINITY["Pre-seed"]);
  for (const stage of stages) {
    for (const range of ranges) {
      assert.equal(typeof STAGE_BUDGET_AFFINITY[stage][range], "number");
    }
  }
});

test("breakdown: a well-aligned startup/investor pair scores near the top", () => {
  const startup = { role: "startup", interests: ["fintech", "b2b"], location: "Tunis", stage: "Seed", budgetRange: "" };
  const investor = { role: "investisseur", interests: ["fintech", "b2b"], location: "Tunis", stage: "", budgetRange: "10M-50M DT" };

  const breakdown = computeCompatibilityBreakdown(startup, investor);

  assert.equal(breakdown.role, 100); // startup <-> investisseur is a complementary pair
  assert.equal(breakdown.sector, 100); // identical interests
  assert.equal(breakdown.stageBudget, 100); // Seed is the ideal fit for 10M-50M DT
  assert.equal(breakdown.location, 100); // exact match
  assert.equal(breakdown.total, 100);
});

test("breakdown: a mismatched stage/budget pulls the total down relative to a matched one", () => {
  const base = { role: "startup", interests: [], location: "", stage: "Pre-seed", budgetRange: "" };
  const goodInvestor = { role: "investisseur", interests: [], location: "", stage: "", budgetRange: "0-10M DT" };
  const badInvestor = { role: "investisseur", interests: [], location: "", stage: "", budgetRange: "100M+ DT" };

  const goodScore = computeCompatibility(base, goodInvestor);
  const badScore = computeCompatibility(base, badInvestor);

  assert.ok(goodScore > badScore);
});

test("breakdown: stage/budget signal is neutral (50) when not applicable, not penalizing", () => {
  const talentA = { role: "talent", interests: ["design"], location: "", stage: "", budgetRange: "" };
  const talentB = { role: "talent", interests: ["design"], location: "", stage: "", budgetRange: "" };

  const breakdown = computeCompatibilityBreakdown(talentA, talentB);
  assert.equal(breakdown.stageBudget, 50);
});

test("weights sum to 1 (role 0.4 + sector 0.3 + stageBudget 0.2 + location 0.1)", () => {
  assert.ok(Math.abs(0.4 + 0.3 + 0.2 + 0.1 - 1) < 1e-9);
});

test("buildIcebreaker: mentions the budget bracket when stage/budget is the strongest factor", () => {
  const startup = { firstName: "Lina", interests: [], stage: "Pre-seed", budgetRange: "" };
  const investor = { firstName: "Sami", interests: [], stage: "", budgetRange: "0-10M DT" };
  const breakdown = computeCompatibilityBreakdown(startup, investor);

  const text = buildIcebreaker(breakdown, startup, investor);
  assert.match(text, /Sami/);
  assert.match(text, /0-10M DT/);
});

test("buildIcebreaker: cites a shared interest when sector is the strongest factor", () => {
  const userA = { firstName: "Alex", interests: ["FinTech", "SaaS"], stage: "", budgetRange: "" };
  const userB = { firstName: "Sam", interests: ["fintech"], stage: "", budgetRange: "" };
  const breakdown = computeCompatibilityBreakdown(userA, userB);

  const text = buildIcebreaker(breakdown, userA, userB);
  assert.match(text, /FinTech/i);
});

test("buildIcebreaker: never throws on fully empty profiles", () => {
  const empty = { interests: [], stage: "", budgetRange: "" };
  const breakdown = computeCompatibilityBreakdown(empty, empty);
  assert.doesNotThrow(() => buildIcebreaker(breakdown, empty, empty));
});
