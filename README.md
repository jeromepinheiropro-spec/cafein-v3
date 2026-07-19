# Cafein V2 — Site vitrine animé ☕

Refonte complète du site Cafein : React + Vite + Tailwind CSS + Framer Motion + Lenis (smooth scroll).

## Ce qu'il y a dedans

- **Préloader** : tasse qui se remplit + compteur %
- **Curseur custom** : point + anneau à ressort, labels contextuels (`data-cursor="..."`), effet magnétique sur les boutons
- **Hero cinétique** : lettres qui tombent en spring, le point du "i" est un grain de café, grains flottants en parallaxe souris, badge rotatif
- **Marquees** infinies inclinées
- **Manifeste** : révélation mot à mot pilotée par le scroll
- **Services** : cartes empilées sticky (stack au scroll)
- **Stats** : compteurs animés à l'entrée dans le viewport
- **Process** : timeline 4 semaines avec tasse qui avance au scroll
- **Avant/Après** : slider draggable
- **FAQ** : accordéon à ressort
- **Contact** : formulaire + confettis au succès
- **Footer** : CAFEIN géant, lettres réactives au survol

Respecte `prefers-reduced-motion` (préloader sauté). Logo/feuille d'origine conservé, palette retravaillée : menthe `#1FCE8A`, espresso `#0A0F0D`, crème `#F5EFE2`, caramel `#F4A259`, soleil `#FFD166`.

## Lancer en local

```bash
npm install
npm run dev        # http://localhost:5173
```

## Build production

```bash
npm run build      # génère dist/
npm run preview    # teste le build
```

## Déployer sur Railway

Le projet est un site statique après build. Deux options :

1. **Buildpack auto** : push le repo, Railway détecte Vite. Build command `npm run build`, start command `npx serve dist` (ajouter `serve` en dépendance).
2. **Static** : servir simplement le dossier `dist/`.

## Brancher le formulaire

Le formulaire est front-only pour l'instant (simulation d'envoi dans `src/components/Contact.jsx`, fonction `submit`). Remplacer le `setTimeout` par un `fetch` vers votre backend, Formspree, ou l'API Brevo.

## Structure

```
src/
  App.jsx              # assemblage + Lenis + ancres
  index.css            # Tailwind + grain + utilitaires
  lib/ui.jsx           # logo, magnetic, icônes SVG partagées
  components/          # une section = un fichier
```
