export interface ExhibitionWork {
  id: string;
  index: string;
  title: string;
  client: string;
  year: string;
  disciplines: string[];
  layout: 'left-wide' | 'right-wide' | 'panoramic';
  image: string;
  alt: string;
  summary: string;
  craftNote: string;
  specifications: { label: string; value: string }[];
}

export const EXHIBITION_WORKS: ExhibitionWork[] = [
  {
    id: 'kurokawa-pavilion',
    index: '01',
    title: 'Kurokawa Light Pavilion',
    client: 'Kunsthalle Basel Annex',
    year: '2026',
    disciplines: ['Spatial Web', 'Wayfinding', 'Type System'],
    layout: 'left-wide',
    image: '/images/plate-01-pavilion.jpg',
    alt: 'Sunlit raw concrete gallery pavilion with crisp geometric light shafts across limestone walls',
    summary:
      'A digital exhibition catalog and physical wayfinding grammar engineered around natural daylight intervals and monolithic concrete proportions.',
    craftNote:
      'Every typographic measure mirrors the 1:1.618 structural bay ratio of the physical pavilion, eliminating decorative chrome in favor of pure spatial tension.',
    specifications: [
      { label: 'Grid', value: '12-Col Swiss Architectural' },
      { label: 'Typeface', value: 'Cabinet Grotesk + Mono' },
      { label: 'Medium', value: 'WebGL & Cast Aluminum' },
    ],
  },
  {
    id: 'braun-teletype',
    index: '02',
    title: 'Taktil-04 Drafting Instrument',
    client: 'Vektor Atelier',
    year: '2025',
    disciplines: ['Industrial UI', 'Interactive Spec', 'Motion'],
    layout: 'right-wide',
    image: '/images/plate-02-instrument.jpg',
    alt: 'Precision-machined matte charcoal and brushed aluminum drafting instrument on a warm limestone plinth',
    summary:
      'Hardware-to-browser companion interface translating physical detent resistance and anodized dial inertia into zero-latency web controls.',
    craftNote:
      'Spring damping parameters were calibrated directly against the physical rotary encoder torque so screen feedback feels mechanically coupled.',
    specifications: [
      { label: 'Spring', value: 'k=100, c=20, m=1' },
      { label: 'Response', value: '140ms Ease-Out' },
      { label: 'Surface', value: 'Anodized & Basalt' },
    ],
  },
  {
    id: 'monograph-xii',
    index: '03',
    title: 'Monograph XII: On Proportion',
    client: 'Birkhauser Archive',
    year: '2025',
    disciplines: ['Editorial', 'Print System', 'Digital Archive'],
    layout: 'panoramic',
    image: '/images/plate-03-monograph.jpg',
    alt: 'Thick linen-bound architectural monograph book open on a raw stone surface under directional side light',
    summary:
      'A 420-page linen-bound architectural monograph and companion interactive specimen allowing typographers to inspect original lead-type grids.',
    craftNote:
      'Margins and gutter ratios from the Smyth-sewn print edition are preserved 1:1 in the digital reader, proving editorial restraint scales to the browser.',
    specifications: [
      { label: 'Measure', value: '62ch Optimal Line' },
      { label: 'Paper', value: 'Munken Polar 120gsm' },
      { label: 'Binding', value: 'Exposed Linen Spine' },
    ],
  },
];

export interface ManifestoPoint {
  index: string;
  heading: string;
  body: string;
}

export const PRACTICE_MANIFESTO: ManifestoPoint[] = [
  {
    index: '01',
    heading: 'Form follows friction, not templates.',
    body: 'Most digital work fails before a pixel is drawn because it borrows its structure from a category habit. We start with the material truth of the subject and build the grid from the inside out.',
  },
  {
    index: '02',
    heading: 'Unseen details compound into trust.',
    body: 'Optical margin alignment, tabular numerals that never jitter, and exit curves that respond in 140 milliseconds. A visitor may never name these choices, but they feel the absence of shortcuts.',
  },
  {
    index: '03',
    heading: 'Motion is architecture in time.',
    body: 'We reject decorative bounce and sluggish ease-in transitions. Every scroll scrub, clip-path reveal, and spring-damped interaction exists to clarify spatial hierarchy and reward curiosity.',
  },
];

export interface StudioCapability {
  id: string;
  index: string;
  title: string;
  headline: string;
  whatItIs: string;
  whyItMatters: string;
  deliverables: string[];
  stack: string;
}

