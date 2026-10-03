"use client";

import { Float, OrbitControls, RoundedBox, Sparkles, useTexture } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { CanvasTexture, LinearFilter, Shape, SRGBColorSpace } from "three";
import type { Group } from "three";

import { COMPOSE_LOGO_DATA_URL } from "@/components/scene/compose-logo-data";

type BadgeKind = "android" | "material" | "coroutines" | "room" | "gradle";

function makeBadgeTexture(kind: BadgeKind) {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new CanvasTexture(canvas);

  ctx.fillStyle = "#0b0e14";
  ctx.beginPath();
  ctx.arc(128, 128, 112, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "rgba(255,255,255,.16)";
  ctx.lineWidth = 3;
  ctx.stroke();

  if (kind === "android") {
    ctx.strokeStyle = "#a8f05d";
    ctx.lineWidth = 10;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(83, 78); ctx.lineTo(66, 52);
    ctx.moveTo(173, 78); ctx.lineTo(190, 52);
    ctx.stroke();
    ctx.fillStyle = "#a8f05d";
    ctx.beginPath();
    ctx.arc(128, 128, 67, Math.PI, 0);
    ctx.lineTo(195, 165); ctx.lineTo(61, 165); ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "#0b0e14";
    ctx.beginPath(); ctx.arc(101, 113, 7, 0, Math.PI * 2); ctx.arc(155, 113, 7, 0, Math.PI * 2); ctx.fill();
  } else {
    const labels = { material: "M3", coroutines: "∞", room: "DB", gradle: "G" } as const;
    const colors = { material: "#8d7dff", coroutines: "#67d4ff", room: "#b9ff66", gradle: "#78dcca" } as const;
    ctx.fillStyle = colors[kind];
    ctx.font = `800 ${kind === "coroutines" ? 112 : 72}px Arial`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(labels[kind], 128, 132);
  }

  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  texture.minFilter = LinearFilter;
  return texture;
}

function KotlinCore() {
  const kotlinShape = useMemo(() => {
    const shape = new Shape();
    shape.moveTo(-0.34, 0.36); shape.lineTo(-0.34, -0.36); shape.lineTo(0.02, 0);
    shape.lineTo(0.38, 0.36); shape.lineTo(0.06, 0.36); shape.lineTo(-0.16, 0.13);
    shape.lineTo(-0.16, 0.36); shape.closePath();
    return shape;
  }, []);

  return <Float speed={1.2} floatIntensity={0.18} rotationIntensity={0.08}>
    <group>
      <RoundedBox args={[1.34, 1.34, 0.42]} radius={0.2} smoothness={10}>
        <meshPhysicalMaterial color="#15121f" metalness={0.66} roughness={0.14} clearcoat={1} clearcoatRoughness={0.06} emissive="#38226b" emissiveIntensity={0.28} />
      </RoundedBox>
      <mesh position={[0, 0, 0.225]}><planeGeometry args={[1.05, 1.05]} /><meshBasicMaterial color="#7f52ff" toneMapped={false} /></mesh>
      <mesh position={[0, 0, 0.24]}><shapeGeometry args={[kotlinShape]} /><meshBasicMaterial color="#ffffff" toneMapped={false} /></mesh>
      <mesh position={[0, -0.88, 0.05]}><planeGeometry args={[1.4, 0.12]} /><meshBasicMaterial color="#8d7dff" transparent opacity={0.18} /></mesh>
    </group>
  </Float>;
}

function TechBadge({ position, kind, scale = 0.42 }: { position: [number, number, number]; kind: BadgeKind; scale?: number }) {
  const texture = useMemo(() => makeBadgeTexture(kind), [kind]);
  return <Float speed={1.4} floatIntensity={0.2} rotationIntensity={0.08}>
    <group position={position} scale={scale} rotation={[Math.PI / 2, 0, 0]}>
      <mesh><cylinderGeometry args={[1, 1, 0.28, 48]} /><meshPhysicalMaterial color="#11151d" metalness={0.72} roughness={0.16} clearcoat={1} /></mesh>
      <mesh position={[0, 0.151, 0]} rotation={[-Math.PI / 2, 0, 0]}><circleGeometry args={[0.86, 48]} /><meshBasicMaterial map={texture} transparent toneMapped={false} /></mesh>
    </group>
  </Float>;
}

function ComposeBadge() {
  const texture = useTexture(COMPOSE_LOGO_DATA_URL);
  return <Float speed={1.35} floatIntensity={0.22} rotationIntensity={0.08}>
    <group position={[1.68, 0.86, 0.15]} scale={0.46} rotation={[Math.PI / 2, 0, 0]}>
      <mesh><cylinderGeometry args={[1, 1, 0.28, 48]} /><meshPhysicalMaterial color="#11151d" metalness={0.72} roughness={0.16} clearcoat={1} /></mesh>
      <mesh position={[0, 0.151, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={[1, 1.08, 1]}><circleGeometry args={[0.82, 48]} /><meshBasicMaterial map={texture} transparent alphaTest={0.04} toneMapped={false} /></mesh>
    </group>
  </Float>;
}

function System() {
  const root = useRef<Group>(null);
  useFrame(({ clock, pointer }) => {
    if (!root.current) return;
    root.current.rotation.y = Math.sin(clock.elapsedTime * 0.22) * 0.16 + pointer.x * 0.15;
    root.current.rotation.x += (pointer.y * 0.1 - root.current.rotation.x) * 0.04;
  });

  return <group ref={root} rotation={[0.08, -0.1, 0]}>
    <KotlinCore />
    {[1.55, 2.2, 2.72].map((radius, index) => <mesh key={radius} rotation={[Math.PI / (2.35 + index), index * .48, index * .24]}><torusGeometry args={[radius, index === 0 ? 0.013 : 0.008, 12, 180]} /><meshBasicMaterial color={index === 1 ? "#8d7dff" : index === 2 ? "#67d4ff" : "#b9ff66"} transparent opacity={index === 0 ? 0.42 : 0.24} /></mesh>)}
    <ComposeBadge />
    <TechBadge position={[-1.72, 0.8, 0.08]} kind="android" scale={0.44} />
    <TechBadge position={[-1.42, -1.22, 0.18]} kind="material" scale={0.38} />
    <TechBadge position={[1.48, -1.18, 0.08]} kind="coroutines" scale={0.38} />
    <TechBadge position={[0.05, 1.82, -0.15]} kind="room" scale={0.34} />
    <TechBadge position={[0.04, -1.85, -0.2]} kind="gradle" scale={0.34} />
  </group>;
}

export default function SkillConstellation() {
  return <Canvas camera={{ position: [0, 0, 6.7], fov: 40 }} dpr={[1, 1.6]} gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}>
    <ambientLight intensity={1.25} />
    <directionalLight position={[4, 5, 5]} intensity={4.5} color="#f0edff" />
    <pointLight position={[-3, 1, 3]} intensity={13} color="#b9ff66" />
    <pointLight position={[3, -1, 3]} intensity={10} color="#8d7dff" />
    <Sparkles count={42} scale={[5.4, 4.5, 2.4]} speed={.18} size={1} color="#d9ffd0" opacity={0.38} />
    <System />
    <OrbitControls enableZoom={false} enablePan={false} enableDamping dampingFactor={0.06} minPolarAngle={Math.PI / 2.65} maxPolarAngle={Math.PI / 1.62} />
  </Canvas>;
}
