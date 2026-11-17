import { useState } from 'react';
import { motion } from 'motion/react';
import { SUIT_SUBSYSTEMS, type SuitSubsystem } from '../../data/stark';

interface SuitSystemSectionProps {
  reducedMotion: boolean;
}

export function SuitSystemSection({ reducedMotion }: SuitSystemSectionProps) {
  const [active, setActive] = useState<SuitSubsystem>(SUIT_SUBSYSTEMS[1]);

  return (
    <section
      id="subsystem"
      className="relative flex min-h-[100dvh] w-full flex-col justify-between overflow-hidden bg-[#080A0F] py-22"
    >
      <div className="hud-grid-bg pointer-events-none absolute inset-0 opacity-35" />

      <div className="fw-container relative z-20 flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="type-meta text-[#38BDF8]">08 // THE SUIT SYSTEM</span>
          <h2 className="type-h1 mt-1 text-white">TACTICAL TELEMETRY</h2>
        </div>

        <div className="flex items-center gap-3 border border-[#38BDF8]/30 bg-[#0E1117]/85 px-4 py-2">
          <span
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: active.color, boxShadow: `0 0 12px ${active.color}` }}
          />
          <span className="type-meta text-white">{active.label}</span>
          <span className="h-3 w-px bg-white/15" />
          <span className="type-meta text-[#38BDF8]">{active.metric}</span>
        </div>
      </div>

      {/* Interactive Armor Spatial Map */}
      <div className="fw-container relative z-10 my-8 flex-1">
        <div className="fw-grid items-center gap-y-8">
          {/* Left: Interactive Suit Silhouette */}
          <div className="col-span-4 md:col-span-8 lg:col-span-7">
            <div className="relative mx-auto aspect-[4/5] w-full max-w-[460px] overflow-hidden rounded-[3px] border border-white/10 bg-[radial-gradient(circle_at_center,#121826_0%,#06070A_75%)] p-6">
              {/* Full Suit Vector Silhouette */}
              <svg viewBox="0 0 400 500" className="h-full w-full">
                {/* Head */}
                <path
                  d="M172 48 L200 34 L228 48 L234 95 L200 112 L166 95 Z"
                  fill="#1A1F2B"
                  stroke="#38BDF8"
                  strokeOpacity="0.4"
                  strokeWidth="1.5"
                />
                {/* Torso & Shoulders */}
                <path
                  d="M166 112 L105 138 L88 210 L124 235 L146 310 L254 310 L276 235 L312 210 L295 138 L234 112 Z"
                  fill="#131722"
                  stroke="#D4AF37"
                  strokeOpacity="0.4"
                  strokeWidth="1.5"
                />
                {/* Arms & Gauntlets */}
                <path
                  d="M105 138 L76 240 L92 305 L118 295 L124 235 Z"
                  fill="#1A1F2B"
                  stroke="#E11D2E"
                  strokeOpacity="0.45"
                  strokeWidth="1.5"
                />
                <path
                  d="M295 138 L324 240 L308 305 L282 295 L276 235 Z"
                  fill="#1A1F2B"
                  stroke="#E11D2E"
                  strokeOpacity="0.45"
                  strokeWidth="1.5"
                />
                {/* Legs & Thruster Boots */}
                <path
                  d="M148 310 L138 458 L178 458 L192 345 L208 345 L222 458 L262 458 L252 310 Z"
                  fill="#131722"
                  stroke="#38BDF8"
                  strokeOpacity="0.35"
                  strokeWidth="1.5"
                />
                {/* Energy Conduit Line to Active Node */}
                <line
                  x1="200"
                  y1="170"
                  x2={active.coords.x * 4}
                  y2={active.coords.y * 5}
                  stroke={active.color}
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />
              </svg>

              {/* Interactive Targeting Nodes */}
              {SUIT_SUBSYSTEMS.map((sys) => {
                const isSelected = active.id === sys.id;
                return (
                  <button
                    key={sys.id}
                    type="button"
                    onClick={() => setActive(sys)}
                    onMouseEnter={() => setActive(sys)}
                    data-cursor="view"
                    data-cursor-label={sys.code}
                    aria-label={`Inspect ${sys.label}`}
                    style={{
                      left: `${sys.coords.x}%`,
                      top: `${sys.coords.y}%`,
                    }}
                    className="group absolute -translate-x-1/2 -translate-y-1/2 p-2"
                  >
                    <span
                      className={`relative flex h-5 w-5 items-center justify-center rounded-full border transition-transform duration-200 ${
                        isSelected ? 'scale-125' : 'scale-100 group-hover:scale-110'
                      }`}
                      style={{
                        borderColor: sys.color,
                        backgroundColor: isSelected ? `${sys.color}33` : 'rgba(6,7,10,0.8)',
                        boxShadow: isSelected ? `0 0 18px ${sys.color}` : 'none',
                      }}
                    >
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: sys.color }}
                      />
                    </span>
                  </button>
                );
              })}

              {/* Animated Lock-On Reticle */}
              <motion.div
                aria-hidden="true"
                animate={{
                  left: `${active.coords.x}%`,
                  top: `${active.coords.y}%`,
                }}
                transition={
                  reducedMotion
                    ? { duration: 0 }
                    : { type: 'spring', stiffness: 260, damping: 24 }
                }
                className="pointer-events-none absolute h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#38BDF8]/70"
              />
            </div>
          </div>

          {/* Right: Subsystem Selector List */}
          <div className="col-span-4 flex flex-col gap-3 md:col-span-8 lg:col-span-5">
            {SUIT_SUBSYSTEMS.map((sys) => {
              const isSelected = active.id === sys.id;
              return (
                <button
                  key={sys.id}
                  type="button"
                  onClick={() => setActive(sys)}
                  data-cursor="link"
                  className={`fw-btn-tactile flex items-center justify-between rounded-[2px] border px-5 py-4 text-left ${
                    isSelected
                      ? 'border-[#38BDF8] bg-[#101826] shadow-[0_0_24px_rgba(56,189,248,0.14)]'
                      : 'border-white/10 bg-[#0B0E14] hover:border-white/30'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="type-meta text-[11px] text-[#38BDF8]">
                      {sys.code}
                    </span>
                    <span className="text-base font-semibold tracking-tight text-white">
                      {sys.label}
                    </span>
                  </div>
                  <span
                    className="type-meta text-[11px]"
                    style={{ color: sys.color }}
                  >
                    {sys.metric}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="fw-container relative z-20 flex items-center justify-between border-t border-white/10 pt-4">
        <span className="type-meta text-[11px] text-[var(--ink-secondary)]">
          05 PRIMARY SUBSYSTEMS
        </span>
        <span className="type-meta text-[11px] text-[#38BDF8]">
          HOVER OR CLICK NODES TO LOCK TARGET
        </span>
      </div>
    </section>
  );
}

