import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface FlightSystemSectionProps {
  reducedMotion: boolean;
}

export function FlightSystemSection({
  reducedMotion,
}: FlightSystemSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const beamRef = useRef<HTMLDivElement>(null);
  const ringsRef = useRef<HTMLDivElement>(null);
  const [mach, setMach] = useState('0.0');

  useEffect(() => {
    if (reducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        scrub: 0.5,
        onUpdate: (self) => {
          const m = (self.progress * 12).toFixed(1);
          setMach(m);
          if (beamRef.current) {
            beamRef.current.style.transform = `scaleY(${0.4 + self.progress * 1.4}) scaleX(${0.85 + self.progress * 0.35})`;
            beamRef.current.style.opacity = `${0.35 + self.progress * 0.65}`;
          }
          if (ringsRef.current) {
            ringsRef.current.style.transform = `scale(${0.7 + self.progress * 0.9})`;
          }
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      id="flight"
      ref={sectionRef}
      className="relative flex min-h-[100dvh] w-full flex-col justify-between overflow-hidden bg-[radial-gradient(ellipse_at_bottom,#0C2340_0%,#06070A_65%)] py-22"
    >
      {/* Top HUD */}
      <div className="fw-container relative z-20 flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="type-meta text-[#38BDF8]">10 // FLIGHT SYSTEM</span>
          <h2 className="type-h1 mt-1 text-white">REPULSOR PROPULSION</h2>
        </div>
        <div className="border border-[#38BDF8]/40 bg-[#06070A]/80 px-5 py-3 backdrop-blur-md">
          <span className="type-meta block text-[10px] text-[var(--ink-secondary)]">
            THRUST VELOCITY
          </span>
          <span className="font-mono text-2xl font-bold tracking-tight text-[#E0F2FE]">
            MACH {reducedMotion ? '12.0' : mach}
          </span>
        </div>
      </div>

      {/* Central Repulsor Thruster & Mach Shockwave Visualization */}
      <div className="relative z-10 my-auto flex h-[54vh] w-full items-center justify-center">
        {/* Expanding Mach Shockwave Rings */}
        <div
          ref={ringsRef}
          className="pointer-events-none relative flex items-center justify-center transition-transform duration-100"
        >
          <div className="h-56 w-56 rounded-full border border-[#38BDF8]/30 shadow-[0_0_50px_rgba(56,189,248,0.2)]" />
          <div className="absolute h-80 w-80 rounded-full border border-dashed border-[#7DD3FC]/25" />
          <div className="absolute h-[420px] w-[420px] rounded-full border border-[#E11D2E]/20" />
        </div>

        {/* Repulsor Emitter Core & Vertical Plasma Plume */}
        <div className="absolute flex flex-col items-center">
          <div className="h-20 w-20 rounded-full border-2 border-[#E0F2FE] bg-[#38BDF8]/30 shadow-[0_0_60px_#38BDF8]" />
          <div
            ref={beamRef}
            className="mt-2 h-64 w-16 origin-top rounded-b-full bg-gradient-to-b from-[#E0F2FE] via-[#38BDF8]/65 to-transparent blur-md"
          />
        </div>
      </div>

      {/* Bottom Telemetry */}
      <div className="fw-container relative z-20 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-4">
        <span className="type-meta text-[11px] text-[var(--ink-secondary)]">
          ALTITUDE // STRATOSPHERE
        </span>
        <span className="type-meta text-[11px] text-[#38BDF8]">
          FLIGHT STABILIZERS LOCKED
        </span>
      </div>
    </section>
  );
}

