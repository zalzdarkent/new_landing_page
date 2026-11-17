export interface ExhibitionWork {
  id: string;
  index: string;
  code: string;
  title: string;
  client: string;
  location: string;
  year: string;
  disciplines: string[];
  layout: 'left-wide' | 'right-wide' | 'panoramic';
  image: string;
  alt: string;
  summary: string;
  craftNote: string;
  blueprintNote: string;
  dimensions: string;
  specifications: { label: string; value: string }[];
}

export const EXHIBITION_WORKS: ExhibitionWork[] = [
  {
    id: 'kurokawa-pavilion',
    index: '01',
    code: 'FW-2026-KLP',
    title: 'Kurokawa Light Pavilion',
    client: 'Kunsthalle Basel Annex',
    location: 'Basel, Switzerland',
    year: '2026',
    disciplines: ['Spatial Web', 'Wayfinding Grammar', 'Variable Type System'],
    layout: 'left-wide',
    image: '/images/plate-01-pavilion.jpg',
    alt: 'Sunlit raw concrete gallery pavilion with crisp geometric light shafts across limestone walls',
    summary:
      'A digital exhibition monograph and physical wayfinding grammar engineered around natural daylight intervals and monolithic cast-in-place concrete proportions.',
    craftNote:
      'Every typographic measure mirrors the 1:1.618 structural bay ratio of the physical pavilion, eliminating decorative chrome in favor of pure spatial tension and solar-synchronized contrast.',
    blueprintNote:
      'BAY RATIO 1:1.618 // ZENITH APERTURE 14.2° // CAST LIMESTONE ROUGHNESS 0.88',
    dimensions: '42.0m × 26.0m × 8.4m',
    specifications: [
      { label: 'Structural Grid', value: '12-Col Swiss Orthographic' },
      { label: 'Typeface System', value: 'Cabinet Grotesk + Instrument Serif' },
      { label: 'Medium', value: 'WebGL PBR & Cast Aluminum Signage' },
      { label: 'Frame Budget', value: '60fps Locked (<3.2ms JS/Frame)' },
    ],
  },
  {
    id: 'braun-teletype',
    index: '02',
    code: 'FW-2025-T04',
    title: 'Taktil-04 Drafting Instrument',
    client: 'Vektor Atelier GmbH',
    location: 'Zurich, Switzerland',
    year: '2025',
    disciplines: ['Hardware Companion UI', 'Telemetry Spec', 'Spring Physics'],
    layout: 'right-wide',
    image: '/images/plate-02-instrument.jpg',
    alt: 'Precision-machined matte charcoal and brushed aluminum drafting instrument on a warm limestone plinth',
    summary:
      'Hardware-to-browser companion interface translating physical 24-step detent resistance and anodized dial inertia into zero-latency web controls.',
    craftNote:
      'Spring damping parameters were calibrated directly against the physical rotary encoder torque curve so screen feedback feels mechanically coupled to the machinist’s hand.',
    blueprintNote:
      'ENCODER 24-DETENT // SPRING k=140 c=22 m=0.9 // ANODIZED BEAD-BLAST #181816',
    dimensions: '184mm × 62mm × 19mm',
    specifications: [
      { label: 'Physics Model', value: 'k=140, c=22, m=0.9 (Critically Damped)' },
      { label: 'Input Latency', value: '<140ms Pointer-to-Compositor' },
      { label: 'Surface Finish', value: 'Bead-Blasted Basalt & Brushed Alu' },
      { label: 'Readout', value: 'Tabular-Nums Sub-Millimeter HUD' },
    ],
  },
  {
    id: 'monograph-xii',
    index: '03',
    code: 'FW-2025-MXII',
    title: 'Monograph XII: On Proportion',
    client: 'Birkhäuser Architectural Archive',
    location: 'Basel & Jakarta',
    year: '2025',
    disciplines: ['Editorial Architecture', 'Print-to-Web Parity', 'Digital Archive'],
    layout: 'panoramic',
    image: '/images/plate-03-monograph.jpg',
    alt: 'Thick linen-bound architectural monograph book open on a raw stone surface under directional side light',
    summary:
      'A 420-page Smyth-sewn linen monograph and companion interactive specimen allowing architects and typographers to inspect original lead-type grids at 1:1 scale.',
    craftNote:
      'Margins, baseline increments, and gutter ratios from the physical Munken Polar print edition are preserved identically in the browser via CSS Subgrid and fluid clamp() tokens.',
    blueprintNote:
      'SMYTH-SEWN FOLIO // 62CH OPTIMAL MEASURE // MUNKEN POLAR 120GSM UNCOATED',
    dimensions: '240mm × 320mm (Open: 480mm)',
    specifications: [
      { label: 'Line Measure', value: '62ch Optimal Editorial Cadence' },
      { label: 'Paper Stock', value: 'Munken Polar Rough 120gsm' },
      { label: 'Binding', value: 'Exposed Raw Linen Spine' },
      { label: 'Digital Sync', value: 'Deep-Linked Plate & Footnote Index' },
    ],
  },
  {
    id: 'aether-console',
    index: '04',
    code: 'FW-2026-AE09',
    title: 'Aether-09 Acoustic Reference Console',
    client: 'Klangwerk Spatial Audio',
    location: 'Berlin & Zurich',
    year: '2026',
    disciplines: ['Spatial Audio UI', 'Real-Time Shader', 'Tactile Controls'],
    layout: 'left-wide',
    image: '/images/hero-detail.jpg',
    alt: 'Close-up concrete tie-rod recess meeting brushed stainless steel acoustic reveal',
    summary:
      'Wavefield synthesis control room interface and spatial room-mode visualizer designed for mastering engineers working inside poured-concrete acoustic chambers.',
    craftNote:
      'Replaces skeuomorphicVU meters with high-contrast orthographic pressure maps, allowing engineers to read standing-wave nodes across 32 channels without visual fatigue.',
    blueprintNote:
      '32-CHANNEL WAVEFIELD // 2MM STAINLESS SHADOW GAP // 120HZ CANVAS TELEMETRY',
    dimensions: '1,200mm × 480mm Console Bay',
    specifications: [
      { label: 'Telemetry Rate', value: '60/120Hz rAF Batched Canvas' },
      { label: 'Contrast Standard', value: 'APCA Lc 92 Dark-Room Safe' },
      { label: 'Chassis Material', value: 'Cast Limestone & 316L Stainless' },
      { label: 'Control Grammar', value: 'Fine-Pointer Drag + Keyboard Step' },
    ],
  },
];

