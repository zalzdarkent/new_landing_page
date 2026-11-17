import { useCallback, useEffect, useRef, useState } from 'react';
import anime from 'animejs';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface TechnologySchematicSectionProps {
  reducedMotion: boolean;
}

export function TechnologySchematicSection({
  reducedMotion,
}: TechnologySchematicSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [splitPercent, setSplitPercent] = useState(52);
  const [dragging, setDragging] = useState(false);

  // Anime.js SVG blueprint drafting reveal on scroll entry
  useEffect(() => {
    if (reducedMotion || !stageRef.current) return;

    const paths = stageRef.current.querySelectorAll('.holo-draft-line');
    if (paths.length === 0) return;

    const trigger = ScrollTrigger.create({
      trigger: stageRef.current,
      start: 'top 75%',
      once: true,
      onEnter: () => {
        anime({
          targets: paths,
          strokeDashoffset: [anime.setDashoffset, 0],
          duration: 950,
          delay: anime.stagger(28),
          easing: 'cubicBezier(0.23, 1, 0.32, 1)',
        });
      },
    });

    return () => {
      trigger.kill();
      anime.remove(paths);
    };
  }, [reducedMotion]);

  const updateSplit = useCallback((clientX: number) => {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const raw = ((clientX - rect.left) / rect.width) * 100;
    setSplitPercent(Math.max(5, Math.min(95, raw)));
  }, []);

  useEffect(() => {
    if (!dragging) return;
    const onMove = (e: PointerEvent) => updateSplit(e.clientX);
    const onUp = () => setDragging(false);
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerup', onUp);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };
  }, [dragging, updateSplit]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setSplitPercent((v) => Math.max(5, v - 5));
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      setSplitPercent((v) => Math.min(95, v + 5));
    }
  };

  return (
    <section
      id="technology"
      ref={sectionRef}
      className="relative flex min-h-[100dvh] w-full flex-col justify-between overflow-hidden bg-[#06070A] py-22"
    >
      <div className="fw-container relative z-20 flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="type-meta text-[#38BDF8]">
            07 // THE TECHNOLOGY — MORPH 04
          </span>
          <h2 className="type-h1 mt-1 text-white">HOLOGRAPHIC SCHEMATICS</h2>
        </div>

        <div className="flex items-center gap-4">
          <span className="type-meta text-[11px] text-[#22D3EE]">
            WIREFRAME // {Math.round(100 - splitPercent)}%
          </span>
          <span className="h-3 w-px bg-white/15" />
          <span className="type-meta text-[11px] text-[#F5D061]">
            PHYSICAL // {Math.round(splitPercent)}%
          </span>
        </div>
      </div>

      {/* Interactive Blueprint-to-Armor Morph Stage */}
      <div className="fw-container relative z-10 my-8 flex-1 flex items-center justify-center">
        <div
          ref={stageRef}
          onPointerDown={(e) => {
            setDragging(true);
            updateSplit(e.clientX);
          }}
          data-cursor="drag"
          data-cursor-label="MORPH"
          className="relative h-[520px] w-full max-w-5xl select-none overflow-hidden rounded-[3px] border border-[#38BDF8]/25 bg-[#080C14] sm:h-[580px]"
        >
          {/* LAYER A (Base): Glowing Cyan J.A.R.V.I.S. Holographic Wireframe */}
          <div className="hud-grid-bg absolute inset-0 flex items-center justify-center p-6">
            <svg
              viewBox="0 0 600 500"
              className="h-full w-full max-w-[540px]"
              aria-label="J.A.R.V.I.S. Holographic Wireframe Schematic"
            >
              {/* Outer Scanning Circles */}
              <circle
                cx="300"
                cy="250"
                r="210"
                fill="none"
                stroke="#22D3EE"
                strokeOpacity="0.25"
                strokeWidth="1"
                strokeDasharray="6 6"
                className="holo-draft-line"
              />
              <circle
                cx="300"
                cy="250"
                r="160"
                fill="none"
                stroke="#38BDF8"
                strokeOpacity="0.35"
                strokeWidth="1.2"
                className="holo-draft-line"
              />
              {/* Wireframe Suit Torso & Helmet */}
              <path
                d="M250 80 L300 55 L350 80 L360 140 L330 175 L270 175 L240 140 Z"
                fill="none"
                stroke="#38BDF8"
                strokeWidth="1.6"
                className="holo-draft-line"
              />
              <path
                d="M270 175 L180 205 L165 295 L220 330 L240 420 L360 420 L380 330 L435 295 L420 205 L330 175"
                fill="none"
                stroke="#22D3EE"
                strokeWidth="1.6"
                className="holo-draft-line"
              />
              {/* Internal Structural Ribs */}
              <path
                d="M225 225 L375 225 M235 265 L365 265 M245 310 L355 310 M250 355 L350 355"
                fill="none"
                stroke="#38BDF8"
                strokeOpacity="0.55"
                strokeWidth="1.2"
                className="holo-draft-line"
              />
              {/* Wireframe Arc Core */}
              <polygon
                points="300,208 326,223 326,253 300,268 274,253 274,223"
                fill="rgba(56,189,248,0.12)"
                stroke="#E0F2FE"
                strokeWidth="2"
                className="holo-draft-line"
              />
              {/* Blueprint Dimension Ticks */}
              <path
                d="M90 80 L140 80 L165 110 M510 140 L460 140 L420 205 M90 360 L150 360 L220 330"
                fill="none"
                stroke="#38BDF8"
                strokeOpacity="0.6"
                strokeWidth="1"
                className="holo-draft-line"
              />
            </svg>
          </div>

          {/* LAYER B (Clipped Overlay): Physical Metallic Red & Gold Armor */}
          <div
            style={{ clipPath: `inset(0 ${100 - splitPercent}% 0 0)` }}
            className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_center,#1C1014_0%,#08090D_75%)] p-6"
          >
            <svg
              viewBox="0 0 600 500"
              className="h-full w-full max-w-[540px] drop-shadow-[0_20px_50px_rgba(225,29,46,0.25)]"
              aria-label="Physical Mark LXXXV Armor"
            >
              <defs>
                <linearGradient id="tech-red" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#E11D2E" />
                  <stop offset="55%" stopColor="#991B1B" />
                  <stop offset="100%" stopColor="#450A0A" />
                </linearGradient>
                <linearGradient id="tech-gold" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#F5D061" />
                  <stop offset="55%" stopColor="#D4AF37" />
                  <stop offset="100%" stopColor="#785A12" />
                </linearGradient>
              </defs>

              {/* Helmet */}
              <path
                d="M250 80 L300 55 L350 80 L360 140 L330 175 L270 175 L240 140 Z"
                fill="url(#tech-red)"
                stroke="#F5D061"
                strokeWidth="1.5"
              />
              <path
                d="M266 86 L300 72 L334 86 L326 148 L300 162 L274 148 Z"
                fill="url(#tech-gold)"
              />
              <rect x="275" y="108" width="18" height="4" fill="#E0F2FE" />
              <rect x="307" y="108" width="18" height="4" fill="#E0F2FE" />

              {/* Torso & Pauldrons */}
              <path
                d="M270 175 L180 205 L165 295 L220 330 L240 420 L360 420 L380 330 L435 295 L420 205 L330 175 Z"
                fill="url(#tech-red)"
                stroke="#7F1D1D"
                strokeWidth="2"
              />
              {/* Gold Shoulder & Rib Accents */}
              <path
                d="M180 205 L235 220 L225 275 L165 295 Z"
                fill="url(#tech-gold)"
              />
              <path
                d="M420 205 L365 220 L375 275 L435 295 Z"
                fill="url(#tech-gold)"
              />
              <path
                d="M250 320 L350 320 L342 350 L258 350 Z"
                fill="url(#tech-gold)"
              />

              {/* Glowing Hexagonal Arc Reactor */}
              <polygon
                points="300,208 326,223 326,253 300,268 274,253 274,223"
                fill="#E0F2FE"
                stroke="#38BDF8"
                strokeWidth="4"
                className="drop-shadow-[0_0_24px_#38BDF8]"
              />
            </svg>
          </div>

          {/* Vertical Laser Split Handle */}
          <div
            role="slider"
            tabIndex={0}
            aria-label="Morph between holographic schematic and physical armor"
            aria-valuemin={5}
            aria-valuemax={95}
            aria-valuenow={Math.round(splitPercent)}
            onKeyDown={handleKeyDown}
            style={{ left: `${splitPercent}%` }}
            className="absolute top-0 bottom-0 z-30 w-0.5 -translate-x-1/2 bg-[#38BDF8] shadow-[0_0_18px_#38BDF8]"
          >
            <div className="absolute top-1/2 left-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#38BDF8] bg-[#06070A]/90 text-[#E0F2FE] shadow-[0_0_20px_rgba(56,189,248,0.5)]">
              <span className="type-meta text-[10px]">⇄</span>
            </div>
          </div>
        </div>
      </div>

      <div className="fw-container relative z-20 flex items-center justify-between border-t border-white/10 pt-4">
        <span className="type-meta text-[11px] text-[var(--ink-secondary)]">
          J.A.R.V.I.S. CAD BLUEPRINT
        </span>
        <span className="type-meta text-[11px] text-[#38BDF8]">
          DRAG LASER DIVIDER TO MORPH
        </span>
      </div>
    </section>
  );
}

