📘 DGMP – Application Web de Gestion de la Formation

Application web développée pour la DGMP (Direction Générale des Marchés Publics) permettant la gestion complète du cycle de formation :
administration, paramétrage, plan de formation, demandes, sessions de formation, et statistiques.

Frontend : React + Vite
Backend : Spring Boot

🚀 Fonctionnalités principales
🔐 Module Administration

Gestion des utilisateurs

Gestion des rôles et permissions

Gestion des accès aux différents modules

⚙️ Module Paramétrage

Gestion des types, catégories, thèmes de formation

Configuration des paramètres transversaux

Gestion des périodes et années de gestion

📝 Module Plan de Formation

Création et suivi des plans annuels

Organisation des actions de formation par période

Gestion des numéros d’ordre et synchronisation

🧾 Module Demande de Formation

Soumission de demandes individuelles ou collectives

Circuit de validation

Historisation et suivi des statuts

🎓 Module Formation

Gestion des sessions programmées

Suivi des participants

Évaluation et clôture des formations

📊 Module Statistiques

Visualisation des indicateurs clés

Tableaux de bord

Filtres et exports

🧱 Architecture du Frontend

L'application repose sur les technologies suivantes :

📦 Dépendances principales
{
"@emotion/react": "^11.13.3",
"@emotion/styled": "^11.13.0",
"@mui/icons-material": "^6.5.0",
"@mui/material": "^6.1.2",
"@tanstack/react-query": "^5.62.7",
"@tanstack/react-table": "^8.20.6",
"axios": "^1.7.7",
"formik": "^2.4.6",
"react": "^19.2.0",
"react-dom": "^19.2.0",
"react-router-dom": "^7.0.2",
"yup": "^1.4.0"
}

🔧 Outils clés utilisés

Vite : Build ultra-rapide

React Router DOM 7 : Navigation avancée et routing dynamique

React Query : Gestion des appels au backend Spring Boot, cache & synchronisation serveur

Axios : Client HTTP configuré avec interceptors

Formik + Yup : Gestion avancée des formulaires et validation

Material UI (MUI) : UI moderne, thèmes personnalisables

React Table : Tableaux performants et paginés

📂 Structure du projet
src/
├── api/          # Config axios, services API
├── components/   # Composants réutilisables
├── hooks/        # Hooks personnalisés (React Query…)
├── layouts/      # Layouts principaux
├── modules/      # Modules : admin, paramètre, plan-formation...
├── pages/        # Pages principales du routing
├── router/       # Fichiers de route
├── theme/        # Configuration du thème MUI
└── utils/        # Fonctions utilitaires

▶️ Installation & Démarrage
1️⃣ Prérequis

Node.js >= 18

Backend Spring Boot démarré (URL configurable dans .env)

2️⃣ Installation
npm install

3️⃣ Lancement du projet
npm run dev

4️⃣ Build production
npm run build

5️⃣ Prévisualisation du build
npm run preview

🔌 Configuration de l'environnement

Créez des fichiers d'environnement Vite selon le mode :

- .env.development
```
VITE_API_URL=http://localhost:6000
```

- .env.production
```
VITE_API_URL=https://api.mondomaine.tld
```

Le frontend lit automatiquement la variable selon le mode (`vite`/`npm run dev` → development, `npm run build` → production).

Le code utilise une URL par défaut en développement si la variable n'est pas définie :

```
// src/config/appConfig.js
const appConfig = {
  // dev: import.meta.env.VITE_API_URL ?? 'http://localhost:6000'
  // prod: import.meta.env.VITE_API_URL (à définir dans .env.production)
  apiBaseUrl: import.meta.env.VITE_API_URL ?? 'http://localhost:6000',
  appName: 'SIGEF',
}
export default appConfig
```

Et Axios est configuré ainsi :

```
// src/api/axiosClient.js
import axios from 'axios'
import appConfig from '../config/appConfig.js'

export default axios.create({
  baseURL: appConfig.apiBaseUrl,
})
```

🔒 Gestion de l’authentification

Selon ton architecture :

JWT stocké en mémoire ou localStorage

Interceptors Axios pour ajouter Authorization: Bearer <token>

Protection des routes avec createBrowserRouter + guards