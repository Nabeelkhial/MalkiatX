"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { useMemo, useRef } from "react";
import { ASSET_COLORS } from "@/lib/data";
import { glowTexture, smoothstep } from "./glow";
import SceneGuard from "./SceneGuard";

/**
 * "The passive growth journey": a river of golden capital flows in from the
 * left and fans out into four glowing asset clusters (property, gold, sukuk,
 * equities), where it keeps orbiting — compounding.
 */

const CLUSTERS = [
  { color: ASSET_COLORS.property, pos: new THREE.Vector3(4.4, 2.0, -0.6) },
  { color: ASSET_COLORS.gold, pos: new THREE.Vector3(5.4, 0.7, 0.4) },
  { color: ASSET_COLORS.sukuk, pos: new THREE.Vector3(4.7, -0.9, -0.3) },
  { color: ASSET_COLORS.equities, pos: new THREE.Vector3(5.6, -2.2, 0.5) },
];

const COUNT = 2400;
const SAMPLES = 200;

function Particles() {
  const geoRef = useRef<THREE.BufferGeometry>(null!);

  const { curves, seeds, positions, colors, baseColors } = useMemo(() => {
    const shared = [
      new THREE.Vector3(-9.5, -2.8, -1.4),
      new THREE.Vector3(-5.5, -1.6, 0.8),
      new THREE.Vector3(-2.2, -0.5, -0.5),
      new THREE.Vector3(0.6, 0.2, 0.4),
    ];
    const curves = CLUSTERS.map((c) => {
      const curve = new THREE.CatmullRomCurve3([
        ...shared,
        new THREE.Vector3(2.6, c.pos.y * 0.45, c.pos.z * 0.5),
        c.pos,
      ]);
      const pts = curve.getSpacedPoints(SAMPLES);
      const arr = new Float32Array((SAMPLES + 1) * 3);
      pts.forEach((p, i) => {
        arr[i * 3] = p.x;
        arr[i * 3 + 1] = p.y;
        arr[i * 3 + 2] = p.z;
      });
      return arr;
    });

    // per-particle: t0, speed, jitter radius, jitter angle, jitter freq
    const seeds = new Float32Array(COUNT * 5);
    for (let i = 0; i < COUNT; i++) {
      seeds[i * 5] = Math.random();
      seeds[i * 5 + 1] = 0.016 + Math.random() * 0.034;
      seeds[i * 5 + 2] = Math.random();
      seeds[i * 5 + 3] = Math.random() * Math.PI * 2;
      seeds[i * 5 + 4] = 0.5 + Math.random() * 1.4;
    }
    const positions = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);
    const baseColors = CLUSTERS.map((c) => new THREE.Color(c.color));
    return { curves, seeds, positions, colors, baseColors };
  }, []);

  const tmp = useMemo(() => ({ col: new THREE.Color(), gold: new THREE.Color("#e7c878") }), []);

  useFrame(({ clock }) => {
    const time = clock.elapsedTime;
    const geo = geoRef.current;
    if (!geo || !geo.attributes.position) return;

    for (let i = 0; i < COUNT; i++) {
      const t0 = seeds[i * 5];
      const sp = seeds[i * 5 + 1];
      const jr = seeds[i * 5 + 2];
      const ja = seeds[i * 5 + 3];
      const jf = seeds[i * 5 + 4];

      const t = (t0 + time * sp) % 1;
      const ci = i % CLUSTERS.length;
      const arr = curves[ci];

      const f = t * SAMPLES;
      const i0 = Math.floor(f);
      const i1 = Math.min(i0 + 1, SAMPLES);
      const fr = f - i0;

      let x = arr[i0 * 3] + (arr[i1 * 3] - arr[i0 * 3]) * fr;
      let y = arr[i0 * 3 + 1] + (arr[i1 * 3 + 1] - arr[i0 * 3 + 1]) * fr;
      let z = arr[i0 * 3 + 2] + (arr[i1 * 3 + 2] - arr[i0 * 3 + 2]) * fr;

      // river widens along the journey, then swirls into the cluster orbit
      const swirl = smoothstep(0.8, 1, t);
      const width = 0.1 + t * 0.45;
      const rad = width * jr * (1 - swirl) + swirl * (0.18 + 0.5 * jr);
      const ang = ja + time * jf;
      x += Math.sin(ang * 0.7) * rad * 0.3 * swirl;
      y += Math.sin(ang) * rad;
      z += Math.cos(ang) * rad * 0.8;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // gold at the source, asset color at the destination; fade at loop ends
      const mix = smoothstep(0.45, 0.9, t);
      tmp.col.copy(tmp.gold).lerp(baseColors[ci], mix);
      const fade = smoothstep(0, 0.07, t) * (1 - smoothstep(0.93, 1, t));
      const b = (0.4 + 0.6 * t) * fade;
      colors[i * 3] = tmp.col.r * b;
      colors[i * 3 + 1] = tmp.col.g * b;
      colors[i * 3 + 2] = tmp.col.b * b;
    }
    geo.attributes.position.needsUpdate = true;
    geo.attributes.color.needsUpdate = true;
  });

  return (
    <points frustumCulled={false}>
      <bufferGeometry ref={geoRef}>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.055}
        sizeAttenuation
        vertexColors
        transparent
        opacity={0.95}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function ClusterOrbs() {
  return (
    <group>
      {CLUSTERS.map((c, i) => (
        <Float key={i} speed={1.6} rotationIntensity={0} floatIntensity={0.6}>
          <group position={c.pos}>
            <sprite scale={[1.9, 1.9, 1]}>
              <spriteMaterial
                map={glowTexture()}
                color={c.color}
                transparent
                opacity={0.5}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
              />
            </sprite>
            <mesh>
              <sphereGeometry args={[0.13, 24, 24]} />
              <meshBasicMaterial color={c.color} />
            </mesh>
          </group>
        </Float>
      ))}
    </group>
  );
}

function Rig() {
  useFrame(({ camera, pointer }) => {
    camera.position.x += (pointer.x * 0.5 - camera.position.x) * 0.04;
    camera.position.y += (0.4 + pointer.y * 0.3 - camera.position.y) * 0.04;
    camera.lookAt(0.6, 0, 0);
  });
  return null;
}

export default function HeroScene() {
  return (
    <SceneGuard>
      <Canvas
        camera={{ position: [0, 0.4, 9], fov: 42 }}
        dpr={[1, 1.75]}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      >
        <Particles />
        <ClusterOrbs />
        <Rig />
      </Canvas>
    </SceneGuard>
  );
}
