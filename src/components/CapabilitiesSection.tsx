import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { STUDIO_CAPABILITIES, type StudioCapability } from '../data/exhibition';

function CapabilitySchematic({
  cap,
  reducedMotion,
}: {
  cap: StudioCapability;
  reducedMotion: boolean;
}) {
  const [simParam, setSimParam] = useState(50);

  return (
    <div className="flex flex-col justify-between rounded-[2px] border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-5">
      <div className="mb-4 flex items-center justify-between border-b border-[var(--border-hairline)] pb-3">
        <span className="type-meta text-[var(--ink-secondary)]">
          SCHEMATIC SIMULATOR // {cap.code}
        </span>
        <span className="type-meta text-[var(--accent-vermilion)]">
          {cap.metricValue}
        </span>
      </div>

      {/* Interactive SVG Schematic per Discipline */}
      <div className="my-2 flex h-44 items-center justify-center rounded-[2px] border border-[var(--border-hairline)] bg-[#161614] p-4 text-[#F2F0EC]">
        {cap.simulatorType === 'webgl' && (
          <svg viewBox="0 0 320 140" className="h-full w-full" aria-hidden="true">
            <g transform={`translate(160, 70) rotate(${(simParam - 50) * 0.6})`}>
              <polygon
                points="0,-52 56,-24 56,28 0,56 -56,28 -56,-24"
                fill="rgba(217,56,30,0.12)"
                stroke="#D9381E"
                strokeWidth="1.4"
              />
              <line x1="0" y1="-52" x2="0" y2="56" stroke="#F2F0EC" strokeWidth="1" opacity="0.5" />
              <line x1="-56" y1="-24" x2="56" y2="28" stroke="#F2F0EC" strokeWidth="1" opacity="0.4" />
              <line x1="56" y1="-24" x2="-56" y2="28" stroke="#F2F0EC" strokeWidth="1" opacity="0.4" />
            </g>
            <circle
              cx={60 + simParam * 2}
              cy={28}
              r="6"
              fill="#D9381E"
            />
            <line
              x1={60 + simParam * 2}
              y1={28}
              x2="160"
              y2="70"
              stroke="#F2F0EC"
              strokeWidth="0.8"
              strokeDasharray="3 3"
            />
          </svg>
        )}

        {cap.simulatorType === 'grid' && (
          <svg viewBox="0 0 320 140" className="h-full w-full" aria-hidden="true">
            {Array.from({ length: 12 }).map((_, i) => (
              <rect
                key={i}
                x={16 + i * 24.5}
                y="16"
                width="20"
                height="108"
                fill="rgba(242,240,236,0.06)"
                stroke="rgba(242,240,236,0.2)"
                strokeWidth="0.75"
              />
            ))}
            <rect
              x="16"
              y="32"
              width={120 + simParam * 1.6}
              height="76"
              fill="rgba(217,56,30,0.18)"
              stroke="#D9381E"
              strokeWidth="1.5"
            />
            <text x="26" y="74" fill="#F2F0EC" fontSize="11" fontFamily="monospace">
              MEASURE: {Math.round(45 + simParam * 0.3)}CH OPTIMAL
            </text>
          </svg>
        )}

        {cap.simulatorType === 'motion' && (
          <svg viewBox="0 0 320 140" className="h-full w-full" aria-hidden="true">
            <line x1="20" y1="115" x2="300" y2="25" stroke="rgba(242,240,236,0.2)" strokeDasharray="3 3" />
            <path
              d={`M 20 115 C ${40 + simParam * 1.2} ${115 - simParam * 0.9}, ${120 + simParam * 0.8} 25, 300 25`}
              fill="none"
              stroke="#D9381E"
              strokeWidth="2.2"
            />
            <circle cx={40 + simParam * 1.2} cy={115 - simParam * 0.9} r="4.5" fill="#F2F0EC" />
          </svg>
        )}

        {cap.simulatorType === 'hardware' && (
          <svg viewBox="0 0 320 140" className="h-full w-full" aria-hidden="true">
            <circle cx="160" cy="70" r="52" fill="none" stroke="rgba(242,240,236,0.25)" strokeWidth="1.2" />
            {Array.from({ length: 16 }).map((_, i) => {
              const a = (i / 16) * Math.PI * 2;
              return (
                <line
                  key={i}
                  x1={160 + Math.cos(a) * 44}
                  y1={70 + Math.sin(a) * 44}
                  x2={160 + Math.cos(a) * 52}
                  y2={70 + Math.sin(a) * 52}
                  stroke="#F2F0EC"
                  strokeWidth="1.2"
                />
              );
            })}
            <g transform={`translate(160, 70) rotate(${simParam * 3.6 - 180})`}>
              <line x1="0" y1="0" x2="0" y2="-40" stroke="#D9381E" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="0" cy="0" r="6" fill="#D9381E" />
            </g>
          </svg>
        )}
      </div>

      {/* Live Parameter Scrub Slider */}
      <div className="mt-3 flex items-center gap-3">
        <label
          htmlFor={`cap-sim-${cap.id}`}
          className="type-meta shrink-0 text-[var(--ink-secondary)]"
        >
          MODULATE PARAMETER
        </label>
        <input
          id={`cap-sim-${cap.id}`}
          type="range"
          min={0}
          max={100}
          value={simParam}
          onChange={(e) => setSimParam(Number(e.target.value))}
          disabled={reducedMotion && false}
          className="h-1 w-full cursor-ew-resize appearance-none rounded-none bg-[var(--border-hairline-strong)] accent-[var(--accent-vermilion)]"
        />
        <span className="type-meta w-10 text-right text-[var(--ink-primary)]">
          {simParam}%
        </span>
      </div>
    </div>
  );
}

