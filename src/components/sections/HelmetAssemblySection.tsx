import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface HelmetAssemblySectionProps {
  reducedMotion: boolean;
}

export function HelmetAssemblySection({
  reducedMotion,
}: HelmetAssemblySectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const craniumRef = useRef<SVGGElement>(null);
  const leftCheekRef = useRef<SVGGElement>(null);
  const rightCheekRef = useRef<SVGGElement>(null);
  const faceplateRef = useRef<SVGGElement>(null);
  const jawRef = useRef<SVGGElement>(null);
  const eyesRef = useRef<SVGGElement>(null);
  const [scanning, setScanning] = useState(false);

  useEffect(() => {
    if (reducedMotion || !sectionRef.current || window.innerWidth < 768) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=160%',
          pin: true,
          scrub: 0.7,
        },
      });

      tl.fromTo(
        craniumRef.current,
        { y: -120, scale: 0.9, opacity: 0.35 },
        { y: 0, scale: 1, opacity: 1, duration: 0.65, ease: 'power3.out' },
        0
      )
        .fromTo(
          leftCheekRef.current,
          { x: -160, rotation: -14, opacity: 0.3, transformOrigin: '50% 50%' },
          { x: 0, rotation: 0, opacity: 1, duration: 0.65, ease: 'power3.out' },
          0.05
        )
        .fromTo(
          rightCheekRef.current,
          { x: 160, rotation: 14, opacity: 0.3, transformOrigin: '50% 50%' },
          { x: 0, rotation: 0, opacity: 1, duration: 0.65, ease: 'power3.out' },
          0.05
        )
        .fromTo(
          faceplateRef.current,
          { y: -85, scale: 1.14, opacity: 0.4, transformOrigin: '50% 50%' },
          { y: 0, scale: 1, opacity: 1, duration: 0.7, ease: 'power3.out' },
          0.15
        )
        .fromTo(
          jawRef.current,
          { y: 140, opacity: 0.3 },
          { y: 0, opacity: 1, duration: 0.65, ease: 'power3.out' },
          0.18
        )
        .fromTo(
          eyesRef.current,
          { opacity: 0, scaleX: 0.4, transformOrigin: '50% 50%' },
          { opacity: 1, scaleX: 1, duration: 0.35, ease: 'power2.out' },
          0.72
        );
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reducedMotion || !stageRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    stageRef.current.style.transform = `perspective(1200px) rotateY(${nx * 14}deg) rotateX(${-ny * 10}deg)`;
  };

  const handlePointerLeave = () => {
    if (!stageRef.current) return;
    stageRef.current.style.transform = 'perspective(1200px) rotateY(0deg) rotateX(0deg)';
  };

  return (
    <section
      id="helmet"
      ref={sectionRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative flex min-h-[100dvh] w-full flex-col justify-between overflow-hidden bg-[radial-gradient(ellipse_at_center,#141822_0%,#06070A_70%)] pt-22 pb-10"
    >
      {/* Top HUD */}
      <div className="fw-container relative z-20 flex items-center justify-between">
        <div>
          <span className="type-meta text-[#38BDF8]">03 // THE HELMET — MORPH 02</span>
          <h2 className="type-h2 mt-1 text-white">CRANIAL ASSEMBLY</h2>
        </div>
        <button
          type="button"
          onClick={() => setScanning((s) => !s)}
          data-cursor="label"
          data-cursor-label="SCAN"
          className={`fw-btn-tactile type-meta rounded-[2px] border px-3.5 py-2 ${
            scanning
              ? 'border-[#38BDF8] bg-[#38BDF8]/20 text-[#E0F2FE] shadow-[0_0_20px_rgba(56,189,248,0.35)]'
              : 'border-white/15 bg-[#0E1117]/70 text-[var(--ink-secondary)] hover:border-[#38BDF8]/50 hover:text-white'
          }`}
        >
          {scanning ? 'SCANNING...' : 'OPTIC SCAN'}
        </button>
      </div>

      {/* Central Articulated Mechanical Helmet */}
      <div className="relative z-10 my-auto flex items-center justify-center px-4">
        <div
          ref={stageRef}
          data-cursor="view"
          data-cursor-label="INSPECT"
          className="relative w-full max-w-[440px] transition-transform duration-200 ease-out"
        >
          {/* Laser Scan Sweep */}
          {scanning && !reducedMotion && (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-4 z-30 h-0.5 bg-[#38BDF8] shadow-[0_0_20px_4px_#38BDF8]"
              style={{
                animation: 'stark-scan 2.2s ease-in-out infinite alternate',
              }}
            />
          )}

          <svg
            viewBox="0 0 420 480"
            className="h-auto w-full drop-shadow-[0_28px_60px_rgba(0,0,0,0.85)]"
          >
            <defs>
              <linearGradient id="stark-red-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#E11D2E" />
                <stop offset="48%" stopColor="#991B1B" />
                <stop offset="100%" stopColor="#450A0A" />
              </linearGradient>
              <linearGradient id="stark-gold-grad" x1="15%" y1="0%" x2="85%" y2="100%">
                <stop offset="0%" stopColor="#F5D061" />
                <stop offset="50%" stopColor="#D4AF37" />
                <stop offset="100%" stopColor="#785A12" />
              </linearGradient>
              <linearGradient id="stark-titanium" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#2B303B" />
                <stop offset="100%" stopColor="#0E1117" />
              </linearGradient>
            </defs>

            {/* Internal Titanium Endoskeleton */}
            <path
              d="M125 130 L210 75 L295 130 L305 310 L260 400 L160 400 L115 310 Z"
              fill="url(#stark-titanium)"
              stroke="rgba(56,189,248,0.28)"
              strokeWidth="1.5"
            />

            {/* Cranium Dome */}
            <g ref={craniumRef}>
              <path
                d="M110 155 C110 70, 160 36, 210 36 C260 36, 310 70, 310 155 L285 168 L265 110 L155 110 L135 168 Z"
                fill="url(#stark-red-grad)"
                stroke="#FCA5A5"
                strokeOpacity="0.25"
                strokeWidth="1.5"
              />
              <path
                d="M196 38 L224 38 L220 112 L200 112 Z"
                fill="#7F1D1D"
              />
            </g>

            {/* Left Temporal Cheek Plate */}
            <g ref={leftCheekRef}>
              <path
                d="M95 168 L135 168 L142 295 L160 365 L122 330 L96 250 Z"
                fill="url(#stark-red-grad)"
                stroke="#F5D061"
                strokeOpacity="0.3"
                strokeWidth="1"
              />
              <path
                d="M104 205 L128 212 L130 265 L108 255 Z"
                fill="#1E2430"
              />
            </g>

            {/* Right Temporal Cheek Plate */}
            <g ref={rightCheekRef}>
              <path
                d="M325 168 L285 168 L278 295 L260 365 L298 330 L324 250 Z"
                fill="url(#stark-red-grad)"
                stroke="#F5D061"
                strokeOpacity="0.3"
                strokeWidth="1"
              />
              <path
                d="M316 205 L292 212 L290 265 L312 255 Z"
                fill="#1E2430"
              />
            </g>

            {/* Gold Titanium Faceplate */}
            <g ref={faceplateRef}>
              <path
                d="M155 110 L265 110 L282 175 L270 288 L236 335 L184 335 L150 288 L138 175 Z"
                fill="url(#stark-gold-grad)"
                stroke="#FEF08A"
                strokeOpacity="0.4"
                strokeWidth="1.5"
              />
              {/* Mechanical Seam Lines */}
              <path
                d="M150 185 L210 202 L270 185 M210 110 L210 202 M162 275 L210 290 L258 275"
                fill="none"
                stroke="#451A03"
                strokeOpacity="0.45"
                strokeWidth="2"
              />
            </g>

            {/* Chin & Jaw Guard */}
            <g ref={jawRef}>
              <path
                d="M160 365 L184 335 L236 335 L260 365 L242 420 L178 420 Z"
                fill="url(#stark-red-grad)"
                stroke="#F5D061"
                strokeOpacity="0.35"
                strokeWidth="1.5"
              />
              <path
                d="M188 362 L232 362 L226 392 L194 392 Z"
                fill="url(#stark-gold-grad)"
              />
            </g>

            {/* Glowing Optical Eye Slits */}
            <g ref={eyesRef}>
              <polygon
                points="154,205 196,214 192,226 158,219"
                fill="#E0F2FE"
                className="drop-shadow-[0_0_16px_#38BDF8]"
              />
              <polygon
                points="266,205 224,214 228,226 262,219"
                fill="#E0F2FE"
                className="drop-shadow-[0_0_16px_#38BDF8]"
              />
            </g>
          </svg>
        </div>
      </div>

      {/* Bottom HUD Readouts */}
      <div className="fw-container relative z-20 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-4">
        <span className="type-meta text-[11px] text-[var(--ink-secondary)]">
          ALLOY // TITANIUM-GOLD MATRIX
        </span>
        <span className="type-meta text-[11px] text-[#F5D061]">
          OPTICS // HOLOGRAPHIC HUD ACTIVE
        </span>
        <span className="type-meta text-[11px] text-[#38BDF8]">
          MOVE POINTER TO INSPECT REFLECTIONS
        </span>
      </div>

      <style>{`
        @keyframes stark-scan {
          0% { top: 12%; }
          100% { top: 88%; }
        }
      `}</style>
    </section>
  );
}

