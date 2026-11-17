import { Suspense, lazy, useEffect, useRef, useState } from 'react';
import type { ArmorLightingMode } from '../three/ArmorTorsoScene';

const ArmorTorsoScene = lazy(() =>
  import('../three/ArmorTorsoScene').then((mod) => ({
    default: mod.ArmorTorsoScene,
  }))
);

interface ArmorShowcaseSectionProps {
  reducedMotion: boolean;
}

const MODES: { key: ArmorLightingMode; label: string; accent: string }[] = [
  { key: 'combat', label: 'MARK LXXXV', accent: '#E11D2E' },
  { key: 'gold', label: 'TITANIUM-GOLD', accent: '#F5D061' },
  { key: 'stealth', label: 'NIGHT OPS', accent: '#38BDF8' },
];

export function ArmorShowcaseSection({
  reducedMotion,
}: ArmorShowcaseSectionProps) {
  const [mode, setMode] = useState<ArmorLightingMode>('combat');
  const pointerRef = useRef({ x: 0, y: 0 });
  const explodeRef = useRef(0);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointerRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointerRef.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  return (
    <section
      id="armor"
      className="relative flex min-h-[100dvh] w-full flex-col justify-between overflow-hidden bg-[#06070A] pt-22 pb-10"
    >
      {/* Dynamic Rim Backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{
          background:
            mode === 'combat'
              ? 'radial-gradient(circle at 50% 48%, rgba(225,29,46,0.16) 0%, rgba(212,175,55,0.06) 35%, rgba(6,7,10,1) 70%)'
              : mode === 'gold'
                ? 'radial-gradient(circle at 50% 48%, rgba(245,208,97,0.18) 0%, rgba(225,29,46,0.06) 35%, rgba(6,7,10,1) 70%)'
                : 'radial-gradient(circle at 50% 48%, rgba(56,189,248,0.18) 0%, rgba(30,36,48,0.12) 38%, rgba(6,7,10,1) 70%)',
        }}
      />

      {/* Top HUD */}
      <div className="fw-container relative z-20 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="type-meta text-[#38BDF8]">04 // THE ARMOR</span>
          <h2 className="type-h1 mt-1 text-white">MARK LXXXV</h2>
        </div>

        {/* Interactive Coating Selector */}
        <div
          role="group"
          aria-label="Armor configuration mode"
          className="flex flex-wrap items-center gap-2"
        >
          {MODES.map((m) => {
            const active = mode === m.key;
            return (
              <button
                key={m.key}
                type="button"
                onClick={() => setMode(m.key)}
                data-cursor="link"
                className={`fw-btn-tactile type-meta flex items-center gap-2 rounded-[2px] border px-3.5 py-2 ${
                  active
                    ? 'border-[#38BDF8] bg-[#38BDF8]/15 text-white'
                    : 'border-white/15 bg-[#0E1117]/80 text-[var(--ink-secondary)] hover:border-white/40 hover:text-white'
                }`}
              >
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: m.accent }}
                />
                <span>{m.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3D Armor Canvas */}
      <div
        data-cursor="view"
        data-cursor-label="ARMOR"
        className="relative z-10 my-auto h-[62vh] w-full"
      >
        <Suspense
          fallback={
            <div className="flex h-full w-full items-center justify-center">
              <span className="type-meta text-[#38BDF8]">INITIALIZING 3D CHASSIS...</span>
            </div>
          }
        >
          <ArmorTorsoScene
            explodeFactor={explodeRef}
            pointer={pointerRef}
            mode={mode}
            reducedMotion={reducedMotion}
          />
        </Suspense>
      </div>

      {/* Bottom Minimal Telemetry */}
      <div className="fw-container relative z-20 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-4">
        <span className="type-meta text-[11px] text-[#F5D061]">
          NANOTECH MATRIX // ACTIVE
        </span>
        <span className="type-meta text-[11px] text-[var(--ink-secondary)]">
          CHASSIS // VIBRANIUM-GOLD ALLOY
        </span>
        <span className="type-meta text-[11px] text-[#38BDF8]">
          POINTER-REACTIVE STUDIO LIGHTING
        </span>
      </div>
    </section>
  );
}
