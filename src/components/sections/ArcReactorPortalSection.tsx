import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'motion/react';

gsap.registerPlugin(ScrollTrigger);

interface ArcReactorPortalSectionProps {
  reducedMotion: boolean;
}

export function ArcReactorPortalSection({
  reducedMotion,
}: ArcReactorPortalSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const reactorWrapRef = useRef<HTMLDivElement>(null);
  const ring1Ref = useRef<SVGGElement>(null);
  const ring2Ref = useRef<SVGGElement>(null);
  const ring3Ref = useRef<SVGGElement>(null);
  const finsRef = useRef<SVGGElement>(null);
  const portalRef = useRef<HTMLDivElement>(null);
  const [overcharged, setOvercharged] = useState(false);
  const [pulseCount, setPulseCount] = useState(0);

  useEffect(() => {
    if (reducedMotion || !sectionRef.current || window.innerWidth < 768) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=170%',
          pin: true,
          scrub: 0.7,
        },
      });

      // Phase 1: Reactor scales up & rings counter-rotate + fins unfold
      tl.to(
        reactorWrapRef.current,
        { scale: 2.35, duration: 0.55, ease: 'power2.inOut' },
        0
      )
        .to(
          ring1Ref.current,
          { rotation: 210, transformOrigin: '50% 50%', duration: 0.7, ease: 'none' },
          0
        )
        .to(
          ring2Ref.current,
          { rotation: -300, transformOrigin: '50% 50%', duration: 0.7, ease: 'none' },
          0
        )
        .to(
          ring3Ref.current,
          { rotation: 360, transformOrigin: '50% 50%', duration: 0.7, ease: 'none' },
          0
        )
        .to(
          finsRef.current,
          { scale: 1.28, opacity: 1, transformOrigin: '50% 50%', duration: 0.5 },
          0.1
        )
        // Phase 2: Circular portal mask expands from reactor center to full viewport
        .fromTo(
          portalRef.current,
          { clipPath: 'circle(0% at 50% 50%)' },
          {
            clipPath: 'circle(100% at 50% 50%)',
            duration: 0.55,
            ease: 'power2.inOut',
          },
          0.45
        );
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  const triggerPulse = () => {
    setPulseCount((c) => c + 1);
    setOvercharged(true);
    window.setTimeout(() => setOvercharged(false), 1100);
  };

  return (
    <section
      id="core"
      ref={sectionRef}
      className="relative flex min-h-[100dvh] w-full items-center justify-center overflow-hidden bg-[#06070A]"
    >
      {/* Subtle HUD Grid Background */}
      <div className="hud-grid-bg pointer-events-none absolute inset-0 opacity-50" />

      {/* Top HUD Label */}
      <div className="fw-container pointer-events-none absolute top-22 left-0 right-0 z-20 flex items-center justify-between">
        <span className="type-meta text-[#38BDF8]">02 // THE CORE — MORPH 01</span>
        <span className="type-meta text-[#E0F2FE]">
          {overcharged ? 'OVERCHARGE // 48.0 GJ/S' : 'OUTPUT // 24.0 GJ/S'}
        </span>
      </div>

      {/* Interactive Multi-Ring Arc Reactor */}
      <div
        ref={reactorWrapRef}
        onClick={triggerPulse}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            triggerPulse();
          }
        }}
        data-cursor="label"
        data-cursor-label="PULSE"
        aria-label="Trigger Arc Reactor energy pulse"
        className="relative z-10 flex h-[300px] w-[300px] cursor-pointer items-center justify-center sm:h-[380px] sm:w-[380px]"
      >
        {/* Radial Bloom */}
        <div
          className={`pointer-events-none absolute inset-0 rounded-full transition-all duration-500 ${
            overcharged
              ? 'scale-150 bg-[radial-gradient(circle,rgba(224,242,254,0.65)_0%,rgba(56,189,248,0.28)_45%,transparent_72%)]'
              : 'scale-100 bg-[radial-gradient(circle,rgba(56,189,248,0.34)_0%,rgba(2,132,199,0.1)_48%,transparent_72%)]'
          }`}
        />

        {pulseCount > 0 && !reducedMotion && (
          <motion.div
            key={pulseCount}
            initial={{ scale: 0.4, opacity: 0.9 }}
            animate={{ scale: 2.6, opacity: 0 }}
            transition={{ duration: 0.85, ease: [0.23, 1, 0.32, 1] }}
            className="pointer-events-none absolute inset-0 rounded-full border-2 border-[#E0F2FE] shadow-[0_0_40px_#38BDF8]"
          />
        )}

        <svg viewBox="0 0 400 400" className="h-full w-full drop-shadow-[0_0_24px_rgba(56,189,248,0.45)]">
          {/* Outer Titanium Housing */}
          <circle
            cx="200"
            cy="200"
            r="176"
            fill="none"
            stroke="#1E2430"
            strokeWidth="12"
          />
          <circle
            cx="200"
            cy="200"
            r="184"
            fill="none"
            stroke="rgba(56,189,248,0.35)"
            strokeWidth="1"
            strokeDasharray="6 10"
          />

          {/* Unfolding Cooling Fins */}
          <g ref={finsRef} opacity={0.7}>
            {Array.from({ length: 12 }).map((_, i) => {
              const angle = i * 30;
              return (
                <rect
                  key={i}
                  x="194"
                  y="14"
                  width="12"
                  height="26"
                  rx="2"
                  fill="#2B303B"
                  stroke="#38BDF8"
                  strokeOpacity="0.45"
                  strokeWidth="1"
                  transform={`rotate(${angle} 200 200)`}
                />
              );
            })}
          </g>

          {/* Ring 1: 10 Palladium/Gold Coils */}
          <g ref={ring1Ref}>
            <circle
              cx="200"
              cy="200"
              r="140"
              fill="none"
              stroke="#38BDF8"
              strokeWidth="4"
              strokeOpacity="0.55"
            />
            {Array.from({ length: 10 }).map((_, i) => {
              const angle = i * 36;
              return (
                <rect
                  key={i}
                  x="189"
                  y="44"
                  width="22"
                  height="32"
                  rx="3"
                  fill="#0E1117"
                  stroke="#D4AF37"
                  strokeWidth="2"
                  transform={`rotate(${angle} 200 200)`}
                />
              );
            })}
          </g>

          {/* Ring 2: Counter-Rotating Holographic Arcs */}
          <g ref={ring2Ref}>
            <circle
              cx="200"
              cy="200"
              r="104"
              fill="none"
              stroke="#7DD3FC"
              strokeWidth="3"
              strokeDasharray="36 18 12 18"
            />
            <circle
              cx="200"
              cy="200"
              r="90"
              fill="none"
              stroke="#D4AF37"
              strokeWidth="1.5"
              strokeOpacity="0.65"
              strokeDasharray="16 24"
            />
          </g>

          {/* Ring 3: Triangular Mark LXXXV Inner Housing */}
          <g ref={ring3Ref}>
            <polygon
              points="200,136 256,234 144,234"
              fill="rgba(56,189,248,0.12)"
              stroke="#E0F2FE"
              strokeWidth="2.5"
            />
          </g>

          {/* Blinding Center Plasma Core */}
          <circle
            cx="200"
            cy="200"
            r="34"
            fill="#E0F2FE"
            className="transition-all duration-300"
          />
          <circle cx="200" cy="200" r="20" fill="#FFFFFF" />
        </svg>
      </div>

      {/* Portal Reveal Layer (Expands from center of Arc Reactor on scroll) */}
      <div
        ref={portalRef}
        style={
          reducedMotion
            ? { clipPath: 'circle(0% at 50% 50%)' }
            : { clipPath: 'circle(0% at 50% 50%)' }
        }
        className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center bg-[radial-gradient(circle_at_center,#0C1A2A_0%,#06070A_70%)]"
      >
        <div className="relative flex flex-col items-center">
          <div className="h-44 w-44 rounded-full border border-[#38BDF8]/50 bg-[#38BDF8]/10 shadow-[0_0_80px_rgba(56,189,248,0.45)] flex items-center justify-center">
            <div className="h-24 w-24 rounded-full border border-[#F5D061]/60 bg-[#06070A]/80 flex items-center justify-center">
              <span className="type-meta text-[#E0F2FE]">ONLINE</span>
            </div>
          </div>
          <span className="type-meta mt-6 text-[#38BDF8]">
            POWER CORE SYNCHRONIZED
          </span>
        </div>
      </div>

      {/* Bottom Minimal Hint */}
      <div className="fw-container pointer-events-none absolute bottom-8 left-0 right-0 z-20 flex items-center justify-between">
        <span className="type-meta text-[10px] text-[var(--ink-secondary)]">
          CLICK CORE TO OVERCHARGE
        </span>
        <span className="type-meta text-[10px] text-[#38BDF8]">
          SCROLL TO OPEN PORTAL ↓
        </span>
      </div>
    </section>
  );
}

