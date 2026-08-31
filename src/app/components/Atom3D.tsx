"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Mesh } from "three";
import { useRef } from "react";

export default function Atom3D() {
  const nucleus = useRef<Mesh>(null);

  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 5] }}
      gl={{ antialias: false, powerPreference: "high-performance" }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} />
      <mesh ref={nucleus} rotation={[0.4, 0.5, 0]}>
        <sphereGeometry args={[0.5, 24, 24]} />
        <meshStandardMaterial color="#00bfff" emissive="#0077ff" />
      </mesh>

      {/* Electrons */}
      <mesh rotation={[0, 0, 0]}>
        <torusGeometry args={[1, 0.02, 12, 64]} />
        <meshStandardMaterial color="#ffffff" emissive="#00bfff" />
      </mesh>

      <mesh rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[1.2, 0.02, 12, 64]} />
        <meshStandardMaterial color="#ffffff" emissive="#00bfff" />
      </mesh>

      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={10} />
    </Canvas>
  );
}
