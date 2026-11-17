# CONTENT & EXPERIENCE EXPANSION PLAN: FORMWORK® (`landing_page`)

**Objective:** Expand FORMWORK® from a 6-section showcase into a 13-chapter architectural digital monograph — preserving the Warm Limestone (`#F2F0EC`), Deep Basalt (`#161614`), and Signal Vermilion (`#D9381E`) design system while introducing distinct visual compositions, hands-on designer tools, and `frontend-atlas` scroll/interaction recipes.

---

## 13-Chapter Narrative & Motion Architecture

| Chapter | Component | Visual Composition | Motion & Interaction Identity |
| :--- | :--- | :--- | :--- |
| **01 / Overture Hero** | `HeroSection.tsx` | 7/5 asymmetric split + inline type-height architectural detail + R3F Limestone & Glass Monolith | Anime.js line-masked entrance + magnetic CTA + pointer/scroll-damped 3D monolith |
| **02 / Discipline Ticker** | `VelocityTicker.tsx` | Full-bleed `1px` bordered Raw Chalk ribbon | GSAP `ScrollTrigger` velocity-reactive `timeScale` & subtle `skewX` |
| **03 / The Big Idea** | `BigIdeaSection.tsx` *(New)* | Oversized centered/offset editorial statement (`32px–64px`) with structural hairline | `frontend-atlas` `scroll-gsap.md#5` — GSAP `SplitText` word-by-word scroll-fill (`0.16 → 1` opacity) |
| **04 / Selected Works** | `WorksSection.tsx` | Alternating zig-zag & panoramic exhibition plates (no captions under images) | GSAP `clip-path` reveals, inner vertical parallax, `[INSPECT]` cursor, Specification Drawer |
| **05 / Archive Reel** | `ArchiveStrip.tsx` | Pinned horizontal gallery of 4 material & proportion studies | `frontend-atlas` `scroll-gsap.md#8` — `containerAnimation` horizontal parallax + mobile `snap-x` |
| **06 / Capabilities Explorer** | `CapabilitiesSection.tsx` *(New)* | Interactive 4-discipline vertical rail + live detail stage (zero generic 3-col cards) | `Motion` `layoutId` active rail + `AnimatePresence` crossfade + stack ownership tags |
| **07 / Methodology** | `ProcessSection.tsx` *(New)* | Sticky split storytelling (scrolling 4-phase prose left, sticky SVG blueprint right) | `frontend-atlas` `scroll-gsap.md#10` — `ScrollTrigger` `onToggle` active step & geometric SVG morph |
| **08 / The Dark Room** | `DarkRoomSpecimen.tsx` | Full-bleed `#161614` Deep Basalt laboratory | Sticky curve telemetry (`Ease Out`, `Ease In-Out`, `Spring`), live SVG path draw, impulse shuttle |
| **09 / Typographic Lab** | `TypographyLabSection.tsx` *(New)* | Hands-on 5/7 interactive typesetting workbench on Raw Chalk | Live Measure (`ch`), Tracking (`em`), & Leading controls with real-time `JetBrains Mono` CSS readout |
| **10 / Craft Comparison** | `ComparisonSection.tsx` *(New)* | Interactive split-screen comparison: *Template Default* vs. *FORMWORK® Standard* | Pointer-drag & keyboard-scrubbed `clip-path` divider comparing 4 craft dimensions |
| **11 / Practice & Ethos** | `PracticeSection.tsx` | Calm 40/60 high-whitespace editorial spread | Sticky coordinates + Anime.js staggered manifesto reveals |
| **12 / Studio FAQ** | `FaqSection.tsx` *(New)* | `1px` Hairline Mortar architectural accordion | `Motion` `AnimatePresence` height/opacity expansion (`220ms` `--ease-out`) |
| **13 / Brand Statement & Colophon** | `ColophonFooter.tsx` *(Enhanced)* | Closing typographic statement + Commission CTA + Zurich CET clock + fitted `FORMWORK®` wordmark | `text-effects.md#14` edge-to-edge fitted wordmark + Commission Drawer |

---

## Anti-Slop & Authenticity Guardrails
- **Zero fabricated metrics, fake client counts, or invented testimonials.** All data and comparisons describe verifiable engineering and typographic craft.
- **Strict Animation Ownership:** GSAP owns scroll/pin/scrub/SplitText; Motion owns React state/layoutId/AnimatePresence/drag; CSS owns grain, hover/press, and underline draws.
- **Accessibility & Reduced Motion:** Every `SplitText` block carries an `sr-only` copy; interactive scrubbers support keyboard arrow keys; `prefers-reduced-motion` disables scroll scrubs/pins and keeps all content readable.

