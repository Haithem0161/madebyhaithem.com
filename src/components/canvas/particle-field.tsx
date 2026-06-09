"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useSceneStore } from "@/stores/scene-store";

const COUNT = 220;

function seededRandom(seed: number) {
  let t = seed + 0x6d2b79f5;
  return () => {
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function ParticleField() {
  const ref = useRef<THREE.Points>(null!);
  const matRef = useRef<THREE.PointsMaterial>(null!);

  const { positions, seeds } = useMemo(() => {
    const rnd = seededRandom(42);
    const positions = new Float32Array(COUNT * 3);
    const seeds = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      positions[i * 3 + 0] = (rnd() - 0.5) * 12;
      positions[i * 3 + 1] = (rnd() - 0.5) * 6;
      positions[i * 3 + 2] = (rnd() - 0.5) * 4;
      seeds[i] = rnd() * Math.PI * 2;
    }
    return { positions, seeds };
  }, []);

  useFrame(({ clock }) => {
    const points = ref.current;
    const mat = matRef.current;
    if (!points || !mat) return;
    const t = clock.getElapsedTime();
    const { scrollProgress, mouseX } = useSceneStore.getState();
    const attr = points.geometry.attributes.position as THREE.BufferAttribute;
    const arr = attr.array as Float32Array;

    for (let i = 0; i < COUNT; i++) {
      const baseX = positions[i * 3 + 0];
      const baseY = positions[i * 3 + 1];
      const baseZ = positions[i * 3 + 2];
      const seed = seeds[i];
      arr[i * 3 + 0] = baseX + Math.sin(t * 0.18 + seed) * 0.18 + mouseX * 0.12;
      arr[i * 3 + 1] = baseY + Math.cos(t * 0.22 + seed) * 0.16;
      arr[i * 3 + 2] = baseZ + Math.sin(t * 0.14 + seed * 1.7) * 0.12;
    }
    attr.needsUpdate = true;

    mat.opacity = 0.42 - scrollProgress * 0.28;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={COUNT}
        />
      </bufferGeometry>
      <pointsMaterial
        ref={matRef}
        size={0.026}
        sizeAttenuation
        transparent
        opacity={0.42}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        color={"#f2c9ad"}
      />
    </points>
  );
}
