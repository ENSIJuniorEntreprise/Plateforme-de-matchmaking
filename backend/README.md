# MatchHub — Backend API

Backend Node.js / Express / MongoDB pour la plateforme de Matchmaking (investisseurs, startups, talents, incubateurs), conforme au cahier des charges ENSI Junior Entreprise et conçu pour brancher directement le frontend React déjà fourni (`frontend.zip`).

## 1. Stack technique

- **Node.js / Express** — API REST
- **MongoDB / Mongoose** — base de données
- **JWT** — authentification par token
- **bcryptjs** — hash des mots de passe
- **Multer** — upload de fichiers (CV, avatars)

## 2. Installation

```bash
cd backend
npm install
cp .env.example .env   # puis renseigner MONGO_URI et JWT_SECRET
npm run seed            # (optionnel) crée 4 comptes de démo, un par rôle
npm run dev              # démarre le serveur avec nodemon sur http://localhost:5000
```

Comptes créés par `npm run seed` (mot de passe: `Password1`) :
`contact@techflow.ai` (startup) / `sophie.chen@example.com` (talent) / `contact@techangels.vc` (investisseur) / `jack.ma@incub.example.com` (incubateur).

## 3. Modèle de données

### User
Couvre les 4 étapes du formulaire d'inscription (`step1.jsx` → `step4.jsx`) :
| Champ frontend | Champ backend |
|---|---|
| role (step1) | `role`: startup / talent / investisseur / incubateur |
| Nom, Prenom, Email, Mot_de_passe, CV (step2) | `lastName`, `firstName`, `email`, `password`, `cvUrl` |
| Entreprise, Localisation, Lien, Description (step3) | `company`, `location`, `link`, `description` |
| interests (step4) | `interests[]` |

Champs additionnels utilisés par les pages `Matchmaking.jsx` / `Profile.jsx` / `Dashboard.jsx` : `stage`, `budgetRange`, `tagline`, `founded`, `size`, `tags[]`, `accomplishments[]`, `about[]`, `skills[]`, `parcours[]`, `profileViews`.

### Connection
Une mise en relation ("match") entre deux utilisateurs : `requester`, `recipient`, `status` (pending/accepted/declined), `compatibilityScore`.

### Message
Messagerie simple entre deux utilisateurs connectés.

### Notification
Alimente le panneau "Notifications" du Dashboard (`match`, `message`, `profile_view`, `system`).

## 4. Algorithme de compatibilité (`src/utils/compatibility.js`)

Score 0–100 calculé à partir de :
- **50%** — complémentarité des rôles (ex : startup ↔ investisseur = forte affinité)
- **35%** — recouvrement des secteurs/intérêts communs (indice de Jaccard)
- **15%** — proximité géographique

## 5. Endpoints API

Base URL : `http://localhost:5000/api`

### Auth (`/auth`)
| Méthode | Route | Description |
|---|---|---|
| POST | `/auth/register` | Inscription (multipart/form-data, champ fichier `CV`) |
| POST | `/auth/login` | Connexion → `{ token, user }` |
| GET | `/auth/me` | Utilisateur connecté *(Bearer token)* |
| POST | `/auth/forgot-password` | Envoie un lien de réinitialisation |
| POST | `/auth/reset-password/:token` | Définit un nouveau mot de passe |

### Utilisateurs (`/users`)
| Méthode | Route | Description |
|---|---|---|
| GET | `/users?role=&page=&limit=` | Annuaire des profils |
| GET | `/users/:id` | Profil public (page `Profile.jsx`) |
| PATCH | `/users/me` | Mise à jour du profil connecté |
| POST | `/users/me/cv` | Upload CV (`multipart/form-data`, champ `CV`) |
| POST | `/users/me/avatar` | Upload avatar (champ `avatar`) |

### Matchmaking (`/matches`) — *auth requise*
| Méthode | Route | Description |
|---|---|---|
| POST | `/matches/search` | Recherche filtrée (voir body ci-dessous) |
| POST | `/matches/connect/:userId` | Envoyer une demande de mise en relation |
| PATCH | `/matches/connections/:id` | Accepter/refuser (`{ status }`) |
| GET | `/matches/connections?status=` | Mes connexions |

Body de `/matches/search` (reflète les filtres de `Matchmaking.jsx`) :
```json
{
  "profileType": "startup",
  "sectors": ["AI/ML", "SaaS"],
  "stage": "Serie A",
  "location": "Europe",
  "budgetRange": "10M-50M DT",
  "query": "",
  "sortBy": "compatibilite",
  "page": 1,
  "limit": 20
}
```

### Dashboard (`/dashboard`) — *auth requise*
| Méthode | Route | Description |
|---|---|---|
| GET | `/dashboard/stats` | Cartes Matchs / Vues / Messages / Score |
| GET | `/dashboard/recent-matches` | Matchs récents |
| GET | `/dashboard/notifications` | Liste des notifications |
| PATCH | `/dashboard/notifications/:id/read` | Marquer une notification lue |
| PATCH | `/dashboard/notifications/read-all` | Tout marquer comme lu |

### Messagerie (`/messages`) — *auth requise*
| Méthode | Route | Description |
|---|---|---|
| GET | `/messages/conversations` | Liste des conversations |
| GET | `/messages/:userId` | Historique avec un utilisateur |
| POST | `/messages/:userId` | Envoyer un message (`{ content }`) |

## 6. Authentification

Toutes les routes protégées attendent l'en-tête :
```
Authorization: Bearer <token>
```
Le token est renvoyé par `/auth/register` et `/auth/login`.

## 7. Brancher le frontend

Dans le frontend (`SignUp.jsx`, `SignIn.jsx`, `Matchmaking.jsx`, `Dashboard.jsx`, `Profile.jsx`), remplacer les `setTimeout` / données statiques par des appels `fetch`/`axios` vers `http://localhost:5000/api/...`, et stocker le `token` reçu (ex. dans le `user` state déjà présent dans `App.jsx`, ou dans un contexte d'authentification dédié). Penser à configurer `CLIENT_URL` dans `.env` pour autoriser le CORS depuis `http://localhost:5173` (Vite).

## 8. Prochaines étapes suggérées

- Service d'envoi d'emails réel pour `forgot-password` (Nodemailer/SendGrid)
- WebSockets (Socket.IO) pour la messagerie et les notifications en temps réel
- Stockage des fichiers sur un service cloud (S3, Cloudinary) en production plutôt qu'en local
- Tests automatisés (Jest + Supertest)
