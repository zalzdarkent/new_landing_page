# FORMWORK®

Landing page for FORMWORK®, an independent spatial, typographic, and interactive design practice.

## Stack

- **Core:** React 19, TypeScript, Vite 6
- **Styling:** Tailwind CSS v4
- **3D & Motion:** Three.js (`@react-three/fiber`, `@react-three/drei`), GSAP, Motion, Anime.js, Lenis

## Setup

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

## Structure

```
src/
  components/   # Page sections, 3D hero monolith, typography lab, custom cursor
  data/         # Works, capabilities, process, FAQ, and archive content
  hooks/        # Scroll, pointer, and animation hooks
  lib/          # Utilities
```

Design notes and interaction specs are documented in `DESIGN.md`, `CREATIVE_DIRECTION.md`, and `INTERACTION_MAP.md`.
