"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Mesh } from "three";
import { useRef } from "react";

export default function Atom3D() {
  const nucleus = useRef<Mesh>(null);

  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} />
      <mesh ref={nucleus} rotation={[0.4, 0.5, 0]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="#00bfff" emissive="#0077ff" />
      </mesh>

      {/* Electrons */}
      <mesh rotation={[0, 0, 0]}>
        <torusGeometry args={[1, 0.02, 16, 100]} />
        <meshStandardMaterial color="#ffffff" emissive="#00bfff" />
      </mesh>

      <mesh rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[1.2, 0.02, 16, 100]} />
        <meshStandardMaterial color="#ffffff" emissive="#00bfff" />
      </mesh>

      <OrbitControls enableZoom={false} autoRotate />
    </Canvas>
  );
}
