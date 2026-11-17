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
          start: 'top center',
          end: 'bottom center',
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
              05 / METHODOLOGY
            </span>
            <h2 className="type-h1 text-[var(--ink-primary)]">
              From Excavation to Calibration
            </h2>
          </div>
          <div className="col-span-4 md:col-span-3 lg:col-span-5 lg:text-right">
            <span className="type-meta text-[var(--ink-secondary)]">
              SEVEN-WEEK ARCHITECTURAL CADENCE
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
                  className={`process-step flex min-h-[42vh] flex-col justify-center border-b border-[var(--border-hairline)] py-10 transition-opacity duration-300 ease-[var(--ease-out)] last:border-b-0 ${
                    isActive ? 'opacity-100' : 'opacity-40'
                  }`}
                >
                  <div className="mb-3 flex items-center gap-4">
                    <span className="type-meta text-[var(--accent-vermilion)]">
                      PHASE {phase.index}
                    </span>
                    <span className="type-meta text-[var(--ink-secondary)]">
                      {phase.duration}
                    </span>
                  </div>
                  <h3 className="type-h2 mb-4 text-[var(--ink-primary)]">
                    {phase.title}
                  </h3>
                  <p className="mb-5 max-w-[46ch] text-base leading-relaxed text-[var(--ink-secondary)]">
                    {phase.summary}
                  </p>
                  <span className="type-meta inline-block w-fit rounded-[2px] border border-[var(--border-hairline)] bg-[var(--bg-surface)] px-3 py-1 text-[var(--ink-primary)]">
                    ARTIFACT: {phase.artifact}
                  </span>
                </article>
              );
            })}
          </div>

          {/* Right Sticky Architectural Blueprint: Cols 7-12 */}
          <div className="col-span-4 hidden md:sticky md:top-24 md:col-span-4 md:block lg:col-span-6 lg:pl-8">
            <div className="flex aspect-[4/3] flex-col justify-between rounded-[2px] border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-8">
              <div className="flex items-center justify-between border-b border-[var(--border-hairline)] pb-4">
                <span className="type-meta text-[var(--ink-secondary)]">
                  BLUEPRINT STATE — {activePhase.index} / 04
                </span>
                <span className="type-meta text-[var(--accent-vermilion)]">
                  {activePhase.title.toUpperCase()}
                </span>
              </div>

              {/* Morphing Geometric SVG Diagram */}
              <div className="flex flex-1 items-center justify-center py-6">
                <svg
                  viewBox="0 0 320 220"
                  className="h-full max-h-[240px] w-full"
                  aria-hidden="true"
                >
                  {/* Base 4-quadrant structural grid */}
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
                    stroke="rgba(22,22,20,0.12)"
                    strokeWidth="1"
                  />
                  <line
                    x1="20"
                    y1="110"
                    x2="300"
                    y2="110"
                    stroke="rgba(22,22,20,0.12)"
                    strokeWidth="1"
                  />

                  {/* Phase-driven geometric highlight */}
                  <rect
                    x={20 + (activeIndex % 2) * 140}
                    y={20 + Math.floor(activeIndex / 2) * 90}
                    width="140"
                    height="90"
                    fill="rgba(217,56,30,0.08)"
                    stroke="#D9381E"
                    strokeWidth="1.5"
                    style={{
                      transition: reducedMotion
                        ? 'none'
                        : 'all 360ms cubic-bezier(0.23, 1, 0.32, 1)',
                    }}
                  />

                  {/* Golden-ratio circle */}
                  <circle
                    cx={90 + activeIndex * 46}
                    cy={110}
                    r={32 + activeIndex * 8}
                    fill="none"
                    stroke="#161614"
                    strokeWidth="1.2"
                    style={{
                      transition: reducedMotion
                        ? 'none'
                        : 'all 420ms cubic-bezier(0.23, 1, 0.32, 1)',
                    }}
                  />
                </svg>
              </div>

              <div className="flex items-center justify-between border-t border-[var(--border-hairline)] pt-4 text-[var(--ink-secondary)]">
                <span className="type-meta">DELIVERABLE</span>
                <span className="type-meta text-[var(--ink-primary)]">
                  {activePhase.artifact}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

