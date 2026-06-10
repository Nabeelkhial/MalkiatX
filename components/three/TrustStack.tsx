"use client";

import { Canvas, useFrame, type ThreeEvent } from "@react-three/fiber";
import { OrbitControls, RoundedBox, Html } from "@react-three/drei";
import * as THREE from "three";
import { useRef } from "react";
import SceneGuard from "./SceneGuard";

/**
 * "Interactive trust architecture": five stacked layers (Shariah board,
 * PVARA, audits, custody, transparency). Clicking a layer pops it out and
 * syncs with the DOM detail panel beside the canvas.
 */

export const LAYER_COLORS = ["#e7c878", "#2e9e78", "#3fa7a0", "#7e9be0", "#c9a24b"];

const GAP = 0.62;

function Slab({
  i,
  total,
  selected,
  onSelect,
}: {
  i: number;
  total: number;
  selected: boolean;
  onSelect: (i: number) => void;
}) {
  const ref = useRef<THREE.Group>(null);
  const y = ((total - 1) / 2 - i) * GAP;

  useFrame(() => {
    if (!ref.current) return;
    const tx = selected ? 0.95 : 0;
    ref.current.position.x += (tx - ref.current.position.x) * 0.12;
  });

  const click = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    onSelect(i);
  };

  return (
    <group ref={ref} position={[0, y, 0]}>
      <RoundedBox
        args={[3.2, 0.4, 2.1]}
        radius={0.09}
        smoothness={3}
        onClick={click}
        onPointerOver={(e) => {
          e.stopPropagation();
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          document.body.style.cursor = "auto";
        }}
      >
        <meshStandardMaterial
          color={selected ? "#11543e" : "#0c382b"}
          metalness={0.35}
          roughness={0.45}
          emissive={selected ? LAYER_COLORS[i] : "#000000"}
          emissiveIntensity={selected ? 0.18 : 0}
        />
      </RoundedBox>

      {/* colored bead on the front edge */}
      <mesh position={[-1.35, 0.06, 0.85]}>
        <sphereGeometry args={[0.09, 16, 16]} />
        <meshBasicMaterial color={LAYER_COLORS[i]} />
      </mesh>

      <Html center position={[1.85, 0, 0.6]} className="pointer-events-none select-none">
        <div
          className={`grid h-7 w-7 place-items-center rounded-full border text-xs font-bold transition-all duration-300 ${
            selected
              ? "border-gold-bright bg-gold text-night shadow-glow"
              : "border-cream/30 bg-night/70 text-cream/70"
          }`}
        >
          {i + 1}
        </div>
      </Html>
    </group>
  );
}

export default function TrustStack({
  count,
  selected,
  onSelect,
}: {
  count: number;
  selected: number;
  onSelect: (i: number) => void;
}) {
  return (
    <SceneGuard>
      <Canvas
        camera={{ position: [4.4, 2.6, 5.6], fov: 42 }}
        dpr={[1, 1.75]}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.75} />
        <directionalLight position={[5, 8, 4]} intensity={1.3} />
        <pointLight position={[-4, 2, -3]} intensity={40} color="#c9a24b" />
        <group rotation={[0, 0.5, 0]}>
          {Array.from({ length: count }, (_, i) => (
            <Slab key={i} i={i} total={count} selected={selected === i} onSelect={onSelect} />
          ))}
        </group>
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI * 0.28}
          maxPolarAngle={Math.PI * 0.46}
        />
      </Canvas>
    </SceneGuard>
  );
}
