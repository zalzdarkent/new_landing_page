# FORMWORK® — Edition IV

Interactive monograph and spatial web experience for **FORMWORK®**, an independent spatial, typographic, and design-engineering practice operating between Zurich and Jakarta.

## Stack

- **Core:** React 19, TypeScript, Vite 6
- **Styling:** Tailwind CSS v4, custom CSS tokens (`--ease-out`, `mask-composite`, `clip-path`)
- **3D & Motion:** Three.js (`@react-three/fiber`, `@react-three/drei`), GSAP (`ScrollTrigger`, `SplitText`), Motion (`motion/react`), Anime.js, Lenis

## Setup

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
npm run preview
```

## Architecture (15 Chapters)

- `HeroSection` + `HeroMonolith` — 4-state interactive 3D WebGL monolith (`Assembled`, `Exploded`, `Wireframe`, `Solar`), solar incidence control, rotating kinetic axiom slot, and cursor spotlight.
- `VelocityTicker` — Dual counter-rotating telemetry streams with scroll-velocity skew.
- `BigIdeaSection` — Scroll-scrubbed `SplitText` word illumination and SVG Golden Spiral.
- `SpatialApertureSection` — Sticky full-viewport `clip-path` aperture expansion and solar lux presets.
- `WorksSection` — 4 exhibition monographs with cursor-tracked X-Ray Blueprint Flashlight and case-study drawer.
- `DeconstructedStackSection` — 4 laminated sticky stacked cards with embedded interactive sandboxes.
- `ArchiveStrip` — Horizontal scroll gallery (`containerAnimation`) across 6 material studies.
- `CapabilitiesSection` — Spotlight glow card matrix (`mask-composite`) with live SVG schematic simulators.
- `ProcessSection` — 5-phase sticky blueprint with continuous SVG dash-comet signal beams.
- `DarkRoomSpecimen` — Spring physics oscilloscope (`k`/`c` tuning) and 3-layer axonometric plane separation.
- `TactileHardwareSection` — 24-detent rotary encoder, 54-node magnetic vector field, and phase-locked Lissajous synth.
- `TypographyLabSection` — Euclidean cursor-proximity glyph wall and live measure/tracking/leading workbench.
- `ComparisonSection` — Draggable before/after structural forensics split curtain.
- `PracticeSection` — Studio axioms and 2024–2026 archive ledger with velocity-tilted floating image preview.
- `FaqSection` + `ColophonFooter` — Working notes, interactive commission scope configurator, dual studio clocks, and edge-to-edge fitted wordmark.