export const STUDIO_CAPABILITIES: StudioCapability[] = [
  {
    id: 'spatial-web',
    index: '01',
    title: 'Spatial Web & WebGL',
    headline: 'Physical materiality rendered at 60 frames per second.',
    whatItIs:
      'Bespoke interactive flagships, architectural digital monographs, and React Three Fiber scenes calibrated with studio lighting and physically based roughness.',
    whyItMatters:
      'When a digital surface behaves like limestone, anodized aluminum, or optical glass, visitors stop skimming and begin inspecting.',
    deliverables: [
      'Custom R3F & GLSL Material Studies',
      'Scroll-Synchronized Camera & Lighting Rigs',
      'Async Code-Split WebGL Fallbacks',
    ],
    stack: 'THREE.JS / R3F / DREI / SUSPENSE',
  },
  {
    id: 'typographic-systems',
    index: '02',
    title: 'Typographic & Editorial Systems',
    headline: 'Fluid optical scales locked to architectural grids.',
    whatItIs:
      'Complete design token architectures, custom clamp() typographic hierarchies, and multi-column Swiss layouts engineered for zero layout shift.',
    whyItMatters:
      'Typography carries 90% of a studio’s authority. Disciplined measure, tracking, and baseline alignment communicate rigor before a single word is read.',
    deliverables: [
      'DESIGN.md & Token Specifications',
      'Fluid Clamp Type Scales & OpenType Rules',
      'Print-to-Browser Grid Parity',
    ],
    stack: 'CABINET GROTESK / INSTRUMENT SERIF / CSS GRID',
  },
  {
    id: 'motion-engineering',
    index: '03',
    title: 'Design Engineering & Motion',
    headline: 'Interruptible springs and compositor-only choreography.',
    whatItIs:
      'Production React + TypeScript frontends where GSAP owns scroll timelines, Motion owns gesture/layout transitions, and CSS handles lightweight hover states.',
    whyItMatters:
      'Sluggish ease-in curves and competing animation controllers break immersion. Strict ownership guarantees tactile, 140ms–220ms UI responsiveness.',
    deliverables: [
      'GSAP ScrollTrigger Pin & Scrub Sequences',
      'Motion Shared-Element & Drawer Physics',
      'Reduced-Motion & Keyboard Parity',
    ],
    stack: 'GSAP / MOTION / LENIS / ANIME.JS',
  },
  {
    id: 'hardware-ui',
    index: '04',
    title: 'Physical-to-Digital Hardware UI',
    headline: 'Companion interfaces with mechanical detent honesty.',
    whatItIs:
      'Browser and embedded control surfaces for industrial instruments, audio hardware, and precision tools that mirror physical knob and switch feel.',
    whyItMatters:
      'Hardware practitioners notice when software feels weightless. Matching screen spring damping to mechanical torque unifies the product.',
    deliverables: [
      'Interactive Telemetry & Curve Inspectors',
      'Tabular-Numeric Instrument Readouts',
      'Zero-Latency Pointer & Keyboard Controls',
    ],
    stack: 'REACT / TYPESCRIPT / SVG / WEBGL',
  },
];

export interface ProcessPhase {
  index: string;
  title: string;
  duration: string;
  summary: string;
  artifact: string;
}

export const PROCESS_PHASES: ProcessPhase[] = [
  {
    index: '01',
    title: 'Excavation',
    duration: 'WEEK 01',
    summary:
      'We strip away category clichés, audit the subject’s physical and cultural world, and establish a non-negotiable Creative Direction before a single component is sketched.',
    artifact: 'CREATIVE_DIRECTION.md',
  },
  {
    index: '02',
    title: 'Formwork',
    duration: 'WEEK 02–03',
    summary:
      'Like timber and steel shuttering before concrete is poured, we lock the 12-column grid, fluid clamp() type scale, color calibration, and animation ownership matrix.',
    artifact: 'DESIGN.md + INTERACTION_MAP.md',
  },
  {
    index: '03',
    title: 'Casting',
    duration: 'WEEK 04–06',
    summary:
      'Full-fidelity React, TypeScript, GSAP, Motion, and R3F engineering. Every plate, drawer, and scroll sequence is built with compositor-only transforms.',
    artifact: 'PRODUCTION REACT + VITE BUILD',
  },
  {
    index: '04',
    title: 'Calibration',
    duration: 'WEEK 07',
    summary:
      'Real-browser QA across desktop, tablet, and mobile viewports: tuning spring damping, verifying zero console errors, and auditing reduced-motion fallbacks.',
    artifact: 'BROWSER QA & LAUNCH',
  },
];

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const STUDIO_FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'Do you deliver design-only Figma files or production code?',
    answer:
      'Both, though we strongly prefer shipping production React + TypeScript code. Easing curves, spring physics, WebGL shaders, and scroll-scrubbed transitions cannot be evaluated honestly in static mockups.',
  },
  {
    id: 'faq-2',
    question: 'Why avoid generic card grids and standard SaaS templates?',
    answer:
      'Templates optimize for assembly speed at the expense of brand memory. For design-led studios and technical products, the composition itself is proof of craft.',
  },
  {
    id: 'faq-3',
    question: 'How do you keep heavy motion and 3D fast on mobile?',
    answer:
      'We code-split WebGL scenes behind Suspense boundaries, animate exclusively compositor-friendly properties (transform, opacity, clip-path), and convert desktop scroll-pins into native touch snap-scrolling below 768px.',
  },
  {
    id: 'faq-4',
    question: 'What does prefers-reduced-motion support look like?',
    answer:
      'Every scroll scrub, stagger, and 3D continuous rotation is gated. Visitors with reduced-motion enabled receive instant opacity clarity, full access to all content, and zero hidden sections.',
  },
];