export interface StratumLayer {
  id: string;
  stratum: string;
  title: string;
  subtitle: string;
  description: string;
  engineeringSpec: string;
  tokens: { name: string; value: string }[];
  accentMode: 'grid' | 'typography' | 'springs' | 'material';
}

export const INTERFACE_STRATA: StratumLayer[] = [
  {
    id: 'stratum-grid',
    stratum: 'STRATUM 01 / FOUNDATION',
    title: 'Orthographic Swiss Shuttering',
    subtitle: 'Before a single surface is lit, the 12-column structural cage locks every proportion.',
    description:
      'Just as timber and steel formwork holds wet concrete under immense hydrostatic pressure, our CSS Grid and Subgrid architecture enforces strict vertical alignment across viewports from 375px to 2560px.',
    engineeringSpec: '12 COLUMNS // CLAMP(1REM, 2VW, 1.75REM) GUTTER // ZERO LAYOUT SHIFT',
    tokens: [
      { name: '--container-max', value: '90rem (1440px)' },
      { name: '--rail-padding', value: 'clamp(1.25rem, 4vw, 4rem)' },
      { name: 'Grid Hotkey', value: 'Press [G] Anytime' },
    ],
    accentMode: 'grid',
  },
  {
    id: 'stratum-type',
    stratum: 'STRATUM 02 / OPTICAL MASS',
    title: 'Typographic Tension & Measure',
    subtitle: 'Hierarchy built through scale contrast, optical serif punctuation, and tabular discipline.',
    description:
      'We pair the architectural geometry of Cabinet Grotesk with the high-contrast editorial inflection of Instrument Serif and the mechanical precision of JetBrains Mono. Numeric readouts never jitter during live telemetry.',
    engineeringSpec: 'FLUID CLAMP() SCALE // 62CH PROSE CAP // TABULAR-NUMS LOCKED',
    tokens: [
      { name: '--font-display', value: 'Cabinet Grotesk 700/800' },
      { name: '--font-serif', value: 'Instrument Serif Italic' },
      { name: 'Numeric Discipline', value: 'font-variant-numeric: tabular-nums' },
    ],
    accentMode: 'typography',
  },
  {
    id: 'stratum-motion',
    stratum: 'STRATUM 03 / KINETIC MECHANICS',
    title: 'Compositor-Only Choreography',
    subtitle: 'One smooth-scroll ticker, strict controller ownership, and interruptible spring physics.',
    description:
      'Lenis drives the GSAP ticker on a single requestAnimationFrame loop. GSAP owns scroll-scrubbed timelines and SplitText masks; Motion owns interruptible gesture springs and shared-layout transitions. Never both on the same DOM node.',
    engineeringSpec: 'TRANSFORM + OPACITY + CLIP-PATH // <220MS UI FEEDBACK // REDUCED-MOTION SAFE',
    tokens: [
      { name: '--ease-out', value: 'cubic-bezier(0.23, 1, 0.32, 1)' },
      { name: '--ease-in-out', value: 'cubic-bezier(0.77, 0, 0.175, 1)' },
      { name: 'Spring Constant', value: 'stiffness: 220, damping: 24' },
    ],
    accentMode: 'springs',
  },
  {
    id: 'stratum-matter',
    stratum: 'STRATUM 04 / SURFACE & LIGHT',
    title: 'Calibrated Limestone, Basalt & Glass',
    subtitle: 'Physical materiality rendered through PBR roughness, fractal paper grain, and directional light.',
    description:
      'We reject sterile #FFFFFF and void #000000 in favor of warm architectural stone (#F2F0EC) and dark-room basalt (#161614), punctuated by a single industrial datum pigment: Signal Vermilion (#D9381E).',
    engineeringSpec: 'PBR IOR 1.48 GLASS // 0.032 SVG FRACTAL GRAIN // APCA HIGH CONTRAST',
    tokens: [
      { name: '--bg-canvas', value: '#F2F0EC (Warm Limestone)' },
      { name: '--bg-darkroom', value: '#161614 (Deep Basalt)' },
      { name: '--accent-vermilion', value: '#D9381E (Signal Datum)' },
    ],
    accentMode: 'material',
  },
];

