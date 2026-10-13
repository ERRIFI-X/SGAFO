# 📦 SGAFO - Application Source (`sgafo-app`) • Projet PFE OFPPT

Ce répertoire contient l'intégralité du code source de la plateforme **SGAFO** (*Système de Gestion des Activités des Formateurs OFPPT*), un monolithe moderne couplant **Laravel 12** et **React 18 / TypeScript** via **Inertia.js v2**.

---

## 📖 Documentation Générale

Pour la documentation complète du projet, les captures d'écran, les rôles utilisateurs et les identifiants de test, veuillez consulter le **[README Principal à la racine](../README.md)**.

---

## 📁 Structure du Répertoire `sgafo-app`

```text
sgafo-app/
├── app/
│   ├── Http/
│   │   ├── Controllers/       # Contrôleurs Web & API Inertia
│   │   │   └── Modules/       # Modules métier (Absences, Feedback, QCM, Attestations, Plans...)
│   │   ├── Middleware/        # Middlewares (Inertia, Auth, Rôles)
│   │   └── Requests/          # Form Requests pour la validation des données
│   ├── Models/                # Modèles Eloquent (User, PlanFormation, Seance, Attestation...)
│   ├── Notifications/         # Notifications internes (base de données & e-mail)
│   ├── Policies/              # Politiques d'autorisation RBAC
│   └── Traits/                # Traits réutilisables (HasRoles, HasRegionalScope)
├── database/
│   ├── factories/             # Usines de génération de données de test
│   ├── migrations/            # Schéma PostgreSQL versionné
│   └── seeders/               # Données de démonstration et rôles initiaux
├── resources/
│   ├── js/
│   │   ├── Components/        # Composants React réutilisables (UI, Modals, Navbar...)
│   │   ├── Layouts/           # Layouts partagés (AuthenticatedLayout, GuestLayout)
│   │   ├── Pages/             # Pages Inertia (Modules, Dashboard, Welcome...)
│   │   └── types/             # Définitions TypeScript
│   └── views/                 # Templates Blade de base et modèles PDF (DomPDF)
├── routes/
│   ├── web.php                # Routes principales de l'application
│   ├── auth.php               # Routes d'authentification
│   └── console.php            # Commandes Artisan personnalisées
└── tests/
    ├── Feature/               # Tests d'intégration et scénarios utilisateurs
    └── Unit/                  # Tests unitaires
```

---

## ⚡ Commandes Utiles

### Développement
```bash
# Lancer le Backend et le Frontend en simultané (recommandé)
npm run dev:all

# Ou lancer séparément :
php artisan serve          # Serveur Laravel sur http://127.0.0.1:8000
npm run dev                # Serveur Vite HMR sur http://localhost:5173
```

### Base de données & Seeders
```bash
# Exécuter les migrations et injecter les données de test
php artisan migrate --seed

# Réinitialiser la base de données de zéro
php artisan migrate:fresh --seed
```

### Qualité & Tests
```bash
# Lancer la suite de tests automatisés (24 tests)
php artisan test

# Vérifier les types TypeScript sans émettre de fichiers
npx tsc --noEmit

# Compiler les assets pour la production
npm run build
```

---

## 🤝 Auteurs & Contributeurs

* 👨‍💻 **Abdelbasste Errifi**
  * 🌐 GitHub : [@ERRIFI-X](https://github.com/ERRIFI-X)
  * 📧 Contact : [abdoerrifi05@gmail.com](mailto:abdoerrifi05@gmail.com)
  * 🔗 Dépôt : [https://github.com/ERRIFI-X/sgafo.git](https://github.com/ERRIFI-X/sgafo.git)

* 👨‍💻 **Abdellah Lasda**
  * 🌐 GitHub : [@abdellah-lasda](https://github.com/abdellah-lasda)
  * 🔗 Dépôt : [https://github.com/abdellah-lasda/SGAFO.git](https://github.com/abdellah-lasda/SGAFO.git)

---

## 📄 Licence

Ce projet est distribué sous licence **MIT**. Voir le fichier [LICENSE](../LICENSE) à la racine.
