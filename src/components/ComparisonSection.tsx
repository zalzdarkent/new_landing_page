import { useRef, useState } from 'react';

const COMPARISON_ROWS = [
  {
    axis: '01 // TYPOGRAPHY & MEASURE',
    generic:
      'Default Inter + uncalibrated Playfair Display, 95ch wide lines, jittery proportional numerals.',
    formwork:
      'Cabinet Grotesk + Instrument Serif optical accents, 62ch prose cap, locked tabular numerals.',
    metricGeneric: '95CH UNBOUNDED',
    metricFormwork: '62CH LOCKED',
  },
  {
    axis: '02 // MOTION CHOREOGRAPHY',
    generic:
      'Sluggish 500ms CSS "transition: all" with identical fade-ups on every single paragraph.',
    formwork:
      'Custom --ease-out (0.23, 1, 0.32, 1), <220ms UI responses, single RAF loop uniting Lenis + GSAP.',
    metricGeneric: '18.4MS LAYOUT THRASH',
    metricFormwork: '2.1MS COMPOSITOR',
  },
  {
    axis: '03 // SURFACE & ATMOSPHERE',
    generic:
      'Sterile #000000 void with purple-to-cyan neon blobs, heavy backdrop-blur, and rainbow borders.',
    formwork:
      'Warm Cast Limestone (#F2F0EC) & Deep Basalt (#161614) with Signal Vermilion (#D9381E) datum.',
    metricGeneric: 'LOW CONTRAST GLOW',
    metricFormwork: 'APCA Lc 92 SAFE',
  },
  {
    axis: '04 // SPATIAL ARCHITECTURE',
    generic:
      'Centered SaaS hero followed by three identical rounded feature cards repeated down the page.',
    formwork:
      '12-col Swiss grid with live [G] overlay, asymmetric plates, stacked strata, and pinned aperture.',
    metricGeneric: 'TEMPLATE CLONE',
    metricFormwork: 'BESPOKE MONOGRAPH',
  },
];

export function ComparisonSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [splitPercent, setSplitPercent] = useState(56);
  const [dragging, setDragging] = useState(false);

  const updateFromClientX = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const raw = ((clientX - rect.left) / rect.width) * 100;
    setSplitPercent(Math.min(90, Math.max(10, Math.round(raw))));
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
              12 / STRUCTURAL FORENSICS
            </span>
            <h2 className="type-h1 text-[var(--ink-primary)]">
              Template Habit vs.{' '}
              <span className="type-serif-accent font-normal">Engineered</span>{' '}
              Form
            </h2>
          </div>
          <div className="col-span-4 flex flex-wrap items-center justify-between gap-3 md:col-span-3 lg:col-span-5 lg:justify-end">
            <span className="type-meta text-[var(--ink-secondary)]">
              CURTAIN ({splitPercent}%):
            </span>
            <div className="flex gap-1.5">
              {[
                { label: 'TEMPLATE', val: 16 },
                { label: '50 / 50', val: 50 },
                { label: 'FORMWORK®', val: 86 },
              ].map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => setSplitPercent(preset.val)}
                  className={`type-meta min-h-[34px] rounded-[2px] border px-2.5 py-1 transition-colors ${
                    Math.abs(splitPercent - preset.val) <= 6
                      ? 'border-[var(--accent-vermilion)] bg-[var(--accent-vermilion)] text-[#FAF9F6]'
                      : 'border-[var(--border-hairline)] bg-[var(--bg-surface)] text-[var(--ink-primary)]'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Interactive Split Comparison Stage */}
        <div
          ref={containerRef}
          data-cursor="drag"
          data-cursor-label="DRAG SPLIT"
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
          className="relative overflow-hidden rounded-[2px] border border-[var(--border-hairline-strong)] bg-[var(--bg-surface)] select-none touch-pan-y"
        >
          {/* Base Layer: Generic Template Output */}
          <div className="p-6 sm:p-10">
            <div className="mb-6 flex items-center justify-between border-b border-[var(--border-hairline)] pb-3">
              <span className="type-meta text-[var(--ink-secondary)]">
                LAYER A // GENERIC AI &amp; TEMPLATE DEFAULT
              </span>
              <span className="type-meta text-[var(--ink-secondary)]">
                FRAME TIME: 18.4MS (JANK RISK)
              </span>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {COMPARISON_ROWS.map((row) => (
                <div
                  key={row.axis}
                  className="flex flex-col justify-between border-l border-[var(--border-hairline)] pl-4 opacity-55"
                >
                  <div>
                    <span className="type-meta block text-[var(--ink-secondary)]">
                      {row.axis}
                    </span>
                    <p className="mt-1.5 text-sm leading-relaxed text-[var(--ink-secondary)]">
                      {row.generic}
                    </p>
                  </div>
                  <span className="type-meta mt-3 inline-block text-[var(--ink-secondary)]">
                    DIAGNOSTIC: {row.metricGeneric}
                  </span>
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
                LAYER B // FORMWORK® ARCHITECTURAL STANDARD
              </span>
              <span className="type-meta text-[var(--ink-on-dark)]">
                FRAME TIME: 2.1MS (60FPS LOCKED)
              </span>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {COMPARISON_ROWS.map((row) => (
                <div
                  key={row.axis}
                  className="flex flex-col justify-between border-l-2 border-[var(--accent-vermilion)] pl-4"
                >
                  <div>
                    <span className="type-meta block text-[var(--ink-on-dark-muted)]">
                      {row.axis}
                    </span>
                    <p className="mt-1.5 text-sm leading-relaxed text-[var(--ink-on-dark)]">
                      {row.formwork}
                    </p>
                  </div>
                  <span className="type-meta mt-3 inline-block text-[var(--accent-vermilion)]">
                    VERIFIED: {row.metricFormwork}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Draggable Divider Handle */}
          <div
            role="slider"
            tabIndex={0}
            aria-label="Craft comparison split position"
            aria-valuemin={10}
            aria-valuemax={90}
            aria-valuenow={splitPercent}
            onKeyDown={(e) => {
              if (e.key === 'ArrowLeft')
                setSplitPercent((v) => Math.max(10, v - 4));
              if (e.key === 'ArrowRight')
                setSplitPercent((v) => Math.min(90, v + 4));
            }}
            style={{ left: `${splitPercent}%` }}
            className="absolute top-0 bottom-0 z-10 w-[2px] -translate-x-1/2 cursor-ew-resize bg-[var(--accent-vermilion)]"
          >
            <span className="type-meta absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[2px] bg-[var(--accent-vermilion)] px-2.5 py-1 text-[#FAF9F6] shadow-md">
              ↔ {splitPercent}%
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
