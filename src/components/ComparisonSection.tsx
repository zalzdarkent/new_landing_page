import { useRef, useState } from 'react';

const COMPARISON_ROWS = [
  {
    axis: 'TYPOGRAPHY',
    generic: 'Default Inter + arbitrary Playfair Display, 95ch wide lines, uncalibrated tracking.',
    formwork: 'Cabinet Grotesk + Instrument Serif optical accents, 62ch cap, fluid clamp() scale.',
  },
  {
    axis: 'MOTION CURVES',
    generic: 'Generic ease-in-out or sluggish 500ms CSS "all" transitions with random fade-ups.',
    formwork: 'Custom --ease-out (0.23, 1, 0.32, 1), <220ms UI responses, strict GSAP/Motion ownership.',
  },
  {
    axis: 'SURFACE & COLOR',
    generic: 'Pure #000000 dark mode with purple-blue neon gradients and blurred glass cards.',
    formwork: 'Warm Limestone (#F2F0EC) & Deep Basalt (#161614) with sole Signal Vermilion (#D9381E).',
  },
  {
    axis: 'LAYOUT ARCHITECTURE',
    generic: 'Centered hero + 3 identical rounded SaaS feature cards repeated down the page.',
    formwork: '12-col Swiss grid with live [G] overlay, zig-zag plates, and pinned horizontal reel.',
  },
];

export function ComparisonSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [splitPercent, setSplitPercent] = useState(54);
  const [dragging, setDragging] = useState(false);

  const updateFromClientX = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const raw = ((clientX - rect.left) / rect.width) * 100;
    setSplitPercent(Math.min(88, Math.max(12, Math.round(raw))));
  };

  return (
    <section
      id="comparison"
      className="border-t border-[var(--border-hairline)] bg-[var(--bg-canvas)] py-[clamp(5rem,10vw,9rem)]"
    >
      <div className="fw-container">
        <div className="fw-grid mb-12 items-end border-b border-[var(--border-hairline)] pb-6">
          <div className="col-span-4 md:col-span-5 lg:col-span-7">
            <span className="type-meta mb-3 block text-[var(--ink-secondary)]">
              08 / CRAFT COMPARISON
            </span>
            <h2 className="type-h1 text-[var(--ink-primary)]">
              Template Habit vs.{' '}
              <span className="type-serif-accent font-normal">Engineered</span>{' '}
              Form
            </h2>
          </div>
          <div className="col-span-4 md:col-span-3 lg:col-span-5 lg:text-right">
            <span className="type-meta text-[var(--ink-secondary)]">
              DRAG DIVIDER OR USE ARROW KEYS ({splitPercent}%)
            </span>
          </div>
        </div>

        {/* Interactive Split Comparison Stage */}
        <div
          ref={containerRef}
          data-cursor="drag"
          data-cursor-label="COMPARE"
          onPointerDown={(e) => {
            setDragging(true);
            e.currentTarget.setPointerCapture(e.pointerId);
            updateFromClientX(e.clientX);
          }}
          onPointerMove={(e) => {
            if (!dragging) return;
            updateFromClientX(e.clientX);
          }}
          onPointerUp={() => setDragging(false)}
          onPointerCancel={() => setDragging(false)}
          className="relative overflow-hidden rounded-[2px] border border-[var(--border-hairline)] bg-[var(--bg-surface)] select-none touch-pan-y"
        >
          {/* Base Layer: Generic Template Output */}
          <div className="p-6 sm:p-10">
            <div className="mb-6 flex items-center justify-between border-b border-[var(--border-hairline)] pb-3">
              <span className="type-meta text-[var(--ink-secondary)]">
                A / GENERIC AI &amp; TEMPLATE DEFAULT
              </span>
              <span className="type-meta text-[var(--ink-secondary)]">
                UNSPECIFIED
              </span>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {COMPARISON_ROWS.map((row) => (
                <div
                  key={row.axis}
                  className="border-l border-[var(--border-hairline)] pl-4 opacity-55"
                >
                  <span className="type-meta block text-[var(--ink-secondary)]">
                    {row.axis}
                  </span>
                  <p className="mt-1.5 text-sm leading-relaxed text-[var(--ink-secondary)]">
                    {row.generic}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Clipped Overlay: FORMWORK® Engineered Standard */}
          <div
            style={{ clipPath: `inset(0 ${100 - splitPercent}% 0 0)` }}
            className="pointer-events-none absolute inset-0 bg-[var(--bg-darkroom)] p-6 text-[var(--ink-on-dark)] sm:p-10"
          >
            <div className="mb-6 flex items-center justify-between border-b border-[var(--border-hairline-dark)] pb-3">
              <span className="type-meta text-[var(--accent-vermilion)]">
                B / FORMWORK® ARCHITECTURAL STANDARD
              </span>
              <span className="type-meta text-[var(--ink-on-dark-muted)]">
                VERIFIED
              </span>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {COMPARISON_ROWS.map((row) => (
                <div
                  key={row.axis}
                  className="border-l border-[var(--accent-vermilion)]/60 pl-4"
                >
                  <span className="type-meta block text-[var(--ink-on-dark-muted)]">
                    {row.axis}
                  </span>
                  <p className="mt-1.5 text-sm leading-relaxed text-[var(--ink-on-dark)]">
                    {row.formwork}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Draggable Divider Handle */}
          <div
            role="slider"
            tabIndex={0}
            aria-label="Craft comparison split position"
            aria-valuemin={12}
            aria-valuemax={88}
            aria-valuenow={splitPercent}
            onKeyDown={(e) => {
              if (e.key === 'ArrowLeft')
                setSplitPercent((v) => Math.max(12, v - 4));
              if (e.key === 'ArrowRight')
                setSplitPercent((v) => Math.min(88, v + 4));
            }}
            style={{ left: `${splitPercent}%` }}
            className="absolute top-0 bottom-0 z-10 w-[2px] -translate-x-1/2 cursor-ew-resize bg-[var(--accent-vermilion)]"
          >
            <span className="type-meta absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[2px] bg-[var(--accent-vermilion)] px-2 py-1 text-[#FAF9F6]">
              ↔
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

