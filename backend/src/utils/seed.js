// Script de peuplement de la base avec des données de démo
// correspondant aux profils "mock" déjà présents dans le frontend
// (TechFlow AI, Sophie Chen, TechAngels, Jack Ma...).
// Usage: npm run seed
require("dotenv").config();
const connectDB = require("../config/db");
const User = require("../models/User");

const demoUsers = [
  {
    role: "startup",
    firstName: "Ayman",
    lastName: "Ben Salah",
    email: "contact@techflow.ai",
    password: "Password1",
    company: "TechFlow AI",
    location: "Paris",
    link: "https://techflow.ai",
    description: "Solution d'automatisation des workflows par IA générative.",
    interests: ["AI/ML", "SaaS", "Serie A"],
    stage: "Serie A",
    tagline: "Solution d'automatisation des workflows par IA générative",
    founded: "Fondée en 2023",
    size: "11-50 employés",
    tags: ["AI/ML", "SaaS", "B2B", "Automatisation"],
    accomplishments: [
      { icon: "🏆", label: "Station F Batch 2023" },
      { icon: "📈", label: "€500k AAR" },
      { icon: "👥", label: "+100 clients" },
    ],
    about: [
      "TechFlow AI développe une plateforme SaaS qui utilise l'IA générative pour automatiser les workflows complexes des entreprises.",
      "Notre solution permet aux équipes de réduire de 70% le temps passé sur les tâches répétitives.",
    ],
    skills: [
      { label: "Intelligence Artificielle", value: 95 },
      { label: "Automatisation", value: 90 },
    ],
    parcours: [
      { date: "Jan 2023", title: "Création", desc: "Lancement de TechFlow AI" },
      { date: "Jan 2024", title: "Seed Round", desc: "Levée de €2M" },
    ],
  },
  {
    role: "talent",
    firstName: "Sophie",
    lastName: "Chen",
    email: "sophie.chen@example.com",
    password: "Password1",
    company: "",
    location: "Remote",
    link: "https://linkedin.com/in/sophiechen",
    description: "Senior Full-Stack Developer, 8 ans d'expérience React/Node.",
    interests: ["React", "Node.js", "TypeScript"],
    tagline: "Senior Full-Stack Developer",
  },
  {
    role: "investisseur",
    firstName: "Amine",
    lastName: "Trabelsi",
    email: "contact@techangels.vc",
    password: "Password1",
    company: "TechAngels",
    location: "Europe",
    link: "https://techangels.vc",
    description: "Business angels investissant dans l'innovation tech.",
    interests: ["Pre-seed", "Tech", "Serie A"],
    budgetRange: "10M-50M DT",
  },
  {
    role: "incubateur",
    firstName: "Jack",
    lastName: "Ma",
    email: "jack.ma@incub.example.com",
    password: "Password1",
    company: "Global Incubator",
    location: "WorldWide",
    link: "https://example.com",
    description: "Offre hébergement (bureaux, coworking), conseil et mentorat.",
    interests: ["Tech", "Finance", "Seed"],
  },
];

(async () => {
  try {
    await connectDB();
    await User.deleteMany({ email: { $in: demoUsers.map((u) => u.email) } });
    await User.create(demoUsers);
    console.log(`✅ ${demoUsers.length} utilisateurs de démo créés.`);
    process.exit(0);
  } catch (err) {
    console.error("Erreur de seed:", err);
    process.exit(1);
  }
})();
