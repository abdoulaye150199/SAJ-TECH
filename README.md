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

## Architecture

- `src/app/app.ts` : contenu et orchestration de la page
- `src/app/app.html` : sections du site vitrine
- `src/app/app.scss` : direction artistique et responsive
- `src/app/shared/water-canvas.component.ts` : animation liquide interactive
- `src/app/shared/tilt.directive.ts` : effet de perspective des cartes
- `public/assets/Saj.png` : logo de la marque
- `public/data/site-data.json` : services, membres, témoignages et coordonnées

Les animations respectent automatiquement `prefers-reduced-motion`.
