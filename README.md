# SAJ Tech — Site vitrine

# SAJ-TECH

Site vitrine immersif de SAJ Tech développé avec Angular 20.

## Lancer le projet

```bash
npm install
npm start
```

Le site est ensuite accessible sur `http://localhost:4200`.

## Compiler pour la production

```bash
npm run build
```

Les fichiers optimisés sont générés dans `dist/saj-showcase/browser`.

## Formulaire de contact

Le formulaire envoie les demandes à `support@sajintech.com` via FormSubmit. Lors du premier envoi après la mise en production, il faut cliquer sur le lien de confirmation reçu par cette adresse ; les demandes envoyées avant cette confirmation restent conservées par le service.

## Architecture

- `src/app/core/models` : contrats TypeScript des données
- `src/app/core/services` : accès centralisé au contenu JSON
- `src/app/layout` : navigation et pied de page
- `src/app/features` : composants autonomes par section métier
- `src/app/shared` : animation en particules et directives réutilisables
- `src/app/app.ts` : orchestration et état global minimal
- `src/app/app.scss` : direction artistique inchangée et responsive
- `public/data/site-data.json` : source unique des contenus éditables

Les animations respectent automatiquement `prefers-reduced-motion`.
