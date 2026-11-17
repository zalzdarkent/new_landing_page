import { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

interface HeroAwakeningSceneProps {
  pointer: React.MutableRefObject<{ x: number; y: number }>;
  scrollProgress: React.MutableRefObject<number>;
  pulseTrigger: number;
  reducedMotion: boolean;
}

function AtmosphericParticles({
  pointer,
  reducedMotion,
}: {
  pointer: React.MutableRefObject<{ x: number; y: number }>;
  reducedMotion: boolean;
}) {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, colors } = useMemo(() => {
    const count = 750;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const cyan = new THREE.Color('#38BDF8');
    const gold = new THREE.Color('#F5D061');
    const slate = new THREE.Color('#94A3B8');

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const r = 3.2 + Math.random() * 8.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      pos[i3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i3 + 1] = (Math.random() - 0.5) * 9;
      pos[i3 + 2] = r * Math.sin(phi) * Math.sin(theta) - 2;

      const pick = Math.random();
      const c = pick < 0.45 ? cyan : pick < 0.65 ? gold : slate;
      col[i3] = c.r;
      col[i3 + 1] = c.g;
      col[i3 + 2] = c.b;
    }
    return { positions: pos, colors: col };
  }, []);

  useFrame((state, delta) => {
    if (!pointsRef.current || reducedMotion) return;
    const t = state.clock.getElapsedTime();
    pointsRef.current.rotation.y = t * 0.025 + pointer.current.x * 0.12;
    pointsRef.current.rotation.x = THREE.MathUtils.damp(
      pointsRef.current.rotation.x,
      pointer.current.y * 0.08,
      3,
      delta
    );
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.032}
        vertexColors
        transparent
        opacity={0.75}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function IronManCoreAssembly({
  pointer,
  scrollProgress,
  pulseTrigger,
  reducedMotion,
}: HeroAwakeningSceneProps) {
  const rootRef = useRef<THREE.Group>(null);
  const helmetGroupRef = useRef<THREE.Group>(null);
  const faceplateRef = useRef<THREE.Group>(null);
  const leftCheekRef = useRef<THREE.Mesh>(null);
  const rightCheekRef = useRef<THREE.Mesh>(null);
  const jawRef = useRef<THREE.Mesh>(null);
  const craniumRef = useRef<THREE.Group>(null);
  const reactorOuterRef = useRef<THREE.Group>(null);
  const reactorInnerRef = useRef<THREE.Group>(null);
  const holoRing1Ref = useRef<THREE.Mesh>(null);
  const holoRing2Ref = useRef<THREE.Mesh>(null);
  const coreLightRef = useRef<THREE.PointLight>(null);

  const assemblyRef = useRef(reducedMotion ? 1 : 0);
  const pulseEnergyRef = useRef(0);
  const dragRotRef = useRef({ x: 0, y: 0, isDragging: false, lastX: 0, lastY: 0 });

  useEffect(() => {
    if (pulseTrigger > 0) {
      pulseEnergyRef.current = 1;
    }
  }, [pulseTrigger]);

  useEffect(() => {
    const onPointerDown = (e: PointerEvent) => {
      if ((e.target as HTMLElement)?.closest('button, a')) return;
      dragRotRef.current.isDragging = true;
      dragRotRef.current.lastX = e.clientX;
      dragRotRef.current.lastY = e.clientY;
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!dragRotRef.current.isDragging) return;
      const dx = e.clientX - dragRotRef.current.lastX;
      const dy = e.clientY - dragRotRef.current.lastY;
      dragRotRef.current.lastX = e.clientX;
      dragRotRef.current.lastY = e.clientY;
      dragRotRef.current.y += dx * 0.006;
      dragRotRef.current.x = THREE.MathUtils.clamp(
        dragRotRef.current.x + dy * 0.004,
        -0.55,
        0.55
      );
    };
    const onPointerUp = () => {
      dragRotRef.current.isDragging = false;
    };

    window.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerup', onPointerUp);
    return () => {
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };
  }, []);

  // Coil positions for the 10-segment Arc Reactor
  const coilAngles = useMemo(
    () => Array.from({ length: 10 }, (_, i) => (i / 10) * Math.PI * 2),
    []
  );

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    const scroll = scrollProgress.current;

    if (!reducedMotion) {
      // Initial cinematic assembly from 0 -> 1 over first ~1.3s
      assemblyRef.current = THREE.MathUtils.damp(assemblyRef.current, 1, 2.6, delta);
      pulseEnergyRef.current = THREE.MathUtils.damp(pulseEnergyRef.current, 0, 3.2, delta);
    }

    const assembled = assemblyRef.current;
    // As user scrolls past hero, armor plates begin separating into exploded view
    const explode = THREE.MathUtils.clamp(scroll * 1.4, 0, 1);
    const openOffset = (1 - assembled) * 1.6 + explode * 1.15;

    if (rootRef.current) {
      const targetY =
        pointer.current.x * 0.35 +
        dragRotRef.current.y +
        scroll * 0.85 +
        Math.sin(t * 0.35) * 0.06;
      const targetX =
        -pointer.current.y * 0.22 +
        dragRotRef.current.x +
        scroll * 0.2 +
        Math.cos(t * 0.28) * 0.03;

      rootRef.current.rotation.y = THREE.MathUtils.damp(
        rootRef.current.rotation.y,
        targetY,
        4.5,
        delta
      );
      rootRef.current.rotation.x = THREE.MathUtils.damp(
        rootRef.current.rotation.x,
        targetX,
        4.5,
        delta
      );

      // Gentle return of drag offset when not dragging
      if (!dragRotRef.current.isDragging) {
        dragRotRef.current.y = THREE.MathUtils.damp(dragRotRef.current.y, 0, 1.2, delta);
        dragRotRef.current.x = THREE.MathUtils.damp(dragRotRef.current.x, 0, 1.2, delta);
      }
    }

    // Mechanical Helmet Plates Assembly & Scroll Separation
    if (faceplateRef.current) {
      faceplateRef.current.position.z = 0.52 + openOffset * 0.75;
      faceplateRef.current.position.y = -0.05 + openOffset * 0.35;
      faceplateRef.current.rotation.x = -openOffset * 0.28;
    }
    if (craniumRef.current) {
      craniumRef.current.position.y = 0.26 + openOffset * 0.55;
      craniumRef.current.position.z = -0.08 - openOffset * 0.3;
    }
    if (leftCheekRef.current) {
      leftCheekRef.current.position.x = -0.58 - openOffset * 0.65;
      leftCheekRef.current.rotation.y = -0.25 - openOffset * 0.35;
    }
    if (rightCheekRef.current) {
      rightCheekRef.current.position.x = 0.58 + openOffset * 0.65;
      rightCheekRef.current.rotation.y = 0.25 + openOffset * 0.35;
    }
    if (jawRef.current) {
      jawRef.current.position.y = -0.56 - openOffset * 0.55;
      jawRef.current.position.z = 0.34 + openOffset * 0.35;
    }

    // Arc Reactor counter-rotation
    if (reactorOuterRef.current && !reducedMotion) {
      reactorOuterRef.current.rotation.z = t * 0.35 + pulseEnergyRef.current * 1.4;
    }
    if (reactorInnerRef.current && !reducedMotion) {
      reactorInnerRef.current.rotation.z = -t * 0.65 - pulseEnergyRef.current * 2.2;
    }

    // Holographic scanning rings
    if (holoRing1Ref.current && !reducedMotion) {
      holoRing1Ref.current.rotation.z = t * 0.22;
      holoRing1Ref.current.rotation.x = Math.PI * 0.38 + Math.sin(t * 0.5) * 0.1;
    }
    if (holoRing2Ref.current && !reducedMotion) {
      holoRing2Ref.current.rotation.z = -t * 0.32;
      holoRing2Ref.current.rotation.y = Math.PI * 0.25 + Math.cos(t * 0.4) * 0.12;
    }

    // Core pulse light intensity
    if (coreLightRef.current) {
      coreLightRef.current.intensity =
        5.5 + Math.sin(t * 3.2) * 1.1 + pulseEnergyRef.current * 18;
    }
  });

  return (
    <group ref={rootRef} position={[0, -0.05, 0]}>
      {/* Dynamic Arc Reactor Point Light */}
      <pointLight
        ref={coreLightRef}
        position={[0, -0.78, 0.7]}
        color="#38BDF8"
        intensity={6}
        distance={8}
      />

      {/* === 3D HELMET ASSEMBLY === */}
      <group ref={helmetGroupRef} position={[0, 0.48, 0]}>
        {/* Cranium Dome (Stark Red Metallic) */}
        <group ref={craniumRef} position={[0, 0.26, -0.08]}>
          <RoundedBox args={[1.08, 0.92, 1.18]} radius={0.34} smoothness={6}>
            <meshPhysicalMaterial
              color="#A61822"
              metalness={0.9}
              roughness={0.18}
              clearcoat={1}
              clearcoatRoughness={0.1}
            />
          </RoundedBox>
          {/* Central Crest Ridge */}
          <RoundedBox
            args={[0.16, 0.42, 0.96]}
            radius={0.04}
            smoothness={4}
            position={[0, 0.38, 0.04]}
          >
            <meshPhysicalMaterial
              color="#7F1D1D"
              metalness={0.92}
              roughness={0.16}
              clearcoat={1}
            />
          </RoundedBox>
        </group>

        {/* Gold Faceplate Mask */}
        <group ref={faceplateRef} position={[0, -0.05, 0.52]}>
          {/* Forehead & Brow Plate */}
          <RoundedBox
            args={[0.84, 0.46, 0.18]}
            radius={0.06}
            smoothness={4}
            position={[0, 0.28, 0]}
          >
            <meshPhysicalMaterial
              color="#D4AF37"
              metalness={0.94}
              roughness={0.14}
              clearcoat={1}
            />
          </RoundedBox>

          {/* Mid-Face Nose & Cheek Bridge */}
          <RoundedBox
            args={[0.74, 0.42, 0.2]}
            radius={0.05}
            smoothness={4}
            position={[0, -0.08, 0.04]}
          >
            <meshPhysicalMaterial
              color="#E2BD46"
              metalness={0.94}
              roughness={0.14}
              clearcoat={1}
            />
          </RoundedBox>

          {/* Left Optical Eye Slit */}
          <mesh position={[-0.21, 0.09, 0.13]} rotation={[0, 0, -0.14]}>
            <boxGeometry args={[0.24, 0.055, 0.04]} />
            <meshStandardMaterial
              color="#E0F2FE"
              emissive="#38BDF8"
              emissiveIntensity={4.2}
              toneMapped={false}
            />
          </mesh>

          {/* Right Optical Eye Slit */}
          <mesh position={[0.21, 0.09, 0.13]} rotation={[0, 0, 0.14]}>
            <boxGeometry args={[0.24, 0.055, 0.04]} />
            <meshStandardMaterial
              color="#E0F2FE"
              emissive="#38BDF8"
              emissiveIntensity={4.2}
              toneMapped={false}
            />
          </mesh>
        </group>

        {/* Left & Right Temporal Cheek Armor Plates */}
        <RoundedBox
          ref={leftCheekRef}
          args={[0.26, 0.72, 0.78]}
          radius={0.06}
          smoothness={4}
          position={[-0.58, -0.08, 0.05]}
          rotation={[0, -0.25, 0]}
        >
          <meshPhysicalMaterial
            color="#B91C1C"
            metalness={0.88}
            roughness={0.2}
            clearcoat={0.9}
          />
        </RoundedBox>

        <RoundedBox
          ref={rightCheekRef}
          args={[0.26, 0.72, 0.78]}
          radius={0.06}
          smoothness={4}
          position={[0.58, -0.08, 0.05]}
          rotation={[0, 0.25, 0]}
        >
          <meshPhysicalMaterial
            color="#B91C1C"
            metalness={0.88}
            roughness={0.2}
            clearcoat={0.9}
          />
        </RoundedBox>

        {/* Articulated Chin / Jaw Guard */}
        <RoundedBox
          ref={jawRef}
          args={[0.64, 0.24, 0.42]}
          radius={0.05}
          smoothness={4}
          position={[0, -0.56, 0.34]}
        >
          <meshPhysicalMaterial
            color="#991B1B"
            metalness={0.9}
            roughness={0.22}
            clearcoat={0.9}
          />
        </RoundedBox>

        {/* Internal Titanium Neck / Chassis Core */}
        <mesh position={[0, -0.25, -0.02]}>
          <cylinderGeometry args={[0.36, 0.42, 0.85, 24]} />
          <meshStandardMaterial color="#1A1D24" metalness={0.85} roughness={0.35} />
        </mesh>
      </group>

      {/* === 3D ARC REACTOR CHEST CORE === */}
      <group position={[0, -0.82, 0.35]}>
        {/* Titanium Chest Housing */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.56, 0.62, 0.14, 32]} />
          <meshStandardMaterial color="#181C24" metalness={0.9} roughness={0.28} />
        </mesh>

        {/* Outer Rotating Ring + 10 Palladium/Copper Coils */}
        <group ref={reactorOuterRef} position={[0, 0, 0.08]}>
          <mesh>
            <torusGeometry args={[0.42, 0.032, 16, 48]} />
            <meshStandardMaterial
              color="#7DD3FC"
              emissive="#0284C7"
              emissiveIntensity={2.5}
              toneMapped={false}
            />
          </mesh>
          {coilAngles.map((angle, i) => (
            <mesh
              key={i}
              position={[Math.cos(angle) * 0.42, Math.sin(angle) * 0.42, 0.015]}
              rotation={[0, 0, angle]}
            >
              <boxGeometry args={[0.09, 0.045, 0.05]} />
              <meshStandardMaterial color="#D4AF37" metalness={0.92} roughness={0.2} />
            </mesh>
          ))}
        </group>

        {/* Inner Counter-Rotating Ring */}
        <group ref={reactorInnerRef} position={[0, 0, 0.1]}>
          <mesh>
            <torusGeometry args={[0.25, 0.022, 16, 36]} />
            <meshStandardMaterial
              color="#E0F2FE"
              emissive="#38BDF8"
              emissiveIntensity={3.8}
              toneMapped={false}
            />
          </mesh>
        </group>

        {/* Glowing Core Disc */}
        <mesh position={[0, 0, 0.09]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.14, 0.14, 0.04, 24]} />
          <meshStandardMaterial
            color="#FFFFFF"
            emissive="#38BDF8"
            emissiveIntensity={5.5}
            toneMapped={false}
          />
        </mesh>
      </group>

      {/* === HOLOGRAPHIC SCANNING RINGS === */}
      <mesh ref={holoRing1Ref} position={[0, 0.1, 0]}>
        <torusGeometry args={[1.68, 0.008, 12, 96]} />
        <meshBasicMaterial color="#38BDF8" transparent opacity={0.38} />
      </mesh>
      <mesh ref={holoRing2Ref} position={[0, 0.1, 0]}>
        <torusGeometry args={[1.95, 0.006, 12, 96]} />
        <meshBasicMaterial color="#F5D061" transparent opacity={0.24} />
      </mesh>
    </group>
  );
}

export function HeroAwakeningScene({
  pointer,
  scrollProgress,
  pulseTrigger,
  reducedMotion,
}: HeroAwakeningSceneProps) {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0.1, 4.6], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      className="h-full w-full"
    >
      <color attach="background" args={['#06070A']} />
      <fog attach="fog" args={['#06070A', 5, 14]} />

      <ambientLight intensity={0.28} />
      <directionalLight position={[4, 5, 4]} intensity={2.2} color="#FFF4D6" />
      <directionalLight position={[-5, 2, 3]} intensity={1.8} color="#E11D2E" />
      <directionalLight position={[0, -4, -3]} intensity={1.5} color="#38BDF8" />

      <Environment preset="studio" environmentIntensity={0.75} />

      <AtmosphericParticles pointer={pointer} reducedMotion={reducedMotion} />

      <Float
        speed={reducedMotion ? 0 : 1.4}
        rotationIntensity={reducedMotion ? 0 : 0.08}
        floatIntensity={reducedMotion ? 0 : 0.16}
      >
        <IronManCoreAssembly
          pointer={pointer}
          scrollProgress={scrollProgress}
          pulseTrigger={pulseTrigger}
          reducedMotion={reducedMotion}
        />
      </Float>
    </Canvas>
  );
}

