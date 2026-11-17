import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin';
import { superPath } from '../lib/morph';

gsap.registerPlugin(ScrollTrigger, MorphSVGPlugin);

// Shape morph chain: square -> pill -> organic blob -> circle, with variable-font
// numerals (JetBrains Mono wght axis) and a background that sinks to basalt.
const C = 200;
const SHAPES = [
  superPath({ cx: C, cy: C, a: 130, b: 130, e: 5 }),
  superPath({ cx: C, cy: C, a: 92, b: 168, e: 3 }),
  superPath({ cx: C, cy: C, a: 150, b: 140, amp: 0.2, k: 3, phase: 0.8 }),
  superPath({ cx: C, cy: C, a: 150, b: 150 }),
];
const FILLS = ['#CFC8BA', '#161614', '#9A968E', '#D9381E'];
const STAGES = [
  { word: 'Grid', stat: '12', unit: 'COLUMNS' },
  { word: 'Type', stat: '62', unit: 'CH MEASURE' },
  { word: 'Motion', stat: '220', unit: 'STIFFNESS' },
  { word: 'Matter', stat: '1.48', unit: 'GLASS IOR' },
];

export function MatterShapes({ reducedMotion }: { reducedMotion: boolean }) {
  const rootRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<SVGPathElement>(null);
  const o1 = useRef<SVGPathElement>(null);
  const o2 = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (reducedMotion || !rootRef.current) return;
    const ctx = gsap.context(() => {
      const words = gsap.utils.toArray<HTMLElement>('.ms-word');
      const stats = gsap.utils.toArray<HTMLElement>('.ms-stat');
      gsap.set(words.slice(1), { opacity: 0.18 });
      gsap.set(stats.slice(1), { opacity: 0 });
      gsap.set(stats, { fontWeight: 200 });
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: { trigger: rootRef.current, start: 'top top', end: 'bottom bottom', scrub: 0.3 },
      });
      const paths = [fillRef.current, o1.current, o2.current];
      STAGES.forEach((_, i) => {
        const at = i * 1.2;
        tl.to(stats[i], { fontWeight: 800, duration: 0.7 }, at);
        if (i < STAGES.length - 1) {
          tl.to(paths, { morphSVG: SHAPES[i + 1], duration: 0.65, ease: 'power2.inOut', stagger: 0.05 }, at + 0.55)
            .to(fillRef.current, { fill: FILLS[i + 1], duration: 0.65 }, at + 0.55)
            .to(words[i], { opacity: 0.18, duration: 0.3 }, at + 0.55)
            .to(stats[i], { opacity: 0, yPercent: -25, duration: 0.3 }, at + 0.55)
            .to(words[i + 1], { opacity: 1, duration: 0.35 }, at + 0.75)
            .fromTo(stats[i + 1], { opacity: 0, yPercent: 25 }, { opacity: 1, yPercent: 0, duration: 0.35 }, at + 0.75);
        }
      });
      tl.to(stageRef.current, { backgroundColor: '#161614', color: '#F2F0EC', duration: 1.2 }, 2.2).to({}, { duration: 0.3 });
    }, rootRef);
    return () => ctx.revert();
  }, [reducedMotion]);

  if (reducedMotion) {
    return (
      <section id="shapes" aria-label="Grid, type, motion, matter" className="border-t border-[var(--border-hairline)] bg-[var(--bg-canvas)] py-16">
        <div className="fw-container grid grid-cols-2 gap-6 sm:grid-cols-4">
          {STAGES.map((s) => (
            <div key={s.word} className="border-l border-[var(--border-hairline-strong)] pl-4">
              <h2 className="type-h1 text-[var(--ink-primary)]">{s.word}</h2>
              <p className="mt-2 font-mono text-2xl font-bold tabular-nums text-[var(--accent-vermilion)]">{s.stat}</p>
              <span className="type-meta text-[var(--ink-secondary)]">{s.unit}</span>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section id="shapes" ref={rootRef} aria-label="Grid, type, motion, matter" className="relative h-[260svh]">
      <div
        ref={stageRef}
        className="sticky top-0 h-[100svh] overflow-hidden bg-[var(--bg-canvas)] text-[var(--ink-primary)]"
      >
        <div className="fw-container grid h-full items-center gap-6 lg:grid-cols-12">
          <div className="flex flex-col justify-center gap-1 lg:col-span-6">
            {STAGES.map((s, i) => (
              <h2
                key={s.word}
                className="ms-word text-[clamp(2.8rem,9vw,7.5rem)] font-extrabold leading-[0.88] tracking-[-0.05em]"
                style={i > 0 ? { opacity: 0.18 } : undefined}
              >
                {s.word}
              </h2>
            ))}
          </div>
          <div className="relative mx-auto aspect-square w-full max-w-[min(500px,48svh)] lg:col-span-6">
            <svg viewBox="0 0 400 400" className="h-full w-full" aria-hidden="true">
              <path ref={o2} d={SHAPES[0]} fill="none" stroke="currentColor" strokeOpacity="0.18" transform="translate(200 200) scale(1.3) translate(-200 -200)" />
              <path ref={o1} d={SHAPES[0]} fill="none" stroke="currentColor" strokeOpacity="0.35" transform="translate(200 200) scale(1.15) translate(-200 -200)" />
              <path ref={fillRef} d={SHAPES[0]} fill={FILLS[0]} />
            </svg>
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center text-white mix-blend-difference">
              {STAGES.map((s, i) => (
                <div
                  key={s.stat}
                  className="ms-stat absolute flex flex-col items-center font-mono text-[clamp(3rem,9vw,7rem)] leading-none tabular-nums"
                  style={i > 0 ? { opacity: 0 } : undefined}
                >
                  {s.stat}
                  <span className="type-meta mt-2 font-normal">{s.unit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
