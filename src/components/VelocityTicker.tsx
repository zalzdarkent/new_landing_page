import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TRACK_A_ITEMS = [
  'SPATIAL WEB ARCHITECTURE',
  'SWISS TYPOGRAPHIC MONOGRAPHS',
  'PHYSICAL-TO-DIGITAL INSTRUMENTS',
  'ORTHOGRAPHIC WAYFINDING',
  '60FPS COMPOSITOR CHOREOGRAPHY',
];

// const TRACK_B_ITEMS = [
//   'BAY RATIO 1 : 1.618',
//   'SHADOW GAP TOLERANCE 0.02MM',
//   'SPRING CONSTANT k=220 c=24',
//   'PBR IOR 1.48 BOROSILICATE',
//   'APCA Lc 92 DARK-ROOM CONTRAST',
// ];

export function VelocityTicker({ reducedMotion }: { reducedMotion: boolean }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const trackARef = useRef<HTMLDivElement>(null);
  const trackBRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      reducedMotion ||
      !rootRef.current ||
      !trackARef.current ||
      !trackBRef.current
    )
      return;

    const ctx = gsap.context(() => {
      const trackA = trackARef.current!;
      const trackB = trackBRef.current!;

      const tweenA = gsap.to(trackA, {
        xPercent: -50,
        repeat: -1,
        duration: 28,
        ease: 'none',
      });

      const tweenB = gsap.fromTo(
        trackB,
        { xPercent: -50 },
        {
          xPercent: 0,
          repeat: -1,
          duration: 34,
          ease: 'none',
        }
      );

      const skewATo = gsap.quickTo(trackA, 'skewX', {
        duration: 0.35,
        ease: 'power3.out',
      });
      const skewBTo = gsap.quickTo(trackB, 'skewX', {
        duration: 0.35,
        ease: 'power3.out',
      });

      ScrollTrigger.create({
        trigger: rootRef.current,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          const velocity = self.getVelocity();
          const boost = gsap.utils.clamp(1, 4.2, 1 + Math.abs(velocity) / 420);
          gsap.to([tweenA, tweenB], {
            timeScale: boost,
            duration: 0.25,
            overwrite: true,
          });
          const skewVal = gsap.utils.clamp(-5, 5, velocity / -380);
          skewATo(skewVal);
          skewBTo(-skewVal);
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="overflow-hidden border-y border-[var(--border-hairline)] bg-[var(--bg-surface)]"
    >
      {/* Primary Stream */}
      <div className="border-b border-[var(--border-hairline)] py-3">
        <div
          ref={trackARef}
          className="flex w-max items-center whitespace-nowrap"
        >
          {[0, 1].map((dup) => (
            <div key={dup} className="flex items-center">
              {TRACK_A_ITEMS.map((item) => (
                <span
                  key={`${dup}-${item}`}
                  className="type-meta inline-flex items-center gap-6 px-6 text-[var(--ink-primary)]"
                >
                  <span>{item}</span>
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--accent-vermilion)]" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Counter-Rotating Telemetry Stream */}
      {/* <div className="bg-[var(--bg-canvas)]/60 py-2.5">
        <div
          ref={trackBRef}
          className="flex w-max items-center whitespace-nowrap"
        >
          {[0, 1].map((dup) => (
            <div key={dup} className="flex items-center">
              {TRACK_B_ITEMS.map((item) => (
                <span
                  key={`${dup}-${item}`}
                  className="type-meta inline-flex items-center gap-6 px-6 text-[var(--ink-secondary)]"
                >
                  <span>{item}</span>
                  <span className="text-[var(--accent-vermilion)]">+</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
}
