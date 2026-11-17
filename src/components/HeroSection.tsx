import { Suspense, lazy, useCallback, useEffect, useRef, useState } from 'react';
import anime from 'animejs';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AnimatePresence, motion, useMotionValue, useSpring } from 'motion/react';
import type { MonolithMode } from './HeroMonolith';

const HeroMonolith = lazy(() =>
  import('./HeroMonolith').then((mod) => ({ default: mod.HeroMonolith }))
);

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  reducedMotion: boolean;
  onNavigate: (id: string) => void;
  onOpenCommission?: () => void;
}

const ROTATING_WORDS = [
  'proportion.',
  'materiality.',
  'permanence.',
  'instrument.',
] as const;

const MONOLITH_MODES: { id: MonolithMode; index: string; label: string }[] = [
  { id: 'assembled', index: '01', label: 'Assembled' },
  { id: 'exploded', index: '02', label: 'Exploded' },
  { id: 'wireframe', index: '03', label: 'Wireframe' },
  { id: 'solar', index: '04', label: 'Solar Study' },
];

export function HeroSection({
  reducedMotion,
  onNavigate,
  onOpenCommission,
}: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const inlineFrameRef = useRef<HTMLButtonElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const vecTextRef = useRef<HTMLSpanElement>(null);
  const scrubTextRef = useRef<HTMLSpanElement>(null);
  const monolithScrollRef = useRef(0);

  const [wordIndex, setWordIndex] = useState(0);
  const [wordPaused, setWordPaused] = useState(false);
  const [monolithMode, setMonolithMode] = useState<MonolithMode>('assembled');
  const [sunAzimuth, setSunAzimuth] = useState<number>(28);

  const btnX = useMotionValue(0);
  const btnY = useMotionValue(0);
  const springX = useSpring(btnX, { stiffness: 220, damping: 24, mass: 0.8 });
  const springY = useSpring(btnY, { stiffness: 220, damping: 24, mass: 0.8 });

  const handlePointerTelemetry = useCallback(
    (coords: { x: number; y: number }) => {
      if (vecTextRef.current) {
        vecTextRef.current.textContent = `VEC [${coords.x.toFixed(2)}, ${coords.y.toFixed(2)}]`;
      }
    },
    []
  );

  // Rotating kinetic word slot (frontend-atlas text-effects.md#8)
  useEffect(() => {
    if (reducedMotion || wordPaused) return;
    const id = window.setInterval(() => {
      setWordIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
    }, 3200);
    return () => window.clearInterval(id);
  }, [reducedMotion, wordPaused]);

  // Choreographed entrance + scroll telemetry (via DOM ref, zero React re-renders)
  useEffect(() => {
    if (reducedMotion || !headlineRef.current) return;

    const lines = headlineRef.current.querySelectorAll('.hero-line-inner');
    const inlineEl = inlineFrameRef.current;
    const metaEl = metaRef.current;

    anime.set(lines, { translateY: '105%', opacity: 0 });
    anime({
      targets: lines,
      translateY: ['105%', '0%'],
      opacity: [0, 1],
      duration: 720,
      delay: anime.stagger(65, { start: 50 }),
      easing: 'cubicBezier(0.23, 1, 0.32, 1)',
    });

    if (inlineEl) {
      anime.set(inlineEl, { scale: 0.9, opacity: 0 });
      anime({
        targets: inlineEl,
        scale: [0.9, 1],
        opacity: [0, 1],
        duration: 540,
        delay: 210,
        easing: 'cubicBezier(0.23, 1, 0.32, 1)',
      });
    }

    if (metaEl) {
      anime.set(metaEl, { opacity: 0, translateY: 14 });
      anime({
        targets: metaEl,
        opacity: [0, 1],
        translateY: [14, 0],
        duration: 520,
        delay: 260,
        easing: 'cubicBezier(0.23, 1, 0.32, 1)',
      });
    }

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: 'bottom top',
      onUpdate: (self) => {
        monolithScrollRef.current = self.progress;
        if (scrubTextRef.current) {
          const pct = Math.round(self.progress * 100);
          scrubTextRef.current.textContent = `SCRUB ${String(pct).padStart(2, '0')}%`;
        }
      },
    });

    return () => {
      trigger.kill();
      anime.remove(lines);
      if (inlineEl) anime.remove(inlineEl);
      if (metaEl) anime.remove(metaEl);
    };
  }, [reducedMotion]);

  return (
    <section
      id="hero"
      ref={sectionRef}
      onPointerMove={(e) => {
        if (!spotlightRef.current || reducedMotion) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        spotlightRef.current.style.setProperty('--hx', `${x}px`);
        spotlightRef.current.style.setProperty('--hy', `${y}px`);
      }}
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden pt-20 pb-8 lg:pt-24 lg:pb-10"
    >
      {/* Always-on cursor-reactive ambient architectural spotlight */}
      <div
        ref={spotlightRef}
        aria-hidden="true"
        style={
          {
            '--hx': '65%',
            '--hy': '40%',
            background:
              'radial-gradient(680px circle at var(--hx) var(--hy), rgba(217, 56, 30, 0.06), rgba(207, 200, 186, 0.14) 42%, transparent 72%)',
          } as React.CSSProperties
        }
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-500"
      />

      {/* Top Architectural Telemetry Strip */}
      <div className="fw-container relative z-10 mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border-hairline)] pb-3 text-[var(--ink-secondary)]">
          <div className="flex items-center gap-3">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent-vermilion)] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--accent-vermilion)]" />
            </span>
            <span className="type-meta uppercase">
              ARCHITECTURE OF DIGITAL MATTER
            </span>
          </div>

          <div className="hidden items-center gap-6 sm:flex">
            <span ref={vecTextRef} className="type-meta">
              VEC [0.00, 0.00]
            </span>
            <span className="type-meta">SUN {sunAzimuth}° AZM</span>
            <span
              ref={scrubTextRef}
              className="type-meta text-[var(--ink-primary)]"
            >
              SCRUB 00%
            </span>
          </div>
        </div>
      </div>

      {/* Main Spatial Grid */}
      <div className="fw-container relative z-10 my-auto">
        <div className="fw-grid items-end gap-y-8 lg:gap-y-10">
          {/* Left Editorial & Kinetic Zone: Cols 1-7 */}
          <div className="col-span-4 md:col-span-8 lg:col-span-7">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className="type-meta rounded-[2px] border border-[var(--border-hairline)] bg-[var(--bg-surface)] px-2.5 py-1 text-[var(--ink-primary)]">
                01 / SPATIAL &amp; TYPOGRAPHIC PRACTICE
              </span>
              <span className="type-meta rounded-[2px] border border-[var(--border-hairline)] px-2.5 py-1 text-[var(--ink-secondary)]">
                ZURICH — JAKARTA
              </span>
            </div>

            <h1
              ref={headlineRef}
              className="type-hero text-[var(--ink-primary)]"
            >
              <span className="block overflow-hidden pb-1">
                <span className="hero-line-inner block">
                  Digital matter{' '}
                  <span className="type-serif-accent font-normal">cast</span>
                </span>
              </span>

              <span className="block overflow-hidden pb-1">
                <span className="hero-line-inner flex flex-wrap items-baseline gap-x-3 sm:gap-x-4">
                  <span>with</span>
                  <button
                    type="button"
                    ref={inlineFrameRef}
                    onClick={() => onNavigate('aperture')}
                    title="Inspect Kurokawa Daylight Study"
                    className="group relative hidden h-[0.76em] w-[1.55em] translate-y-[0.06em] origin-center overflow-hidden rounded-[2px] border border-[var(--border-hairline-strong)] align-baseline md:inline-block"
                  >
                    <img
                      src="/images/hero-detail.jpg"
                      alt="Architectural shadow gap reveal"
                      className="h-full w-full object-cover transition-transform duration-300 ease-[var(--ease-out)] group-hover:scale-110"
                    />
                    <span className="pointer-events-none absolute inset-0 bg-[var(--accent-vermilion)]/15 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                  </button>
                  <span>measured</span>
                </span>
              </span>

              {/* Height-masked rotating kinetic word slot (fixed width prevents layout shift) */}
              <span className="block overflow-hidden pb-2">
                <span className="hero-line-inner flex flex-wrap items-baseline gap-x-3">
                  <button
                    type="button"
                    onClick={() =>
                      setWordIndex((prev) => (prev + 1) % ROTATING_WORDS.length)
                    }
                    onPointerEnter={() => setWordPaused(true)}
                    onPointerLeave={() => setWordPaused(false)}
                    data-cursor="label"
                    data-cursor-label="CYCLE AXIOM"
                    aria-label={`Current principle: ${ROTATING_WORDS[wordIndex]}. Click to cycle.`}
                    className="group relative inline-flex items-baseline text-left text-[var(--accent-vermilion)]"
                  >
                    <span className="relative inline-grid min-w-[6.2em] overflow-hidden pb-1">
                      <AnimatePresence mode="popLayout" initial={false}>
                        <motion.span
                          key={ROTATING_WORDS[wordIndex]}
                          initial={
                            reducedMotion
                              ? undefined
                              : { y: '105%', opacity: 0 }
                          }
                          animate={{ y: '0%', opacity: 1 }}
                          exit={
                            reducedMotion
                              ? undefined
                              : { y: '-105%', opacity: 0 }
                          }
                          transition={{
                            duration: 0.42,
                            ease: [0.23, 1, 0.32, 1],
                          }}
                          className="type-serif-accent block pr-2 font-normal"
                        >
                          {ROTATING_WORDS[wordIndex]}
                        </motion.span>
                      </AnimatePresence>
                    </span>
                    <span className="type-meta ml-1 self-center rounded-[2px] border border-[var(--border-hairline)] bg-[var(--bg-surface)] px-1.5 py-0.5 text-[var(--ink-secondary)] group-hover:border-[var(--accent-vermilion)] group-hover:text-[var(--accent-vermilion)]">
                      0{wordIndex + 1}/0{ROTATING_WORDS.length} ↻
                    </span>
                  </button>
                </span>
              </span>
            </h1>

            {/* Mobile stacked architectural detail */}
            <div className="mt-4 h-28 w-full overflow-hidden rounded-[2px] border border-[var(--border-hairline)] md:hidden">
              <img
                src="/images/hero-detail.jpg"
                alt="Cast limestone concrete and brushed steel shadow gap"
                className="h-full w-full object-cover"
              />
            </div>

            <div
              ref={metaRef}
              className="mt-7 border-t border-[var(--border-hairline)] pt-6 lg:mt-10"
            >
              <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
                <p className="max-w-[36ch] text-base leading-relaxed text-[var(--ink-secondary)]">
                  Spatial, typographic, and kinetic systems cast with physical
                  mass.
                </p>

                <div className="flex flex-wrap items-center gap-3">
                  <motion.a
                    href="#works"
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate('works');
                    }}
                    style={
                      reducedMotion ? undefined : { x: springX, y: springY }
                    }
                    onPointerMove={(e) => {
                      if (reducedMotion) return;
                      const rect = e.currentTarget.getBoundingClientRect();
                      const relX = (e.clientX - rect.left) / rect.width - 0.5;
                      const relY = (e.clientY - rect.top) / rect.height - 0.5;
                      btnX.set(relX * 8);
                      btnY.set(relY * 6);
                    }}
                    onPointerLeave={() => {
                      btnX.set(0);
                      btnY.set(0);
                    }}
                    className="fw-btn-tactile fw-roll inline-flex min-h-[46px] shrink-0 items-center gap-3 rounded-[2px] bg-[var(--accent-vermilion)] px-6 text-sm font-medium tracking-[-0.01em] text-[#FAF9F6] hover:bg-[var(--accent-vermilion-hover)]"
                  >
                    <span className="fw-roll__mask">
                      <span className="fw-roll__line">Inspect Exhibition</span>
                      <span className="fw-roll__line" aria-hidden="true">
                        Inspect Exhibition
                      </span>
                    </span>
                    <span aria-hidden="true" className="type-meta">
                      04 PLATES →
                    </span>
                  </motion.a>

                  {onOpenCommission && (
                    <button
                      type="button"
                      onClick={onOpenCommission}
                      className="fw-btn-tactile type-meta min-h-[46px] rounded-[2px] border border-[var(--border-hairline-strong)] bg-[var(--bg-surface)] px-4 text-[var(--ink-primary)] hover:border-[var(--ink-primary)]"
                    >
                      COMMISSION BRIEF
                    </button>
                  )}
                </div>
              </div>

              {/* Interactive Chapter Jump Index */}
              <div className="mt-6 grid grid-cols-2 gap-2 border-t border-[var(--border-hairline)] pt-4 sm:grid-cols-4">
                {[
                  { id: 'aperture', code: '01', label: 'Light Aperture' },
                  { id: 'typo', code: '02', label: 'Form + Work' },
                  { id: 'works', code: '03', label: 'Four Plates' },
                  { id: 'taktil', code: '04', label: 'Taktil Console' },
                ].map((jump) => (
                  <button
                    key={jump.id}
                    type="button"
                    onClick={() => onNavigate(jump.id)}
                    className="group flex items-center justify-between rounded-[2px] border border-transparent px-2.5 py-1.5 text-left transition-colors hover:border-[var(--border-hairline)] hover:bg-[var(--bg-surface)]"
                  >
                    <span className="type-meta text-[var(--ink-secondary)] group-hover:text-[var(--ink-primary)]">
                      <strong className="font-normal text-[var(--accent-vermilion)]">
                        {jump.code}
                      </strong>{' '}
                      {jump.label}
                    </span>
                    <span
                      aria-hidden="true"
                      className="type-meta text-[var(--ink-secondary)] transition-transform duration-150 group-hover:translate-x-0.5 group-hover:text-[var(--accent-vermilion)]"
                    >
                      ↘
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Interactive 3D Environment + Live Controls: Cols 8-12 */}
          <div className="col-span-4 md:col-span-8 lg:col-span-5">
            <Suspense
              fallback={
                <div
                  aria-label="Loading 3D monolith study"
                  className="flex h-[320px] w-full items-end justify-between rounded-[2px] border border-[var(--border-hairline)] bg-[#EAE6DF] p-3 text-[var(--ink-secondary)] sm:h-[420px] lg:h-[540px]"
                >
                  <span className="type-meta">FIG. 01 — MONOLITH STUDY</span>
                  <span className="type-meta">INITIALIZING WEBGL</span>
                </div>
              }
            >
              <HeroMonolith
                reducedMotion={reducedMotion}
                scrollProgress={monolithScrollRef}
                mode={monolithMode}
                sunAzimuth={sunAzimuth}
                onPointerTelemetry={handlePointerTelemetry}
              />
            </Suspense>

            {/* Interactive Monolith Assembly & Daylight Control Deck */}
            <div className="mt-3 rounded-[2px] border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-3">
              <div className="mb-2.5 flex items-center justify-between">
                <span className="type-meta text-[var(--ink-secondary)]">
                  INTERACTIVE RIG // SELECT ASSEMBLY STATE
                </span>
                <span className="type-meta text-[var(--accent-vermilion)]">
                  LIVE WEBGL
                </span>
              </div>

              <div
                role="tablist"
                aria-label="3D Monolith assembly state"
                className="grid grid-cols-2 gap-1.5 sm:grid-cols-4"
              >
                {MONOLITH_MODES.map((m) => {
                  const active = monolithMode === m.id;
                  return (
                    <button
                      key={m.id}
                      role="tab"
                      type="button"
                      aria-selected={active}
                      onClick={() => setMonolithMode(m.id)}
                      className={`fw-btn-tactile type-meta min-h-[36px] rounded-[2px] border px-2 py-1 text-center transition-colors ${
                        active
                          ? 'border-[var(--accent-vermilion)] bg-[var(--accent-vermilion)] text-[#FAF9F6]'
                          : 'border-[var(--border-hairline)] bg-[var(--bg-canvas)] text-[var(--ink-primary)] hover:border-[var(--ink-primary)]'
                      }`}
                    >
                      {m.index} {m.label}
                    </button>
                  );
                })}
              </div>

              {/* Live Daylight Incident Angle Control */}
              <div className="mt-3 flex items-center gap-3 border-t border-[var(--border-hairline)] pt-2.5">
                <label
                  htmlFor="hero-sun-azimuth"
                  className="type-meta shrink-0 text-[var(--ink-secondary)]"
                >
                  SOLAR INCIDENCE
                </label>
                <input
                  id="hero-sun-azimuth"
                  type="range"
                  min={-65}
                  max={65}
                  value={sunAzimuth}
                  onChange={(e) => setSunAzimuth(Number(e.target.value))}
                  className="h-1 w-full cursor-ew-resize appearance-none rounded-none bg-[var(--border-hairline-strong)] accent-[var(--accent-vermilion)]"
                />
                <span className="type-meta w-12 shrink-0 text-right text-[var(--ink-primary)]">
                  {sunAzimuth > 0 ? `+${sunAzimuth}°` : `${sunAzimuth}°`}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Hairline Chapter Divider */}
      <div className="fw-container relative z-10 mt-8">
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[var(--border-hairline)] pt-3.5 text-[var(--ink-secondary)]">
          <span className="type-meta">
            SCROLL TO MORPH ↓
          </span>
        </div>
      </div>
    </section>
  );
}
