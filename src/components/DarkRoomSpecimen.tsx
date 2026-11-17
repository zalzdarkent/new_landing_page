import { useEffect, useMemo, useRef, useState } from 'react';
import anime from 'animejs';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'motion/react';

gsap.registerPlugin(ScrollTrigger);

interface DarkRoomSpecimenProps {
  reducedMotion: boolean;
}

type MotionModeKey = 'ease-out' | 'ease-in-out' | 'spring';

interface MotionModeSpec {
  key: MotionModeKey;
  label: string;
  formula: string;
  durationLabel: string;
  rationale: string;
  svgPath: string;
  transition: Record<string, unknown>;
}

const MOTION_MODES: MotionModeSpec[] = [
  {
    key: 'ease-out',
    label: 'Ease Out',
    formula: 'cubic-bezier(0.23, 1, 0.32, 1)',
    durationLabel: '220ms',
    rationale:
      'Entrances & exits. Instant initial velocity makes controls feel coupled to the pointer.',
    svgPath: 'M 8 92 C 28 12, 42 8, 92 8',
    transition: { duration: 0.22, ease: [0.23, 1, 0.32, 1] },
  },
  {
    key: 'ease-in-out',
    label: 'Ease In-Out',
    formula: 'cubic-bezier(0.77, 0, 0.175, 1)',
    durationLabel: '360ms',
    rationale:
      'On-screen morphs & layout shifts. Natural acceleration and deceleration within the frame.',
    svgPath: 'M 8 92 C 62 92, 38 8, 92 8',
    transition: { duration: 0.36, ease: [0.77, 0, 0.175, 1] },
  },
  {
    key: 'spring',
    label: 'Spring Physics',
    formula: 'stiffness: 180, damping: 20, mass: 1',
    durationLabel: 'Interruptible',
    rationale:
      'Continuous gestures & pointer damping. Preserves velocity if interrupted mid-flight.',
    svgPath: 'M 8 92 C 20 2, 46 2, 62 11 C 74 17, 82 7, 92 8',
    transition: { type: 'spring', stiffness: 180, damping: 20, mass: 1 },
  },
];

