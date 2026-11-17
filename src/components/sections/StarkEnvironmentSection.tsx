import { useRef, useState } from 'react';
import { motion } from 'motion/react';

interface StarkEnvironmentSectionProps {
  reducedMotion: boolean;
}

type JarvisMode = 'COMBAT' | 'FLIGHT' | 'STEALTH' | 'OVERCHARGE';

const MODE_SPECS: Record<
  JarvisMode,
  { color: string; power: string; shield: string }
> = {
  COMBAT: { color: '#E11D2E', power: '94%', shield: 'ACTIVE' },
  FLIGHT: { color: '#38BDF8', power: '88%', shield: 'AERO-LOCK' },
  STEALTH: { color: '#94A3B8', power: '42%', shield: 'CLOAKED' },
  OVERCHARGE: { color: '#F5D061', power: '200%', shield: 'MAX FLUX' },
};

export function StarkEnvironmentSection({
  reducedMotion,
}: StarkEnvironmentSectionProps) {
  const [mode, setMode] = useState<JarvisMode>('COMBAT');
  const sphereRef = useRef<HTMLDivElement>(null);

  const spec = MODE_SPECS[mode];

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reducedMotion || !sphereRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    sphereRef.current.style.transform = `perspective(900px) rotateY(${nx * 18}deg) rotateX(${-ny * 18}deg)`;
  };

  return (
    <section
      id="stark"
      onPointerMove={handlePointerMove}
      className="relative flex min-h-[100dvh] w-full flex-col justify-between overflow-hidden bg-[#06070A] py-22"
    >
      <div className="hud-grid-bg pointer-events-none absolute inset-0 opacity-45" />

      <div className="fw-container relative z-20 flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="type-meta text-[#38BDF8]">11 // STARK INDUSTRIES</span>
          <h2 className="type-h1 mt-1 text-white">J.A.R.V.I.S. MATRIX</h2>
        </div>

        <div role="group" aria-label="J.A.R.V.I.S. tactical mode" className="flex flex-wrap gap-2">
          {(Object.keys(MODE_SPECS) as JarvisMode[]).map((key) => {
            const active = mode === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setMode(key)}
                data-cursor="link"
                className={`fw-btn-tactile type-meta rounded-[2px] border px-3.5 py-2 ${
                  active
                    ? 'border-[#38BDF8] bg-[#38BDF8]/15 text-white'
                    : 'border-white/15 bg-[#0E1117]/80 text-[var(--ink-secondary)] hover:border-white/40 hover:text-white'
                }`}
              >
                {key}
              </button>
            );
          })}
        </div>
      </div>

      {/* Holographic Command Sphere */}
      <div className="relative z-10 my-auto flex items-center justify-center px-4">
        <div
          ref={sphereRef}
          className="relative flex h-72 w-72 items-center justify-center transition-transform duration-200 ease-out sm:h-96 sm:w-96"
        >
          {/* Outer Rotating Rings */}
          <motion.div
            animate={reducedMotion ? undefined : { rotate: 360 }}
            transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 rounded-full border border-dashed"
            style={{ borderColor: `${spec.color}66` }}
          />
          <motion.div
            animate={reducedMotion ? undefined : { rotate: -360 }}
            transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-6 rounded-full border"
            style={{ borderColor: `${spec.color}99` }}
          />
          <motion.div
            animate={reducedMotion ? undefined : { rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-14 rounded-full border-2 border-dotted"
            style={{ borderColor: '#38BDF8' }}
          />

          {/* Center Core */}
          <div
            className="flex h-32 w-32 flex-col items-center justify-center rounded-full border border-white/20 bg-[#0B0E14]/90 backdrop-blur-md transition-shadow duration-500"
            style={{ boxShadow: `0 0 60px ${spec.color}55` }}
          >
            <span className="type-meta text-[10px] text-[#38BDF8]">J.A.R.V.I.S.</span>
            <span className="mt-1 font-mono text-xl font-bold text-white">
              {spec.power}
            </span>
            <span className="type-meta mt-0.5 text-[9px]" style={{ color: spec.color }}>
              {spec.shield}
            </span>
          </div>
        </div>
      </div>

      <div className="fw-container relative z-20 flex items-center justify-between border-t border-white/10 pt-4">
        <span className="type-meta text-[11px] text-[var(--ink-secondary)]">
          STARK TOWER // MALIBU LABS
        </span>
        <span className="type-meta text-[11px] text-[#38BDF8]">
          PRESS [G] FOR TACTICAL GRID
        </span>
      </div>
    </section>
  );
}

