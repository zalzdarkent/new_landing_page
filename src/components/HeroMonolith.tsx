import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

export type MonolithMode = 'assembled' | 'exploded' | 'wireframe' | 'solar';

interface MonolithSceneProps {
  pointer: { x: number; y: number };
  scrollProgress: React.MutableRefObject<number>;
  reducedMotion: boolean;
  mode: MonolithMode;
  sunAzimuth: number;
}

function MonolithAssembly({
  pointer,
  scrollProgress,
  reducedMotion,
  mode,
  sunAzimuth,
}: MonolithSceneProps) {
  const groupRef = useRef<THREE.Group>(null);
  const limestoneRef = useRef<THREE.Mesh>(null);
  const railRef = useRef<THREE.Mesh>(null);
  const basaltRef = useRef<THREE.Mesh>(null);
  const glassRef = useRef<THREE.Mesh>(null);
  const pinRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const sunLightRef = useRef<THREE.DirectionalLight>(null);

  const isWire = mode === 'wireframe';
  const isExploded = mode === 'exploded';
  const isSolar = mode === 'solar';

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const t = state.clock.getElapsedTime();
    const scrollOffset = scrollProgress.current;

    if (sunLightRef.current) {
      const rad =
        THREE.MathUtils.degToRad(sunAzimuth) +
        (isSolar && !reducedMotion ? Math.sin(t * 0.7) * 0.65 : 0);
      sunLightRef.current.position.set(
        Math.sin(rad) * 6.2,
        4.2 + Math.cos(rad * 0.5) * 1.8,
        Math.cos(rad) * 5.4
      );
    }

    if (reducedMotion) {
      groupRef.current.rotation.set(0.18, -0.38, 0);
      groupRef.current.scale.setScalar(1);
    } else {
      const modeRotYOffset =
        mode === 'exploded' ? 0.28 : mode === 'wireframe' ? -0.22 : 0;
      const modeRotXOffset = mode === 'exploded' ? 0.12 : 0;

      const targetRotY =
        -0.38 +
        modeRotYOffset +
        pointer.x * 0.36 +
        scrollOffset * 0.45 +
        Math.sin(t * 0.35) * 0.08;
      const targetRotX =
        0.16 +
        modeRotXOffset -
        pointer.y * 0.24 +
        scrollOffset * 0.14 +
        Math.cos(t * 0.28) * 0.04;
      const targetScale = 1 - scrollOffset * 0.08;

      groupRef.current.rotation.y = THREE.MathUtils.damp(
        groupRef.current.rotation.y,
        targetRotY,
        4.5,
        delta
      );
      groupRef.current.rotation.x = THREE.MathUtils.damp(
        groupRef.current.rotation.x,
        targetRotX,
        4.5,
        delta
      );

      const nextScale = THREE.MathUtils.damp(
        groupRef.current.scale.x,
        targetScale,
        5,
        delta
      );
      groupRef.current.scale.setScalar(nextScale);
    }

    const spread = isExploded ? 1 : 0;
    const breath = reducedMotion ? 0 : Math.sin(t * 0.8) * 0.025;

    if (limestoneRef.current) {
      limestoneRef.current.position.x = THREE.MathUtils.damp(
        limestoneRef.current.position.x,
        -0.2 - spread * 0.48,
        5,
        delta
      );
      limestoneRef.current.position.y = THREE.MathUtils.damp(
        limestoneRef.current.position.y,
        -0.05 + spread * 0.12 - breath * 0.5,
        5,
        delta
      );
      limestoneRef.current.position.z = THREE.MathUtils.damp(
        limestoneRef.current.position.z,
        0 - spread * 0.28,
        5,
        delta
      );
    }

    if (railRef.current) {
      railRef.current.position.x = THREE.MathUtils.damp(
        railRef.current.position.x,
        0.6 + spread * 0.18,
        5,
        delta
      );
      railRef.current.position.y = THREE.MathUtils.damp(
        railRef.current.position.y,
        -0.05 + spread * 0.22 + breath,
        5,
        delta
      );
    }

    if (basaltRef.current) {
      basaltRef.current.position.x = THREE.MathUtils.damp(
        basaltRef.current.position.x,
        0.72 + spread * 0.52,
        5,
        delta
      );
      basaltRef.current.position.y = THREE.MathUtils.damp(
        basaltRef.current.position.y,
        -0.45 - spread * 0.28,
        5,
        delta
      );
      basaltRef.current.position.z = THREE.MathUtils.damp(
        basaltRef.current.position.z,
        -0.22 - spread * 0.35,
        5,
        delta
      );
    }

    if (glassRef.current) {
      glassRef.current.position.x = THREE.MathUtils.damp(
        glassRef.current.position.x,
        0.28 + spread * 0.35,
        4.5,
        delta
      );
      glassRef.current.position.y = THREE.MathUtils.damp(
        glassRef.current.position.y,
        0.16 + spread * 0.18 + breath * 1.4,
        4.5,
        delta
      );
      glassRef.current.position.z = THREE.MathUtils.damp(
        glassRef.current.position.z,
        0.38 + spread * 0.52,
        4.5,
        delta
      );
    }

    if (pinRef.current) {
      pinRef.current.position.x = THREE.MathUtils.damp(
        pinRef.current.position.x,
        -0.82 - spread * 0.62,
        5.5,
        delta
      );
      pinRef.current.position.y = THREE.MathUtils.damp(
        pinRef.current.position.y,
        0.86 + spread * 0.36 + breath * 1.6,
        5.5,
        delta
      );
      pinRef.current.position.z = THREE.MathUtils.damp(
        pinRef.current.position.z,
        0.28 + spread * 0.34,
        5.5,
        delta
      );
    }

    if (ringRef.current && !reducedMotion) {
      ringRef.current.rotation.z = t * 0.14;
      ringRef.current.rotation.x = Math.PI * 0.38 + Math.sin(t * 0.3) * 0.08;
    }
  });

  return (
    <>
      <directionalLight
        ref={sunLightRef}
        position={[4, 6, 5]}
        intensity={isSolar ? 2.2 : 1.6}
        color={isSolar ? '#FFE8C8' : '#FFFBF4'}
      />
      <directionalLight
        position={[-4, -3, 2]}
        intensity={isSolar ? 0.35 : 0.65}
        color="#CFC9BE"
      />
      <hemisphereLight
        args={['#FFFDF9', '#8A8479', isSolar ? 0.45 : 0.75]}
      />

      <group ref={groupRef}>
        {/* Ambient Orthographic Datum Ring */}
        <mesh ref={ringRef} position={[0.1, 0, -0.35]} rotation={[1.1, 0, 0]}>
          <torusGeometry args={[1.65, 0.006, 12, 72]} />
          <meshBasicMaterial
            color={isWire ? '#D9381E' : '#8C877E'}
            transparent
            opacity={isWire ? 0.75 : 0.38}
          />
        </mesh>

        {/* Primary Cast Limestone Slab */}
        <RoundedBox
          ref={limestoneRef}
          args={[1.55, 2.25, 0.5]}
          radius={0.025}
          smoothness={3}
          position={[-0.2, -0.05, 0]}
        >
          <meshStandardMaterial
            color={isWire ? '#161614' : '#CFC8BA'}
            roughness={0.86}
            metalness={0.05}
            wireframe={isWire}
          />
        </RoundedBox>

        {/* Brushed Aluminum Structural Shadow-Gap Rail */}
        <RoundedBox
          ref={railRef}
          args={[0.07, 2.28, 0.56]}
          radius={0.008}
          smoothness={2}
          position={[0.6, -0.05, -0.02]}
        >
          <meshStandardMaterial
            color={isWire ? '#D9381E' : '#9A968E'}
            roughness={0.26}
            metalness={0.86}
            wireframe={isWire}
          />
        </RoundedBox>

        {/* Deep Basalt Structural Counterweight */}
        <RoundedBox
          ref={basaltRef}
          args={[0.84, 1.38, 0.38]}
          radius={0.02}
          smoothness={3}
          position={[0.72, -0.45, -0.22]}
        >
          <meshStandardMaterial
            color="#181816"
            roughness={0.52}
            metalness={0.24}
            wireframe={isWire}
          />
        </RoundedBox>

        {/* Optical Glass Plane (Single-pass GPU friendly) */}
        <RoundedBox
          ref={glassRef}
          args={[1.24, 1.64, 0.11]}
          radius={0.015}
          smoothness={3}
          position={[0.28, 0.16, 0.38]}
        >
          {isWire ? (
            <meshBasicMaterial color="#D9381E" wireframe />
          ) : (
            <meshStandardMaterial
              color="#F5F3EE"
              transparent
              opacity={0.72}
              roughness={0.12}
              metalness={0.22}
            />
          )}
        </RoundedBox>

        {/* Signal Vermilion Architectural Datum Pin */}
        <mesh
          ref={pinRef}
          position={[-0.82, 0.86, 0.28]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <cylinderGeometry args={[0.048, 0.048, 0.28, 20]} />
          <meshStandardMaterial
            color="#D9381E"
            roughness={0.32}
            metalness={0.12}
          />
        </mesh>
      </group>
    </>
  );
}