export interface ManifestoPoint {
  index: string;
  code: string;
  heading: string;
  body: string;
  principle: string;
}

export const PRACTICE_MANIFESTO: ManifestoPoint[] = [
  {
    index: '01',
    code: 'AXIOM I',
    heading: 'Form follows friction, never templates.',
    body: 'Most digital products fail before a single line of code is written because they borrow their skeleton from a category habit. We begin with the physical and cultural weight of the subject, casting the grid from the inside out.',
    principle: 'ARCHITECTURAL SPECIFICITY',
  },
  {
    index: '02',
    code: 'AXIOM II',
    heading: 'Unseen tolerances compound into permanence.',
    body: 'Optical margin alignment, tabular numerals that never shift width at 60Hz, and exit curves that settle in 160 milliseconds. Visitors rarely name these tolerances, yet they immediately feel the absence of shortcuts.',
    principle: 'SUB-MILLIMETER RIGOR',
  },
  {
    index: '03',
    code: 'AXIOM III',
    heading: 'Motion is structural architecture in time.',
    body: 'We refuse decorative bounce, gratuitous spin, and sluggish ease-in curves. Every scroll scrub, aperture expansion, and damped spring exists to clarify spatial causality and reward deliberate inspection.',
    principle: 'TEMPORAL CLARITY',
  },
];

export interface ArchiveLedgerEntry {
  id: string;
  year: string;
  code: string;
  title: string;
  client: string;
  location: string;
  discipline: string;
  image: string;
  ratio: string;
}

