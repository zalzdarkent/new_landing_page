import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin';
import { superPath } from '../lib/morph';

gsap.registerPlugin(ScrollTrigger, MorphSVGPlugin);

// SEQUENCE 01 + 02 — hero blob becomes the stage; a circle of light morphs
// (real path interpolation) circle -> blob -> blob -> full-bleed frame.
const S = {
  circle: superPath({ cx: 500, cy: 300, a: 105, b: 105 }),
  blob1: superPath({ cx: 500, cy: 300, a: 215, b: 185, amp: 0.14, k: 3 }),
  blob2: superPath({ cx: 500, cy: 300, a: 340, b: 270, amp: 0.12, k: 4, phase: 2 }),
  full: superPath({ cx: 500, cy: 300, a: 1250, b: 850, e: 6 }),
};

const FILTERS = [
  'brightness(0.82) contrast(1.1) sepia(0.12)',
  'brightness(1) contrast(1.04)',
  'brightness(0.7) contrast(1.15) sepia(0.2)',
] as const;
const TIMES = ['08:00', '12:15', '17:40'] as const;

export function MorphStage({ reducedMotion }: { reducedMotion: boolean }) {
  const rootRef = useRef<HTMLElement>(null);
  const clipRef = useRef<SVGPathElement>(null);
  const ringRef = useRef<SVGPathElement>(null);
  const imgRef = useRef<SVGImageElement>(null);
  const pctRef = useRef<HTMLSpanElement>(null);
  const [tIdx, setTIdx] = useState(1);

  useEffect(() => {
    if (reducedMotion || !rootRef.current) return;
    const ctx = gsap.context(() => {
      const words = gsap.utils.toArray<HTMLElement>('.st-word');
      gsap.set(imgRef.current, { scale: 1.55, svgOrigin: '500 300' });
      gsap.set(words, { opacity: 0.1, yPercent: 40 });

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
          onUpdate: (self) => {
            if (pctRef.current)
              pctRef.current.textContent = `${String(
                Math.round(self.progress * 100)
              ).padStart(3, '0')}%`;
          },
        },
      });
      const shapes = [clipRef.current, ringRef.current];
      tl.to(shapes, { morphSVG: S.blob1, duration: 1, ease: 'power1.inOut' }, 0)
        .to(shapes, { morphSVG: S.blob2, duration: 1, ease: 'power1.inOut' }, 1)
        .to(shapes, { morphSVG: S.full, duration: 1.3, ease: 'power2.inOut' }, 2)
        .to(imgRef.current, { scale: 1, svgOrigin: '500 300', duration: 3.3 }, 0)
        .to(ringRef.current, { opacity: 0, duration: 0.5 }, 2.6);
      words.forEach((w, i) =>
        tl.to(w, { opacity: 1, yPercent: 0, duration: 0.6, ease: 'power2.out' }, 0.5 + i * 0.95)
      );
    }, rootRef);
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      id="aperture"
      ref={rootRef}
      aria-label="Light is material"
      className={`relative bg-[#161614] text-[var(--ink-on-dark)] ${
        reducedMotion ? '' : 'h-[320svh]'
      }`}
    >
      <div
        className={`${
          reducedMotion ? 'relative h-[100svh]' : 'sticky top-0 h-[100svh]'
        } overflow-hidden`}
      >
        {/* ambient drifting glow */}
        <div
          aria-hidden="true"
          className="fw-orbit-slow pointer-events-none absolute -inset-[30%] opacity-70"
          style={{
            background:
              'radial-gradient(circle at 72% 30%, rgba(217,56,30,0.22), transparent 38%)',
          }}
        />
        <svg
          viewBox="0 0 1000 600"
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 h-full w-full"
          role="img"
          aria-label="Concrete pavilion with geometric sunlight"
        >
          <defs>
            <clipPath id="stage-clip">
              <path ref={clipRef} d={reducedMotion ? S.full : S.circle} />
            </clipPath>
          </defs>
          <g clipPath="url(#stage-clip)">
            <image
              ref={imgRef}
              href="/images/plate-01-pavilion.jpg"
              x="0"
              y="0"
              width="1000"
              height="600"
              preserveAspectRatio="xMidYMid slice"
              style={{ filter: FILTERS[tIdx], transition: 'filter 500ms' }}
            />
          </g>
          <path
            ref={ringRef}
            d={S.circle}
            fill="none"
            stroke="#D9381E"
            strokeWidth="1.5"
            opacity={reducedMotion ? 0 : 1}
          />
        </svg>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#161614]/90 via-transparent to-[#161614]/40"
        />

        <div className="fw-container absolute inset-x-0 bottom-0 z-10 pb-10">
          <h2 className="text-[clamp(3rem,11vw,10.5rem)] font-extrabold leading-[0.88] tracking-[-0.045em]">
            <span className="st-word block">Light</span>
            <span className="st-word block">
              is{' '}
              <span className="type-serif-accent font-normal text-[var(--accent-vermilion)]">
                material.
              </span>
            </span>
          </h2>
          <div className="mt-6 flex items-center justify-between gap-4 border-t border-[var(--border-hairline-dark)] pt-3">
            <span className="type-meta text-[var(--ink-on-dark-muted)]">
              KUROKAWA ANNEX — BASEL
            </span>
            <div className="flex items-center gap-1.5">
              {TIMES.map((t, i) => (
                <button
                  key={t}
                  type="button"
                  aria-pressed={tIdx === i}
                  onClick={() => setTIdx(i)}
                  className={`type-meta min-h-[34px] rounded-[2px] border px-2.5 transition-colors ${
                    tIdx === i
                      ? 'border-[var(--accent-vermilion)] bg-[var(--accent-vermilion)] text-[#FAF9F6]'
                      : 'border-[var(--border-hairline-dark)] text-[var(--ink-on-dark-muted)] hover:text-[var(--ink-on-dark)]'
                  }`}
                >
                  {t}
                </button>
              ))}
              <span
                ref={pctRef}
                className="type-meta ml-3 hidden text-[var(--accent-vermilion)] sm:inline"
              >
                000%
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

