# CREATIVE DIRECTION: FORMWORK® (`landing_page`)

**Project:** `landing_page` (Studio Name: **FORMWORK®**)  
**Website Type:** Creative Studio Showcase  
**Target Audience:** Creative professionals and designers who love design more than themselves — practitioners who notice optical alignment, kerning, easing curves, grid discipline, and material honesty within the first two seconds.  
**Experience Mode:** *Experience* (primary) & *Persuade* (secondary) — the website itself is the primary artifact of proof.

---

## 1. Visual Identity & Brand Personality

**FORMWORK®** is an independent spatial, typographic, and interactive design practice. In architecture, *formwork* is the temporary timber or steel mold into which concrete is poured — the unseen structural discipline that gives permanent form its edge.

- **Personality:** Unhurried, exacting, materially honest, and quietly confident. It never begs for attention or explains its own cleverness.
- **Voice & Copy Discipline:** Concise, architectural, and free of agency clichés. No *"elevate your brand,"* *"seamless digital experiences,"* or *"next-gen solutions."* Copy reads like an exhibition catalog or a Swiss design monograph: factual, sharp, and rhythmic.
- **Proof Over Claims:** Zero fabricated metrics, fake client logos, or invented uptime/ROI numbers. Every claim is demonstrated directly by the page's own typography, grid, motion, and 3D craft.

---

## 2. Art Direction & Aesthetic Positioning

- **Aesthetic World:** *Swiss International Typographic Style* meets *Japanese Architectural Monograph* (concrete, paper stock, hairline drafting rules, and optical precision).
- **Physical Scene:** A sunlit, quiet concrete gallery in the morning, transitioning mid-scroll into a controlled dark-room projection space for interactive specimens, then returning to raw paper stock for the colophon.
- **Anti-AI-Slop Commitments:**
  - **No** generic purple/blue neon gradients or dark-mode glassmorphism.
  - **No** centered hero compositions with floating glowing orbs.
  - **No** repetitive 3-column rounded SaaS feature cards.
  - **No** custom fake mouse cursors that lag behind the pointer.
  - **No** `"Scroll to explore"` hints, bouncing chevrons, or `LABEL // 2026` decorative tags.

---

## 3. Typography Combinations

Banned training-data defaults (`Inter`, `Space Grotesk`, `Syne`, `DM Sans`, `Outfit`, `Fraunces`, `Playfair Display`) are excluded. The typographic system pairs a razor-sharp neo-grotesque with an editorial serif for optical tension and a technical monospace for drafting metadata:

| Role | Font Family | Treatment & Rules |
| :--- | :--- | :--- |
| **Display & Primary UI** | **Cabinet Grotesk** (Fontshare) | Tight tracking (`-0.03em` to `-0.04em`), weight-driven hierarchy (`500`–`800`), controlled `clamp()` scaling. Used for headlines, navigation, and project titles. |
| **Editorial Accent** | **Instrument Serif** (Italic / Regular) | Used sparingly as an optical counterpoint inside display headlines (e.g., emphasizing a single verb or concept) and pull-quotes. Never used for dense UI controls. |
| **Drafting & Metadata** | **JetBrains Mono** | Reserved strictly for architectural indices (`01`, `02`), grid coordinates, bezier/spring parameters in the interactive specimen, and timestamps. |
| **Body Copy** | **Cabinet Grotesk** (`400`) | Relaxed leading (`1.55`–`1.65`), constrained to `60ch–65ch` max line length, minimum `16px` (`1rem`) on desktop and mobile. |

---

## 4. Color Philosophy

A **Committed Architectural Palette** with high-contrast neutral bases and **one** calibrated accent (<80% saturation). Pure `#000000` is strictly banned.

| Token Name | Hex / Value | Functional Role |
| :--- | :--- | :--- |
| **Warm Limestone** | `#F2F0EC` | Primary gallery canvas ground. Warm, tactile, paper-like without feeling like generic cream. |
| **Raw Chalk** | `#FAF9F6` | Elevated surface for editorial plates and specimen containers. |
| **Deep Basalt** | `#161614` | Primary ink on light surfaces; also serves as the full-bleed ground for the Dark-Room Specimen section. |
| **Graphite Ash** | `#63615C` | Secondary copy, captions, index numbers, and metadata. |
| **Hairline Mortar** | `rgba(22, 22, 20, 0.12)` | `1px` structural grid dividers, registration marks, and table rules. |
| **Signal Vermilion** | `#D9381E` | **Sole Accent** (~76% saturation). Used with extreme restraint for the primary CTA, active index indicators, and live specimen focal points. |

---

## 5. Layout Composition

- **12-Column Swiss Architectural Grid:** Full-bleed structural hairlines with equal left and right content edges (`clamp(1.25rem, 4vw, 4rem)`), contained within a `1440px` max-width frame.
- **One Section Per Screen:** Each major chapter occupies `min-h-[100dvh]` (never `h-screen`) so no next-section heading awkwardly peeks into the first viewport.
- **Hero Composition (Asymmetric Split + Inline Visual Punctuation):**
  - Left/Top Zone: Asymmetric editorial headline featuring **inline type-height visual punctuation** (a small, sharply cropped architectural detail embedded directly inline between words) + one concise thesis sentence + **one** primary CTA.
  - Right/Focal Zone: Dedicated spatial frame housing the live **React Three Fiber** interactive monolith — cleanly separated from all text (zero text overlapping 3D or imagery).
