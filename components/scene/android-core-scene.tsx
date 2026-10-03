"use client";

import { Float, OrbitControls, RoundedBox, Sparkles } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Group, Mesh } from "three";

const androidGreen = "#a8f05d";

function OrbitNode({ radius, speed, offset, color, size = 0.1 }: { radius: number; speed: number; offset: number; color: string; size?: number }) {
  const node = useRef<Mesh>(null);
  useFrame(({ clock }) => {
    const angle = clock.elapsedTime * speed + offset;
    if (!node.current) return;
    node.current.position.set(Math.cos(angle) * radius, Math.sin(angle * 1.3) * 0.42, Math.sin(angle) * radius * 0.55);
  });
  return <mesh ref={node}><sphereGeometry args={[size, 24, 24]} /><meshStandardMaterial color={color} emissive={color} emissiveIntensity={2.6} roughness={0.18} /></mesh>;
}

function PremiumMaterial({ color = androidGreen, emissive = "#315d12" }: { color?: string; emissive?: string }) {
  return <meshPhysicalMaterial color={color} emissive={emissive} emissiveIntensity={0.22} metalness={0.24} roughness={0.2} clearcoat={1} clearcoatRoughness={0.12} />;
}

function AndroidMascot() {
  const group = useRef<Group>(null);
  useFrame(({ pointer, clock }, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.11;
    group.current.rotation.x += (pointer.y * 0.1 - group.current.rotation.x) * 0.028;
    group.current.rotation.z += (-pointer.x * 0.035 - group.current.rotation.z) * 0.025;
    group.current.position.y = Math.sin(clock.elapsedTime * 0.7) * 0.08;
  });

  return <group ref={group} rotation={[0.03, -0.24, 0]}>
    <Float speed={1.2} floatIntensity={0.16} rotationIntensity={0.035}>
      <group scale={1.12}>
        <mesh position={[-0.48, 1.28, 0]} rotation={[0, 0, -0.58]}><capsuleGeometry args={[0.035, 0.48, 10, 22]} /><PremiumMaterial /></mesh>
        <mesh position={[0.48, 1.28, 0]} rotation={[0, 0, 0.58]}><capsuleGeometry args={[0.035, 0.48, 10, 22]} /><PremiumMaterial /></mesh>
        <mesh position={[-0.64, 1.48, 0]}><sphereGeometry args={[0.075, 24, 24]} /><PremiumMaterial /></mesh>
        <mesh position={[0.64, 1.48, 0]}><sphereGeometry args={[0.075, 24, 24]} /><PremiumMaterial /></mesh>

        <mesh position={[0, 0.73, 0]} scale={[1.22, 0.82, 0.9]}><sphereGeometry args={[0.82, 64, 64, 0, Math.PI * 2, 0, Math.PI / 1.75]} /><PremiumMaterial /></mesh>
        <mesh position={[-0.31, 0.86, 0.69]}><sphereGeometry args={[0.07, 24, 24]} /><meshPhysicalMaterial color="#f7fff0" emissive="#ffffff" emissiveIntensity={1.7} roughness={0.05} /></mesh>
        <mesh position={[0.31, 0.86, 0.69]}><sphereGeometry args={[0.07, 24, 24]} /><meshPhysicalMaterial color="#f7fff0" emissive="#ffffff" emissiveIntensity={1.7} roughness={0.05} /></mesh>

        <RoundedBox args={[1.72, 1.55, 1.22]} radius={0.24} smoothness={10} position={[0, -0.35, 0]}><PremiumMaterial /></RoundedBox>
        <mesh position={[0, -0.31, 0.64]}><circleGeometry args={[0.29, 48]} /><meshPhysicalMaterial color="#111318" metalness={0.72} roughness={0.2} clearcoat={1} /></mesh>
        <mesh position={[0, -0.31, 0.656]} rotation={[0, 0, -Math.PI / 2]}><ringGeometry args={[0.15, 0.19, 3]} /><meshBasicMaterial color="#b9ff66" /></mesh>

        <mesh position={[-1.05, -0.28, 0]} rotation={[0, 0, -0.05]}><capsuleGeometry args={[0.2, 1.12, 14, 30]} /><PremiumMaterial /></mesh>
        <mesh position={[1.05, -0.28, 0]} rotation={[0, 0, 0.05]}><capsuleGeometry args={[0.2, 1.12, 14, 30]} /><PremiumMaterial /></mesh>
        <mesh position={[-0.48, -1.32, 0]}><capsuleGeometry args={[0.23, 0.75, 14, 30]} /><PremiumMaterial /></mesh>
        <mesh position={[0.48, -1.32, 0]}><capsuleGeometry args={[0.23, 0.75, 14, 30]} /><PremiumMaterial /></mesh>
        <mesh position={[0, -0.25, -0.62]}><sphereGeometry args={[0.72, 40, 40]} /><meshStandardMaterial color="#77aa43" transparent opacity={0.2} /></mesh>
      </group>
    </Float>

    <mesh rotation={[Math.PI / 2.25, 0.08, 0.35]}><torusGeometry args={[2.28, 0.012, 12, 180]} /><meshBasicMaterial color="#b9ff66" transparent opacity={0.45} /></mesh>
    <mesh rotation={[Math.PI / 1.82, -0.42, -0.18]}><torusGeometry args={[2.72, 0.008, 10, 180]} /><meshBasicMaterial color="#8d7dff" transparent opacity={0.3} /></mesh>
    <mesh rotation={[Math.PI / 2.7, 0.28, -0.48]}><torusGeometry args={[1.93, 0.006, 10, 180]} /><meshBasicMaterial color="#67d4ff" transparent opacity={0.22} /></mesh>
    <OrbitNode radius={2.28} speed={0.34} offset={0} color="#b9ff66" size={0.15} />
    <OrbitNode radius={2.64} speed={-0.2} offset={2.1} color="#8d7dff" size={0.1} />
    <OrbitNode radius={1.94} speed={0.28} offset={4.2} color="#67d4ff" size={0.085} />
  </group>;
}

export default function AndroidCoreScene() {
  return <Canvas camera={{ position: [0, 0.1, 6.9], fov: 39 }} dpr={[1, 1.65]} gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}>
    <ambientLight intensity={0.95} />
    <directionalLight position={[4, 7, 6]} intensity={4.8} color="#f4f1ff" />
    <pointLight position={[-4, 0, 4]} intensity={22} color="#b9ff66" />
    <pointLight position={[4, -2, 2]} intensity={13} color="#8d7dff" />
    <Sparkles count={46} scale={[6, 5, 3]} size={1.25} speed={0.22} opacity={0.38} color="#b9ff66" />
    <AndroidMascot />
    <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.22} minPolarAngle={Math.PI / 2.6} maxPolarAngle={Math.PI / 1.62} />
  </Canvas>;
}
