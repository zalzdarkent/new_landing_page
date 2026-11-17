import { Suspense, lazy, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'motion/react';

const HeroAwakeningScene = lazy(() =>
  import('./three/HeroAwakeningScene').then((mod) => ({
    default: mod.HeroAwakeningScene,
  }))
);

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  reducedMotion: boolean;
  onNavigate: (id: string) => void;
}

export function HeroSection({ reducedMotion, onNavigate }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const pointerRef = useRef({ x: 0, y: 0 });
  const scrollProgressRef = useRef(0);
  const [pulseTrigger, setPulseTrigger] = useState(0);
  const [pulseWaveKey, setPulseWaveKey] = useState(0);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      pointerRef.current.x = nx;
      pointerRef.current.y = ny;

      if (glowRef.current && !reducedMotion) {
        glowRef.current.style.transform = `translate3d(${nx * 45}px, ${ny * 35}px, 0)`;
      }
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [reducedMotion]);

  useEffect(() => {
    if (reducedMotion || !sectionRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: 'bottom top',
      onUpdate: (self) => {
        scrollProgressRef.current = self.progress;
      },
    });

    return () => trigger.kill();
  }, [reducedMotion]);

  const handleCorePulse = () => {
    setPulseTrigger((c) => c + 1);
    setPulseWaveKey((k) => k + 1);
  };

  return (
    <section
      id="awakening"
      ref={sectionRef}
      data-cursor="drag"
      data-cursor-label="ORBIT"
      className="relative flex min-h-[100dvh] w-full flex-col justify-between overflow-hidden bg-[#06070A] pt-20 pb-8"
    >
      {/* Volumetric Atmospheric Glow */}
      <div
        ref={glowRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center transition-transform duration-300 ease-out"
      >
        <div className="h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.22)_0%,rgba(225,29,46,0.08)_42%,rgba(6,7,10,0)_72%)] blur-2xl" />
      </div>

      {/* Tactical HUD Corner Reticles */}
      <div className="pointer-events-none absolute inset-x-6 top-24 bottom-12 hidden border border-white/[0.04] md:block">
        <span className="absolute -top-px -left-px h-5 w-5 border-t border-l border-[#38BDF8]/50" />
        <span className="absolute -top-px -right-px h-5 w-5 border-t border-r border-[#38BDF8]/50" />
        <span className="absolute -bottom-px -left-px h-5 w-5 border-b border-l border-[#38BDF8]/50" />
        <span className="absolute -bottom-px -right-px h-5 w-5 border-b border-r border-[#38BDF8]/50" />
      </div>

      {/* Full-Bleed Real-Time 3D Iron Man Helmet & Arc Reactor */}
      <div className="absolute inset-0 z-10">
        <Suspense
          fallback={
            <div className="flex h-full w-full items-center justify-center">
              <div className="h-24 w-24 rounded-full border border-[#38BDF8]/60 bg-[#38BDF8]/20 shadow-[0_0_60px_rgba(56,189,248,0.5)]" />
            </div>
          }
        >
          <HeroAwakeningScene
            pointer={pointerRef}
            scrollProgress={scrollProgressRef}
            pulseTrigger={pulseTrigger}
            reducedMotion={reducedMotion}
          />
        </Suspense>
      </div>

      {/* Energy Pulse Shockwave Ring */}
      {pulseWaveKey > 0 && !reducedMotion && (
        <motion.div
          key={pulseWaveKey}
          aria-hidden="true"
          initial={{ scale: 0.2, opacity: 0.9 }}
          animate={{ scale: 2.8, opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
          className="pointer-events-none fixed top-1/2 left-1/2 z-20 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#38BDF8] shadow-[0_0_50px_#38BDF8]"
        />
      )}

      {/* Top HUD Telemetry Strip */}
      <div className="fw-container relative z-20 flex items-start justify-between pointer-events-none">
        <div className="flex flex-col gap-1">
          <span className="type-meta text-[#38BDF8]">01 // THE AWAKENING</span>
          <span className="type-meta text-[10px] text-[var(--ink-secondary)]">
            J.A.R.V.I.S. ONLINE
          </span>
        </div>
        <div className="hidden flex-col items-end gap-1 sm:flex">
          <span className="type-meta text-[#F5D061]">MARK LXXXV</span>
          <span className="type-meta text-[10px] text-[var(--ink-secondary)]">
            ARC CORE 24.0 GJ/S
          </span>
        </div>
      </div>

      {/* Bottom Minimal Interactive HUD Controls */}
      <div className="fw-container relative z-20 mt-auto flex flex-wrap items-end justify-between gap-4">
        <div className="pointer-events-none">
          <h1 className="type-hero tracking-tight text-white/95">
            IRON <span className="text-[#E11D2E]">MAN</span>
          </h1>
          <div className="mt-2 flex items-center gap-3">
            <span className="h-px w-8 bg-[#38BDF8]" />
            <span className="type-meta text-[11px] text-[#7DD3FC]">
              STARK INDUSTRIES
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleCorePulse}
            data-cursor="label"
            data-cursor-label="PULSE"
            className="fw-btn-tactile type-meta flex items-center gap-2.5 rounded-[2px] border border-[#38BDF8]/50 bg-[#0E1117]/80 px-4 py-2.5 text-[#E0F2FE] backdrop-blur-md hover:border-[#38BDF8] hover:bg-[#38BDF8]/20 hover:shadow-[0_0_24px_rgba(56,189,248,0.35)]"
          >
            <span className="h-2 w-2 rounded-full bg-[#38BDF8] shadow-[0_0_10px_#38BDF8]" />
            <span>PULSE CORE</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('core')}
            data-cursor="link"
            className="fw-btn-tactile type-meta flex items-center gap-2 rounded-[2px] border border-[#D4AF37]/40 bg-[#0E1117]/80 px-4 py-2.5 text-[#F5D061] backdrop-blur-md hover:border-[#F5D061] hover:bg-[#D4AF37]/15"
          >
            <span>ENGAGE</span>
            <span aria-hidden="true">↓</span>
          </button>
        </div>
      </div>
    </section>
  );
}
