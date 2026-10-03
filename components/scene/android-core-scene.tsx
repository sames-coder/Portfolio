"use client";

import { ContactShadows, Float, OrbitControls, RoundedBox, Sparkles, useTexture } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Group, Mesh } from "three";

import { COMPOSE_LOGO_DATA_URL } from "@/components/scene/compose-logo-data";

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
  return <meshPhysicalMaterial color={color} emissive={emissive} emissiveIntensity={0.2} metalness={0.3} roughness={0.17} clearcoat={1} clearcoatRoughness={0.08} iridescence={0.16} iridescenceIOR={1.34} sheen={0.2} sheenColor="#ddffc2" />;
}

function ComposeMark() {
  const texture = useTexture(COMPOSE_LOGO_DATA_URL);

  return <group position={[0, -0.3, 0.655]} scale={0.78}>
    <RoundedBox args={[0.92, 0.96, 0.06]} radius={0.18} smoothness={10} position={[0, 0, -0.015]}>
      <meshPhysicalMaterial color="#4979ff" emissive="#1a4dab" emissiveIntensity={0.34} metalness={0.58} roughness={0.16} clearcoat={1} clearcoatRoughness={0.08} />
    </RoundedBox>
    <RoundedBox args={[0.82, 0.86, 0.09]} radius={0.15} smoothness={10} position={[0, 0, 0.035]}>
      <meshPhysicalMaterial color="#080d14" emissive="#071a28" emissiveIntensity={0.32} metalness={0.76} roughness={0.13} clearcoat={1} clearcoatRoughness={0.06} />
    </RoundedBox>
    <mesh position={[0, 0, 0.087]} scale={[0.59, 0.637, 1]}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial map={texture} transparent alphaTest={0.04} toneMapped={false} />
    </mesh>
    <mesh position={[-0.21, 0.26, 0.1]} rotation={[0, 0, -0.5]}>
      <planeGeometry args={[0.3, 0.035]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0.14} toneMapped={false} />
    </mesh>
  </group>;
}

