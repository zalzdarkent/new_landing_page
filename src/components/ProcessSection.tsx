import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PROCESS_PHASES } from '../data/exhibition';

gsap.registerPlugin(ScrollTrigger);

export function ProcessSection({ reducedMotion }: { reducedMotion: boolean }) {
  const rootRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!rootRef.current) return;

    const ctx = gsap.context(() => {
      const steps = gsap.utils.toArray<HTMLElement>('.process-step');
      steps.forEach((step, idx) => {
        ScrollTrigger.create({
          trigger: step,
          start: 'top 55%',
          end: 'bottom 45%',
          onToggle: (self) => {
            if (self.isActive) setActiveIndex(idx);
          },
        });
      });
    }, rootRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  const activePhase = PROCESS_PHASES[activeIndex] ?? PROCESS_PHASES[0];

  return (
    <section
      id="process"
      ref={rootRef}
      className="border-t border-[var(--border-hairline)] bg-[var(--bg-canvas)] py-[clamp(5rem,10vw,9rem)]"
    >
      <div className="fw-container">
        <div className="fw-grid mb-12 items-end border-b border-[var(--border-hairline)] pb-6">
          <div className="col-span-4 md:col-span-5 lg:col-span-7">
            <span className="type-meta mb-3 block text-[var(--ink-secondary)]">
              08 / ARCHITECTURAL CADENCE
            </span>
            <h2 className="type-h1 text-[var(--ink-primary)]">
              From Excavation to{' '}
              <span className="type-serif-accent font-normal">Calibration</span>
            </h2>
          </div>
          <div className="col-span-4 md:col-span-3 lg:col-span-5 lg:text-right">
            <span className="type-meta text-[var(--ink-secondary)]">
              FIVE-STAGE CASTING PROTOCOL // 07 WEEKS
            </span>
          </div>
        </div>

        <div className="fw-grid items-start gap-y-12">
          {/* Left Scrolling Steps: Cols 1-6 */}
          <div className="col-span-4 md:col-span-4 lg:col-span-6">
            {PROCESS_PHASES.map((phase, idx) => {
              const isActive = idx === activeIndex;
              return (
                <article
                  key={phase.index}
                  onClick={() => setActiveIndex(idx)}
                  className={`process-step group cursor-pointer border-b border-[var(--border-hairline)] py-10 transition-all duration-300 ease-[var(--ease-out)] last:border-b-0 ${
                    isActive ? 'opacity-100' : 'opacity-45 hover:opacity-80'
                  }`}
                >
                  <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <span className="type-meta text-[var(--accent-vermilion)]">
                        {phase.code}
                      </span>
                      <span className="type-meta rounded-[2px] border border-[var(--border-hairline)] bg-[var(--bg-surface)] px-2 py-0.5 text-[var(--ink-secondary)]">
                        {phase.duration}
                      </span>
                    </div>
                    <span className="type-meta text-[var(--ink-primary)]">
                      {phase.gateMetric}
                    </span>
                  </div>

                  <h3 className="type-h2 mb-3 text-[var(--ink-primary)]">
                    {phase.title}
                  </h3>
                  <p className="mb-3 max-w-[48ch] text-base leading-relaxed text-[var(--ink-primary)]">
                    {phase.summary}
                  </p>
                  <p className="mb-5 max-w-[48ch] text-sm leading-relaxed text-[var(--ink-secondary)]">
                    {phase.engineeringDetail}
                  </p>

                  <div className="flex flex-wrap items-center gap-3">
                    <span className="type-meta inline-block rounded-[2px] border border-[var(--border-hairline-strong)] bg-[var(--bg-surface)] px-3 py-1 text-[var(--ink-primary)]">
                      DELIVERABLE: {phase.artifact}
                    </span>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Right Sticky Architectural Signal-Beam Blueprint: Cols 7-12 */}
          <div className="col-span-4 md:sticky md:top-24 md:col-span-4 lg:col-span-6 lg:pl-8">
            <div className="flex flex-col justify-between rounded-[2px] border border-[var(--border-hairline-strong)] bg-[var(--bg-surface)] p-6 sm:p-8">
              <div className="flex items-center justify-between border-b border-[var(--border-hairline)] pb-4">
                <span className="type-meta text-[var(--ink-secondary)]">
                  ORTHOGRAPHIC TELEMETRY — {activePhase.index} / 0{PROCESS_PHASES.length}
                </span>
                <span className="type-meta text-[var(--accent-vermilion)]">
                  {activePhase.duration}
                </span>
              </div>

              {/* Quick Phase Selector Bar */}
              <div className="mt-4 grid grid-cols-5 gap-1.5">
                {PROCESS_PHASES.map((p, idx) => (
                  <button
                    key={p.index}
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    className={`type-meta min-h-[34px] rounded-[2px] border transition-colors ${
                      idx === activeIndex
                        ? 'border-[var(--accent-vermilion)] bg-[var(--accent-vermilion)] text-[#FAF9F6]'
                        : 'border-[var(--border-hairline)] bg-[var(--bg-canvas)] text-[var(--ink-secondary)] hover:text-[var(--ink-primary)]'
                    }`}
                  >
                    {p.index}
                  </button>
                ))}
              </div>

              {/* Morphing Geometric SVG Diagram with Traveling Signal Beams */}
              <div className="my-6 flex items-center justify-center rounded-[2px] border border-[var(--border-hairline)] bg-[var(--bg-canvas)] p-4">
                <svg
                  viewBox="0 0 320 220"
                  className="h-full max-h-[250px] w-full"
                  aria-hidden="true"
                >
                  {/* Base structural grid */}
                  <rect
                    x="20"
                    y="20"
                    width="280"
                    height="180"
                    fill="none"
                    stroke="rgba(22,22,20,0.14)"
                    strokeWidth="1"
                  />
                  <line
                    x1="160"
                    y1="20"
                    x2="160"
                    y2="200"
                    stroke="rgba(22,22,20,0.1)"
                    strokeWidth="1"
                    strokeDasharray="3 3"
                  />
                  <line
                    x1="20"
                    y1="110"
                    x2="300"
                    y2="110"
                    stroke="rgba(22,22,20,0.1)"
                    strokeWidth="1"
                    strokeDasharray="3 3"
                  />

                  {/* Signal Path Connecting All 5 Phase Nodes */}
                  <path
                    d="M 75 65 L 160 65 L 245 110 L 160 155 L 95 155 Z"
                    fill="none"
                    stroke="rgba(22,22,20,0.18)"
                    strokeWidth="1.2"
                  />
                  {!reducedMotion && (
                    <path
                      d="M 75 65 L 160 65 L 245 110 L 160 155 L 95 155 Z"
                      fill="none"
                      stroke="#D9381E"
                      strokeWidth="1.8"
                      className="fw-beam-comet"
                    />
                  )}

                  {/* Morphing Golden-Ratio Target Circle */}
                  <circle
                    cx={activePhase.coordinates.x}
                    cy={activePhase.coordinates.y}
                    r={activePhase.coordinates.r}
                    fill="rgba(217,56,30,0.08)"
                    stroke="#D9381E"
                    strokeWidth="1.4"
                    style={{
                      transition: reducedMotion
                        ? 'none'
                        : 'all 420ms cubic-bezier(0.23, 1, 0.32, 1)',
                    }}
                  />

                  {/* 5 Phase Nodes */}
                  {PROCESS_PHASES.map((p, idx) => {
                    const isNodeActive = idx === activeIndex;
                    return (
                      <g key={p.index}>
                        <circle
                          cx={p.coordinates.x}
                          cy={p.coordinates.y}
                          r={isNodeActive ? 6 : 4}
                          fill={isNodeActive ? '#D9381E' : '#161614'}
                        />
                        <text
                          x={p.coordinates.x + 9}
                          y={p.coordinates.y + 4}
                          fontSize="9"
                          fontFamily="monospace"
                          fill={isNodeActive ? '#D9381E' : '#63615C'}
                        >
                          P{p.index}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>

              <div className="space-y-2 border-t border-[var(--border-hairline)] pt-4">
                <div className="flex items-center justify-between">
                  <span className="type-meta text-[var(--ink-secondary)]">
                    ACTIVE PHASE
                  </span>
                  <span className="type-meta font-medium text-[var(--ink-primary)]">
                    {activePhase.title.toUpperCase()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="type-meta text-[var(--ink-secondary)]">
                    VERIFICATION GATE
                  </span>
                  <span className="type-meta text-[var(--accent-vermilion)]">
                    {activePhase.gateMetric}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
