"use client";

import { Canvas, useFrame, type ThreeEvent } from "@react-three/fiber";
import { Float, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { useRef } from "react";
import { ASSET_SLUGS, ASSET_COLORS, type AssetSlug } from "@/lib/data";
import { AssetMesh } from "./assetMeshes";
import { glowTexture } from "./glow";
import SceneGuard from "./SceneGuard";

/**
 * The "tokenized asset constellation": four asset nodes on tilted orbits
 * around a golden core. Clicking a node selects it (panel rendered in DOM).
 */

const ORBITS: Record<AssetSlug, { r: number; tilt: [number, number, number]; speed: number; phase: number }> = {
  property: { r: 2.0, tilt: [0.5, 0, 0.15], speed: 0.16, phase: 0.4 },
  gold: { r: 2.6, tilt: [0.42, 0, -0.3], speed: 0.12, phase: 2.2 },
  sukuk: { r: 3.15, tilt: [0.6, 0, 0.32], speed: 0.1, phase: 4.1 },
  equities: { r: 3.7, tilt: [0.35, 0, -0.12], speed: 0.08, phase: 5.5 },
};

const _scale = new THREE.Vector3();

function Node({
  slug,
  selected,
  onSelect,
}: {
  slug: AssetSlug;
  selected: boolean;
  onSelect: (s: AssetSlug) => void;
}) {
  const orbiter = useRef<THREE.Group>(null);
  const inner = useRef<THREE.Group>(null);
  const o = ORBITS[slug];

  useFrame(({ clock }, dt) => {
    const t = clock.elapsedTime * o.speed + o.phase;
    orbiter.current?.position.set(Math.cos(t) * o.r, 0, Math.sin(t) * o.r);
    if (inner.current) {
      const target = selected ? 1.4 : 1;
      inner.current.scale.lerp(_scale.setScalar(target), 0.1);
      inner.current.rotation.y += dt * 0.5;
    }
  });

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    onSelect(slug);
  };

  return (
    <group rotation={o.tilt}>
      {/* orbit ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[o.r, 0.008, 8, 120]} />
        <meshBasicMaterial color="#e7c878" transparent opacity={selected ? 0.5 : 0.16} />
      </mesh>

      <group ref={orbiter}>
        <Float speed={2} rotationIntensity={0.25} floatIntensity={0.4}>
          <group ref={inner}>
            <AssetMesh slug={slug} />
          </group>
        </Float>

        <sprite scale={[1.7, 1.7, 1]}>
          <spriteMaterial
            map={glowTexture()}
            color={ASSET_COLORS[slug]}
            transparent
            opacity={selected ? 0.6 : 0.28}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </sprite>

        {/* invisible hit target (kept renderable so raycasting always works) */}
        <mesh
          onClick={handleClick}
          onPointerOver={(e) => {
            e.stopPropagation();
            document.body.style.cursor = "pointer";
          }}
          onPointerOut={() => {
            document.body.style.cursor = "auto";
          }}
        >
          <sphereGeometry args={[0.7, 12, 12]} />
          <meshBasicMaterial transparent opacity={0} depthWrite={false} />
        </mesh>
      </group>
    </group>
  );
}

function Core() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, dt) => {
    if (ref.current) {
      ref.current.rotation.y += dt * 0.25;
      ref.current.rotation.x += dt * 0.08;
    }
  });
  return (
    <group>
      <mesh ref={ref}>
        <icosahedronGeometry args={[0.72, 0]} />
        <meshStandardMaterial color="#c9a24b" metalness={0.7} roughness={0.3} wireframe />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.3, 24, 24]} />
        <meshBasicMaterial color="#e7c878" />
      </mesh>
      <sprite scale={[2.8, 2.8, 1]}>
        <spriteMaterial
          map={glowTexture()}
          color="#c9a24b"
          transparent
          opacity={0.45}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </sprite>
    </group>
  );
}

export default function AssetOrbit({
  selected,
  onSelect,
}: {
  selected: AssetSlug;
  onSelect: (s: AssetSlug) => void;
}) {
  return (
    <SceneGuard>
      <Canvas
        camera={{ position: [0, 2.4, 7.4], fov: 45 }}
        dpr={[1, 1.75]}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[4, 6, 3]} intensity={1.5} />
        <directionalLight position={[-5, -2, -4]} intensity={0.45} color="#2e9e78" />
        <Core />
        {ASSET_SLUGS.map((s) => (
          <Node key={s} slug={s} selected={selected === s} onSelect={onSelect} />
        ))}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          minPolarAngle={Math.PI * 0.3}
          maxPolarAngle={Math.PI * 0.6}
        />
      </Canvas>
    </SceneGuard>
  );
}
