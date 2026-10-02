"use client";

import { Float, OrbitControls, RoundedBox, Sparkles } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import type { Group, Mesh } from "three";

function OrbitNode({ radius, speed, offset, color, size = 0.13 }: { radius: number; speed: number; offset: number; color: string; size?: number }) {
  const node = useRef<Mesh>(null);
  useFrame(({ clock }) => {
    const angle = clock.elapsedTime * speed + offset;
    if (!node.current) return;
    node.current.position.set(Math.cos(angle) * radius, Math.sin(angle * 1.35) * 0.48, Math.sin(angle) * radius * 0.55);
  });
  return <mesh ref={node}><sphereGeometry args={[size, 24, 24]} /><meshStandardMaterial color={color} emissive={color} emissiveIntensity={2.4} roughness={0.2} /></mesh>;
}

function AndroidCore() {
  const group = useRef<Group>(null);
  const bars = useMemo(() => Array.from({ length: 14 }, (_, i) => ({ angle: (i / 14) * Math.PI * 2, height: 0.22 + (i % 4) * 0.08 })), []);
  useFrame(({ pointer, clock }, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.12;
    group.current.rotation.x += (pointer.y * 0.14 - group.current.rotation.x) * 0.025;
    group.current.position.y = Math.sin(clock.elapsedTime * 0.55) * 0.08;
  });
  return (
    <group ref={group}>
      <Float speed={1.25} floatIntensity={0.22} rotationIntensity={0.08}>
        <RoundedBox args={[1.72, 3.36, 0.22]} radius={0.22} smoothness={8} rotation={[0.08, -0.32, -0.05]}>
          <meshPhysicalMaterial color="#15151b" metalness={0.78} roughness={0.18} clearcoat={1} />
        </RoundedBox>
        <group rotation={[0.08, -0.32, -0.05]} position={[-0.035, 0.005, 0.125]}>
          <RoundedBox args={[1.54, 3.08, 0.035]} radius={0.16} smoothness={8}>
            <meshStandardMaterial color="#090b0e" metalness={0.15} roughness={0.38} />
          </RoundedBox>
          <mesh position={[0, 1.28, 0.045]}><capsuleGeometry args={[0.05, 0.24, 8, 16]} /><meshBasicMaterial color="#36363e" /></mesh>
          <mesh position={[0, 0.16, 0.06]}><sphereGeometry args={[0.5, 48, 48]} /><meshPhysicalMaterial color="#b9ff66" emissive="#72b624" emissiveIntensity={0.62} roughness={0.18} metalness={0.12} /></mesh>
          <mesh position={[0, 0.16, 0.56]}><torusGeometry args={[0.36, 0.022, 16, 90]} /><meshBasicMaterial color="#f4ffe8" transparent opacity={0.9} /></mesh>
          {bars.map(({ angle, height }, index) => <mesh key={index} position={[Math.cos(angle) * 0.64, -0.84 + Math.sin(angle * 2) * 0.12, 0.06]} rotation={[0, 0, angle]}><boxGeometry args={[0.035, height, 0.025]} /><meshBasicMaterial color={index % 3 === 0 ? "#8d7dff" : "#b9ff66"} transparent opacity={0.75} /></mesh>)}
        </group>
      </Float>
      <mesh rotation={[Math.PI / 2.35, 0.12, 0.35]}><torusGeometry args={[2.15, 0.009, 12, 190]} /><meshBasicMaterial color="#b9ff66" transparent opacity={0.44} /></mesh>
      <mesh rotation={[Math.PI / 1.9, -0.4, -0.2]}><torusGeometry args={[2.55, 0.006, 10, 190]} /><meshBasicMaterial color="#8d7dff" transparent opacity={0.28} /></mesh>
      <OrbitNode radius={2.15} speed={0.36} offset={0} color="#b9ff66" size={0.16} />
      <OrbitNode radius={2.48} speed={-0.22} offset={2.1} color="#8d7dff" size={0.11} />
      <OrbitNode radius={1.9} speed={0.3} offset={4.2} color="#67d4ff" size={0.09} />
    </group>
  );
}

export default function AndroidCoreScene() {
  return <Canvas camera={{ position: [0, 0, 6.7], fov: 40 }} dpr={[1, 1.55]} gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}>
    <ambientLight intensity={1.1} /><directionalLight position={[4, 6, 5]} intensity={4.5} color="#e8e3ff" /><pointLight position={[-4, -2, 3]} intensity={18} color="#b9ff66" />
    <Sparkles count={42} scale={[6, 5, 3]} size={1.3} speed={0.24} opacity={0.34} color="#b9ff66" />
    <AndroidCore /><OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.24} minPolarAngle={Math.PI / 2.55} maxPolarAngle={Math.PI / 1.62} />
  </Canvas>;
}
