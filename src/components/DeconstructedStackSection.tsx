import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'motion/react';
import { INTERFACE_STRATA, type StratumLayer } from '../data/exhibition';

gsap.registerPlugin(ScrollTrigger);

function StratumSandbox({
  layer,
  reducedMotion,
}: {
  layer: StratumLayer;
  reducedMotion: boolean;
}) {
  const [activeCols, setActiveCols] = useState(8);
  const [counterVal, setCounterVal] = useState(1618);
  const [springPing, setSpringPing] = useState(false);
  const [swatchIdx, setSwatchIdx] = useState(0);

  if (layer.accentMode === 'grid') {
    return (
      <div className="flex h-full flex-col justify-between rounded-[2px] border border-[var(--border-hairline)] bg-[var(--bg-canvas)] p-5">
        <div className="flex items-center justify-between border-b border-[var(--border-hairline)] pb-3">
          <span className="type-meta text-[var(--ink-secondary)]">
            LIVE SHUTTERING SIMULATOR
          </span>
          <div className="flex gap-1.5">
            {[4, 8, 12].map((col) => (
              <button
                key={col}
                type="button"
                onClick={() => setActiveCols(col)}
                className={`type-meta rounded-[2px] border px-2 py-0.5 transition-colors ${
                  activeCols === col
                    ? 'border-[var(--accent-vermilion)] bg-[var(--accent-vermilion)] text-[#FAF9F6]'
                    : 'border-[var(--border-hairline)] bg-[var(--bg-surface)] text-[var(--ink-primary)]'
                }`}
              >
                {col} COL
              </button>
            ))}
          </div>
        </div>

        <div className="my-4 grid h-28 grid-cols-12 gap-1.5">
          {Array.from({ length: 12 }).map((_, idx) => {
            const lit = idx < activeCols;
            return (
              <div
                key={idx}
                className={`flex items-end justify-center rounded-[1px] border pb-1.5 transition-all duration-200 ${
                  lit
                    ? 'border-[var(--accent-vermilion)]/50 bg-[var(--accent-vermilion)]/12 text-[var(--accent-vermilion)]'
                    : 'border-[var(--border-hairline)] bg-[var(--bg-surface)] text-[var(--ink-secondary)] opacity-45'
                }`}
              >
                <span className="type-meta text-[10px]">
                  {String(idx + 1).padStart(2, '0')}
                </span>
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-between text-[var(--ink-secondary)]">
          <span className="type-meta">ACTIVE BAY: {activeCols} / 12 COLUMNS</span>
          <span className="type-meta">RATIO {(activeCols / 12).toFixed(2)}</span>
        </div>
      </div>
    );
  }

  if (layer.accentMode === 'typography') {
    return (
      <div className="flex h-full flex-col justify-between rounded-[2px] border border-[var(--border-hairline)] bg-[var(--bg-canvas)] p-5">
        <div className="flex items-center justify-between border-b border-[var(--border-hairline)] pb-3">
          <span className="type-meta text-[var(--ink-secondary)]">
            OPTICAL &amp; TABULAR LOCK
          </span>
          <button
            type="button"
            onClick={() =>
              setCounterVal((v) => (v === 1618 ? 4820 : v === 4820 ? 9042 : 1618))
            }
            className="type-meta rounded-[2px] border border-[var(--border-hairline-strong)] bg-[var(--bg-surface)] px-2.5 py-0.5 text-[var(--accent-vermilion)] hover:border-[var(--accent-vermilion)]"
          >
            STEP NUMERAL ↻
          </button>
        </div>

        <div className="my-4 flex items-baseline justify-between gap-4">
          <div>
            <span className="type-meta block text-[var(--ink-secondary)]">
              DISPLAY + SERIF
            </span>
            <p className="text-3xl font-bold tracking-[-0.035em] text-[var(--ink-primary)] sm:text-4xl">
              Form{' '}
              <span className="type-serif-accent font-normal text-[var(--accent-vermilion)]">
                &amp;
              </span>{' '}
              Mass
            </p>
          </div>
          <div className="text-right">
            <span className="type-meta block text-[var(--ink-secondary)]">
              TABULAR-NUMS
            </span>
            <p className="font-mono text-2xl font-medium tabular-nums text-[var(--ink-primary)] sm:text-3xl">
              {counterVal}.04
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between text-[var(--ink-secondary)]">
          <span className="type-meta">ZERO HORIZONTAL JITTER</span>
          <span className="type-meta">62CH MEASURE</span>
        </div>
      </div>
    );
  }

  if (layer.accentMode === 'springs') {
    return (
      <div className="flex h-full flex-col justify-between rounded-[2px] border border-[var(--border-hairline)] bg-[var(--bg-canvas)] p-5">
        <div className="flex items-center justify-between border-b border-[var(--border-hairline)] pb-3">
          <span className="type-meta text-[var(--ink-secondary)]">
            INTERRUPTIBLE SPRING SHUTTLE
          </span>
          <button
            type="button"
            onClick={() => setSpringPing((p) => !p)}
            className="type-meta rounded-[2px] bg-[var(--accent-vermilion)] px-2.5 py-1 text-[#FAF9F6]"
          >
            IMPULSE ↔
          </button>
        </div>

        <div className="my-5 flex items-center rounded-[2px] border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-2">
          <motion.div
            animate={{ x: springPing ? 160 : 0 }}
            transition={
              reducedMotion
                ? { duration: 0.01 }
                : { type: 'spring', stiffness: 220, damping: 22, mass: 0.8 }
            }
            className="flex h-10 w-24 items-center justify-center rounded-[2px] bg-[var(--ink-primary)] text-[#FAF9F6]"
          >
            <span className="type-meta">60FPS</span>
          </motion.div>
        </div>

        <div className="flex items-center justify-between text-[var(--ink-secondary)]">
          <span className="type-meta">TRANSFORM ONLY</span>
          <span className="type-meta">k=220 / c=22</span>
        </div>
      </div>
    );
  }

  const swatches = [
    { name: 'Cast Limestone', hex: '#F2F0EC', ink: '#161614', lc: 'Lc 94' },
    { name: 'Deep Basalt', hex: '#161614', ink: '#F2F0EC', lc: 'Lc 92' },
    { name: 'Signal Vermilion', hex: '#D9381E', ink: '#FAF9F6', lc: 'DATUM' },
  ];
  const curSwatch = swatches[swatchIdx];

  return (
    <div className="flex h-full flex-col justify-between rounded-[2px] border border-[var(--border-hairline)] bg-[var(--bg-canvas)] p-5">
      <div className="flex items-center justify-between border-b border-[var(--border-hairline)] pb-3">
        <span className="type-meta text-[var(--ink-secondary)]">
          MATERIAL SURFACE CALIBRATION
        </span>
        <div className="flex gap-1.5">
          {swatches.map((s, i) => (
            <button
              key={s.name}
              type="button"
              onClick={() => setSwatchIdx(i)}
              className={`type-meta rounded-[2px] border px-2 py-0.5 ${
                swatchIdx === i
                  ? 'border-[var(--accent-vermilion)] bg-[var(--accent-vermilion)] text-[#FAF9F6]'
                  : 'border-[var(--border-hairline)] bg-[var(--bg-surface)] text-[var(--ink-primary)]'
              }`}
            >
              0{i + 1}
            </button>
          ))}
        </div>
      </div>

      <div
        style={{ backgroundColor: curSwatch.hex, color: curSwatch.ink }}
        className="my-4 flex h-24 items-end justify-between rounded-[2px] border border-[var(--border-hairline)] p-4 transition-colors duration-200"
      >
        <span className="text-base font-medium">{curSwatch.name}</span>
        <span className="type-meta">{curSwatch.hex}</span>
      </div>

      <div className="flex items-center justify-between text-[var(--ink-secondary)]">
        <span className="type-meta">APCA CONTRAST: {curSwatch.lc}</span>
        <span className="type-meta">GRAIN 0.032</span>
      </div>
    </div>
  );
}

export function DeconstructedStackSection({
  reducedMotion,
}: {
  reducedMotion: boolean;
}) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (reducedMotion || !rootRef.current) return;

    const mm = gsap.matchMedia();
    mm.add('(min-width: 768px)', () => {
      const cards = gsap.utils.toArray<HTMLElement>(
        '.fw-stratum-card',
        rootRef.current
      );
      const last = cards[cards.length - 1];

      cards.forEach((card, i) => {
        if (i === cards.length - 1) return;
        const depth = cards.length - 1 - i;
        const inner = card.querySelector<HTMLElement>('.fw-stratum-inner');
        const shade = card.querySelector<HTMLElement>('.fw-stratum-shade');

        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: cards[i + 1],
            start: 'top bottom',
            endTrigger: last,
            end: 'top 140px',
            scrub: true,
            invalidateOnRefresh: true,
          },
        });

        if (inner) {
          tl.to(inner, { scale: 1 - depth * 0.032 }, 0);
        }
        if (shade) {
          tl.to(shade, { opacity: Math.min(0.14 * depth, 0.42) }, 0);
        }
      });
    });

    return () => mm.revert();
  }, [reducedMotion]);

  return (
    <section
      id="strata"
      ref={rootRef}
      aria-label="Four Laminated Strata of an Interface"
      className="border-t border-[var(--border-hairline)] bg-[var(--bg-surface)] py-[clamp(5rem,10vw,9rem)]"
    >
      <div className="fw-container">
        {/* Section Header */}
        <div className="fw-grid mb-14 items-end border-b border-[var(--border-hairline)] pb-6 lg:mb-20">
          <div className="col-span-4 md:col-span-5 lg:col-span-7">
            <span className="type-meta mb-3 block text-[var(--ink-secondary)]">
              05 / ANATOMY OF AN INTERFACE
            </span>
            <h2 className="type-h1 text-[var(--ink-primary)]">
              Four Laminated{' '}
              <span className="type-serif-accent font-normal">Strata</span>
            </h2>
          </div>
          <div className="col-span-4 md:col-span-3 lg:col-span-5 lg:text-right">
            <span className="type-meta text-[var(--ink-secondary)]">
              STICKY STACKED DECK — SCROLL TO LAMINATE
            </span>
          </div>
        </div>

        {/* Sticky Stacked Deck (frontend-atlas scroll-gsap.md#9) */}
        <div className="space-y-8 md:space-y-[12svh] md:pb-[8svh]">
          {INTERFACE_STRATA.map((layer, index) => (
            <article
              key={layer.id}
              style={{ top: `calc(5.5rem + ${index * 1.35}rem)` }}
              className="fw-stratum-card md:sticky"
            >
              <div className="fw-stratum-inner relative origin-top overflow-hidden rounded-[2px] border border-[var(--border-hairline-strong)] bg-[var(--bg-surface)] p-6 shadow-sm sm:p-10">
                {/* Top Stratum Bar */}
                <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-hairline)] pb-4">
                  <span className="type-meta text-[var(--accent-vermilion)]">
                    {layer.stratum}
                  </span>
                  <span className="type-meta text-[var(--ink-secondary)]">
                    {layer.engineeringSpec}
                  </span>
                </div>

                <div className="fw-grid items-stretch gap-y-8">
                  {/* Left Narrative & Token Specs: Cols 1-7 */}
                  <div className="col-span-4 flex flex-col justify-between md:col-span-5 lg:col-span-7">
                    <div>
                      <h3 className="type-h1 mb-3 text-[var(--ink-primary)]">
                        {layer.title}
                      </h3>
                      <p className="type-body-lg mb-4 max-w-[46ch] text-[var(--ink-primary)]">
                        {layer.subtitle}
                      </p>
                      <p className="max-w-[52ch] text-base leading-relaxed text-[var(--ink-secondary)]">
                        {layer.description}
                      </p>
                    </div>

                    <dl className="mt-8 grid grid-cols-1 gap-3 border-t border-[var(--border-hairline)] pt-5 sm:grid-cols-3">
                      {layer.tokens.map((tok) => (
                        <div
                          key={tok.name}
                          className="border-l border-[var(--border-hairline)] pl-3"
                        >
                          <dt className="type-meta text-[var(--ink-secondary)]">
                            {tok.name}
                          </dt>
                          <dd className="mt-1 text-sm font-medium text-[var(--ink-primary)]">
                            {tok.value}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>

                  {/* Right Interactive Sandbox: Cols 8-12 */}
                  <div className="col-span-4 md:col-span-3 lg:col-span-5">
                    <StratumSandbox
                      layer={layer}
                      reducedMotion={reducedMotion}
                    />
                  </div>
                </div>

                {/* Covered-card dark shade overlay scrubbed by GSAP */}
                <div
                  aria-hidden="true"
                  className="fw-stratum-shade pointer-events-none absolute inset-0 bg-[#161614] opacity-0"
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