export const ARCHIVE_LEDGER: ArchiveLedgerEntry[] = [
  {
    id: 'arc-01',
    year: '2026',
    code: 'ARC-26.04',
    title: 'Kurokawa Light Pavilion',
    client: 'Kunsthalle Basel Annex',
    location: 'Basel',
    discipline: 'Spatial Web & Wayfinding',
    image: '/images/plate-01-pavilion.jpg',
    ratio: '1 : 1.618',
  },
  {
    id: 'arc-02',
    year: '2026',
    code: 'ARC-26.01',
    title: 'Aether-09 Acoustic Console',
    client: 'Klangwerk Berlin',
    location: 'Berlin',
    discipline: 'Hardware Telemetry UI',
    image: '/images/hero-detail.jpg',
    ratio: '32-CH / 120HZ',
  },
  {
    id: 'arc-03',
    year: '2025',
    code: 'ARC-25.09',
    title: 'Taktil-04 Drafting Instrument',
    client: 'Vektor Atelier',
    location: 'Zurich',
    discipline: 'Industrial Companion System',
    image: '/images/plate-02-instrument.jpg',
    ratio: 'k=140 / c=22',
  },
  {
    id: 'arc-04',
    year: '2025',
    code: 'ARC-25.05',
    title: 'Monograph XII: On Proportion',
    client: 'Birkhäuser Archive',
    location: 'Basel / Jakarta',
    discipline: 'Print & Digital Specimen',
    image: '/images/plate-03-monograph.jpg',
    ratio: '62CH FOLIO',
  },
  {
    id: 'arc-05',
    year: '2024',
    code: 'ARC-24.11',
    title: 'Sihlfeld Concrete Foundry Index',
    client: 'Holcim Architectural Lab',
    location: 'Zurich',
    discipline: '3D Material Library',
    image: '/images/plate-01-pavilion.jpg',
    ratio: 'PBR / GLSL',
  },
  {
    id: 'arc-06',
    year: '2024',
    code: 'ARC-24.06',
    title: 'Kemang Tropical Brutalism Archive',
    client: 'Nusantara Modernist Trust',
    location: 'Jakarta',
    discipline: 'Exhibition Monograph',
    image: '/images/plate-03-monograph.jpg',
    ratio: '12-COL SWISS',
  },
];

export interface StudioCapability {
  id: string;
  index: string;
  code: string;
  title: string;
  headline: string;
  whatItIs: string;
  whyItMatters: string;
  deliverables: string[];
  stack: string;
  metricLabel: string;
  metricValue: string;
  simulatorType: 'webgl' | 'grid' | 'motion' | 'hardware';
}

export const STUDIO_CAPABILITIES: StudioCapability[] = [
  {
    id: 'spatial-web',
    index: '01',
    code: 'CAP-01 // SPATIAL',
    title: 'Spatial Web & WebGL Architecture',
    headline: 'Physical materiality rendered at 60 frames per second.',
    whatItIs:
      'Bespoke interactive flagships, architectural digital monographs, and React Three Fiber scenes calibrated with studio lighting, refractive borosilicate glass, and physically based stone roughness.',
    whyItMatters:
      'When a digital surface behaves like cast limestone, anodized aluminum, or optical glass, visitors stop skimming and begin inspecting.',
    deliverables: [
      'Custom R3F & GLSL Material Studies',
      'Scroll-Synchronized Camera & Lighting Rigs',
      'Suspense-Gated Progressive WebGL Shells',
      'Interactive Axonometric Exploded Views',
    ],
    stack: 'THREE.JS / R3F / DREI / GLSL',
    metricLabel: 'RENDER TARGET',
    metricValue: '60FPS / DPR 1–2',
    simulatorType: 'webgl',
  },
  {
    id: 'typographic-systems',
    index: '02',
    code: 'CAP-02 // EDITORIAL',
    title: 'Typographic & Editorial Systems',
    headline: 'Fluid optical scales locked to orthographic Swiss grids.',
    whatItIs:
      'Complete design token architectures, custom clamp() typographic hierarchies, OpenType feature engineering, and multi-column layouts built for zero cumulative layout shift.',
    whyItMatters:
      'Typography carries 90% of a practice’s authority. Disciplined measure, tracking, and baseline alignment communicate rigor before a single sentence is parsed.',
    deliverables: [
      'DESIGN.md & Semantic Token Systems',
      'Fluid Clamp Type Scales & OpenType Rules',
      'Print-to-Browser Subgrid Parity',
      'Variable Font Proximity & Rag Calibration',
    ],
    stack: 'CABINET GROTESK / INSTRUMENT SERIF / SUBGRID',
    metricLabel: 'OPTIMAL MEASURE',
    metricValue: '60CH – 66CH',
    simulatorType: 'grid',
  },
  {
    id: 'motion-engineering',
    index: '03',
    code: 'CAP-03 // KINETICS',
    title: 'Design Engineering & Choreography',
    headline: 'Interruptible springs and compositor-only timelines.',
    whatItIs:
      'Production React 19 + TypeScript frontends where GSAP owns scroll timelines, Motion owns gesture/layout transitions, and CSS handles zero-JS micro-interactions.',
    whyItMatters:
      'Sluggish ease-in curves and competing animation controllers destroy immersion. Strict ownership guarantees tactile, 140ms–220ms UI responsiveness.',
    deliverables: [
      'GSAP ScrollTrigger Pin & Scrub Sequences',
      'Motion Shared-Element & Drawer Physics',
      'SplitText Line & Word Illumination Masks',
      'WCAG 2.2 & Reduced-Motion Parity',
    ],
    stack: 'GSAP 3 / MOTION / LENIS / SPLITTEXT',
    metricLabel: 'UI RESPONSE',
    metricValue: '140MS – 220MS',
    simulatorType: 'motion',
  },
  {
    id: 'hardware-ui',
    index: '04',
    code: 'CAP-04 // INSTRUMENTS',
    title: 'Physical-to-Digital Hardware UI',
    headline: 'Companion interfaces with mechanical detent honesty.',
    whatItIs:
      'Browser and embedded control surfaces for industrial instruments, acoustic reference hardware, and precision tools that mirror physical rotary encoder and switch torque.',
    whyItMatters:
      'Hardware practitioners notice immediately when companion software feels weightless. Matching screen damping to mechanical resistance unifies object and screen.',
    deliverables: [
      'Interactive Telemetry & Oscilloscope Views',
      'Tabular-Numeric Instrument Readouts',
      'Zero-Latency Pointer & Keyboard Stepping',
      'High-Contrast Dark-Room Color Ramps',
    ],
    stack: 'REACT 19 / TYPESCRIPT / SVG / CANVAS',
    metricLabel: 'INPUT COUPLING',
    metricValue: '1 : 1 DIRECT',
    simulatorType: 'hardware',
  },
];

