import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

interface MonolithSceneProps {
  pointer: { x: number; y: number };
  scrollProgress: React.MutableRefObject<number>;
  reducedMotion: boolean;
}

function MonolithAssembly({
  pointer,
  scrollProgress,
  reducedMotion,
}: MonolithSceneProps) {
  const groupRef = useRef<THREE.Group>(null);
  const glassRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    if (reducedMotion) {
      groupRef.current.rotation.set(0.18, -0.38, 0);
      groupRef.current.scale.setScalar(1);
      return;
    }

    const t = state.clock.getElapsedTime();
    const scrollOffset = scrollProgress.current;

    const targetRotY =
      -0.38 + pointer.x * 0.3 + scrollOffset * 0.32 + Math.sin(t * 0.22) * 0.06;
    const targetRotX =
      0.16 - pointer.y * 0.2 + scrollOffset * 0.1 + Math.cos(t * 0.18) * 0.03;
    const targetScale = 1 - scrollOffset * 0.05;

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

    if (glassRef.current) {
      glassRef.current.position.y = THREE.MathUtils.damp(
        glassRef.current.position.y,
        0.16 + Math.sin(t * 0.45) * 0.025,
        3.5,
        delta
      );
    }
  });

  return (
    <group ref={groupRef}>
      {/* Primary Cast Limestone Slab */}
      <RoundedBox
        args={[1.55, 2.25, 0.5]}
        radius={0.025}
        smoothness={4}
        position={[-0.2, -0.05, 0]}
      >
        <meshStandardMaterial color="#CFC8BA" roughness={0.88} metalness={0.04} />
      </RoundedBox>

      {/* Brushed Aluminum Structural Shadow-Gap Rail */}
      <RoundedBox
        args={[0.06, 2.25, 0.54]}
        radius={0.008}
        smoothness={2}
        position={[0.6, -0.05, -0.02]}
      >
        <meshStandardMaterial color="#9A968E" roughness={0.28} metalness={0.85} />
      </RoundedBox>

      {/* Deep Basalt Structural Counterweight */}
      <RoundedBox
        args={[0.82, 1.35, 0.36]}
        radius={0.02}
        smoothness={4}
        position={[0.72, -0.45, -0.22]}
      >
        <meshStandardMaterial color="#181816" roughness={0.55} metalness={0.22} />
      </RoundedBox>

      {/* Optical Glass Refraction Plane */}
      <RoundedBox
        ref={glassRef}
        args={[1.22, 1.62, 0.1]}
        radius={0.015}
        smoothness={4}
        position={[0.28, 0.16, 0.38]}
      >
        <meshPhysicalMaterial
          color="#F5F3EE"
          transmission={0.78}
          opacity={1}
          transparent
          roughness={0.1}
          ior={1.48}
          thickness={0.55}
          reflectivity={0.65}
        />
      </RoundedBox>

      {/* Signal Vermilion Architectural Datum Pin */}
      <mesh position={[-0.82, 0.86, 0.28]}>
        <cylinderGeometry args={[0.042, 0.042, 0.22, 24]} />
        <meshStandardMaterial color="#D9381E" roughness={0.35} metalness={0.1} />
      </mesh>
    </group>
  );
}

interface HeroMonolithProps {
  reducedMotion: boolean;
  scrollProgress: React.MutableRefObject<number>;
}

export function HeroMonolith({
  reducedMotion,
  scrollProgress,
}: HeroMonolithProps) {
  const pointerRef = useRef({ x: 0, y: 0 });

  return (
    <div
      className="relative h-[280px] w-full overflow-hidden rounded-[2px] border border-[var(--border-hairline)] bg-[#EAE6DF] sm:h-[380px] lg:h-[560px]"
      onPointerMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
        pointerRef.current.x = x;
        pointerRef.current.y = y;
      }}
      onPointerLeave={() => {
        pointerRef.current.x = 0;
        pointerRef.current.y = 0;
      }}
      aria-label="Interactive 3D architectural limestone and optical glass monolith"
      role="img"
    >
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 5.4], fov: 32 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.45} />
        <directionalLight position={[4, 6, 5]} intensity={1.35} color="#FFFBF4" />
        <directionalLight position={[-4, -3, 2]} intensity={0.45} color="#CFC9BE" />
        <Environment preset="studio" environmentIntensity={0.4} />
        <MonolithAssembly
          pointer={pointerRef.current}
          scrollProgress={scrollProgress}
          reducedMotion={reducedMotion}
        />
      </Canvas>

      {/* Subtle corner datum coordinates */}
      <div className="pointer-events-none absolute bottom-3 left-3 right-3 flex items-center justify-between text-[var(--ink-secondary)]">
        <span className="type-meta">FIG. 01 — MONOLITH STUDY</span>
        <span className="type-meta">PBR / LIMESTONE + GLASS</span>
      </div>
    </div>
  );
}

export default HeroMonolith;
