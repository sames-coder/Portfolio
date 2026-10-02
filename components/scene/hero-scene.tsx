"use client";

import { Float, MeshTransmissionMaterial, OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Group } from "three";

function Artifact() {
  const group = useRef<Group>(null);
  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.08;
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.35) * 0.08;
  });
  return (
    <group ref={group}>
      <Float speed={1.5} rotationIntensity={0.25} floatIntensity={0.35}>
        <mesh rotation={[0.4, 0.4, 0]} scale={1.55}>
          <icosahedronGeometry args={[1, 3]} />
          <MeshTransmissionMaterial backside samples={5} thickness={0.7} chromaticAberration={0.16} anisotropy={0.25} distortion={0.25} distortionScale={0.25} temporalDistortion={0.08} roughness={0.06} color="#8d7dff" />
        </mesh>
        <mesh rotation={[Math.PI / 2.7, 0.2, 0]} scale={2.15}>
          <torusGeometry args={[1, 0.018, 16, 160]} /><meshBasicMaterial color="#b9ff66" toneMapped={false} />
        </mesh>
        <mesh rotation={[1.1, -0.5, 0.8]} scale={1.95}>
          <torusGeometry args={[1, 0.008, 12, 140]} /><meshBasicMaterial color="#efeaff" transparent opacity={0.45} />
        </mesh>
      </Float>
    </group>
  );
}

export default function HeroScene() {
  return (
    <Canvas camera={{ position: [0, 0, 5.2], fov: 42 }} dpr={[1, 1.6]} gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}>
      <ambientLight intensity={1.4} />
      <directionalLight position={[4, 5, 4]} intensity={5} color="#d8d0ff" />
      <pointLight position={[-3, -2, 3]} intensity={12} color="#83ffb7" />
      <Artifact />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.35} minPolarAngle={Math.PI / 2.5} maxPolarAngle={Math.PI / 1.65} />
    </Canvas>
  );
}
