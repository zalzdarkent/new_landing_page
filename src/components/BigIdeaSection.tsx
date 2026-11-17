import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

const BIG_IDEA_TEXT =
  'Software has forgotten the resistance of stone, the detent of machined brass, and the silence of uncut linen. We do not decorate screens—we pour structural formwork where every pixel carries physical mass.';

const THESIS_PILLARS = [
  {
    code: '01 // MASS OVER ORNAMENT',
    title: 'Structural Honesty',
    detail:
      'Every border, column, and shadow gap corresponds to a real load-bearing decision in the layout grid—never decorative wallpaper.',
    metric: '12-COL ORTHOGRAPHIC',
  },
  {
    code: '02 // MECHANICAL COUPLING',
    title: 'Calibrated Resistance',
    detail:
      'Controls respond within 140ms using spring constants modeled on physical rotary encoders and damped architectural hinges.',
    metric: 'k=220 / c=24 SPRING',
  },
  {
    code: '03 // ZERO-SHIFT PERMANENCE',
    title: 'Archival Longevity',
    detail:
      'Self-owned codebases engineered without ephemeral trends, layout shifts, or competing animation loops.',
    metric: '0.00 CLS VERIFIED',
  },
];

export function BigIdeaSection({ reducedMotion }: { reducedMotion: boolean }) {
  const rootRef = useRef<HTMLElement>(null);
  const spiralPathRef = useRef<SVGPathElement>(null);
  const readProgressRef = useRef<HTMLSpanElement>(null);
  const [activePillar, setActivePillar] = useState(0);

  useEffect(() => {
    if (reducedMotion || !rootRef.current) return;

    const target = rootRef.current.querySelector<HTMLElement>('[data-split]');
    if (!target) return;

    const ctx = gsap.context(() => {
      SplitText.create(target, {
        type: 'words',
        tag: 'span',
        aria: 'hidden',
        onSplit(self) {
          return gsap.fromTo(
            self.words,
            { opacity: 0.16 },
            {
              opacity: 1,
              ease: 'none',
              duration: 0.4,
              stagger: 0.08,
              scrollTrigger: {
                trigger: target,
                start: 'top 80%',
                end: 'bottom 42%',
                scrub: true,
                onUpdate: (st) => {
                  if (readProgressRef.current) {
                    readProgressRef.current.textContent = `${Math.round(
                      st.progress * 100
                    )}% ILLUMINATED`;
                  }
                },
              },
            }
          );
        },
      });

      if (spiralPathRef.current) {
        const len = spiralPathRef.current.getTotalLength?.() || 600;
        gsap.set(spiralPathRef.current, {
          strokeDasharray: len,
          strokeDashoffset: len,
        });
        gsap.to(spiralPathRef.current, {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top 75%',
            end: 'bottom 45%',
            scrub: true,
          },
        });
      }
    }, rootRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      id="thesis"
      ref={rootRef}
      aria-label="Core Studio Thesis"
      className="border-b border-[var(--border-hairline)] bg-[var(--bg-canvas)] py-[clamp(5.5rem,11vw,9.5rem)]"
    >
      <div className="fw-container">
        <div className="fw-grid items-start gap-y-10">
          {/* Left Sticky Orthographic Ratio Diagram: Cols 1-4 */}
          <div className="col-span-4 md:col-span-3 lg:sticky lg:top-24 lg:col-span-4">
            <span className="type-meta block text-[var(--ink-secondary)]">
              02 / THE STRUCTURAL THESIS
            </span>
            <span className="type-meta mt-1.5 block text-[var(--accent-vermilion)]">
              AGAINST WEIGHTLESS SOFTWARE
            </span>

            {/* Scroll-Scrubbed Golden Ratio SVG Diagram */}
            <div className="mt-6 rounded-[2px] border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-4">
              <div className="mb-3 flex items-center justify-between border-b border-[var(--border-hairline)] pb-2">
                <span className="type-meta text-[var(--ink-secondary)]">
                  FIG. 02 — FIBONACCI BAY
                </span>
                <span
                  ref={readProgressRef}
                  className="type-meta text-[var(--accent-vermilion)]"
                >
                  {reducedMotion ? '100% ILLUMINATED' : '0% ILLUMINATED'}
                </span>
              </div>

              <svg
                viewBox="0 0 260 160"
                className="w-full"
                aria-hidden="true"
              >
                <rect
                  x="10"
                  y="10"
                  width="240"
                  height="140"
                  fill="none"
                  stroke="rgba(22,22,20,0.16)"
                  strokeWidth="1"
                />
                <line
                  x1="158"
                  y1="10"
                  x2="158"
                  y2="150"
                  stroke="rgba(22,22,20,0.16)"
                  strokeWidth="1"
                />
                <line
                  x1="158"
                  y1="96"
                  x2="250"
                  y2="96"
                  stroke="rgba(22,22,20,0.16)"
                  strokeWidth="1"
                />
                <line
                  x1="194"
                  y1="96"
                  x2="194"
                  y2="150"
                  stroke="rgba(22,22,20,0.16)"
                  strokeWidth="1"
                />
                <path
                  ref={spiralPathRef}
                  d="M 10 150 A 140 140 0 0 1 158 10 A 86 86 0 0 1 250 96 A 54 54 0 0 1 194 150 A 36 36 0 0 1 158 114"
                  fill="none"
                  stroke="#D9381E"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <circle cx="176" cy="114" r="3" fill="#D9381E" />
              </svg>

              <div className="mt-3 flex items-center justify-between text-[var(--ink-secondary)]">
                <span className="type-meta">PHI = 1.6180339</span>
                <span className="type-meta">SCROLL TO INSCRIBE</span>
              </div>
            </div>
          </div>

          {/* Right Essay + Interactive Pillars: Cols 5-12 */}
          <div className="col-span-4 md:col-span-5 lg:col-span-8 lg:pl-6">
            <p className="max-w-[28ch] text-[clamp(1.75rem,3.5vw,3.25rem)] font-medium leading-[1.1] tracking-[-0.03em] text-[var(--ink-primary)]">
              <span className="sr-only">{BIG_IDEA_TEXT}</span>
              <span aria-hidden="true" data-split>
                {BIG_IDEA_TEXT}
              </span>
            </p>

            {/* Three Interactive Structural Pillars */}
            <div className="mt-12 grid grid-cols-1 gap-4 border-t border-[var(--border-hairline)] pt-8 sm:grid-cols-3">
              {THESIS_PILLARS.map((pillar, idx) => {
                const active = activePillar === idx;
                return (
                  <button
                    key={pillar.code}
                    type="button"
                    onClick={() => setActivePillar(idx)}
                    onPointerEnter={() => setActivePillar(idx)}
                    className={`flex flex-col justify-between rounded-[2px] border p-5 text-left transition-all duration-200 ease-[var(--ease-out)] ${
                      active
                        ? 'border-[var(--accent-vermilion)] bg-[var(--bg-surface)] shadow-sm'
                        : 'border-[var(--border-hairline)] bg-[var(--bg-canvas)] hover:border-[var(--ink-primary)]'
                    }`}
                  >
                    <div>
                      <span
                        className={`type-meta mb-2 block ${
                          active
                            ? 'text-[var(--accent-vermilion)]'
                            : 'text-[var(--ink-secondary)]'
                        }`}
                      >
                        {pillar.code}
                      </span>
                      <h3 className="type-h3 mb-2 text-[var(--ink-primary)]">
                        {pillar.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-[var(--ink-secondary)]">
                        {pillar.detail}
                      </p>
                    </div>
                    <div className="mt-5 border-t border-[var(--border-hairline)] pt-2.5">
                      <span className="type-meta text-[var(--ink-primary)]">
                        {pillar.metric}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