export function CapabilitiesSection({
  reducedMotion,
}: {
  reducedMotion: boolean;
}) {
  const [activeId, setActiveId] = useState(STUDIO_CAPABILITIES[0].id);
  const gridRef = useRef<HTMLDivElement>(null);

  const activeCap =
    STUDIO_CAPABILITIES.find((c) => c.id === activeId) ?? STUDIO_CAPABILITIES[0];

  // Spotlight Glow Card Grid pointer tracker (frontend-atlas interactions.md#7)
  useEffect(() => {
    const el = gridRef.current;
    if (!el || reducedMotion) return;

    let cards: HTMLElement[] = [];
    let rects: DOMRect[] = [];
    let frame = 0;
    let px = 0;
    let py = 0;

    const measure = () => {
      cards = Array.from(el.querySelectorAll<HTMLElement>('[data-spot]'));
      rects = cards.map((c) => c.getBoundingClientRect());
    };

    const paint = () => {
      frame = 0;
      cards.forEach((c, i) => {
        if (!rects[i]) return;
        c.style.setProperty('--x', `${px - rects[i].left}px`);
        c.style.setProperty('--y', `${py - rects[i].top}px`);
      });
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      if (!rects.length) measure();
      px = e.clientX;
      py = e.clientY;
      if (!frame) frame = requestAnimationFrame(paint);
    };

    const invalidate = () => {
      rects = [];
    };

    el.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('scroll', invalidate, { passive: true });
    window.addEventListener('resize', invalidate);

    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener('pointermove', onMove);
      window.removeEventListener('scroll', invalidate);
      window.removeEventListener('resize', invalidate);
    };
  }, [reducedMotion]);

  return (
    <section
      id="capabilities"
      className="border-t border-[var(--border-hairline)] bg-[var(--bg-surface)] py-[clamp(5rem,10vw,9rem)]"
    >
      <div className="fw-container">
        <div className="fw-grid mb-12 items-end border-b border-[var(--border-hairline)] pb-6 lg:mb-16">
          <div className="col-span-4 md:col-span-5 lg:col-span-7">
            <span className="type-meta mb-3 block text-[var(--ink-secondary)]">
              07 / DISCIPLINARY MATRIX
            </span>
            <h2 className="type-h1 text-[var(--ink-primary)]">
              Four Pillars,{' '}
              <span className="type-serif-accent font-normal">One</span>{' '}
              Architectural Standard.
            </h2>
          </div>
          <div className="col-span-4 md:col-span-3 lg:col-span-5 lg:text-right">
            <span className="type-meta text-[var(--ink-secondary)]">
              SWEEP POINTER FOR SPOTLIGHT // CLICK TO INSPECT
            </span>
          </div>
        </div>

        {/* 4-Card Spotlight Bento Grid */}
        <div
          ref={gridRef}
          role="tablist"
          aria-label="Studio capabilities"
          className="fw-spot-grid mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {STUDIO_CAPABILITIES.map((cap) => {
            const isSelected = cap.id === activeId;
            return (
              <button
                key={cap.id}
                role="tab"
                type="button"
                data-spot
                aria-selected={isSelected}
                onClick={() => setActiveId(cap.id)}
                className={`fw-spot-card flex flex-col justify-between rounded-[2px] border p-5 text-left transition-colors duration-200 ${
                  isSelected
                    ? 'border-[var(--accent-vermilion)] bg-[var(--bg-canvas)]'
                    : 'border-[var(--border-hairline)] bg-[var(--bg-canvas)]/60 hover:border-[var(--border-hairline-strong)]'
                }`}
              >
                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <span
                      className={`type-meta ${
                        isSelected
                          ? 'text-[var(--accent-vermilion)]'
                          : 'text-[var(--ink-secondary)]'
                      }`}
                    >
                      {cap.code}
                    </span>
                    {isSelected && (
                      <motion.span
                        layoutId="cap-active-dot"
                        className="inline-block h-2 w-2 rounded-full bg-[var(--accent-vermilion)]"
                      />
                    )}
                  </div>
                  <h3 className="type-h3 mb-2 text-[var(--ink-primary)]">
                    {cap.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[var(--ink-secondary)]">
                    {cap.headline}
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-[var(--border-hairline)] pt-3">
                  <span className="type-meta text-[var(--ink-secondary)]">
                    {cap.metricLabel}
                  </span>
                  <span className="type-meta font-medium text-[var(--ink-primary)]">
                    {cap.metricValue}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Live Expanded Specification & Interactive Schematic Stage */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCap.id}
            initial={reducedMotion ? undefined : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reducedMotion ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
            role="tabpanel"
            className="rounded-[2px] border border-[var(--border-hairline-strong)] bg-[var(--bg-canvas)] p-6 sm:p-10"
          >
            <div className="fw-grid items-start gap-y-8">
              <div className="col-span-4 md:col-span-5 lg:col-span-7">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-[var(--border-hairline)] pb-3">
                  <span className="type-meta text-[var(--accent-vermilion)]">
                    ACTIVE SPECIFICATION // {activeCap.code}
                  </span>
                  <span className="type-meta text-[var(--ink-secondary)]">
                    {activeCap.stack}
                  </span>
                </div>

                <h3 className="type-h2 mb-6 text-[var(--ink-primary)]">
                  {activeCap.headline}
                </h3>

                <div className="grid grid-cols-1 gap-6 border-b border-[var(--border-hairline)] pb-6 sm:grid-cols-2">
                  <div>
                    <span className="type-meta mb-2 block text-[var(--ink-secondary)]">
                      ARCHITECTURAL SCOPE
                    </span>
                    <p className="text-base leading-relaxed text-[var(--ink-primary)]">
                      {activeCap.whatItIs}
                    </p>
                  </div>
                  <div>
                    <span className="type-meta mb-2 block text-[var(--ink-secondary)]">
                      WHY IT MATTERS
                    </span>
                    <p className="text-base leading-relaxed text-[var(--ink-secondary)]">
                      {activeCap.whyItMatters}
                    </p>
                  </div>
                </div>

                <div className="pt-5">
                  <span className="type-meta mb-3 block text-[var(--ink-secondary)]">
                    VERIFIED DELIVERABLES
                  </span>
                  <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                    {activeCap.deliverables.map((item) => (
                      <li
                        key={item}
                        className="border-l-2 border-[var(--accent-vermilion)] pl-3 text-sm font-medium text-[var(--ink-primary)]"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="col-span-4 md:col-span-3 lg:col-span-5">
                <CapabilitySchematic
                  cap={activeCap}
                  reducedMotion={reducedMotion}
                />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
