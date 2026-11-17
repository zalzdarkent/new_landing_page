import { Suspense, lazy, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const ArmorTorsoScene = lazy(() =>
  import('../three/ArmorTorsoScene').then((mod) => ({
    default: mod.ArmorTorsoScene,
  }))
);

gsap.registerPlugin(ScrollTrigger);

interface ArmorAssemblySectionProps {
  reducedMotion: boolean;
}

export function ArmorAssemblySection({
  reducedMotion,
}: ArmorAssemblySectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const pointerRef = useRef({ x: 0, y: 0 });
  const explodeRef = useRef(0);
  const [explodePercent, setExplodePercent] = useState(0);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointerRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointerRef.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  useEffect(() => {
    if (reducedMotion || !sectionRef.current || window.innerWidth < 768) return;

    const ctx = gsap.context(() => {
      const proxy = { val: 0 };
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=165%',
          pin: true,
          scrub: 0.7,
        },
      });

      tl.to(proxy, {
        val: 1,
        duration: 0.55,
        ease: 'power2.inOut',
        onUpdate: () => {
          explodeRef.current = proxy.val;
          setExplodePercent(Math.round(proxy.val * 100));
        },
      }).to(proxy, {
        val: 0.08,
        duration: 0.45,
        ease: 'power3.out',
        onUpdate: () => {
          explodeRef.current = proxy.val;
          setExplodePercent(Math.round(proxy.val * 100));
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  const handleManualExplode = (value: number) => {
    explodeRef.current = value / 100;
    setExplodePercent(value);
  };

  return (
    <section
      id="assembly"
      ref={sectionRef}
      className="relative flex min-h-[100dvh] w-full flex-col justify-between overflow-hidden bg-[#080A0F] pt-22 pb-10"
    >
      <div className="hud-grid-bg pointer-events-none absolute inset-0 opacity-40" />

      {/* Top HUD */}
      <div className="fw-container relative z-20 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="type-meta text-[#38BDF8]">05 // THE ASSEMBLY — MORPH 03</span>
          <h2 className="type-h2 mt-1 text-white">MODULAR SEPARATION</h2>
        </div>

        {/* Manual Exploded View Control */}
        <div className="flex items-center gap-4 rounded-[2px] border border-[#38BDF8]/30 bg-[#0E1117]/85 px-4 py-2.5 backdrop-blur-md">
          <span className="type-meta text-[11px] text-[#7DD3FC]">EXPLODE</span>
          <input
            type="range"
            min={0}
            max={100}
            value={explodePercent}
            onChange={(e) => handleManualExplode(Number(e.target.value))}
            aria-label="Armor plate separation percentage"
            className="h-1.5 w-28 cursor-pointer accent-[#38BDF8] sm:w-40"
          />
          <span className="type-meta w-10 text-right text-[#E0F2FE]">
            {explodePercent}%
          </span>
        </div>
      </div>

      {/* 3D Exploded Armor Stage */}
      <div
        data-cursor="drag"
        data-cursor-label="EXPLODE"
        className="relative z-10 my-auto h-[60vh] w-full"
      >
        <Suspense fallback={null}>
          <ArmorTorsoScene
            explodeFactor={explodeRef}
            pointer={pointerRef}
            mode="combat"
            reducedMotion={reducedMotion}
          />
        </Suspense>
      </div>

      {/* Bottom Telemetry */}
      <div className="fw-container relative z-20 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-4">
        <span className="type-meta text-[11px] text-[var(--ink-secondary)]">
          08 ARTICULATED PLATES
        </span>
        <span className="type-meta text-[11px] text-[#F5D061]">
          MAGNETIC LOCK // {explodePercent < 15 ? 'ENGAGED' : 'SEPARATED'}
        </span>
        <span className="type-meta text-[11px] text-[#38BDF8]">
          SCROLL OR DRAG SLIDER TO SEPARATE
        </span>
      </div>
    </section>
  );
}