- **Selected Works (Asymmetric Zig-Zag Plates):** Replaces the banned 3-column card grid with alternating 7-col / 5-col and 5-col / 7-col editorial plates separated by `1px` Hairline Mortar rules and generous negative space.
- **Responsive Collapse:** Below `768px`, all multi-column compositions collapse cleanly to a single column with zero horizontal overflow, `44px` minimum tap targets, and inline hero visuals stacking cleanly below the headline.

---

## 6. Image & Visual Treatment

- **Photography & Plates:** High-contrast architectural, material, and industrial design photography graded toward neutral stone and warm monochrome. Sharp `0px`–`2px` corners (avoiding generic `rounded-3xl` pills).
- **No Captions Under Visuals:** Images and renders speak for themselves inside the layout; metadata sits cleanly in aligned structural columns beside or above, never as cluttered captions underneath.
- **React Three Fiber (R3F) Materiality:** Instead of glowing wireframe spheres or particle clouds, the 3D scene renders a **physical architectural monolith / optical glass-and-limestone prism** with realistic PBR roughness, subtle environment reflections, and crisp studio lighting.

---

## 7. Visual Storytelling (5-Chapter Exhibition Flow)

1. **01 / Overture (Hero):** Establishes the studio's thesis immediately — proportion, materiality, and interactive precision — anchored by the live R3F spatial sculpture.
2. **02 / Artifacts (Selected Works):** Curated case studies presented as numbered gallery plates. Hovering a plate reveals subtle depth (`scale(1.025)` inside its frame) and draws a crisp baseline rule.
3. **03 / The Dark Room (Interactive Craft Specimen):** The canvas shifts full-bleed to **Deep Basalt (`#161614`)**. Designed specifically as a gift to fellow designers: an interactive **Motion & Grid Specimen** where visitors can scrub a GSAP timeline deconstructing a typographic/geometric system, inspect live cubic-bezier vs. spring curves, or toggle material states.
4. **04 / Manifesto & Discipline (Practice):** An asymmetric 40/60 editorial spread detailing how the studio works, revealed through precision Anime.js typographic choreography.
5. **05 / Colophon & Commission (Footer):** Uncluttered closing room with a single direct commission action, studio location (district only), live local time, and colophon credits.

---

## 8. Interactive Experience Direction

Interactions are designed as **quiet handshakes for design-obsessed visitors**:

- **Live Grid Overlay (`[G]` Key or Header Switch):** Visitors can toggle the underlying 12-column Swiss structural grid and baseline guides on/off at any time — celebrating the architecture of the page itself.
- **Pointer-Damped 3D Monolith:** In the hero, the R3F sculpture responds to pointer movement through damped spring interpolation (never raw 1:1 mouse tracking, which feels jittery and artificial).
- **Tactile Micro-States:** Every button and interactive row responds immediately on press (`transform: scale(0.97)` or `-1px` translate) with zero neon outer glows.

---

## 9. Motion Design Philosophy

Synthesizing **Emil Kowalski's Design Engineering principles** with our animation stack:

### Library Division of Labor
- **GSAP + ScrollTrigger:** Scroll-driven `clip-path` image reveals, pinned Dark-Room Specimen timeline scrubbing, and smooth chapter transitions.
- **Framer Motion:** Interruptible spring physics (`{ type: "spring", stiffness: 100, damping: 20 }`), shared `layoutId` state transitions, and pointer-damped `useSpring` values.
- **Anime.js:** Precision staggered typographic line/word cascades and SVG drafting-line path drawing.
- **React Three Fiber:** 60fps WebGL physical material and spatial sculpture rendering.

### Core Motion Rules
- **Purpose Over Decoration:** Every animation exists to clarify spatial relationships, provide tactile feedback, or demonstrate craft. Frequent UI actions stay snappy (**under `300ms`**, typically `140ms–220ms`).
- **Custom Easing Curves (No `ease-in` on UI):**
  - Entrances & Exits: `--ease-out: cubic-bezier(0.23, 1, 0.32, 1)` (instant initial response, smooth settle).
  - On-Screen Morphs: `--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1)`.
- **Hardware-Accelerated Only:** Animate exclusively `transform`, `opacity`, and `clip-path`. Never animate `top`, `left`, `width`, or `height`.
- **Accessibility:** Full support for `prefers-reduced-motion`, gracefully collapsing choreographed reveals to instant opacity transitions.

---

## 10. Overall Emotional Experience

Visiting **FORMWORK®** should feel like opening a limited-edition architectural monograph or stepping into a silent, sunlit concrete gallery where every millimeter has been considered. For a designer who loves design more than themselves, the reward is **recognition**: the unmistakable feeling that whoever built this refused every shortcut, respected every baseline, tuned every easing curve, and treated the browser as a physical medium worthy of craft.

