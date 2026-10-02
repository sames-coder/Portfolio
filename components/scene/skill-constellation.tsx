"use client";

import { OrbitControls, Sparkles } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Group } from "three";

function System() {
  const root = useRef<Group>(null);
  useFrame(({ clock, pointer }) => {
    if (!root.current) return;
    root.current.rotation.y = clock.elapsedTime * 0.08 + pointer.x * 0.18;
    root.current.rotation.x = pointer.y * 0.12;
  });
  const nodes = [
    [-1.65, .75, .2, "#b9ff66"], [1.5, .82, -.2, "#8d7dff"], [-1.15, -.95, .4, "#67d4ff"],
    [1.55, -.72, .1, "#b9ff66"], [0, 1.55, -.4, "#67d4ff"], [0, -1.5, -.2, "#8d7dff"],
  ] as const;
  return <group ref={root}>
    <mesh><icosahedronGeometry args={[0.6, 2]} /><meshPhysicalMaterial color="#b9ff66" emissive="#6f9f31" emissiveIntensity={0.55} metalness={0.42} roughness={0.18} /></mesh>
    {[1.25, 2.02, 2.72].map((radius, index) => <mesh key={radius} rotation={[Math.PI / (2.5 + index), index * .52, index * .28]}><torusGeometry args={[radius, 0.009, 10, 150]} /><meshBasicMaterial color={index === 1 ? "#8d7dff" : "#b9ff66"} transparent opacity={0.28} /></mesh>)}
    {nodes.map(([x, y, z, color], i) => <group key={i} position={[x, y, z]}><mesh><sphereGeometry args={[.16, 24, 24]} /><meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} /></mesh><mesh scale={2.4}><sphereGeometry args={[.16, 16, 16]} /><meshBasicMaterial color={color} transparent opacity={.06} /></mesh></group>)}
  </group>;
}

export default function SkillConstellation() {
  return <Canvas camera={{ position: [0, 0, 6.4], fov: 42 }} dpr={[1, 1.5]} gl={{ alpha: true, antialias: true }}><ambientLight intensity={1.2} /><pointLight position={[3, 4, 4]} intensity={7} color="#d7d0ff" /><Sparkles count={54} scale={[6, 5, 3]} speed={.18} size={1.1} color="#d9ffd0" /><System /><OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={.25} /></Canvas>;
}
