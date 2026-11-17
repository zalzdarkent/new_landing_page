import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'motion/react';
import { ARMOR_GENERATIONS, type ArmorMark } from '../../data/stark';

gsap.registerPlugin(ScrollTrigger);

interface EvolutionSectionProps {
  reducedMotion: boolean;
}

export function EvolutionSection({ reducedMotion }: EvolutionSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [selectedMark, setSelectedMark] = useState<ArmorMark>(
    ARMOR_GENERATIONS[ARMOR_GENERATIONS.length - 1]
  );

  useEffect(() => {
    if (
      reducedMotion ||
      !sectionRef.current ||
      !trackRef.current ||
      window.innerWidth < 768
    ) {
      return;
    }

    const ctx = gsap.context(() => {
      const track = trackRef.current!;
      const getScrollAmount = () =>
        Math.max(0, track.scrollWidth - window.innerWidth + 160);

      gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${Math.max(900, getScrollAmount())}`,
          pin: true,
          scrub: 0.75,
          invalidateOnRefresh: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      id="evolution"
      ref={sectionRef}
      className="relative flex min-h-[100dvh] w-full flex-col justify-between overflow-hidden bg-[#06070A] pt-22 pb-10"
    >
      {/* Top HUD + Active Mark Telemetry */}
      <div className="fw-container relative z-20 flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="type-meta text-[#38BDF8]">06 // THE EVOLUTION</span>
          <h2 className="type-h1 mt-1 text-white">HALL OF ARMOR</h2>
        </div>

        <div className="flex items-center gap-6 border border-white/10 bg-[#0E1117]/85 px-4 py-2.5 backdrop-blur-md">
          <div>
            <span className="type-meta block text-[10px] text-[var(--ink-secondary)]">
              ACTIVE CHASSIS
            </span>
            <span className="type-meta text-[#F5D061]">{selectedMark.mark}</span>
          </div>
          <div className="h-6 w-px bg-white/10" />
          <div>
            <span className="type-meta block text-[10px] text-[var(--ink-secondary)]">
              OUTPUT
            </span>
            <span className="type-meta text-[#38BDF8]">
              {selectedMark.powerOutput}
            </span>
          </div>
          <div className="h-6 w-px bg-white/10" />
          <div>
            <span className="type-meta block text-[10px] text-[var(--ink-secondary)]">
              VELOCITY
            </span>
            <span className="type-meta text-white">{selectedMark.machRating}</span>
          </div>
        </div>
      </div>

      {/* Horizontal Armor Track */}
      <div className="relative z-10 my-auto w-full overflow-x-auto md:overflow-visible">
        <div
          ref={trackRef}
          className="flex w-max items-center gap-6 px-[var(--rail-padding)] py-6"
        >
          {ARMOR_GENERATIONS.map((armor, idx) => {
            const isSelected = selectedMark.id === armor.id;
            return (
              <motion.button
                key={armor.id}
                type="button"
                onClick={() => setSelectedMark(armor)}
                whileHover={reducedMotion ? undefined : { y: -6 }}
                data-cursor="view"
                data-cursor-label={armor.mark}
                className={`group relative flex h-[380px] w-[280px] shrink-0 flex-col justify-between overflow-hidden rounded-[3px] border p-5 text-left transition-colors sm:h-[420px] sm:w-[320px] ${
                  isSelected
                    ? 'border-[#38BDF8] bg-[#101622] shadow-[0_0_40px_rgba(56,189,248,0.18)]'
                    : 'border-white/10 bg-[#0B0E14] hover:border-white/30'
                }`}
              >
                {/* Top Index & Mark */}
                <div className="flex items-center justify-between">
                  <span className="type-meta text-[11px] text-[var(--ink-secondary)]">
                    0{idx + 1}
                  </span>
                  <span
                    className="type-meta text-[11px]"
                    style={{ color: armor.secondaryColor }}
                  >
                    {armor.codename}
                  </span>
                </div>

                {/* Procedural Metallic Armor Silhouette & Arc Core */}
                <div className="relative my-auto flex h-48 w-full items-center justify-center">
                  <div
                    className="absolute h-36 w-36 rounded-full opacity-25 blur-2xl transition-opacity group-hover:opacity-45"
                    style={{ backgroundColor: armor.primaryColor }}
                  />
                  <svg viewBox="0 0 180 200" className="relative h-44 w-44">
                    {/* Helmet / Chest Silhouette */}
                    <path
                      d="M45 36 L90 16 L135 36 L144 98 L128 168 L90 186 L52 168 L36 98 Z"
                      fill={armor.primaryColor}
                      fillOpacity="0.88"
                      stroke={armor.secondaryColor}
                      strokeWidth="2.5"
                    />
                    {/* Gold/Secondary Shoulder & Faceplate Trim */}
                    <path
                      d="M58 48 L90 36 L122 48 L114 96 L90 106 L66 96 Z"
                      fill={armor.secondaryColor}
                      fillOpacity="0.9"
                    />
                    {/* Eyes */}
                    <rect x="67" y="64" width="16" height="4" fill="#E0F2FE" />
                    <rect x="97" y="64" width="16" height="4" fill="#E0F2FE" />
                    {/* Core Shape per Mark */}
                    {armor.coreShape === 'circle' && (
                      <circle
                        cx="90"
                        cy="138"
                        r="16"
                        fill="#E0F2FE"
                        stroke={armor.accentColor}
                        strokeWidth="4"
                      />
                    )}
                    {armor.coreShape === 'triangle' && (
                      <polygon
                        points="90,122 106,150 74,150"
                        fill="#E0F2FE"
                        stroke={armor.accentColor}
                        strokeWidth="3.5"
                      />
                    )}
                    {armor.coreShape === 'hex' && (
                      <polygon
                        points="90,120 106,129 106,147 90,156 74,147 74,129"
                        fill="#E0F2FE"
                        stroke={armor.accentColor}
                        strokeWidth="3.5"
                      />
                    )}
                  </svg>
                </div>

                {/* Bottom Alloy & Specs */}
                <div className="border-t border-white/10 pt-3">
                  <div className="flex items-baseline justify-between">
                    <span className="text-lg font-bold tracking-tight text-white">
                      {armor.mark}
                    </span>
                    <span className="type-meta text-[10px] text-[#38BDF8]">
                      {armor.powerOutput}
                    </span>
                  </div>
                  <span className="type-meta mt-1 block text-[10px] text-[var(--ink-secondary)]">
                    {armor.alloy}
                  </span>
                </div>

                {isSelected && (
                  <motion.div
                    layoutId="evolution-active-bar"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#38BDF8] shadow-[0_0_12px_#38BDF8]"
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Bottom Hint */}
      <div className="fw-container relative z-20 flex items-center justify-between border-t border-white/10 pt-4">
        <span className="type-meta text-[11px] text-[var(--ink-secondary)]">
          SELECT ANY MARK TO INSPECT TELEMETRY
        </span>
        <span className="type-meta text-[11px] text-[#38BDF8]">
          SCROLL TO TRAVERSE GENERATIONS →
        </span>
      </div>
    </section>
  );
}

