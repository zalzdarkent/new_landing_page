import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// SEQUENCE 04 — typographic transformation: FORM + WORK overlap, drift apart,
// letter-spacing / scale / fill change, an image blooms between them (text -> image)
// while the whole environment shifts limestone -> vermilion -> limestone.
const WORD =
  'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-extrabold leading-none text-[clamp(3.4rem,15vw,15rem)] select-none';

export function TypoMorph({ reducedMotion }: { reducedMotion: boolean }) {
  const rootRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reducedMotion || !rootRef.current) return;
    const root = rootRef.current;
    const mm = gsap.matchMedia();
    mm.add({ wide: '(min-width: 768px)', narrow: '(max-width: 767px)' }, (ctx) => {
      const wide = !!ctx.conditions?.wide;
      const form = root.querySelector('.ty-form');
      const work = root.querySelector('.ty-work');
      const slot = root.querySelector('.ty-slot');
      const img = root.querySelector('.ty-img');
      const cap = root.querySelectorAll('.ty-cap');

      gsap.set(form, wide ? { x: '9vw', scale: 1.25, letterSpacing: '0.12em' } : { y: '-6svh', scale: 1.1, letterSpacing: '0.08em' });
      gsap.set(work, wide ? { x: '-9vw', scale: 1.25, letterSpacing: '0.12em', color: 'rgba(22,22,20,0)' } : { y: '6svh', scale: 1.1, letterSpacing: '0.08em', color: 'rgba(22,22,20,0)' });
      gsap.set(slot, { clipPath: 'inset(44% 42% 44% 42% round 999px)' });
      gsap.set(img, { scale: 1.5 });
      gsap.set(cap, { opacity: 0, y: 12 });

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: { trigger: root, start: 'top top', end: 'bottom bottom', scrub: true },
      });
      tl.to(form, wide ? { x: '-34vw', scale: 1, letterSpacing: '-0.045em', duration: 1.6, ease: 'power2.inOut' } : { y: '-27svh', scale: 1, letterSpacing: '-0.045em', duration: 1.6, ease: 'power2.inOut' }, 0.2)
        .to(work, wide ? { x: '34vw', scale: 1, letterSpacing: '-0.045em', color: 'rgba(22,22,20,1)', duration: 1.6, ease: 'power2.inOut' } : { y: '27svh', scale: 1, letterSpacing: '-0.045em', color: 'rgba(22,22,20,1)', duration: 1.6, ease: 'power2.inOut' }, 0.2)
        .to(slot, { clipPath: 'inset(0% 0% 0% 0% round 28px)', duration: 1.3, ease: 'power2.inOut' }, 0.7)
        .to(img, { scale: 1, duration: 1.8 }, 0.5)
        .to(stageRef.current, { backgroundColor: '#D9381E', duration: 0.8 }, 0.2)
        .to(stageRef.current, { backgroundColor: '#F2F0EC', duration: 0.8 }, 1.7)
        .to(cap, { opacity: 1, y: 0, duration: 0.4, stagger: 0.12 }, 1.6);
    });
    return () => mm.revert();
  }, [reducedMotion]);

  return (
    <section
      id="typo"
      ref={rootRef}
      aria-label="Form and work"
      className={`relative bg-[var(--bg-canvas)] ${reducedMotion ? '' : 'h-[280svh]'}`}
    >
      <div
        ref={stageRef}
        className={`${
          reducedMotion ? 'relative h-[100svh]' : 'sticky top-0 h-[100svh]'
        } overflow-hidden bg-[var(--bg-canvas)] text-[var(--ink-primary)]`}
      >
        <span
          aria-hidden="true"
          className={`ty-form ${WORD}`}
          style={reducedMotion ? { transform: 'translateX(-60%)' } : undefined}
        >
          FORM
        </span>
        <span
          aria-hidden="true"
          className={`ty-work ${WORD}`}
          style={
            reducedMotion
              ? { transform: 'translateX(60%)' }
              : { WebkitTextStroke: '2px #161614' }
          }
        >
          WORK
        </span>
        <h2 className="sr-only">Form and work</h2>

        <div
          className="ty-slot absolute left-1/2 top-1/2 aspect-[3/4] w-[44vw] -translate-x-1/2 -translate-y-1/2 overflow-hidden md:w-[28vw]"
          style={reducedMotion ? undefined : { clipPath: 'inset(44% 42% 44% 42% round 999px)' }}
        >
          <img
            src="/images/plate-02-instrument.jpg"
            alt="Machined instrument on limestone"
            className="ty-img h-full w-full object-cover"
          />
        </div>

        <div className="fw-container absolute inset-x-0 bottom-0 flex items-end justify-between pb-8">
          <span className="ty-cap type-meta">SPATIAL · TYPOGRAPHIC · INTERACTIVE</span>
          <span className="ty-cap type-meta">FORM + WORK = FORMWORK®</span>
        </div>
      </div>
    </section>
  );
}
