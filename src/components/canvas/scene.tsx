"use client";

import { AdaptiveDpr, Preload } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useCallback } from "react";
import * as THREE from "three";
import { useSceneStore } from "@/stores/scene-store";
import { Lights } from "./lights";
import { ParticleField } from "./particle-field";

export function Scene() {
  const onCreated = useCallback((state: { gl: THREE.WebGLRenderer }) => {
    const store = useSceneStore.getState();
    store.setCanvasReady();
    store.setAssetsReady();
    const canvas = state.gl.domElement;
    canvas.addEventListener(
      "webglcontextlost",
      (e) => {
        e.preventDefault();
      },
      { passive: false },
    );
  }, []);

  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    >
      <Canvas
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          powerPreference: "high-performance",
          stencil: false,
          depth: true,
        }}
        camera={{ position: [0, 0, 4.5], fov: 42 }}
        frameloop="always"
        onCreated={onCreated}
      >
        <Lights />
        <Suspense fallback={null}>
          <ParticleField />
        </Suspense>
        <AdaptiveDpr pixelated />
        <Preload all />
      </Canvas>
    </div>
  );
}
