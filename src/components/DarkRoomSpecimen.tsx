import { useEffect, useRef, useState } from 'react';
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
    formula: 'stiffness: 100, damping: 20, mass: 1',
    durationLabel: 'Interruptible',
    rationale:
      'Continuous gestures & pointer damping. Preserves velocity if interrupted mid-flight.',
    svgPath: 'M 8 92 C 20 2, 46 2, 62 11 C 74 17, 82 7, 92 8',
    transition: { type: 'spring', stiffness: 100, damping: 20, mass: 1 },
  },
];

export function DarkRoomSpecimen({ reducedMotion }: DarkRoomSpecimenProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeMode, setActiveMode] = useState<MotionModeKey>('ease-out');
  const [triggerCount, setTriggerCount] = useState(0);
  const [scrubProgress, setScrubProgress] = useState(0);
  const [travelDistance, setTravelDistance] = useState(200);

  const currentSpec =
    MOTION_MODES.find((m) => m.key === activeMode) ?? MOTION_MODES[0];

  // Measure impulse track width so the shuttle always lands flush with the right edge
  useEffect(() => {
    const updateWidth = () => {
      if (!trackRef.current) return;
      const innerWidth = trackRef.current.clientWidth - 12; // 6px padding each side
      setTravelDistance(Math.max(0, innerWidth - 64)); // 64px shuttle width
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  useEffect(() => {
    if (reducedMotion || !sectionRef.current || !stageRef.current) return;

    const lines = stageRef.current?.querySelectorAll('.drafting-line');

    const ctx = gsap.context(() => {
      // Anime.js drafting line reveal on entry
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

      // Layer separation scrub on desktop/tablet
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
              setScrubProgress(Number(self.progress.toFixed(2)));
            },
          },
        });

        if (layerGrid) tl.to(layerGrid, { y: -26, opacity: 0.9 }, 0);
        if (layerFrame)
          tl.to(layerFrame, { y: -10, scale: 1.012, transformOrigin: 'center center' }, 0);
        if (layerType) tl.to(layerType, { y: 14 }, 0);
      }
    }, sectionRef);

    return () => {
      ctx.revert();
      if (lines && lines.length > 0) anime.remove(lines);
    };
  }, [reducedMotion]);

  const isForward = triggerCount % 2 === 1;

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
              <span className="type-meta">03 / THE DARK ROOM</span>
            </div>

            <h2 className="type-h1 mb-4 text-[var(--ink-on-dark)]">
              Motion Specimen
            </h2>
            <p className="mb-8 max-w-[38ch] text-base leading-relaxed text-[var(--ink-on-dark-muted)]">
              Test our calibrated timing curves directly. Every UI state stays
              below 300ms; only spatial and editorial transitions take longer.
            </p>

            {/* Curve Selector Tabs */}
            <div
              role="tablist"
              aria-label="Motion curve presets"
              className="mb-6 grid grid-cols-3 rounded-[2px] border border-[var(--border-hairline-dark)] bg-[var(--bg-darkroom-elevated)] p-1"
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
                    className={`relative min-h-[44px] rounded-[2px] px-2 text-xs font-medium tracking-[-0.01em] transition-colors ${
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

            {/* Curve Telemetry Readout */}
            <div className="mb-6 rounded-[2px] border border-[var(--border-hairline-dark)] bg-[var(--bg-darkroom-elevated)] p-5">
              <div className="mb-4 flex items-center justify-between border-b border-[var(--border-hairline-dark)] pb-3">
                <span className="type-meta text-[var(--ink-on-dark-muted)]">
                  CURVE TELEMETRY
                </span>
                <span className="type-meta text-[var(--accent-vermilion)]">
                  {currentSpec.durationLabel}
                </span>
              </div>

              <div className="mb-4 flex items-center gap-5">
                <svg
                  viewBox="0 0 100 100"
                  className="h-20 w-20 shrink-0 rounded-[2px] border border-[var(--border-hairline-dark)] bg-[#161614] p-1"
                  aria-hidden="true"
                >
                  <line
                    x1="8"
                    y1="92"
                    x2="92"
                    y2="8"
                    stroke="rgba(242,240,236,0.14)"
                    strokeWidth="1"
                    strokeDasharray="2 2"
                  />
                  <motion.path
                    key={currentSpec.key}
                    d={currentSpec.svgPath}
                    fill="none"
                    stroke="#D9381E"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    initial={reducedMotion ? undefined : { pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={
                      reducedMotion
                        ? { duration: 0.01 }
                        : { duration: 0.35, ease: [0.23, 1, 0.32, 1] }
                    }
                  />
                </svg>

                <div>
                  <code className="type-meta block text-[var(--ink-on-dark)]">
                    {currentSpec.formula}
                  </code>
                  <p className="mt-2 text-sm leading-snug text-[var(--ink-on-dark-muted)]">
                    {currentSpec.rationale}
                  </p>
                </div>
              </div>

              {/* Live Motion Bar */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between text-[var(--ink-on-dark-muted)]">
                  <span className="type-meta">LIVE IMPULSE</span>
                  <span className="type-meta">SCRUB {scrubProgress.toFixed(2)}</span>
                </div>
                <div
                  ref={trackRef}
                  className="relative h-10 w-full overflow-hidden rounded-[2px] border border-[var(--border-hairline-dark)] bg-[#161614] p-1.5"
                >
                  <motion.div
                    animate={{ x: isForward ? travelDistance : 0 }}
                    transition={
                      reducedMotion ? { duration: 0.01 } : currentSpec.transition
                    }
                    className="h-full w-16 rounded-[1px] bg-[var(--accent-vermilion)]"
                  />
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setTriggerCount((c) => c + 1)}
              className="fw-btn-tactile inline-flex min-h-[44px] w-full items-center justify-between rounded-[2px] border border-[var(--border-hairline-dark)] px-5 text-sm font-medium text-[var(--ink-on-dark)] hover:border-[var(--ink-on-dark)]"
            >
              <span>Trigger Curve Impulse</span>
              <span className="type-meta text-[var(--accent-vermilion)]">
                RUN #{String(triggerCount + 1).padStart(2, '0')}
              </span>
            </button>
          </div>

          {/* Right Stage: Cols 5-12 Deconstructed Architectural Specimen */}
          <div
            ref={stageRef}
            className="col-span-4 md:col-span-8 lg:col-span-8"
          >
            <div className="relative flex min-h-[520px] flex-col justify-between overflow-hidden rounded-[2px] border border-[var(--border-hairline-dark)] bg-[var(--bg-darkroom-elevated)] p-6 sm:p-10 lg:min-h-[680px]">
              {/* Top Specimen Metadata */}
              <div className="relative z-10 flex items-center justify-between border-b border-[var(--border-hairline-dark)] pb-4">
                <span className="type-meta text-[var(--ink-on-dark-muted)]">
                  SPECIMEN 03-A — LAYERED PROPORTION
                </span>
                <span className="type-meta text-[var(--ink-on-dark-muted)]">
                  1 : 1.618
                </span>
              </div>

              {/* Layered Geometric & Typographic Assembly */}
              <div className="relative my-10 flex flex-1 items-center justify-center">
                {/* Layer 1: Architectural Drafting Grid SVG */}
                <svg
                  viewBox="0 0 600 360"
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
                    stroke="rgba(217,56,30,0.45)"
                    strokeWidth="1"
                    className="drafting-line"
                  />
                  <circle
                    cx="234"
                    cy="180"
                    r="110"
                    fill="none"
                    stroke="rgba(242,240,236,0.22)"
                    strokeWidth="1"
                    className="drafting-line"
                  />
                </svg>

                {/* Layer 2: Floating Geometric Frame */}
                <div className="pointer-events-none absolute inset-x-8 top-1/2 -translate-y-1/2 sm:inset-x-16">
                  <div className="specimen-layer-frame border border-[var(--border-hairline-dark)] bg-[#161614]/70 p-6 sm:p-10">
                    <div className="specimen-layer-type">
                      <span className="type-meta mb-2 block text-[var(--accent-vermilion)]">
                        BASELINE LOCKED
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
