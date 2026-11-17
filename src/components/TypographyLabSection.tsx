import { useState } from 'react';
import { motion } from 'motion/react';

const MEASURES = ['45ch', '62ch', '75ch'] as const;
const TRACKINGS = ['-0.03em', '-0.01em', '0.02em'] as const;
const LEADINGS = [1.25, 1.55, 1.8] as const;
const PROXIMITY_WORD = 'PROPORTION';

export function TypographyLabSection({
  reducedMotion,
}: {
  reducedMotion: boolean;
}) {
  const [measure, setMeasure] = useState<(typeof MEASURES)[number]>('62ch');
  const [tracking, setTracking] = useState<(typeof TRACKINGS)[number]>('-0.01em');
  const [leading, setLeading] = useState<(typeof LEADINGS)[number]>(1.55);
  const [showBaseline, setShowBaseline] = useState(true);
  const [hoveredCharIdx, setHoveredCharIdx] = useState<number | null>(null);

  return (
    <section
      id="typolab"
      className="border-t border-[var(--border-hairline)] bg-[var(--bg-surface)] py-[clamp(5rem,10vw,9rem)]"
    >
      <div className="fw-container">
        <div className="fw-grid mb-12 items-end border-b border-[var(--border-hairline)] pb-6">
          <div className="col-span-4 md:col-span-5 lg:col-span-7">
            <span className="type-meta mb-3 block text-[var(--ink-secondary)]">
              11 / TYPOGRAPHIC WORKBENCH
            </span>
            <h2 className="type-h1 text-[var(--ink-primary)]">
              Optical{' '}
              <span className="type-serif-accent font-normal">Calibration</span>{' '}
              &amp; Proximity
            </h2>
          </div>
          <div className="col-span-4 md:col-span-3 lg:col-span-5 lg:text-right">
            <span className="type-meta text-[var(--ink-secondary)]">
              ADJUST MEASURE, TRACKING, LEADING &amp; GLYPH PROXIMITY
            </span>
          </div>
        </div>

        {/* Interactive Cursor-Proximity Kinetic Specimen Bar (frontend-atlas text-effects.md#12) */}
        <div
          onPointerLeave={() => setHoveredCharIdx(null)}
          data-cursor="label"
          data-cursor-label="OPTICAL FIELD"
          className="mb-10 rounded-[2px] border border-[var(--border-hairline-strong)] bg-[var(--bg-canvas)] p-6 sm:p-8"
        >
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-[var(--border-hairline)] pb-3">
            <span className="type-meta text-[var(--ink-secondary)]">
              SPECIMEN 11-A // EUCLIDEAN CURSOR-PROXIMITY GLYPH FIELD
            </span>
            <span className="type-meta text-[var(--accent-vermilion)]">
              {hoveredCharIdx !== null
                ? `GLYPH [${PROXIMITY_WORD[hoveredCharIdx]}] — WEIGHT 800`
                : 'SWEEP ACROSS GLYPHS'}
            </span>
          </div>

          <div
            aria-label={PROXIMITY_WORD}
            className="flex items-center justify-between py-2 select-none"
          >
            {Array.from(PROXIMITY_WORD).map((char, idx) => {
              const dist =
                hoveredCharIdx === null ? 99 : Math.abs(hoveredCharIdx - idx);
              const weightFactor =
                dist === 0 ? 1 : dist === 1 ? 0.6 : dist === 2 ? 0.25 : 0;

              return (
                <span
                  key={idx}
                  onPointerEnter={() => setHoveredCharIdx(idx)}
                  style={
                    reducedMotion
                      ? undefined
                      : {
                          transform: `translateY(${-weightFactor * 10}px) scaleY(${
                            1 + weightFactor * 0.14
                          })`,
                          color:
                            dist === 0
                              ? 'var(--accent-vermilion)'
                              : 'var(--ink-primary)',
                        }
                  }
                  className="inline-block cursor-default font-extrabold text-[clamp(2.2rem,7.2vw,6.4rem)] leading-none tracking-[-0.04em] transition-all duration-200 ease-[var(--ease-out)]"
                >
                  {char}
                </span>
              );
            })}
          </div>
        </div>

        <div className="fw-grid items-start gap-y-10">
          {/* Left Controls: Cols 1-4 */}
          <div className="col-span-4 space-y-6 rounded-[2px] border border-[var(--border-hairline)] bg-[var(--bg-canvas)] p-6 md:col-span-8 lg:col-span-4">
            {/* Measure */}
            <div>
              <span className="type-meta mb-2.5 block text-[var(--ink-secondary)]">
                MEASURE (MAX LINE LENGTH)
              </span>
              <div className="grid grid-cols-3 gap-1.5">
                {MEASURES.map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMeasure(m)}
                    aria-pressed={measure === m}
                    className={`fw-btn-tactile type-meta min-h-[42px] rounded-[2px] border transition-colors ${
                      measure === m
                        ? 'border-[var(--accent-vermilion)] bg-[var(--accent-vermilion)] text-[#FAF9F6]'
                        : 'border-[var(--border-hairline)] bg-[var(--bg-surface)] text-[var(--ink-primary)] hover:border-[var(--ink-primary)]'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {/* Tracking */}
            <div>
              <span className="type-meta mb-2.5 block text-[var(--ink-secondary)]">
                TRACKING (LETTER SPACING)
              </span>
              <div className="grid grid-cols-3 gap-1.5">
                {TRACKINGS.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTracking(t)}
                    aria-pressed={tracking === t}
                    className={`fw-btn-tactile type-meta min-h-[42px] rounded-[2px] border transition-colors ${
                      tracking === t
                        ? 'border-[var(--accent-vermilion)] bg-[var(--accent-vermilion)] text-[#FAF9F6]'
                        : 'border-[var(--border-hairline)] bg-[var(--bg-surface)] text-[var(--ink-primary)] hover:border-[var(--ink-primary)]'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Leading */}
            <div>
              <span className="type-meta mb-2.5 block text-[var(--ink-secondary)]">
                LEADING (LINE HEIGHT)
              </span>
              <div className="grid grid-cols-3 gap-1.5">
                {LEADINGS.map((l) => (
                  <button
                    key={l}
                    type="button"
                    onClick={() => setLeading(l)}
                    aria-pressed={leading === l}
                    className={`fw-btn-tactile type-meta min-h-[42px] rounded-[2px] border transition-colors ${
                      leading === l
                        ? 'border-[var(--accent-vermilion)] bg-[var(--accent-vermilion)] text-[#FAF9F6]'
                        : 'border-[var(--border-hairline)] bg-[var(--bg-surface)] text-[var(--ink-primary)] hover:border-[var(--ink-primary)]'
                    }`}
                  >
                    {l.toFixed(2)}
                  </button>
                ))}
              </div>
            </div>

            {/* Baseline Rule Toggle */}
            <div className="flex items-center justify-between border-t border-[var(--border-hairline)] pt-4">
              <span className="type-meta text-[var(--ink-secondary)]">
                BASELINE RULER OVERLAY
              </span>
              <button
                type="button"
                onClick={() => setShowBaseline((b) => !b)}
                aria-pressed={showBaseline}
                className={`type-meta rounded-[2px] border px-3 py-1 transition-colors ${
                  showBaseline
                    ? 'border-[var(--accent-vermilion)] bg-[var(--accent-vermilion)] text-[#FAF9F6]'
                    : 'border-[var(--border-hairline)] bg-[var(--bg-surface)] text-[var(--ink-primary)]'
                }`}
              >
                {showBaseline ? 'VISIBLE' : 'HIDDEN'}
              </button>
            </div>

            {/* Live CSS Readout */}
            <div className="border-t border-[var(--border-hairline)] pt-4">
              <span className="type-meta mb-2 block text-[var(--ink-secondary)]">
                ACTIVE CSS TOKENS
              </span>
              <pre className="type-meta overflow-x-auto rounded-[2px] border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-3 text-[var(--ink-primary)]">
                {`max-width: ${measure};\nletter-spacing: ${tracking};\nline-height: ${leading};`}
              </pre>
            </div>
          </div>

          {/* Right Live Specimen: Cols 5-12 */}
          <div className="col-span-4 md:col-span-8 lg:col-span-8 lg:pl-6">
            <div
              style={
                showBaseline
                  ? {
                      backgroundImage:
                        'repeating-linear-gradient(to bottom, transparent, transparent 27px, rgba(217, 56, 30, 0.1) 28px)',
                    }
                  : undefined
              }
              className="flex min-h-[390px] flex-col justify-between rounded-[2px] border border-[var(--border-hairline)] bg-[var(--bg-canvas)] p-6 sm:p-10"
            >
              <div className="mb-6 flex items-center justify-between border-b border-[var(--border-hairline)] pb-4 text-[var(--ink-secondary)]">
                <span className="type-meta">
                  SPECIMEN 11-B — CABINET GROTESK + INSTRUMENT SERIF
                </span>
                <span className="type-meta text-[var(--accent-vermilion)]">
                  {measure === '62ch' && leading === 1.55
                    ? 'OPTIMAL EDITORIAL RATIO'
                    : 'CUSTOM SETTING'}
                </span>
              </div>

              <motion.div
                layout={!reducedMotion}
                transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                style={{
                  maxWidth: measure,
                  letterSpacing: tracking,
                  lineHeight: leading,
                }}
                className="my-auto text-lg text-[var(--ink-primary)] transition-all duration-200 ease-[var(--ease-out)] sm:text-xl"
              >
                <p>
                  Good typography is{' '}
                  <span className="type-serif-accent text-[1.15em] text-[var(--accent-vermilion)]">
                    architectural silence
                  </span>
                  : the eye travels from left datum to right return without
                  stumbling over cramped leading, arbitrary tracking, or runaway
                  line lengths. Setting body prose around{' '}
                  <span className="font-mono text-[0.85em]">62ch</span> with
                  calibrated leading gives complex engineering ideas room to
                  breathe.
                </p>
              </motion.div>

              <div className="mt-8 flex items-center justify-between border-t border-[var(--border-hairline)] pt-4 text-[var(--ink-secondary)]">
                <span className="type-meta">16PX FLOOR ENFORCED</span>
                <span className="type-meta">TABULAR FIGURES ACTIVE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
