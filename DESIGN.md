# DESIGN SYSTEM: FORMWORK® (`landing_page`)

**Status:** Production Specification (Pre-Implementation)  
**Source of Truth:** [CREATIVE_DIRECTION.md](file:///home/mis-inoac/Projects/React/landing_page/CREATIVE_DIRECTION.md)  
**Target Stack:** React, Vite, Tailwind CSS, GSAP + ScrollTrigger, Framer Motion, Anime.js, React Three Fiber  
**Design Philosophy:** Architectural precision, optical honesty, and tactile restraint. Every token below is calibrated for a design-obsessed audience that notices kerning, baseline alignment, easing curves, and spatial tension.

> **Architectural Rule — No Generic Card-Driven Layouts:**  
> This system intentionally avoids building the site out of repetitive, rounded SaaS cards. Each of the five exhibition chapters owns a distinct spatial composition while sharing a single, unyielding typographic, chromatic, and motion grammar.

---

## 1. Typography

### Typeface Selection & Rationale
- **Primary Typeface — `Cabinet Grotesk` (Fontshare, Weights 400, 500, 700, 800):**  
  *Rationale:* A sharp neo-grotesque with distinct ink-trap geometry and tight counterforms. It carries the authority of Swiss International Typographic Style without falling into the ubiquitous `Inter` / `Space Grotesk` / `DM Sans` training-data defaults.
- **Editorial Accent Typeface — `Instrument Serif` (Regular & Italic):**  
  *Rationale:* Used strictly as an optical counterpoint inside display statements (e.g., a single italicized verb or noun) and pull-quotes. Its condensed, high-contrast verticality creates immediate typographic tension against `Cabinet Grotesk`. Never used for UI controls, buttons, or dense body copy.
- **Drafting & Metadata Typeface — `JetBrains Mono` (Weights 400, 500):**  
  *Rationale:* Reserved exclusively for architectural indices (`01`–`05`), grid coordinates, live bezier/spring parameters in the Dark-Room Specimen, and studio time. Tabular figures (`font-variant-numeric: tabular-nums`) prevent layout jitter during live scrubbing.

### Type Scale, Tracking & Leading
All display sizes use `clamp()` for fluid optical scaling between `390px` and `1440px` without abrupt breakpoint jumps.

| Token | Role | Size (`clamp`) | Weight | Line Height | Letter Spacing | Rationale |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `--text-hero` | Hero Statement | `clamp(2.75rem, 6.2vw, 5.75rem)` | `700` | `0.94` | `-0.04em` | Tight verticality locks multi-line headlines into a cohesive architectural block. |
| `--text-h1` | Chapter Title | `clamp(2.25rem, 4.5vw, 4.25rem)` | `700` | `0.98` | `-0.035em` | Commands viewport-level hierarchy without screaming. |
| `--text-h2` | Project / Plate Title | `clamp(1.625rem, 2.8vw, 2.5rem)` | `500` | `1.10` | `-0.025em` | Medium weight preserves elegance at large editorial scale. |
| `--text-h3` | Subsection / Specimen | `clamp(1.25rem, 1.6vw, 1.5rem)` | `500` | `1.20` | `-0.015em` | Clear structural separation without heavy bolding. |
| `--text-body-lg` | Lead / Manifesto Prose | `clamp(1.125rem, 1.35vw, 1.375rem)` | `400` | `1.50` | `-0.01em` | Comfortable editorial reading pace; max `55ch`. |
| `--text-body` | Standard Body | `1rem` (`16px` floor) | `400` | `1.60` | `0em` | Strict `16px` minimum; constrained to `60ch–65ch` max line length. |
| `--text-meta` | Mono Index / Specs | `0.75rem` (`12px`) | `400` | `1.40` | `0.06em` | Uppercase or tabular figures for crisp drafting-table legibility. |

### Responsive Typography Rules
- **Minimum Body Size:** Never drops below `1rem` (`16px`) on any viewport.
- **Inline Hero Punctuation:** On `>= 768px`, the inline type-height image/plate sits at `0.82em` height aligned to the baseline/x-height. Below `768px`, it breaks cleanly onto its own block below the headline to preserve line rhythm.

---

## 2. Color System

A **Committed Architectural Palette** built on warm mineral neutrals and **one** calibrated accent (<80% saturation). Pure black (`#000000`) and neon/purple gradients are strictly banned.

### Surface & Background Tokens
| Token | Hex / Value | Role | Rationale |
| :--- | :--- | :--- | :--- |
| `--bg-canvas` | `#F2F0EC` | **Warm Limestone** — Primary gallery ground | Warm mineral tone reduces harsh screen glare and evokes heavy architectural paper stock. |
| `--bg-surface` | `#FAF9F6` | **Raw Chalk** — Elevated specimen & plate frames | Subtle `4%` luminance lift separates foreground surfaces without needing drop shadows. |
| `--bg-darkroom` | `#161614` | **Deep Basalt** — Full-bleed Dark-Room chapter | Charcoal-warm off-black preserves shadow detail and avoids sterile `#000000` contrast clipping. |
| `--bg-darkroom-elevated` | `#1F1F1C` | **Basalt Slate** — Interactive specimen panels in Dark Room | Provides crisp surface separation inside `#161614` without glassmorphism. |

### Text Hierarchy
| Token | Hex / Value | Context | Contrast / Rationale |
| :--- | :--- | :--- | :--- |
| `--ink-primary` | `#161614` | Primary headlines & body on Limestone/Chalk | High-contrast (~15.5:1 on `#F2F0EC`) with warm charcoal depth. |
| `--ink-secondary` | `#63615C` | Metadata, indices, secondary descriptions | Calibrated mid-stone (~5.2:1 on `#F2F0EC`) for clear hierarchy without fading out. |
| `--ink-on-dark` | `#F2F0EC` | Primary text inside the Dark Room (`#161614`) | Reverses the gallery ground cleanly so light and dark rooms feel part of one physical material system. |
| `--ink-on-dark-muted` | `#9A9790` | Technical specs & grid labels inside Dark Room | Maintains WCAG AA legibility on `#161614`. |

### Accent & Border Tokens
| Token | Hex / Value | Role | Rationale |
| :--- | :--- | :--- | :--- |
| `--accent-vermilion` | `#D9381E` | **Signal Vermilion** — Sole accent (~76% saturation) | Drawn from industrial drafting ink and Swiss exhibition signage. Used sparingly for the primary CTA, active index dot, and live scrubbing markers. |
| `--accent-vermilion-hover` | `#BF2E16` | Tactile darkened hover state for primary CTA | Grounded physical darkening rather than glowing brightness. |
| `--border-hairline` | `rgba(22, 22, 20, 0.12)` | **Hairline Mortar** — `1px` structural rules on light | Crisp architectural drafting lines; replaces heavy card borders and drop shadows. |
| `--border-hairline-dark` | `rgba(242, 240, 236, 0.14)` | `1px` structural rules inside Dark Room | Keeps grid geometry consistent across light and dark chapters. |

---

## 3. Layout & Grid Architecture

### Container & Edge Discipline
- **Max Content Width:** `1440px` (`90rem`) centered.
- **Equal Left & Right Edges:** `padding-inline: clamp(1.25rem, 4vw, 4rem)`. Every section aligns its outer edges to the exact same vertical rail so the eye reads a continuous architectural spine down the page.
- **Viewport Height Rule:** Full-screen chapters use `min-h-[100dvh]` (never `h-screen` to prevent mobile Safari viewport jumps).

### 12-Column Swiss Grid
- **Desktop (`>= 1024px`):** `12` equal columns, `gap: clamp(1rem, 2vw, 1.75rem)`.
- **Tablet (`768px` – `1023px`):** `8` columns, `gap: 1.25rem`.
- **Mobile (`< 768px`):** `4` columns (collapsing all multi-column compositions to single-column vertical flow, zero horizontal overflow).
- **Live Grid Overlay (`[G]`):** Pressing `G` or clicking the header grid toggle renders a `pointer-events-none` fixed 12-column translucent guide (`rgba(217, 56, 30, 0.08)` columns with `1px` `rgba(217, 56, 30, 0.18)` hairlines) — a deliberate craft detail for visiting designers.

### Spacing Scale & Section Rhythm
- **Base Micro Scale:** `4px` (`0.25rem`), `8px` (`0.5rem`), `12px` (`0.75rem`), `16px` (`1rem`), `24px` (`1.5rem`), `32px` (`2rem`), `48px` (`3rem`), `64px` (`4rem`).
- **Section Vertical Padding:** `clamp(4rem, 9vw, 8.5rem)` — generous gallery breathing room that scales down proportionally on mobile.
- **Alignment Principles:**
  - Zero overlapping text over imagery or 3D canvases. Every visual occupies its own clean spatial zone.
  - Strictly CSS Grid for layout structure (no `calc()` percentage hacks).

---

## 4. Components & Section-Specific Compositions

Each section uses a **unique composition** tailored to its narrative role rather than repeating a generic card template:

### Shared Primitives
1. **Navigation (`TopRail`):**
   - Fixed or sticky `64px` height, `1px` bottom Hairline Mortar rule, transparent-to-Limestone (`#F2F0EC/90` with subtle `backdrop-filter: blur(8px)` only on scroll).
   - Left: `FORMWORK®` wordmark in `Cabinet Grotesk 700`.
   - Center/Right: 3 index links (`01 Works`, `02 Specimen`, `03 Practice`) + `[G] Grid` toggle + single `Commission` trigger. Zero search bars, zero mega-menus.
2. **Buttons:**
   - **Primary (`Signal Vermilion` `#D9381E` fill, `#FAF9F6` text):** Sharp `2px` architectural radius, `min-height: 44px`, `padding: 0 1.5rem`. Hover shifts to `#BF2E16`; `:active` applies `transform: scale(0.97) translateY(1px)` (`120ms` `--ease-out`). Zero outer glow.
   - **Secondary / Ghost (`1px solid var(--border-hairline)`, transparent fill):** Used for specimen controls and secondary actions.
3. **Links:**
   - Inline and index links feature a `1px` underline that draws left-to-right via `transform: scaleX()` (`transform-origin: left`) over `180ms` `--ease-out`.
4. **Badges / Index Tags:**
   - Flat `1px` hairline border, `0px`–`2px` radius, `JetBrains Mono 12px`, uppercase, `padding: 0.25rem 0.625rem`. No emojis, no colored pill confetti.
5. **Image Containers (`ExhibitionPlate`):**
   - Sharp `0px`–`2px` corners, `overflow: hidden`, `background: var(--bg-surface)`.
   - Inner `<img>` scales `1.025` on hover (`400ms` `--ease-out`).
   - **No captions under images.** Project title, index, and discipline metadata sit in an adjacent grid column separated by a `1px` hairline.

### Section-Specific Compositions
- **Chapter 01 — Exhibition Hero (Asymmetric 7 / 5 Split):**
  - *Cols 1–7:* Left-aligned display headline with inline type-height architectural detail, 1-sentence thesis, and 1 primary CTA.
  - *Cols 8–12:* Dedicated **React Three Fiber** viewport rendering a matte-limestone and optical-glass monolith with pointer-damped spring rotation.
- **Chapter 02 — Selected Works (Alternating Zig-Zag Plates):**
  - *Row A:* Cols 1–8 large landscape plate; Cols 9–12 top-aligned index (`01`), title, scope, and `1px` hairline metadata table.
  - *Row B:* Cols 1–4 metadata column; Cols 5–12 offset landscape plate.
  - *Row C:* Full-bleed 12-column panoramic plate with split top header.
- **Chapter 03 — The Dark Room: Interactive Craft Specimen (`#161614`):**
  - Full-bleed dark architectural room.
  - Left (`Cols 1–4`): Interactive **Motion & Easing Inspector** — visitors toggle between `--ease-out`, `--ease-in-out`, and Spring (`stiffness: 100, damping: 20`), or scrub the GSAP timeline directly.
  - Right (`Cols 5–12`): Live **Deconstructed Grid & Form Specimen** driven by GSAP ScrollTrigger + Anime.js drafting lines that physically assemble/explode as the user scrubs.
- **Chapter 04 — Practice & Ethos (40 / 60 Editorial Spread):**
  - *Cols 1–4:* Sticky chapter index (`04 / PRACTICE`) and studio coordinates (street & district only, e.g., *Design District, Zurich / Jakarta*, no fake street numbers or metrics).
  - *Cols 5–12:* Three concise typographic manifesto blocks separated by `1px` Hairline Mortar rules, revealed line-by-line via Anime.js.
- **Chapter 05 — Colophon & Commission (Architectural Footer):**
  - Top `1px` hairline, asymmetric 2-column closing statement + single primary `Start a Commission` action, live local studio clock in `JetBrains Mono`, and colophon typeface/stack credits.

---

## 5. Motion System

Grounded in **Emil Kowalski's Design Engineering principles**: UI motion must be fast, purposeful, interruptible, and hardware-accelerated.

### Timing & Easing Tokens
| Token | Value | Use Case | Rationale |
| :--- | :--- | :--- | :--- |
| `--ease-out` | `cubic-bezier(0.23, 1, 0.32, 1)` | All entrances, exits, hover states, underline draws | Strong initial velocity makes the interface feel immediately responsive. |
| `--ease-in-out` | `cubic-bezier(0.77, 0, 0.175, 1)` | On-screen morphing, tab indicator slides, panel shifts | Natural acceleration and deceleration for elements already in view. |
| `--spring-ui` | `{ stiffness: 100, damping: 20, mass: 1 }` | Framer Motion pointer damping, interruptible state changes | Weighty, physical settle without cartoon bounce. |
| `--dur-press` | `120ms` | Button `:active` scale/translate | Instant tactile confirmation. |
| `--dur-ui` | `180ms` – `240ms` | Hover transitions, grid toggle, link underlines | Strictly `< 300ms` so repeated UI interactions never feel sluggish. |
| `--dur-reveal` | `650ms` – `850ms` | Editorial `clip-path` plate entrances, hero stagger | Measured, gallery-paced reveals reserved for first-view storytelling. |

### Library Ownership & Choreography
- **GSAP + ScrollTrigger:** Owns scroll-pinned Dark-Room scrubbing and `clip-path: inset(0 0 100% 0)` → `inset(0 0 0% 0)` plate reveals.
- **Framer Motion:** Owns pointer-damped `useSpring` values for the R3F monolith, `layoutId` shared indicators, and interruptible interactive toggles.
- **Anime.js:** Owns precision typographic line/word stagger cascades (`35ms`–`50ms` stagger) and SVG `stroke-dashoffset` drafting-line draws.
- **React Three Fiber:** Owns continuous `useFrame` damped rotation (`60fps`) and PBR material lighting.
- **Remotion-Ready Discipline:** Motion tokens (`fps: 60` equivalent frame math, deterministic spring parameters) are structured cleanly so the Dark-Room Specimen or case-study sequences can later be exported as deterministic Remotion studio walkthrough reels if needed.

### Hard Performance & Accessibility Rules
- **Compositor-Only Properties:** Animate exclusively `transform`, `opacity`, and `clip-path`. Never animate `top`, `left`, `width`, `height`, or `margin`.
- **No `ease-in` on UI:** Never use `ease-in` for dropdowns, buttons, or reveals.
- **Reduced Motion (`prefers-reduced-motion: reduce`):** All scroll scrubs, staggers, and 3D continuous rotations gracefully degrade to static or instant `opacity` transitions.