export function DarkRoomSpecimen({ reducedMotion }: DarkRoomSpecimenProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const scrubTextRef = useRef<HTMLSpanElement>(null);
  const [activeMode, setActiveMode] = useState<MotionModeKey>('spring');
  const [stiffness, setStiffness] = useState(180);
  const [damping, setDamping] = useState(18);
  const [triggerCount, setTriggerCount] = useState(0);
  const [travelDistance, setTravelDistance] = useState(200);
  const [stageTilt, setStageTilt] = useState({ x: 0, y: 0 });

  const currentSpec =
    MOTION_MODES.find((m) => m.key === activeMode) ?? MOTION_MODES[0];

  // Synthesize live SVG damped spring trajectory when in spring mode
  const springSvgPath = useMemo(() => {
    const pts: string[] = [];
    const zeta = damping / (2 * Math.sqrt(stiffness));
    const omega = Math.sqrt(stiffness) * 0.55;
    for (let i = 0; i <= 40; i++) {
      const t = i / 40;
      const x = 8 + t * 84;
      const env = Math.exp(-zeta * omega * t);
      const val = 1 - env * Math.cos(omega * Math.sqrt(Math.max(0.05, 1 - zeta * zeta)) * t);
      const y = Math.max(4, Math.min(96, 92 - val * 76));
      pts.push(`${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`);
    }
    return pts.join(' ');
  }, [stiffness, damping]);

  useEffect(() => {
    const updateWidth = () => {
      if (!trackRef.current) return;
      const innerWidth = trackRef.current.clientWidth - 12;
      setTravelDistance(Math.max(0, innerWidth - 64));
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  useEffect(() => {
    if (reducedMotion || !sectionRef.current || !stageRef.current) return;

    const lines = stageRef.current?.querySelectorAll('.drafting-line');

    const ctx = gsap.context(() => {
      if (lines && lines.length > 0) {
        ScrollTrigger.create({
          trigger: stageRef.current,
          start: 'top 78%',
          once: true,
          onEnter: () => {
            anime({
              targets: lines,
              strokeDashoffset: [anime.setDashoffset, 0],
              duration: 720,
              delay: anime.stagger(35),
              easing: 'cubicBezier(0.23, 1, 0.32, 1)',
            });
          },
        });
      }

      if (window.innerWidth >= 768) {
        const layerGrid = stageRef.current?.querySelector('.specimen-layer-grid');
        const layerFrame = stageRef.current?.querySelector('.specimen-layer-frame');
        const layerType = stageRef.current?.querySelector('.specimen-layer-type');

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: stageRef.current,
            start: 'top 75%',
            end: 'bottom 35%',
            scrub: 0.6,
            onUpdate: (self) => {
              if (scrubTextRef.current) {
                scrubTextRef.current.textContent = `SCRUB ${self.progress.toFixed(
                  2
                )}`;
              }
            },
          },
        });

        if (layerGrid) tl.to(layerGrid, { y: -26, opacity: 0.9 }, 0);
        if (layerFrame)
          tl.to(
            layerFrame,
            { y: -10, scale: 1.015, transformOrigin: 'center center' },
            0
          );
        if (layerType) tl.to(layerType, { y: 14 }, 0);
      }
    }, sectionRef);

    return () => {
      ctx.revert();
      if (lines && lines.length > 0) anime.remove(lines);
    };
  }, [reducedMotion]);

  const isForward = triggerCount % 2 === 1;

  const activeTransition =
    activeMode === 'spring'
      ? { type: 'spring' as const, stiffness, damping, mass: 1 }
      : currentSpec.transition;

  return (
    <section
      id="specimen"
      ref={sectionRef}
      className="relative bg-[var(--bg-darkroom)] py-[clamp(5rem,10vw,9rem)] text-[var(--ink-on-dark)]"
    >
      <div className="fw-container">
        <div className="fw-grid items-start gap-y-12">
          {/* Left Sticky Console: Cols 1-4 */}
          <div className="col-span-4 md:col-span-8 lg:sticky lg:top-24 lg:col-span-4">
            <div className="mb-4 flex items-center gap-3 text-[var(--ink-on-dark-muted)]">
              <span className="inline-block h-2 w-2 rounded-full bg-[var(--accent-vermilion)]" />
              <span className="type-meta">09 / THE DARK ROOM</span>
            </div>

            <h2 className="type-h1 mb-4 text-[var(--ink-on-dark)]">
              Motion &amp;{' '}
              <span className="type-serif-accent font-normal">Spring</span>{' '}
              Oscilloscope
            </h2>
            <p className="mb-6 max-w-[38ch] text-base leading-relaxed text-[var(--ink-on-dark-muted)]">
              Test our calibrated timing curves directly. Tune stiffness and
              damping constants in real time and fire the impulse shuttle.
            </p>

            {/* Curve Selector Tabs */}
            <div
              role="tablist"
              aria-label="Motion curve presets"
              className="mb-5 grid grid-cols-3 rounded-[2px] border border-[var(--border-hairline-dark)] bg-[var(--bg-darkroom-elevated)] p-1"
            >
              {MOTION_MODES.map((mode) => {
                const selected = mode.key === activeMode;
                return (
                  <button
                    key={mode.key}
                    role="tab"
                    type="button"
                    aria-selected={selected}
                    onClick={() => {
                      setActiveMode(mode.key);
                      setTriggerCount((c) => c + 1);
                    }}
                    className={`relative min-h-[42px] rounded-[2px] px-2 text-xs font-medium tracking-[-0.01em] transition-colors ${
                      selected
                        ? 'text-[var(--ink-on-dark)]'
                        : 'text-[var(--ink-on-dark-muted)] hover:text-[var(--ink-on-dark)]'
                    }`}
                  >
                    {selected && (
                      <motion.span
                        layoutId="specimen-tab"
                        transition={{ type: 'spring', stiffness: 280, damping: 26 }}
                        className="absolute inset-0 rounded-[2px] border border-[var(--border-hairline-dark)] bg-[#2A2A26]"
                      />
                    )}
                    <span className="relative z-10">{mode.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Curve Telemetry Readout + Live Spring Sliders */}
            <div className="mb-5 rounded-[2px] border border-[var(--border-hairline-dark)] bg-[var(--bg-darkroom-elevated)] p-5">
              <div className="mb-4 flex items-center justify-between border-b border-[var(--border-hairline-dark)] pb-3">
                <span className="type-meta text-[var(--ink-on-dark-muted)]">
                  OSCILLOSCOPE TELEMETRY
                </span>
                <span className="type-meta text-[var(--accent-vermilion)]">
                  {currentSpec.durationLabel}
                </span>
              </div>

              <div className="mb-4 flex items-center gap-4">
                <svg
                  viewBox="0 0 100 100"
                  className="h-20 w-20 shrink-0 rounded-[2px] border border-[var(--border-hairline-dark)] bg-[#161614] p-1"
                  aria-hidden="true"
                >
                  <line
                    x1="8"
                    y1="92"
                    x2="92"
                    y2="16"
                    stroke="rgba(242,240,236,0.14)"
                    strokeWidth="1"
                    strokeDasharray="2 2"
                  />
                  <motion.path
                    key={`${currentSpec.key}-${stiffness}-${damping}`}
                    d={
                      activeMode === 'spring'
                        ? springSvgPath
                        : currentSpec.svgPath
                    }
                    fill="none"
                    stroke="#D9381E"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    initial={reducedMotion ? undefined : { pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={
                      reducedMotion
                        ? { duration: 0.01 }
                        : { duration: 0.32, ease: [0.23, 1, 0.32, 1] }
                    }
                  />
                </svg>

                <div>
                  <code className="type-meta block text-[var(--ink-on-dark)]">
                    {activeMode === 'spring'
                      ? `k=${stiffness}, c=${damping}, m=1`
                      : currentSpec.formula}
                  </code>
                  <p className="mt-2 text-xs leading-snug text-[var(--ink-on-dark-muted)]">
                    {currentSpec.rationale}
                  </p>
                </div>
              </div>

              {/* Interactive Spring Tuning Controls */}
              {activeMode === 'spring' && (
                <div className="mb-4 space-y-2.5 border-y border-[var(--border-hairline-dark)] py-3">
                  <div className="flex items-center justify-between gap-3">
                    <label
                      htmlFor="spring-k"
                      className="type-meta text-[var(--ink-on-dark-muted)]"
                    >
                      STIFFNESS (k)
                    </label>
                    <input
                      id="spring-k"
                      type="range"
                      min={60}
                      max={340}
                      value={stiffness}
                      onChange={(e) => {
                        setStiffness(Number(e.target.value));
                        setTriggerCount((c) => c + 1);
                      }}
                      className="h-1 w-28 cursor-ew-resize appearance-none bg-[#33332E] accent-[var(--accent-vermilion)]"
                    />
                    <span className="type-meta w-9 text-right text-[var(--ink-on-dark)]">
                      {stiffness}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <label
                      htmlFor="spring-c"
                      className="type-meta text-[var(--ink-on-dark-muted)]"
                    >
                      DAMPING (c)
                    </label>
                    <input
                      id="spring-c"
                      type="range"
                      min={8}
                      max={44}
                      value={damping}
                      onChange={(e) => {
                        setDamping(Number(e.target.value));
                        setTriggerCount((c) => c + 1);
                      }}
                      className="h-1 w-28 cursor-ew-resize appearance-none bg-[#33332E] accent-[var(--accent-vermilion)]"
                    />
                    <span className="type-meta w-9 text-right text-[var(--ink-on-dark)]">
                      {damping}
                    </span>
                  </div>
                </div>
              )}

              {/* Live Motion Bar */}
              <div className="space-y-2 pt-1">
                <div className="flex items-center justify-between text-[var(--ink-on-dark-muted)]">
                  <span className="type-meta">LIVE IMPULSE SHUTTLE</span>
                  <span ref={scrubTextRef} className="type-meta">
                    SCRUB 0.00
                  </span>
                </div>
                <div
                  ref={trackRef}
                  className="relative h-10 w-full overflow-hidden rounded-[2px] border border-[var(--border-hairline-dark)] bg-[#161614] p-1.5"
                >
                  <motion.div
                    animate={{ x: isForward ? travelDistance : 0 }}
                    transition={
                      reducedMotion ? { duration: 0.01 } : activeTransition
                    }
                    className="h-full w-16 rounded-[1px] bg-[var(--accent-vermilion)]"
                  />
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setTriggerCount((c) => c + 1)}
              className="fw-btn-tactile inline-flex min-h-[44px] w-full items-center justify-between rounded-[2px] border border-[var(--border-hairline-dark)] bg-[#1F1F1C] px-5 text-sm font-medium text-[var(--ink-on-dark)] hover:border-[var(--ink-on-dark)]"
            >
              <span>Trigger Curve Impulse</span>
              <span className="type-meta text-[var(--accent-vermilion)]">
                RUN #{String(triggerCount + 1).padStart(2, '0')}
              </span>
            </button>
          </div>

          {/* Right Stage: Cols 5-12 Deconstructed 3-Layer Architectural Specimen */}
          <div
            ref={stageRef}
            onPointerMove={(e) => {
              if (reducedMotion) return;
              const r = e.currentTarget.getBoundingClientRect();
              const nx = (e.clientX - r.left) / r.width - 0.5;
              const ny = (e.clientY - r.top) / r.height - 0.5;
              setStageTilt({ x: nx * 18, y: ny * 14 });
            }}
            onPointerLeave={() => setStageTilt({ x: 0, y: 0 })}
            className="col-span-4 md:col-span-8 lg:col-span-8"
          >
            <div className="relative flex min-h-[520px] flex-col justify-between overflow-hidden rounded-[2px] border border-[var(--border-hairline-dark)] bg-[var(--bg-darkroom-elevated)] p-6 sm:p-10 lg:min-h-[680px]">
              {/* Top Specimen Metadata */}
              <div className="relative z-10 flex items-center justify-between border-b border-[var(--border-hairline-dark)] pb-4">
                <span className="type-meta text-[var(--ink-on-dark-muted)]">
                  SPECIMEN 09-A — AXONOMETRIC PLANE SEPARATION
                </span>
                <span className="type-meta text-[var(--accent-vermilion)]">
                  MOVE CURSOR TO SEPARATE PLANES
                </span>
              </div>

              {/* Layered Geometric & Typographic Assembly */}
              <div className="relative my-10 flex flex-1 items-center justify-center">
                {/* Layer 1: Architectural Drafting Grid SVG */}
                <svg
                  viewBox="0 0 600 360"
                  style={{
                    transform: `translate3d(${-stageTilt.x * 0.8}px, ${-stageTilt.y * 0.8}px, 0)`,
                    transition: 'transform 220ms cubic-bezier(0.23, 1, 0.32, 1)',
                  }}
                  className="specimen-layer-grid w-full max-w-[580px]"
                  aria-hidden="true"
                >
                  <rect
                    x="20"
                    y="20"
                    width="560"
                    height="320"
                    fill="none"
                    stroke="rgba(242,240,236,0.18)"
                    strokeWidth="1"
                    className="drafting-line"
                  />
                  <line
                    x1="20"
                    y1="180"
                    x2="580"
                    y2="180"
                    stroke="rgba(242,240,236,0.16)"
                    strokeWidth="1"
                    className="drafting-line"
                  />
                  <line
                    x1="234"
                    y1="20"
                    x2="234"
                    y2="340"
                    stroke="rgba(217,56,30,0.5)"
                    strokeWidth="1"
                    className="drafting-line"
                  />
                  <circle
                    cx="234"
                    cy="180"
                    r="110"
                    fill="none"
                    stroke="rgba(242,240,236,0.24)"
                    strokeWidth="1"
                    className="drafting-line"
                  />
                  <circle
                    cx="380"
                    cy="180"
                    r="68"
                    fill="none"
                    stroke="rgba(217,56,30,0.4)"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                    className="drafting-line"
                  />
                </svg>

                {/* Layer 2: Floating Geometric Frame */}
                <div
                  style={{
                    transform: `translate3d(${stageTilt.x * 0.9}px, ${stageTilt.y * 0.9}px, 0)`,
                    transition: 'transform 220ms cubic-bezier(0.23, 1, 0.32, 1)',
                  }}
                  className="pointer-events-none absolute inset-x-8 top-1/2 -translate-y-1/2 sm:inset-x-16"
                >
                  <div className="specimen-layer-frame border border-[var(--border-hairline-dark)] bg-[#161614]/80 p-6 backdrop-blur-[2px] sm:p-10">
                    <div
                      style={{
                        transform: `translate3d(${stageTilt.x * 0.5}px, ${stageTilt.y * 0.5}px, 0)`,
                        transition:
                          'transform 220ms cubic-bezier(0.23, 1, 0.32, 1)',
                      }}
                      className="specimen-layer-type"
                    >
                      <span className="type-meta mb-2 block text-[var(--accent-vermilion)]">
                        PLANE 03 // BASELINE LOCKED
                      </span>
                      <p className="type-h1 text-[var(--ink-on-dark)]">
                        Discipline{' '}
                        <span className="type-serif-accent font-normal">is</span>{' '}
                        visible.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Specimen Scale */}
              <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--border-hairline-dark)] pt-4 text-[var(--ink-on-dark-muted)]">
                <span className="type-meta">TRANSFORM + OPACITY ONLY</span>
                <span className="type-meta">60FPS COMPOSITOR TARGET</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