export interface ProcessPhase {
  index: string;
  code: string;
  title: string;
  duration: string;
  summary: string;
  engineeringDetail: string;
  artifact: string;
  gateMetric: string;
  coordinates: { x: number; y: number; r: number };
}

export const PROCESS_PHASES: ProcessPhase[] = [
  {
    index: '01',
    code: 'PHASE 01 // SITE SURVEY',
    title: 'Excavation & First Principles',
    duration: 'WEEK 01',
    summary:
      'We strip away category clichés, audit the subject’s physical material world, and establish a non-negotiable Creative Direction before a single component is sketched.',
    engineeringDetail:
      'Includes competitive anti-slop audit, archival photography curation, and defining the single signature kinetic moment.',
    artifact: 'CREATIVE_DIRECTION.md',
    gateMetric: 'ZERO TEMPLATE PATTERNS',
    coordinates: { x: 75, y: 65, r: 28 },
  },
  {
    index: '02',
    code: 'PHASE 02 // SHUTTERING',
    title: 'Formwork & Token Architecture',
    duration: 'WEEK 02–03',
    summary:
      'Like timber and steel shuttering before concrete is poured, we lock the 12-column Swiss grid, fluid clamp() type scale, color calibration, and animation ownership matrix.',
    engineeringDetail:
      'Every easing curve, spring constant, and breakpoint column collapse is codified in CSS custom properties and TypeScript constants.',
    artifact: 'DESIGN.md + INTERACTION_MAP.md',
    gateMetric: '100% TOKEN COVERAGE',
    coordinates: { x: 160, y: 65, r: 38 },
  },
  {
    index: '03',
    code: 'PHASE 03 // POURING',
    title: 'Structural & Kinetic Casting',
    duration: 'WEEK 04–05',
    summary:
      'Full-fidelity React 19, TypeScript, GSAP ScrollTrigger, Motion, and React Three Fiber engineering. Every plate, drawer, and scroll sequence is built with compositor-friendly transforms.',
    engineeringDetail:
      'Single RAF loop uniting Lenis and GSAP ticker; code-split WebGL scenes behind Suspense boundaries with instant orthographic fallbacks.',
    artifact: 'PRODUCTION REACT + WEBGL BUILD',
    gateMetric: '60FPS COMPOSITOR LOCK',
    coordinates: { x: 245, y: 110, r: 48 },
  },
  {
    index: '04',
    code: 'PHASE 04 // CURING',
    title: 'Mechanical & Optical Tuning',
    duration: 'WEEK 06',
    summary:
      'Micro-calibrating spring damping, pointer proximity fields, X-ray flashlight masks, and variable typography across fine-pointer desktops and touch viewports.',
    engineeringDetail:
      'Every interactive control is tested for keyboard navigation, focus ring clarity, and interruptible mid-flight velocity preservation.',
    artifact: 'CALIBRATED INTERACTION SUITE',
    gateMetric: '<180MS INPUT FEEDBACK',
    coordinates: { x: 160, y: 155, r: 36 },
  },
  {
    index: '05',
    code: 'PHASE 05 // VERIFICATION',
    title: 'Environmental QA & Handover',
    duration: 'WEEK 07',
    summary:
      'Real-browser verification across desktop, tablet, and mobile viewports: auditing zero console errors, zero CLS on pinned sections, and full prefers-reduced-motion parity.',
    engineeringDetail:
      'Delivered as a self-owned, zero-bloat repository with complete architectural documentation for internal engineering teams.',
    artifact: 'VERIFIED PRODUCTION RELEASE',
    gateMetric: 'CLS 0.00 / A11Y VERIFIED',
    coordinates: { x: 95, y: 155, r: 54 },
  },
];

