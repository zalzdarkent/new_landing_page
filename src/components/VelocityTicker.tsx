import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TICKER_ITEMS = [
  'STARK INDUSTRIES',
  'MARK LXXXV',
  'ARC REACTOR // 24.0 GJ/S',
  'J.A.R.V.I.S. TACTICAL OS',
  'VIBRANIUM-NANO MATRIX',
  'MACH 12.0 PROPULSION',
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
        duration: 24,
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
          const boost = gsap.utils.clamp(1, 4.5, 1 + Math.abs(velocity) / 400);
          gsap.to(tween, {
            timeScale: boost,
            duration: 0.25,
            overwrite: true,
          });
          skewTo(gsap.utils.clamp(-5, 5, velocity / -380));
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="overflow-hidden border-y border-[var(--border-hud)] bg-[#0A0D12] py-3"
    >
      <div ref={trackRef} className="flex w-max items-center whitespace-nowrap">
        {[0, 1].map((dup) => (
          <div key={dup} className="flex items-center">
            {TICKER_ITEMS.map((item, idx) => (
              <span
                key={`${dup}-${item}`}
                className="type-meta inline-flex items-center gap-6 px-6 text-[var(--ink-secondary)]"
              >
                <span className={idx % 2 === 0 ? 'text-[#E0F2FE]' : 'text-[#8A94A6]'}>
                  {item}
                </span>
                <span
                  className={`inline-block h-1.5 w-1.5 rotate-45 ${
                    idx % 3 === 0
                      ? 'bg-[#38BDF8] shadow-[0_0_8px_#38BDF8]'
                      : idx % 3 === 1
                        ? 'bg-[#F5D061]'
                        : 'bg-[#E11D2E]'
                  }`}
                />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