function AndroidMascot() {
  const group = useRef<Group>(null);
  useFrame(({ pointer, clock }) => {
    if (!group.current) return;
    const targetYaw = -0.2 + Math.sin(clock.elapsedTime * 0.42) * 0.16 + pointer.x * 0.1;
    group.current.rotation.y += (targetYaw - group.current.rotation.y) * 0.035;
    group.current.rotation.x += (pointer.y * 0.1 - group.current.rotation.x) * 0.028;
    group.current.rotation.z += (-pointer.x * 0.035 - group.current.rotation.z) * 0.025;
    group.current.position.y = Math.sin(clock.elapsedTime * 0.7) * 0.08;
  });

  return <group ref={group} rotation={[0.03, -0.24, 0]}>
    <Float speed={1.2} floatIntensity={0.16} rotationIntensity={0.035}>
      <group scale={0.92}>
        <mesh position={[-0.48, 1.28, 0]} rotation={[0, 0, -0.58]}><capsuleGeometry args={[0.035, 0.48, 10, 22]} /><PremiumMaterial /></mesh>
        <mesh position={[0.48, 1.28, 0]} rotation={[0, 0, 0.58]}><capsuleGeometry args={[0.035, 0.48, 10, 22]} /><PremiumMaterial /></mesh>
        <mesh position={[-0.64, 1.48, 0]}><sphereGeometry args={[0.075, 24, 24]} /><PremiumMaterial /></mesh>
        <mesh position={[0.64, 1.48, 0]}><sphereGeometry args={[0.075, 24, 24]} /><PremiumMaterial /></mesh>

        <mesh position={[0, 0.73, 0]} scale={[1.22, 0.82, 0.9]}><sphereGeometry args={[0.82, 64, 64, 0, Math.PI * 2, 0, Math.PI / 1.75]} /><PremiumMaterial /></mesh>
        <mesh position={[-0.31, 0.86, 0.69]}><sphereGeometry args={[0.07, 24, 24]} /><meshPhysicalMaterial color="#f7fff0" emissive="#ffffff" emissiveIntensity={1.7} roughness={0.05} /></mesh>
        <mesh position={[0.31, 0.86, 0.69]}><sphereGeometry args={[0.07, 24, 24]} /><meshPhysicalMaterial color="#f7fff0" emissive="#ffffff" emissiveIntensity={1.7} roughness={0.05} /></mesh>

        <RoundedBox args={[1.72, 1.55, 1.22]} radius={0.24} smoothness={10} position={[0, -0.35, 0]}><PremiumMaterial /></RoundedBox>
        <mesh position={[0, 0.33, 0.626]} rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[0.42, 0.012, 12, 72, Math.PI]} /><meshStandardMaterial color="#d9ffaf" emissive="#a8f05d" emissiveIntensity={0.5} metalness={0.4} roughness={0.2} /></mesh>
        <ComposeMark />

        <mesh position={[-1.05, -0.28, 0]} rotation={[0, 0, -0.05]}><capsuleGeometry args={[0.2, 1.12, 14, 30]} /><PremiumMaterial /></mesh>
        <mesh position={[1.05, -0.28, 0]} rotation={[0, 0, 0.05]}><capsuleGeometry args={[0.2, 1.12, 14, 30]} /><PremiumMaterial /></mesh>
        <mesh position={[-0.48, -1.32, 0]}><capsuleGeometry args={[0.23, 0.75, 14, 30]} /><PremiumMaterial /></mesh>
        <mesh position={[0.48, -1.32, 0]}><capsuleGeometry args={[0.23, 0.75, 14, 30]} /><PremiumMaterial /></mesh>
        <mesh position={[0, -0.25, -0.62]}><sphereGeometry args={[0.72, 40, 40]} /><meshStandardMaterial color="#77aa43" transparent opacity={0.2} /></mesh>
      </group>
    </Float>

    <mesh rotation={[Math.PI / 2.25, 0.08, 0.35]}><torusGeometry args={[2.05, 0.01, 12, 180]} /><meshBasicMaterial color="#b9ff66" transparent opacity={0.4} /></mesh>
    <mesh rotation={[Math.PI / 1.82, -0.42, -0.18]}><torusGeometry args={[2.38, 0.007, 10, 180]} /><meshBasicMaterial color="#8d7dff" transparent opacity={0.27} /></mesh>
    <mesh rotation={[Math.PI / 2.7, 0.28, -0.48]}><torusGeometry args={[1.72, 0.006, 10, 180]} /><meshBasicMaterial color="#67d4ff" transparent opacity={0.2} /></mesh>
    <OrbitNode radius={2.05} speed={0.34} offset={0} color="#b9ff66" size={0.13} />
    <OrbitNode radius={2.32} speed={-0.2} offset={2.1} color="#8d7dff" size={0.09} />
    <OrbitNode radius={1.72} speed={0.28} offset={4.2} color="#67d4ff" size={0.075} />
  </group>;
}

export default function AndroidCoreScene() {
  return <Canvas camera={{ position: [0, 0.08, 7.45], fov: 37 }} dpr={[1, 1.6]} gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}>
    <ambientLight intensity={0.95} />
    <directionalLight position={[4, 7, 6]} intensity={4.8} color="#f4f1ff" />
    <pointLight position={[-4, 0, 4]} intensity={22} color="#b9ff66" />
    <pointLight position={[4, -2, 2]} intensity={13} color="#8d7dff" />
    <pointLight position={[0, 3, -3]} intensity={15} color="#4d84ff" />
    <Sparkles count={38} scale={[5.5, 4.6, 3]} size={1.1} speed={0.2} opacity={0.32} color="#b9ff66" />
    <AndroidMascot />
    <ContactShadows position={[0, -2.03, 0]} opacity={0.22} scale={4.4} blur={2.6} far={3.2} color="#6f85ff" />
    <OrbitControls enableZoom={false} enablePan={false} enableDamping dampingFactor={0.06} minPolarAngle={Math.PI / 2.6} maxPolarAngle={Math.PI / 1.62} />
  </Canvas>;
}
