import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ArmoryGallerySectionProps {
  reducedMotion: boolean;
}

const ARMORY_PLATES = [
  {
    code: 'ARM-01',
    title: 'REPULSOR GAUNTLET',
    accent: '#38BDF8',
    primary: '#B91C1C',
    secondary: '#D4AF37',
  },
  {
    code: 'ARM-02',
    title: 'CHESTPLATE MATRIX',
    accent: '#E0F2FE',
    primary: '#991B1B',
    secondary: '#F5D061',
  },
  {
    code: 'ARM-03',
    title: 'DORSAL STABILIZER',
    accent: '#F5D061',
    primary: '#2B303B',
    secondary: '#38BDF8',
  },
  {
    code: 'ARM-04',
    title: 'NANOTECH BLADE',
    accent: '#E11D2E',
    primary: '#7F1D1D',
    secondary: '#38BDF8',
  },
];

export function ArmoryGallerySection({
  reducedMotion,
}: ArmoryGallerySectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (reducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      const cards = sectionRef.current!.querySelectorAll('.armory-plate');
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { clipPath: 'inset(0 0 100% 0)', opacity: 0.2 },
          {
            clipPath: 'inset(0 0 0% 0)',
            opacity: 1,
            duration: 0.85,
            delay: i * 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 84%',
              once: true,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      id="armory"
      ref={sectionRef}
      className="relative w-full bg-[#06070A] py-24"
    >
      <div className="fw-container">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="type-meta text-[#38BDF8]">09 // THE ARMORY</span>
            <h2 className="type-h1 mt-1 text-white">HARDWARE ARCHIVE</h2>
          </div>
          <span className="type-meta text-[11px] text-[#F5D061]">
            STARK TOWER VAULT // 04 UNITS
          </span>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {ARMORY_PLATES.map((plate, idx) => (
            <div
              key={plate.code}
              data-cursor="view"
              data-cursor-label={plate.code}
              className="armory-plate group relative flex h-[340px] flex-col justify-between overflow-hidden rounded-[3px] border border-white/10 bg-[#0B0E14] p-6 transition-colors duration-300 hover:border-[#38BDF8]/50 sm:h-[380px]"
            >
              {/* Metallic Radial Glow */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-30 transition-opacity duration-500 group-hover:opacity-60"
                style={{
                  background: `radial-gradient(circle at 50% 50%, ${plate.primary}44 0%, transparent 70%)`,
                }}
              />

              <div className="relative z-10 flex items-center justify-between">
                <span className="type-meta text-[11px] text-[#38BDF8]">
                  {plate.code}
                </span>
                <span className="h-1.5 w-8 rounded-full bg-white/10 transition-all duration-300 group-hover:w-14 group-hover:bg-[#38BDF8]" />
              </div>

              {/* Precision Vector Hardware Component */}
              <div className="relative z-10 my-auto flex items-center justify-center">
                <svg
                  viewBox="0 0 220 160"
                  className="h-44 w-56 transition-transform duration-500 ease-[var(--ease-out)] group-hover:scale-105"
                >
                  {idx === 0 && (
                    <g>
                      <rect
                        x="50"
                        y="35"
                        width="120"
                        height="90"
                        rx="14"
                        fill={plate.primary}
                        stroke={plate.secondary}
                        strokeWidth="2.5"
                      />
                      <circle
                        cx="110"
                        cy="80"
                        r="24"
                        fill="#E0F2FE"
                        stroke={plate.accent}
                        strokeWidth="5"
                      />
                      <circle cx="110" cy="80" r="10" fill="#FFFFFF" />
                    </g>
                  )}
                  {idx === 1 && (
                    <g>
                      <polygon
                        points="50,30 170,30 190,85 150,135 70,135 30,85"
                        fill={plate.primary}
                        stroke={plate.secondary}
                        strokeWidth="2.5"
                      />
                      <polygon
                        points="110,55 135,70 135,98 110,113 85,98 85,70"
                        fill="#E0F2FE"
                        stroke="#38BDF8"
                        strokeWidth="3"
                      />
                    </g>
                  )}
                  {idx === 2 && (
                    <g>
                      <polygon
                        points="40,120 90,30 130,30 180,120 140,120 110,65 80,120"
                        fill={plate.primary}
                        stroke={plate.secondary}
                        strokeWidth="2.5"
                      />
                      <line
                        x1="110"
                        y1="20"
                        x2="110"
                        y2="140"
                        stroke={plate.accent}
                        strokeWidth="1.5"
                        strokeDasharray="4 4"
                      />
                    </g>
                  )}
                  {idx === 3 && (
                    <g>
                      <polygon
                        points="25,80 120,42 195,80 120,118"
                        fill={plate.primary}
                        stroke={plate.secondary}
                        strokeWidth="2.5"
                      />
                      <line
                        x1="35"
                        y1="80"
                        x2="185"
                        y2="80"
                        stroke="#E0F2FE"
                        strokeWidth="3"
                      />
                    </g>
                  )}
                </svg>
              </div>

              <div className="relative z-10 flex items-center justify-between border-t border-white/10 pt-3">
                <span className="text-lg font-bold tracking-tight text-white">
                  {plate.title}
                </span>
                <span className="type-meta text-[10px] text-[var(--ink-secondary)]">
                  MK LXXXV SPEC
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

