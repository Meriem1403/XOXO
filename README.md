# XOXO

Site vitrine du skate shop XOXO — React, Vite et Tailwind CSS.

## Développement local

```bash
pnpm install
pnpm dev
```

## Déploiement Netlify

Le déploiement automatique est configuré via `netlify.toml` :

- **Build** : `pnpm build`
- **Dossier publié** : `dist`
- **Node.js** : 22

### Connecter le dépôt GitHub

1. Va sur [app.netlify.com](https://app.netlify.com) et connecte-toi.
2. **Add new site** → **Import an existing project** → **GitHub**.
3. Choisis le dépôt `Meriem1403/XOXO`.
4. Netlify détecte automatiquement la config (`netlify.toml`) — clique sur **Deploy site**.

Chaque push sur `main` déclenche un nouveau déploiement.