export interface FaqItem {
  id: string;
  code: string;
  question: string;
  answer: string;
  specNote: string;
}

export const STUDIO_FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    code: 'NOTE 01 // DELIVERABLES',
    question: 'Do you deliver static design files or production-engineered code?',
    answer:
      'We strongly prefer shipping production React + TypeScript + WebGL code alongside the complete token specification. Easing curves, interruptible spring physics, custom shaders, and scroll-scrubbed pins cannot be evaluated honestly inside static mockups.',
    specNote: 'STACK: REACT 19 / TS / VITE / NEXT / GSAP / R3F',
  },
  {
    id: 'faq-2',
    code: 'NOTE 02 // ARCHITECTURE',
    question: 'Why reject standard SaaS templates and symmetric card grids?',
    answer:
      'Templates optimize for assembly speed at the expense of institutional memory. When every company in a category shares the same three-column bento and purple gradient, the interface becomes invisible. Architectural specificity is proof of craft.',
    specNote: 'GRID: 12-COLUMN ASYMMETRIC SWISS SYSTEM',
  },
  {
    id: 'faq-3',
    code: 'NOTE 03 // PERFORMANCE',
    question: 'How do you keep continuous motion and 3D scenes fast on mobile hardware?',
    answer:
      'We drive Lenis and GSAP from a single requestAnimationFrame ticker, code-split Three.js behind Suspense boundaries, animate compositor-friendly properties (transform, opacity, bounded clip-path), and convert desktop scroll-pins into native touch snap-scrolling below 768px.',
    specNote: 'BUDGET: SINGLE RAF LOOP // ZERO LAYOUT THRASH',
  },
  {
    id: 'faq-4',
    code: 'NOTE 04 // ACCESSIBILITY',
    question: 'How does the experience behave when prefers-reduced-motion is enabled?',
    answer:
      'Every scroll scrub, continuous rotation, velocity marquee, and pinned sequence is gated through matchMedia. Visitors requesting reduced motion receive immediate opacity clarity, static orthographic compositions, full keyboard access, and zero hidden content.',
    specNote: 'STANDARD: WCAG 2.2 AA + REDUCED-MOTION PARITY',
  },
  {
    id: 'faq-5',
    code: 'NOTE 05 // ENGAGEMENT',
    question: 'How are commissions structured and how many projects do you take on?',
    answer:
      'To preserve senior principal involvement on every line of code and typography, we accept at most two flagship commissions per quarter across our Zurich and Jakarta studios. Engagements run on a fixed seven-week architectural cadence or dedicated quarterly retainers.',
    specNote: 'CAPACITY: MAX 02 COMMISSIONS PER QUARTER',
  },
  {
    id: 'faq-6',
    code: 'NOTE 06 // HANDOVER',
    question: 'Can our internal engineering team maintain the system after launch?',
    answer:
      'Yes. We avoid fragile black-box abstractions. Every commission ships with clean, strictly typed components, a documented token layer in CSS custom properties, and an explicit animation ownership map so your engineers can extend the system safely.',
    specNote: 'DOCUMENTATION: DESIGN.MD + INTERACTION_MAP.MD',
  },
];
