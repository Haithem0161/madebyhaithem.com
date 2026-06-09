"use client";

export function Lights() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <hemisphereLight
        args={["#fff5e6", "#dfe3e8", 0.55]}
        position={[0, 1, 0]}
      />
      <directionalLight
        position={[2.5, 3, 2]}
        intensity={1.4}
        color="#f2c9ad"
      />
      <directionalLight
        position={[-3, -1.5, -1]}
        intensity={0.45}
        color="#cfd8e0"
      />
      <directionalLight
        position={[0, -3, 2]}
        intensity={0.3}
        color="#ffffff"
      />
    </>
  );
}
