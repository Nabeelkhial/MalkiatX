"use client";

import { ASSET_COLORS, type AssetSlug } from "@/lib/data";

/** Stylized 3D glyph for each asset class — shared by the constellation and detail pages. */
export function AssetMesh({ slug }: { slug: AssetSlug }) {
  switch (slug) {
    case "property":
      return <PropertyMesh />;
    case "gold":
      return <GoldMesh />;
    case "sukuk":
      return <SukukMesh />;
    case "equities":
      return <EquitiesMesh />;
  }
}

function PropertyMesh() {
  return (
    <group>
      <mesh position={[-0.15, 0.02, 0]}>
        <boxGeometry args={[0.26, 0.64, 0.26]} />
        <meshStandardMaterial color={ASSET_COLORS.property} metalness={0.25} roughness={0.35} />
      </mesh>
      <mesh position={[0.15, -0.12, 0.07]}>
        <boxGeometry args={[0.24, 0.4, 0.24]} />
        <meshStandardMaterial color="#2c8079" metalness={0.25} roughness={0.4} />
      </mesh>
      <mesh position={[0.04, 0.4, -0.09]}>
        <boxGeometry args={[0.15, 0.15, 0.15]} />
        <meshStandardMaterial color="#e7c878" emissive="#c9a24b" emissiveIntensity={0.45} roughness={0.3} />
      </mesh>
    </group>
  );
}

function GoldMesh() {
  return (
    <group>
      <mesh position={[0, -0.11, 0]} rotation={[0, 0.32, 0]}>
        <boxGeometry args={[0.56, 0.16, 0.3]} />
        <meshStandardMaterial color="#e0b458" metalness={0.92} roughness={0.22} emissive="#75581c" emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[0.04, 0.07, 0.03]} rotation={[0, -0.18, 0]}>
        <boxGeometry args={[0.5, 0.15, 0.27]} />
        <meshStandardMaterial color="#ecc26a" metalness={0.92} roughness={0.2} emissive="#75581c" emissiveIntensity={0.3} />
      </mesh>
    </group>
  );
}

function SukukMesh() {
  return (
    <group>
      <mesh>
        <octahedronGeometry args={[0.34]} />
        <meshStandardMaterial color={ASSET_COLORS.sukuk} metalness={0.35} roughness={0.3} flatShading />
      </mesh>
      <mesh rotation={[Math.PI / 2.2, 0, 0.2]}>
        <torusGeometry args={[0.46, 0.014, 10, 48]} />
        <meshBasicMaterial color="#e7c878" transparent opacity={0.7} />
      </mesh>
    </group>
  );
}

function EquitiesMesh() {
  return (
    <group>
      <mesh>
        <dodecahedronGeometry args={[0.32]} />
        <meshStandardMaterial color={ASSET_COLORS.equities} metalness={0.4} roughness={0.3} flatShading />
      </mesh>
      <mesh position={[0.3, 0.26, 0.1]}>
        <tetrahedronGeometry args={[0.1]} />
        <meshStandardMaterial color="#a9bdf2" metalness={0.4} roughness={0.3} flatShading />
      </mesh>
      <mesh position={[-0.28, -0.24, 0.14]}>
        <tetrahedronGeometry args={[0.08]} />
        <meshStandardMaterial color="#a9bdf2" metalness={0.4} roughness={0.3} flatShading />
      </mesh>
    </group>
  );
}
