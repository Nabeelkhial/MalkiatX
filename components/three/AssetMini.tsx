"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useRef, type ReactNode } from "react";
import type { AssetSlug } from "@/lib/data";
import { AssetMesh } from "./assetMeshes";
import SceneGuard from "./SceneGuard";

function Spin({ children }: { children: ReactNode }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state, dt) => {
    if (!ref.current) return;
    ref.current.rotation.y += dt * 0.5;
    ref.current.position.y = Math.sin(state.clock.elapsedTime * 1.2) * 0.05;
  });
  return <group ref={ref}>{children}</group>;
}

/** Small floating 3D glyph used on asset detail pages. */
export default function AssetMini({ slug }: { slug: AssetSlug }) {
  return (
    <SceneGuard>
      <Canvas camera={{ position: [0, 0.5, 2.3], fov: 40 }} dpr={[1, 2]} gl={{ alpha: true, antialias: true }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[3, 4, 2]} intensity={1.7} />
        <directionalLight position={[-3, -2, -2]} intensity={0.5} color="#2e9e78" />
        <Spin>
          <group scale={1.55}>
            <AssetMesh slug={slug} />
          </group>
        </Spin>
      </Canvas>
    </SceneGuard>
  );
}