interface HeroMonolithProps {
  reducedMotion: boolean;
  scrollProgress: React.MutableRefObject<number>;
  mode: MonolithMode;
  sunAzimuth: number;
  onPointerTelemetry?: (coords: { x: number; y: number }) => void;
}

export function HeroMonolith({
  reducedMotion,
  scrollProgress,
  mode,
  sunAzimuth,
  onPointerTelemetry,
}: HeroMonolithProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pointerRef = useRef({ x: 0, y: 0 });
  const [inView, setInView] = useState(true);

  // Pause WebGL RAF loop when Hero is scrolled offscreen (frontend-atlas performance-a11y.md)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { rootMargin: '100px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      data-cursor="drag"
      data-cursor-label="ORBIT"
      className={`relative h-[320px] w-full overflow-hidden rounded-[2px] border border-[var(--border-hairline)] transition-colors duration-300 sm:h-[420px] lg:h-[540px] ${
        mode === 'solar'
          ? 'bg-[#1D1C19] text-[#F2F0EC]'
          : mode === 'wireframe'
            ? 'bg-[#FAF9F6] text-[var(--ink-primary)]'
            : 'bg-[#EAE6DF] text-[var(--ink-primary)]'
      }`}
      onPointerMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
        pointerRef.current.x = x;
        pointerRef.current.y = y;
        onPointerTelemetry?.({
          x: Number(x.toFixed(2)),
          y: Number(y.toFixed(2)),
        });
      }}
      onPointerLeave={() => {
        pointerRef.current.x = 0;
        pointerRef.current.y = 0;
        onPointerTelemetry?.({ x: 0, y: 0 });
      }}
      aria-label="Interactive 3D architectural limestone, basalt, and optical glass monolith"
      role="img"
    >
      {/* Subtle Architectural Orthographic Reticle Behind 3D Scene */}
      <svg
        viewBox="0 0 400 400"
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full opacity-30"
      >
        <line
          x1="200"
          y1="0"
          x2="200"
          y2="400"
          stroke="currentColor"
          strokeWidth="0.5"
          strokeDasharray="3 5"
        />
        <line
          x1="0"
          y1="200"
          x2="400"
          y2="200"
          stroke="currentColor"
          strokeWidth="0.5"
          strokeDasharray="3 5"
        />
        <circle
          cx="200"
          cy="200"
          r="138"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.6"
          strokeDasharray="2 6"
          className="origin-center fw-orbit-slow"
        />
        <circle
          cx="200"
          cy="200"
          r="172"
          fill="none"
          stroke="#D9381E"
          strokeWidth="0.6"
          opacity="0.5"
        />
      </svg>

      {/* Top Corner Orthographic Callouts */}
      <div className="pointer-events-none absolute top-3 left-3 right-3 z-10 flex items-center justify-between">
        <span className="type-meta flex items-center gap-2 opacity-80">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--accent-vermilion)]" />
          <span>STATE // {mode.toUpperCase()}</span>
        </span>
        <span className="type-meta opacity-75">
          AZIMUTH {sunAzimuth > 0 ? `+${sunAzimuth}°` : `${sunAzimuth}°`}
        </span>
      </div>

      <Canvas
        frameloop={inView && !reducedMotion ? 'always' : 'demand'}
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 5.3], fov: 32 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={mode === 'solar' ? 0.25 : 0.55} />
        <MonolithAssembly
          pointer={pointerRef.current}
          scrollProgress={scrollProgress}
          reducedMotion={reducedMotion}
          mode={mode}
          sunAzimuth={sunAzimuth}
        />
      </Canvas>

      {/* Bottom Corner Datum Coordinates */}
      <div className="pointer-events-none absolute bottom-3 left-3 right-3 z-10 flex items-center justify-between opacity-80">
        <span className="type-meta">FIG. 01 — MONOLITH ASSEMBLY</span>
        <span className="type-meta">
          {mode === 'exploded'
            ? 'AXONOMETRIC SEPARATION'
            : mode === 'wireframe'
              ? 'ORTHOGRAPHIC MESH'
              : mode === 'solar'
                ? 'RAKING DAYLIGHT STUDY'
                : 'PBR / LIMESTONE + GLASS'}
        </span>
      </div>
    </div>
  );
}

export default HeroMonolith;
