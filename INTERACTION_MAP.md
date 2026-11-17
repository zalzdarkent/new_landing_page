# INTERACTION MAP: FORMWORK® (`landing_page`)

**Status:** Interaction & Choreography Blueprint (Pre-Implementation)  
**Aligned With:** [CREATIVE_DIRECTION.md](file:///home/mis-inoac/Projects/React/landing_page/CREATIVE_DIRECTION.md) & [DESIGN.md](file:///home/mis-inoac/Projects/React/landing_page/DESIGN.md)  
**Core Principle:** Every interaction serves spatial clarity, tactile honesty, or typographic craft. Frequent UI controls stay under `300ms` (`--ease-out`); continuous gestures and 3D reactions use damped spring physics (`stiffness: 100, damping: 20`). Custom lagging DOM cursors are explicitly excluded in favor of native pointer responsiveness and physical surface feedback.

---

## Global Persistent Systems

### 1. `TopRail` (Architectural Header)
- **Layout:** `64px` fixed top rail, `1px` Hairline Mortar bottom border, `#F2F0EC/90` with `8px` backdrop blur activated only after `24px` scroll.
- **Navigation:** `FORMWORK®` wordmark (left), 3 chapter anchors (`01 Works`, `02 Specimen`, `03 Practice`), `[G] Grid` toggle, and `Commission` link.
- **Active State:** Framer Motion `layoutId="nav-indicator"` slides a `4px` Signal Vermilion (`#D9381E`) dot beneath the active chapter using `--ease-in-out` (`220ms`).
- **Grid Toggle (`[G]`):** Keyboard shortcut `g` (when no input is focused) or header click toggles the 12-column Swiss grid overlay (`180ms` opacity fade).

---

## Rhythmic Pacing Across Chapters

```text
[01 Hero: Intense / Spatial 3D]
        ↓  (Clean hairline break)
[02 Selected Works: Editorial / Clip-Path Plates]
        ↓  (Full-bleed chromatic shift: Limestone → Deep Basalt)
[03 Dark Room Specimen: High-Density Interactive / Sticky Scrub]
        ↓  (Chromatic release: Deep Basalt → Warm Limestone)
[04 Practice Manifesto: Calm / Generous Negative Space]
        ↓  (1px Hairline rule)
[05 Colophon & Commission: Grounded Tactile Close]
```

---

## Chapter 01 — Overture Hero (`#hero`)

1. **Section Purpose:** Establish FORMWORK®'s obsession with proportion, materiality, and interactive precision within the first viewport (`min-h-[100dvh]`) without generic SaaS hero tropes.
2. **Visual Composition:** Asymmetric 7/5 split on Warm Limestone (`#F2F0EC`). Left zone holds the typographic statement with inline type-height visual punctuation; right zone holds a dedicated, unobstructed React Three Fiber (R3F) viewport. Zero text overlaps the 3D canvas.
3. **Layout Architecture:** 12-column CSS Grid. `Cols 1–7` (headline, 1-sentence thesis, single primary CTA); `Cols 8–12` (R3F canvas framed by a `1px` Hairline Mortar border). Equal outer margins (`clamp(1.25rem, 4vw, 4rem)`).
4. **Typography Treatment:** `--text-hero` (`clamp(2.75rem, 6.2vw, 5.75rem)`) in `Cabinet Grotesk 700` (`-0.04em` tracking, `0.94` leading), punctuated by an italicized `Instrument Serif` verb and an inline `0.82em` tall architectural concrete/glass detail thumbnail sitting on the baseline.
5. **Image & Media Direction:**
   - Inline visual: High-contrast monochrome architectural detail (`object-cover`, `2px` radius).
   - 3D Object: R3F physical monolith — a beveled Warm Limestone block intersecting a refractive optical glass slab under soft studio rim lighting.
6. **Interactive Behavior:**
   - Moving the pointer over the hero gently tilts the R3F monolith via Framer Motion `useSpring` (`stiffness: 100, damping: 20`) — never raw 1:1 tracking.
   - Primary CTA (`Enter Archive`) features subtle magnetic pull (`max ±4px` within button bounds) and `:active` press (`scale(0.97)` in `120ms`).
7. **Scroll Behavior:** Initial viewport locks cleanly at `min-h-[100dvh]`. As the user scrolls past `01`, the R3F monolith subtly rotates along its Y-axis (`+18deg`) and recedes slightly (`scale(0.96)`) before leaving the viewport.
8. **Animation Choreography:**
   - *Entrance (`onMount`, total `850ms`):* Anime.js masks each headline line upward (`translateY(100%)` → `0%`, `overflow: hidden` wrapper, `45ms` stagger, `--ease-out`). The inline image scales from `0.92` to `1` (`500ms`). The R3F monolith fades in (`opacity: 0 → 1`, `600ms`) with a gentle settle.
9. **Transition to Next Section:** A full-width `1px` Hairline Mortar rule with a `01 / 02` index marker cleanly separates the hero from Selected Works — no bouncing scroll arrows.

---

## Chapter 02 — Selected Works (`#works`)

1. **Section Purpose:** Showcase 3 flagship studio artifacts as curated exhibition plates rather than a 3-column card grid.
2. **Visual Composition:** Alternating asymmetric plates separated by generous negative space:
   - *Plate 01:* `Cols 1–8` large landscape visual + `Cols 9–12` top-aligned metadata column.
   - *Plate 02:* `Cols 1–4` metadata column + `Cols 5–12` offset landscape visual.
   - *Plate 03:* `Cols 1–12` panoramic wide plate with split top header (`Cols 1–6` title, `Cols 7–12` discipline & year).
3. **Layout Architecture:** CSS Grid with `clamp(4rem, 8vw, 7rem)` vertical gap between plates. Zero captions below images; all metadata lives in adjacent structural columns bounded by `1px` hairlines.
4. **Typography Treatment:** Plate titles in `--text-h2` (`Cabinet Grotesk 500`), indices (`01`, `02`, `03`) and scope tags (`Spatial Web`, `Identity System`, `Type & Motion`) in `JetBrains Mono 12px`.
5. **Image & Media Direction:** Crisp architectural, industrial, and editorial design photography graded to warm neutral stone. Sharp `2px` frame corners on `#FAF9F6` Raw Chalk backing.
6. **Interactive Behavior:**
   - Hovering a plate triggers a `400ms` `--ease-out` inner image zoom (`scale(1.025)`) inside its `overflow: hidden` frame, while the adjacent title's baseline rule draws left-to-right (`180ms`).
   - Clicking a plate opens a clean, spring-animated **Case Study Drawer / Modal** (`240ms` `--ease-out`, `scale(0.96) → 1`) with project notes and larger detail views.
7. **Scroll Behavior:** GSAP ScrollTrigger applies subtle vertical parallax (`-24px` to `+24px` `translateY` on the inner image at `1.08` height) as each plate crosses the viewport, creating physical depth without jitter.
8. **Animation Choreography:**
   - *Plate Entrance:* GSAP ScrollTrigger (`start: "top 82%"`) animates `clip-path: inset(0 0 100% 0)` → `inset(0 0 0% 0)` over `700ms` `--ease-out`, paired with a `40ms` staggered metadata fade.
9. **Transition to Next Section:** The final panoramic plate gives way to a full-bleed chromatic inversion from **Warm Limestone (`#F2F0EC`)** to **Deep Basalt (`#161614`)**, signaling entry into *The Dark Room*.

---

## Chapter 03 — The Dark Room: Interactive Craft Specimen (`#specimen`)

1. **Section Purpose:** The signature surprise for design-obsessed visitors — an interactive motion, easing, and grid-deconstruction laboratory built directly into the page.
2. **Visual Composition:** Full-bleed `#161614` Deep Basalt canvas. Left column (`Cols 1–4`) acts as the control console; right stage (`Cols 5–12`) displays a live geometric & typographic specimen that physically deconstructs and reassembles.
3. **Layout Architecture:** Sticky left console (`position: sticky; top: 96px`) paired with a tall scroll-scrubbed or interactive right stage (`min-h-[100dvh]`).
4. **Typography Treatment:** High-contrast `#F2F0EC` Warm Limestone headings (`--text-h1`), `#9A9790` technical annotations, and live `JetBrains Mono` readouts showing exact cubic-bezier coordinates, spring stiffness/damping, and scrub progress (`0.00`–`1.00`).
5. **Image & Media Direction:** Vector drafting geometry (precision SVG grid lines, bounding boxes, baseline guides) combined with kinetic `Cabinet Grotesk` + `Instrument Serif` display typography.
6. **Interactive Behavior:**
   - Visitors can switch between three live motion modes (`Ease Out`, `Ease In-Out`, `Spring Physics`) using tactile hairline tabs (`layoutId` active indicator).
   - Clicking **Replay / Trigger Specimen** fires a live comparison bar and SVG curve trace so designers can *feel* the difference between curves in real time.
7. **Scroll Behavior:** GSAP ScrollTrigger pins the specimen stage briefly (or scrubs smoothly across `120vh` of scroll) so that scrolling down separates the typographic specimen into its underlying architectural layers (Grid → Baseline → Vector Form → Final Type).
8. **Animation Choreography:**
   - *Drafting Lines:* Anime.js animates SVG `stroke-dashoffset` (`600ms`, `25ms` stagger) when entering the Dark Room.
   - *Layer Separation:* GSAP ScrollTrigger scrubs `transform: translate3d()` and `opacity` across layers with `scrub: 0.6` for silky inertia.
9. **Transition to Next Section:** Clean full-bleed return from **Deep Basalt (`#161614`)** back to **Warm Limestone (`#F2F0EC`)**, resetting the visual temperature for calm reading.

---

## Chapter 04 — Practice & Ethos (`#practice`)

1. **Section Purpose:** Provide a calm, high-whitespace breathing room that articulates how FORMWORK® thinks about systems, typography, and engineering.
2. **Visual Composition:** Minimalist 40/60 editorial spread with generous negative space (`40%+` open canvas). Zero imagery, zero 3D — pure typographic authority.
3. **Layout Architecture:** `Cols 1–4` sticky chapter index (`04 / PRACTICE`) and studio coordinates (district/city only, e.g., *Zurich / Jakarta*). `Cols 5–12` stacked manifesto statements separated by `1px` Hairline Mortar rules.
4. **Typography Treatment:** `--text-body-lg` (`clamp(1.125rem, 1.35vw, 1.375rem)`) constrained to `55ch` max width, paired with `Instrument Serif` italic emphasis on key principles.
5. **Image & Media Direction:** None. Restraint is the visual statement here, contrasting the intensity of Chapter 03.
6. **Interactive Behavior:** Hovering any manifesto row subtly highlights its left index number in Signal Vermilion (`#D9381E`, `160ms` transition).
7. **Scroll Behavior:** Smooth vertical reading; sticky left column remains anchored until the bottom of the third manifesto block.
8. **Animation Choreography:**
   - *Text Reveal:* Anime.js line-by-line opacity + `translateY(16px → 0)` reveal (`450ms`, `40ms` stagger, `--ease-out`), triggered once when entering the viewport.
9. **Transition to Next Section:** A crisp `1px` Hairline Mortar divider leads directly into the Colophon.

---

## Chapter 05 — Colophon & Commission (`#commission`)

1. **Section Purpose:** Close the exhibition with a clear, single-action invitation to collaborate and transparent craft credits.
2. **Visual Composition:** Grounded architectural footer on Warm Limestone (`#F2F0EC`). Large closing typographic statement on the left (`Cols 1–7`), primary `Start a Commission` CTA and live studio clock on the right (`Cols 8–12`).
3. **Layout Architecture:** 2-row architectural footer: top row for commission action, bottom row (`1px` top hairline) for colophon metadata (typefaces, motion stack, and `[G]` grid shortcut reminder).
4. **Typography Treatment:** `--text-h1` closing line, `JetBrains Mono 12px` live local time (`tabular-nums`), and crisp `14px` colophon credits.
5. **Image & Media Direction:** Minimalist SVG studio mark (`FORMWORK®`) only.
6. **Interactive Behavior:**
   - Clicking `Start a Commission` opens a focused, distraction-free **Commission Inquiry Drawer** (with label-above inputs, validation below, and zero floating-label gimmicks) or copies/launches direct studio contact with instant inline confirmation (`Copied`).
   - Button `:active` press feedback (`scale(0.97)`).
7. **Scroll Behavior:** Standard natural scroll settle at page bottom; no artificial scroll-jacking.
8. **Animation Choreography:** Subtle `opacity` + `translateY(12px → 0)` entrance on the closing headline (`500ms` `--ease-out`).

---

## Responsive Interaction Matrix

| Breakpoint | Grid & Hero | Works & Parallax | Dark-Room Specimen | Touch & Reduced Motion |
| :--- | :--- | :--- | :--- | :--- |
| **Desktop (`>= 1024px`)** | 12-col grid; inline hero image at type-height; R3F pointer-damped tilt active. | Alternating 7/5 zig-zag plates; GSAP inner parallax & `clip-path` reveals. | Sticky left console + scroll-scrubbed right stage; `[G]` key grid toggle active. | Full choreography at `60fps` compositor-only transforms. |
| **Tablet (`768px–1023px`)** | 8-col grid; 7/5 hero tightens to 6/6 or stacked if narrow. | Plates hold 2-col asymmetric ratio with reduced parallax (`±12px`). | Console stacks above stage; interactive curve tabs remain live. | All interactive controls maintain `44px` minimum hit area. |
| **Mobile (`< 768px`)** | Single-column collapse; inline hero image stacks cleanly below headline; R3F monolith uses gentle auto-idle + touch drag. | Single-column plates; parallax disabled to preserve native scroll momentum. | Scroll-pinning disabled; stage becomes tap-to-toggle interactive specimen. | Zero horizontal overflow; `prefers-reduced-motion` collapses all reveals to instant opacity fades. |

