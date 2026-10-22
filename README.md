# XOXO

Site vitrine d'un **skate shop** : catalogue, drops, événements, articles et objectifs de la boutique.

Les produits du fichier de démonstration sont des fiches d'exemple (decks, trucks, roues, setups). Ils illustrent la vitrine, ils ne sont pas un stock réel.

<p align="center">
  <img src="https://img.shields.io/badge/react-61DAFB?logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/vite-646CFF?logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/tailwind-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind" />
  <img src="https://img.shields.io/badge/netlify-00C7B7?logo=netlify&logoColor=white" alt="Netlify" />
</p>

<p align="center">
  <strong>Dépôt :</strong> <a href="https://github.com/Meriem1403/XOXO">github.com/Meriem1403/XOXO</a>
</p>

---

## Sommaire

- [Présentation](#présentation)
- [Fonctionnalités](#fonctionnalités)
- [Stack technique](#stack-technique)
- [Prérequis](#prérequis)
- [Installation](#installation)
- [Déploiement](#déploiement)
- [Structure du projet](#structure-du-projet)
- [Scripts disponibles](#scripts-disponibles)

---

## Présentation

XOXO est une boutique statique. Le catalogue, les commandes d'exemple, les riders, les événements et les articles vivent dans `src/data.ts`, typés par `src/types.ts`. Il n'y a pas de back-office ni de paiement : la page montre le merchandising (prix, stock affiché, nouveautés, promotions).

Un push sur `main` déclenche le build Netlify.

---

## Fonctionnalités

| Bloc | Contenu |
|------|---------|
| **Catalogue** | Decks, trucks, roues, setups, accessoires |
| **Fiche produit** | Prix, marque, tags, stock affiché |
| **Drops** | Sorties mises en avant |
| **Événements** | Dates de la boutique |
| **Articles** | Contenus éditoriaux |
| **Objectifs** | Chiffres de la boutique, en démonstration |

---

## Stack technique

| Couche | Technologies |
|--------|----------------|
| Interface | React, TypeScript, Vite, Tailwind CSS |
| Graphiques | Recharts |
| Icônes | Lucide |
| Hébergement | Netlify, dossier `dist` |
| Gestionnaire | pnpm |

---

## Prérequis

- **Node.js** 20
- **pnpm**
- **Git**

---

## Installation

```bash
git clone https://github.com/Meriem1403/XOXO.git
cd XOXO
pnpm install
pnpm dev
```

Le serveur Vite affiche l'URL locale (en général http://localhost:5173).

---

## Déploiement

`netlify.toml` :

| Paramètre | Valeur |
|-----------|--------|
| Build | `pnpm build` |
| Dossier publié | `dist` |
| Branche | `main` |

Pas de variable secrète : le site est entièrement statique.

---

## Structure du projet

```
XOXO/
├── src/App.tsx       # Pages de la vitrine
├── src/data.ts       # Catalogue de démonstration
├── src/types.ts      # Produit, commande, événement, article
├── public/
└── netlify.toml
```

---

## Scripts disponibles

| Commande | Description |
|----------|-------------|
| `pnpm dev` | Serveur de développement |
| `pnpm build` | Build de production |
| `pnpm preview` | Prévisualisation du build |
| `pnpm format` | Mise en forme |

---

<p align="center">
  <sub>XOXO — vitrine de skate shop. Le catalogue du dépôt est un jeu de démonstration.</sub>
</p>
