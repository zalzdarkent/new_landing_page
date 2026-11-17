import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TICKER_ITEMS = [
  'SPATIAL WEB SYSTEMS',
  'SWISS TYPOGRAPHIC MONOGRAPHS',
  'PHYSICAL-TO-DIGITAL INTERFACES',
  'ARCHITECTURAL WAYFINDING',
  'CALIBRATED MOTION ENGINEERING',
];

export function VelocityTicker({ reducedMotion }: { reducedMotion: boolean }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reducedMotion || !rootRef.current || !trackRef.current) return;

    const ctx = gsap.context(() => {
      const track = trackRef.current!;
      const tween = gsap.to(track, {
        xPercent: -50,
        repeat: -1,
        duration: 28,
        ease: 'none',
      });

      const skewTo = gsap.quickTo(track, 'skewX', {
        duration: 0.35,
        ease: 'power3.out',
      });

      ScrollTrigger.create({
        trigger: rootRef.current,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          const velocity = self.getVelocity();
          const boost = gsap.utils.clamp(1, 3.8, 1 + Math.abs(velocity) / 450);
          gsap.to(tween, {
            timeScale: boost,
            duration: 0.25,
            overwrite: true,
          });
          skewTo(gsap.utils.clamp(-4, 4, velocity / -420));
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="overflow-hidden border-y border-[var(--border-hairline)] bg-[var(--bg-surface)] py-3.5"
    >
      <div ref={trackRef} className="flex w-max items-center whitespace-nowrap">
        {[0, 1].map((dup) => (
          <div key={dup} className="flex items-center">
            {TICKER_ITEMS.map((item) => (
              <span
                key={`${dup}-${item}`}
                className="type-meta inline-flex items-center gap-6 px-6 text-[var(--ink-secondary)]"
              >
                <span>{item}</span>
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--accent-vermilion)]" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

