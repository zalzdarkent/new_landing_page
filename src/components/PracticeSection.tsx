import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ARCHIVE_LEDGER } from '../data/exhibition';

gsap.registerPlugin(ScrollTrigger);

const AXIOMS = ['Form follows friction.', 'Detail compounds trust.', 'Motion is architecture in time.'];

// SEQUENCE 05 — the dark taktil section transforms into this one: a circular mask
// of limestone grows out of basalt as you scroll in.
export function PracticeSection({ reducedMotion }: { reducedMotion: boolean }) {
  const rootRef = useRef<HTMLElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const ledgerRef = useRef<HTMLDivElement>(null);
  const [row, setRow] = useState<number | null>(null);

  useEffect(() => {
    if (reducedMotion || !revealRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        revealRef.current,
        { clipPath: 'circle(8% at 50% 0%)' },
        {
          clipPath: 'circle(150% at 50% 0%)',
          ease: 'none',
          scrollTrigger: { trigger: rootRef.current, start: 'top bottom', end: 'top 15%', scrub: true },
        }
      );
      gsap.utils.toArray<HTMLElement>('.ax-line').forEach((el) => {
        gsap.fromTo(
          el,
          { xPercent: -6, opacity: 0.15 },
          { xPercent: 0, opacity: 1, ease: 'none', scrollTrigger: { trigger: el, start: 'top 92%', end: 'top 55%', scrub: true } }
        );
      });
    }, rootRef);
    return () => ctx.revert();
  }, [reducedMotion]);

  useEffect(() => {
    const el = previewRef.current;
    const box = ledgerRef.current;
    if (!el || !box || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    gsap.set(el, { xPercent: -50, yPercent: -50 });
    const xTo = gsap.quickTo(el, 'x', { duration: reducedMotion ? 0.01 : 0.55, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: reducedMotion ? 0.01 : 0.55, ease: 'power3.out' });
    const rTo = gsap.quickTo(el, 'rotation', { duration: 0.45, ease: 'power3.out' });
    let last = 0;
    const move = (e: PointerEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      if (!reducedMotion) rTo(gsap.utils.clamp(-7, 7, (e.clientX - last) * 0.35));
      last = e.clientX;
    };
    box.addEventListener('pointermove', move, { passive: true });
    return () => box.removeEventListener('pointermove', move);
  }, [reducedMotion]);

  return (
    <section id="practice" ref={rootRef} className="bg-[var(--bg-darkroom)]">
      <div ref={revealRef} className="bg-[var(--bg-canvas)] py-[clamp(5rem,10vw,9rem)]">
        <div className="fw-container">
          <div className="mb-20 space-y-2">
            {AXIOMS.map((a) => (
              <p key={a} className="ax-line text-[clamp(2.2rem,6.4vw,6rem)] font-extrabold leading-[0.98] tracking-[-0.045em]">
                {a}
              </p>
            ))}
          </div>

          <div ref={ledgerRef} onPointerLeave={() => setRow(null)}>
            <div className="mb-4 flex items-baseline justify-between">
              <span className="type-meta text-[var(--accent-vermilion)]">LEDGER 2024–26</span>
              <span className="type-meta text-[var(--ink-secondary)]">ZURICH — JAKARTA</span>
            </div>
            <ul className="divide-y divide-[var(--border-hairline)] border-y border-[var(--border-hairline)]">
              {ARCHIVE_LEDGER.map((e, i) => (
                <li
                  key={e.id}
                  onPointerEnter={() => setRow(i)}
                  data-cursor="view"
                  data-cursor-label={e.code}
                  className={`flex items-baseline justify-between gap-4 py-4 transition-all duration-300 ease-[var(--ease-out)] ${
                    row !== null && row !== i ? 'opacity-30' : ''
                  } ${row === i ? 'sm:translate-x-2' : ''}`}
                >
                  <span className="type-meta w-24 shrink-0 text-[var(--accent-vermilion)]">{e.code}</span>
                  <span className="flex-1 text-xl font-medium tracking-[-0.02em] sm:text-3xl">{e.title}</span>
                  <span className="type-meta text-[var(--ink-secondary)]">{e.year}</span>
                </li>
              ))}
            </ul>

            <div
              ref={previewRef}
              aria-hidden="true"
              className={`pointer-events-none fixed left-0 top-0 z-40 hidden aspect-[4/3] w-[300px] overflow-hidden rounded-[2px] bg-[#161614] shadow-xl transition-[opacity,scale] duration-300 lg:block ${
                row !== null ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
              }`}
            >
              <div
                className="h-full w-full"
                style={{ transform: `translateY(${(row ?? 0) * -100}%)`, transition: 'transform 460ms cubic-bezier(0.76,0,0.24,1)' }}
              >
                {ARCHIVE_LEDGER.map((e) => (
                  <img key={e.id} src={e.image} alt="" loading="eager" className="h-full w-full object-cover" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
