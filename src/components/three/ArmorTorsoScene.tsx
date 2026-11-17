import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

export type ArmorLightingMode = 'combat' | 'gold' | 'stealth';

interface ArmorTorsoSceneProps {
  explodeFactor: React.MutableRefObject<number>;
  pointer: React.MutableRefObject<{ x: number; y: number }>;
  mode: ArmorLightingMode;
  reducedMotion: boolean;
}

function ArmorTorsoMesh({
  explodeFactor,
  pointer,
  mode,
  reducedMotion,
}: ArmorTorsoSceneProps) {
  const rootRef = useRef<THREE.Group>(null);
  const chestLeftRef = useRef<THREE.Mesh>(null);
  const chestRightRef = useRef<THREE.Mesh>(null);
  const pauldronLeftRef = useRef<THREE.Mesh>(null);
  const pauldronRightRef = useRef<THREE.Mesh>(null);
  const absRef = useRef<THREE.Group>(null);
  const helmetRef = useRef<THREE.Group>(null);
  const reactorRef = useRef<THREE.Group>(null);
  const dorsalLeftRef = useRef<THREE.Mesh>(null);
  const dorsalRightRef = useRef<THREE.Mesh>(null);

  const primaryColor =
    mode === 'gold' ? '#D4AF37' : mode === 'stealth' ? '#1E2430' : '#B91C1C';
  const secondaryColor =
    mode === 'gold' ? '#991B1B' : mode === 'stealth' ? '#38BDF8' : '#D4AF37';

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    const exp = explodeFactor.current;

    if (rootRef.current) {
      const targetRotY =
        pointer.current.x * 0.48 +
        exp * 0.65 +
        (reducedMotion ? 0 : Math.sin(t * 0.35) * 0.08);
      const targetRotX =
        -pointer.current.y * 0.22 + (reducedMotion ? 0 : Math.cos(t * 0.25) * 0.03);

      rootRef.current.rotation.y = THREE.MathUtils.damp(
        rootRef.current.rotation.y,
        targetRotY,
        4.2,
        delta
      );
      rootRef.current.rotation.x = THREE.MathUtils.damp(
        rootRef.current.rotation.x,
        targetRotX,
        4.2,
        delta
      );
    }

    // Exploded 3D plate separation
    if (chestLeftRef.current) {
      chestLeftRef.current.position.x = -0.46 - exp * 0.75;
      chestLeftRef.current.position.z = 0.25 + exp * 0.55;
      chestLeftRef.current.rotation.y = -0.18 - exp * 0.35;
    }
    if (chestRightRef.current) {
      chestRightRef.current.position.x = 0.46 + exp * 0.75;
      chestRightRef.current.position.z = 0.25 + exp * 0.55;
      chestRightRef.current.rotation.y = 0.18 + exp * 0.35;
    }
    if (pauldronLeftRef.current) {
      pauldronLeftRef.current.position.x = -1.08 - exp * 0.95;
      pauldronLeftRef.current.position.y = 0.52 + exp * 0.42;
      pauldronLeftRef.current.rotation.z = 0.28 + exp * 0.45;
    }
    if (pauldronRightRef.current) {
      pauldronRightRef.current.position.x = 1.08 + exp * 0.95;
      pauldronRightRef.current.position.y = 0.52 + exp * 0.42;
      pauldronRightRef.current.rotation.z = -0.28 - exp * 0.45;
    }
    if (absRef.current) {
      absRef.current.position.y = -0.58 - exp * 0.55;
      absRef.current.position.z = 0.14 + exp * 0.35;
    }
    if (helmetRef.current) {
      helmetRef.current.position.y = 1.28 + exp * 0.72;
    }
    if (reactorRef.current) {
      reactorRef.current.position.z = 0.38 + exp * 0.95;
      if (!reducedMotion) {
        reactorRef.current.rotation.z = t * 0.6;
      }
    }
    if (dorsalLeftRef.current) {
      dorsalLeftRef.current.position.x = -0.58 - exp * 0.65;
      dorsalLeftRef.current.position.z = -0.45 - exp * 0.65;
      dorsalLeftRef.current.rotation.y = -0.35 - exp * 0.4;
    }
    if (dorsalRightRef.current) {
      dorsalRightRef.current.position.x = 0.58 + exp * 0.65;
      dorsalRightRef.current.position.z = -0.45 - exp * 0.65;
      dorsalRightRef.current.rotation.y = 0.35 + exp * 0.4;
    }
  });

  return (
    <group ref={rootRef} position={[0, -0.15, 0]}>
      {/* Internal Titanium Spine & Chassis */}
      <mesh position={[0, 0.05, -0.05]}>
        <cylinderGeometry args={[0.38, 0.32, 1.85, 20]} />
        <meshStandardMaterial color="#141820" metalness={0.88} roughness={0.32} />
      </mesh>

      {/* Helmet Crown */}
      <group ref={helmetRef} position={[0, 1.28, 0.05]}>
        <RoundedBox args={[0.56, 0.66, 0.62]} radius={0.18} smoothness={5}>
          <meshPhysicalMaterial
            color={primaryColor}
            metalness={0.92}
            roughness={0.16}
            clearcoat={1}
          />
        </RoundedBox>
        <RoundedBox
          args={[0.42, 0.48, 0.14]}
          radius={0.04}
          smoothness={4}
          position={[0, -0.02, 0.28]}
        >
          <meshPhysicalMaterial
            color={secondaryColor}
            metalness={0.94}
            roughness={0.14}
            clearcoat={1}
          />
        </RoundedBox>
        {/* Eyes */}
        <mesh position={[-0.11, 0.04, 0.35]}>
          <boxGeometry args={[0.12, 0.032, 0.02]} />
          <meshStandardMaterial
            color="#E0F2FE"
            emissive="#38BDF8"
            emissiveIntensity={4}
            toneMapped={false}
          />
        </mesh>
        <mesh position={[0.11, 0.04, 0.35]}>
          <boxGeometry args={[0.12, 0.032, 0.02]} />
          <meshStandardMaterial
            color="#E0F2FE"
            emissive="#38BDF8"
            emissiveIntensity={4}
            toneMapped={false}
          />
        </mesh>
      </group>

      {/* Left & Right Pectoral Armor Plates */}
      <RoundedBox
        ref={chestLeftRef}
        args={[0.72, 0.72, 0.36]}
        radius={0.06}
        smoothness={4}
        position={[-0.46, 0.36, 0.25]}
        rotation={[0, -0.18, 0]}
      >
        <meshPhysicalMaterial
          color={primaryColor}
          metalness={0.9}
          roughness={0.18}
          clearcoat={1}
        />
      </RoundedBox>

      <RoundedBox
        ref={chestRightRef}
        args={[0.72, 0.72, 0.36]}
        radius={0.06}
        smoothness={4}
        position={[0.46, 0.36, 0.25]}
        rotation={[0, 0.18, 0]}
      >
        <meshPhysicalMaterial
          color={primaryColor}
          metalness={0.9}
          roughness={0.18}
          clearcoat={1}
        />
      </RoundedBox>

      {/* Center Arc Reactor Core */}
      <group ref={reactorRef} position={[0, 0.36, 0.38]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.24, 0.28, 0.1, 6]} />
          <meshStandardMaterial color="#1E2430" metalness={0.9} roughness={0.25} />
        </mesh>
        <mesh>
          <torusGeometry args={[0.17, 0.02, 12, 32]} />
          <meshStandardMaterial
            color="#E0F2FE"
            emissive="#38BDF8"
            emissiveIntensity={4.2}
            toneMapped={false}
          />
        </mesh>
        <pointLight color="#38BDF8" intensity={4.5} distance={5} />
      </group>

      {/* Left & Right Shoulder Pauldrons */}
      <RoundedBox
        ref={pauldronLeftRef}
        args={[0.56, 0.56, 0.62]}
        radius={0.12}
        smoothness={4}
        position={[-1.08, 0.52, 0]}
        rotation={[0, 0, 0.28]}
      >
        <meshPhysicalMaterial
          color={secondaryColor}
          metalness={0.92}
          roughness={0.16}
          clearcoat={1}
        />
      </RoundedBox>

      <RoundedBox
        ref={pauldronRightRef}
        args={[0.56, 0.56, 0.62]}
        radius={0.12}
        smoothness={4}
        position={[1.08, 0.52, 0]}
        rotation={[0, 0, -0.28]}
      >
        <meshPhysicalMaterial
          color={secondaryColor}
          metalness={0.92}
          roughness={0.16}
          clearcoat={1}
        />
      </RoundedBox>

      {/* Abdominal Segmented Armor */}
      <group ref={absRef} position={[0, -0.58, 0.14]}>
        {[0, 1, 2].map((row) => (
          <RoundedBox
            key={row}
            args={[0.88 - row * 0.06, 0.2, 0.38]}
            radius={0.04}
            smoothness={3}
            position={[0, 0.26 - row * 0.24, 0]}
          >
            <meshPhysicalMaterial
              color={row === 1 ? secondaryColor : primaryColor}
              metalness={0.88}
              roughness={0.22}
              clearcoat={0.9}
            />
          </RoundedBox>
        ))}
      </group>

      {/* Dorsal Flight Stabilizers */}
      <RoundedBox
        ref={dorsalLeftRef}
        args={[0.36, 0.92, 0.14]}
        radius={0.03}
        smoothness={3}
        position={[-0.58, 0.38, -0.45]}
        rotation={[0.15, -0.35, -0.15]}
      >
        <meshPhysicalMaterial
          color="#2B303B"
          metalness={0.9}
          roughness={0.25}
        />
      </RoundedBox>

      <RoundedBox
        ref={dorsalRightRef}
        args={[0.36, 0.92, 0.14]}
        radius={0.03}
        smoothness={3}
        position={[0.58, 0.38, -0.45]}
        rotation={[0.15, 0.35, 0.15]}
      >
        <meshPhysicalMaterial
          color="#2B303B"
          metalness={0.9}
          roughness={0.25}
        />
      </RoundedBox>
    </group>
  );
}

export function ArmorTorsoScene({
  explodeFactor,
  pointer,
  mode,
  reducedMotion,
}: ArmorTorsoSceneProps) {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0.2, 4.4], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      className="h-full w-full"
    >
      <ambientLight intensity={0.26} />
      <directionalLight position={[5, 5, 4]} intensity={2.4} color="#FFF4D6" />
      <directionalLight position={[-4, 3, 2]} intensity={1.9} color="#E11D2E" />
      <directionalLight position={[0, -4, 3]} intensity={1.6} color="#38BDF8" />
      <Environment preset="studio" environmentIntensity={0.75} />
      <ArmorTorsoMesh
        explodeFactor={explodeFactor}
        pointer={pointer}
        mode={mode}
        reducedMotion={reducedMotion}
      />
    </Canvas>
  );
}

