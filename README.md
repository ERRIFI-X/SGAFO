<div align="center">

# 🚀 SGAFO - Système de Gestion des Activités des Formateurs OFPPT

### 🎓 Projet de Fin d'Études (PFE) — OFPPT

[![PFE](https://img.shields.io/badge/Projet-PFE%20OFPPT-007ACC?style=for-the-badge&logo=mortarboard&logoColor=white)](#)
[![Laravel](https://img.shields.io/badge/Laravel-12.x-FF2D20?style=for-the-badge&logo=laravel&logoColor=white)](https://laravel.com)
[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Inertia.js](https://img.shields.io/badge/Inertia.js-2.0-9553E9?style=for-the-badge&logo=inertia&logoColor=white)](https://inertiajs.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16.x-336791?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Vite](https://img.shields.io/badge/Vite-7.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](./LICENSE)

<p align="center">
  <strong>Projet de Fin d'Études (PFE) : Plateforme intégrée moderne pour la planification pédagogique, le suivi logistique et l'évaluation continue des formateurs de l'OFPPT.</strong>
</p>

[Fonctionnalités](#-fonctionnalités-clés) •
[Architecture](#-architecture--stack-technique) •
[Aperçu Visuel](#-aperçu-de-linterface) •
[Installation](#-installation--démarrage-rapide) •
[Comptes de Test](#-comptes-de-test) •
[Auteurs](#-auteurs--contributeurs) •
[Licence](#-licence)

---

</div>

## 📖 À propos du projet

**SGAFO** (*Système de Gestion des Activités des Formateurs OFPPT*) est une solution d'entreprise conçue pour numériser et rationaliser l'ensemble du cycle de formation continue des formateurs et encadrants au sein de l'OFPPT :

- Centralisation des besoins en formation continue et plans annuels.
- Découpage par complexe pédagogique (CDC), secteur et métier.
- Planification rigoureuse des sessions, réservation logistique (sites & hôtels).
- Contrôle d'accès rigoureux basé sur les rôles (RBAC).
- Génération automatisée des attestations et feuilles de présence en PDF.

---

## ✨ Fonctionnalités Clés

- **📋 Gestion des Plans de Formation** : Création pas-à-pas (Identification, Thèmes, Participants, Logistique), soumission, revue hiérarchique et validation définitive.
- **🏛️ Catalogue National** : Référentiel unifié des modules et plans de formation validés à l'échelle du réseau OFPPT.
- **📅 Planification & Affectation** : Calendrier des séances, affectation des formateurs avec vérification automatique des conflits de disponibilité.
- **🏨 Logistique Intégrée** : Gestion des sites de formation, réservations d'hôtels et coordination régionale.
- **📊 Suivi des Présences & Absences** : Émargement numérique en temps réel pour animateurs et participants.
- **📝 Évaluations & QCM** : Passage de QCM en ligne chronométrés et collecte de feedbacks de satisfaction post-formation.
- **🎓 Attestations Numériques** : Génération automatique, signature et téléchargement direct d'attestations de formation certifiées.
- **📈 Tableaux de Bord Analytiques** : KPIs, taux de participation, graphiques de répartition sectorielle et indicateurs de performance.

---

## 🛠️ Architecture & Stack Technique

| Composant | Technologie | Description |
| :--- | :--- | :--- |
| **Backend** | [Laravel 12](https://laravel.com/) | API, ORM Eloquent, Routage & Politiques d'autorisation |
| **Frontend** | [React 18](https://reactjs.org/) + [TypeScript](https://www.typescriptlang.org/) | Interface réactive, typage statique et composants modulaires |
| **Liaison SPA** | [Inertia.js v2](https://inertiajs.com/) | Monolithe moderne sans API REST boilerplate |
| **Base de Données** | [PostgreSQL](https://www.postgresql.org/) | Stockage relationnel robuste et intégrité des contraintes |
| **Design & UI** | [Tailwind CSS](https://tailwindcss.com/) + Headless UI + Lucide Icons | Design moderne, responsive et accessible |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) | Transitions fluides et micro-interactions interactives |
| **Visualisation** | [Recharts](https://recharts.org/) | Graphiques radar et histogrammes d'analyses pédagogiques |
| **PDF Reporting** | [DomPDF](https://github.com/barryvdh/laravel-dompdf) | Convocations et attestations officielles au format PDF |

---

## 🖼️ Aperçu de l'interface

<div align="center">

### Page d'Authentification Sécurisée
![Connexion SGAFO](principale_interface/127.0.0.1_8000_login.png)

### Tableau de Bord Analytique Global
![Dashboard Global](principale_interface/127.0.0.1_8000_dashboard_global.png)

### Catalogue National des Formations
![Catalogue National](principale_interface/127.0.0.1_8000_catalogue-national.png)

### Centre de Validation des Plans
![Centre de Validation](principale_interface/127.0.0.1_8000_centre_validation.png)

</div>

---

## 👥 Rôles Utilisateurs

| Rôle | Code | Description & Prérogatives |
| :--- | :--- | :--- |
| **Administrateur** | `ADMIN` | Gestion globale du système, utilisateurs, centres, logistique et rapports nationaux. |
| **Responsable de Formation** | `RF` | Validation administrative et régionale des plans de formation. |
| **Chef de Complexe** | `CDC` | Conception des plans de formation, identification des besoins et proposition de plannings. |
| **Direction Régionale** | `DR` | Supervision régionale et suivi statistique de l'avancement. |
| **Formateur / Animateur** | `FORMATEUR` | Préparation des cours, émargement des présences et animation pédagogique. |
| **Participant** | `FORMATEUR` | Consultation des séances, passage des QCM et téléchargement des attestations. |

---

## 🔑 Comptes de Test

Tous les comptes ci-dessous partagent le même mot de passe par défaut :
> **Mot de passe :** `password123`

| Rôle | Adresse E-mail | Utilisateur |
| :--- | :--- | :--- |
| **Administrateur** | `admin@ofppt.ma` | Mohammed El Fassi |
| **RF (Digital)** | `hassan.rf@ofppt.ma` | Hassan Benali |
| **RF (Gestion)** | `salma.rf@ofppt.ma` | Salma Chraibi |
| **CDC (Coordinateur)** | `youssef.cdc@ofppt.ma` | Youssef Ammor |
| **Direction Régionale (Casa)** | `dr.casa@ofppt.ma` | Ahmed Mansouri |
| **Formateur / Participant** | `k.tazi@ofppt.ma` | Karim Tazi |
| **Expert Externe** | `expert.ia@tech.com` | Laurent Dubois |

---

## 🚀 Installation & Démarrage Rapide

### Prérequis
- **PHP** >= 8.2 (avec extensions `pdo_pgsql`, `mbstring`, `openssl`, `gd`)
- **Composer** >= 2.x
- **Node.js** >= 18.x & **NPM**
- **PostgreSQL** >= 14.x

### 1. Cloner le Dépôt

```bash
# Dépôt de Abdelbasste Errifi :
git clone https://github.com/ERRIFI-X/sgafo.git

# Dépôt de Abdellah Lasda :
git clone https://github.com/abdellah-lasda/SGAFO.git

cd SGAFO/sgafo-app
```

### 2. Dépendances PHP & JavaScript

```bash
composer install
npm install
```

### 3. Configuration de l'Environnement

```bash
cp .env.example .env
php artisan key:generate
```

Configurez vos identifiants PostgreSQL dans le fichier `.env` :

```env
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=sgafo
DB_USERNAME=postgres
DB_PASSWORD=votre_mot_de_passe
```

### 4. Migration & Données Initiales

```bash
php artisan migrate --seed
```

*(Ou `php artisan migrate:fresh --seed` pour réinitialiser complètement la base de données).*

### 5. Lancer l'Application

Vous pouvez lancer le Back-end et le Front-end simultanément avec un seul terminal :

```bash
npm run dev:all
```

*Alternative (2 terminaux séparés) :*
```bash
# Terminal 1 - Backend Laravel
php artisan serve

# Terminal 2 - Frontend Vite
npm run dev
```

Accédez à l'application dans votre navigateur :
👉 **[http://localhost:8000](http://localhost:8000)**

---

## 🧪 Tests & Qualité de Code

Exécuter la suite complète de tests automatisés :

```bash
php artisan test
```

Vérifier la compilation TypeScript :

```bash
npx tsc --noEmit
npm run build
```

---

## 🤝 Auteurs & Contributeurs

Ce projet a été conçu et développé en collaboration par :

* 👨‍💻 **Abdelbasste Errifi**
  * 🌐 Profil GitHub : [@ERRIFI-X](https://github.com/ERRIFI-X)
  * 📧 Contact : [abdoerrifi05@gmail.com](mailto:abdoerrifi05@gmail.com)
  * 🔗 Dépôt GitHub : [https://github.com/ERRIFI-X/sgafo.git](https://github.com/ERRIFI-X/sgafo.git)

* 👨‍💻 **Abdellah Lasda**
  * 🌐 Profil GitHub : [@abdellah-lasda](https://github.com/abdellah-lasda)
  * 🔗 Dépôt GitHub : [https://github.com/abdellah-lasda/SGAFO.git](https://github.com/abdellah-lasda/SGAFO.git)

---

## 📄 Licence

Ce projet est distribué sous la licence **MIT**. Consultez le fichier [LICENSE](./LICENSE) pour plus de détails.
