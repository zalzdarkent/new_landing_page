import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin';
import { superPath } from '../lib/morph';

gsap.registerPlugin(ScrollTrigger, MorphSVGPlugin);

const DISCIPLINES = [
  { word: 'Spatial web', tag: 'THREE.JS · R3F · GLSL', stat: '60', unit: 'FPS', fill: '#D9381E', d: superPath({ cx: 200, cy: 200, a: 140, b: 140, amp: 0.1, k: 3 }) },
  { word: 'Type systems', tag: 'GRID · CLAMP · OPENTYPE', stat: '62', unit: 'CH', fill: '#161614', d: superPath({ cx: 200, cy: 200, a: 125, b: 125, e: 5 }) },
  { word: 'Motion', tag: 'GSAP · MOTION · LENIS', stat: '140', unit: 'MS', fill: '#9A968E', d: superPath({ cx: 200, cy: 200, a: 150, b: 120, amp: 0.2, k: 4, phase: 1.4 }) },
  { word: 'Instruments', tag: 'SVG · CANVAS · HARDWARE UI', stat: '1:1', unit: 'COUPLING', fill: '#CFC8BA', d: superPath({ cx: 200, cy: 200, a: 150, b: 150, e: 1.15 }) },
] as const;

const PROCESS = [
  ['Excavate', 'W1'],
  ['Formwork', 'W2–3'],
  ['Cast', 'W4–5'],
  ['Cure', 'W6'],
  ['Verify', 'W7'],
] as const;

export function DisciplinesSection({ reducedMotion }: { reducedMotion: boolean }) {
  const rootRef = useRef<HTMLElement>(null);
  const shapeRef = useRef<SVGPathElement>(null);
  const ringRef = useRef<SVGPathElement>(null);
  const [active, setActive] = useState(0);

  const goTo = (i: number) => {
    setActive(i);
    const D = DISCIPLINES[i];
    gsap.to([shapeRef.current, ringRef.current], {
      morphSVG: D.d,
      duration: reducedMotion ? 0 : 0.9,
      ease: 'power3.inOut',
      overwrite: 'auto',
    });
    gsap.to(shapeRef.current, { fill: D.fill, duration: reducedMotion ? 0 : 0.6 });
  };

  useEffect(() => {
    if (reducedMotion || !rootRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to('.pr-bar', {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: '.pr-wrap',
          start: 'top 80%',
          end: 'bottom 55%',
          scrub: true,
          onUpdate: (self) => {
            gsap.utils.toArray<HTMLElement>('.pr-dot').forEach((d, i) => {
              d.toggleAttribute('data-on', self.progress >= i / (PROCESS.length - 1) - 0.02);
            });
          },
        },
      });
      // ambient breathing of the morph shape
      gsap.to(shapeRef.current, {
        rotation: 360,
        svgOrigin: '200 200',
        duration: 60,
        repeat: -1,
        ease: 'none',
      });
    }, rootRef);
    return () => ctx.revert();
  }, [reducedMotion]);

  const cur = DISCIPLINES[active];

  return (
    <section
      id="capabilities"
      ref={rootRef}
      className="border-t border-[var(--border-hairline)] bg-[var(--bg-canvas)] py-[clamp(4.5rem,9vw,8rem)]"
    >
      <div className="fw-container">
        <div className="grid items-center gap-10 lg:grid-cols-12">
          <ul className="lg:col-span-7" onPointerLeave={() => undefined}>
            {DISCIPLINES.map((d, i) => (
              <li key={d.word} className="border-b border-[var(--border-hairline)] last:border-b-0">
                <button
                  type="button"
                  onPointerEnter={() => goTo(i)}
                  onFocus={() => goTo(i)}
                  onClick={() => goTo(i)}
                  data-cursor="label"
                  data-cursor-label="MORPH"
                  className={`group flex w-full items-baseline justify-between gap-4 py-4 text-left transition-all duration-300 ease-[var(--ease-out)] ${
                    active === i ? 'pl-4 text-[var(--ink-primary)]' : 'text-[var(--ink-primary)]/30 hover:text-[var(--ink-primary)]/60'
                  }`}
                >
                  <span className="text-[clamp(2.4rem,7vw,6.2rem)] font-extrabold leading-[0.95] tracking-[-0.045em]">
                    {d.word}
                  </span>
                  <span className="type-meta hidden shrink-0 text-[var(--ink-secondary)] sm:block">{d.tag}</span>
                </button>
              </li>
            ))}
          </ul>

          <div className="relative mx-auto aspect-square w-full max-w-[460px] lg:col-span-5">
            <svg viewBox="0 0 400 400" className="h-full w-full" aria-hidden="true">
              <path ref={ringRef} d={DISCIPLINES[0].d} fill="none" stroke="#161614" strokeOpacity="0.25" strokeDasharray="3 6" transform="translate(200 200) scale(1.16) translate(-200 -200)" />
              <path ref={shapeRef} d={DISCIPLINES[0].d} fill={DISCIPLINES[0].fill} />
            </svg>
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center mix-blend-difference text-white">
              <span className="font-mono text-[clamp(3rem,9vw,6rem)] font-bold leading-none tabular-nums">{cur.stat}</span>
              <span className="type-meta mt-1">{cur.unit}</span>
            </div>
          </div>
        </div>

        <div className="pr-wrap mt-20 border-t border-[var(--border-hairline-strong)] pt-8">
          <div className="relative">
            <div className="absolute left-0 right-0 top-[7px] h-px bg-[var(--border-hairline-strong)]" />
            <div className="pr-bar absolute left-0 right-0 top-[6px] h-[3px] origin-left bg-[var(--accent-vermilion)]" style={{ transform: reducedMotion ? 'scaleX(1)' : 'scaleX(0)' }} />
            <ol className="relative grid grid-cols-5">
              {PROCESS.map(([name, wk], i) => (
                <li key={name} className={`${i === PROCESS.length - 1 ? 'text-right' : ''} ${i > 0 && i < PROCESS.length - 1 ? 'text-center' : ''}`}>
                  <span
                    className="pr-dot inline-block h-4 w-4 rounded-full border-2 border-[var(--ink-primary)] bg-[var(--bg-canvas)] transition-colors duration-300 data-[on]:border-[var(--accent-vermilion)] data-[on]:bg-[var(--accent-vermilion)]"
                    {...(reducedMotion ? { 'data-on': '' } : {})}
                  />
                  <span className="mt-3 block text-sm font-medium tracking-[-0.01em] sm:text-lg">{name}</span>
                  <span className="type-meta text-[var(--ink-secondary)]">{wk}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

