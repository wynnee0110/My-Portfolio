"use client";

import React, {
  useMemo,
  useRef,
  useEffect,
  memo
} from "react";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

const MAX_POINTS = 5000; // reduced from 8000
const SPEED = 3;
const GLOW_LENGTH = 180;

function AttractorGeometry() {
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef(0);
  const visibleRef = useRef(true);

  /* --------------------------
     Generate points once
  --------------------------- */
  const { geometry, colorAttr, material } = useMemo(() => {
    let x = 0.1;
    let y = 0;
    let z = 0;

    const sigma = 10;
    const rho = 28;
    const beta = 8 / 3;
    const dt = 0.01;

    const positions = new Float32Array(MAX_POINTS * 3);
    const colors = new Float32Array(MAX_POINTS * 3);

    for (let i = 0; i < MAX_POINTS; i++) {
      const dx = sigma * (y - x) * dt;
      const dy = (x * (rho - z) - y) * dt;
      const dz = (x * y - beta * z) * dt;

      x += dx;
      y += dy;
      z += dz;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z - 25;

      colors[i * 3] = 0.05;
      colors[i * 3 + 1] = 0.1;
      colors[i * 3 + 2] = 0.35;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );

    const colorAttr = new THREE.BufferAttribute(colors, 3);
    geometry.setAttribute("color", colorAttr);

    const material = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 1
    });

    return { geometry, colorAttr, material };
  }, []);

  /* --------------------------
     Pause when offscreen
  --------------------------- */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );

    const el = document.getElementById("lorenz-container");

    if (el) observer.observe(el);

    return () => observer.disconnect();
  }, []);

  /* --------------------------
     Cleanup memory
  --------------------------- */
  useEffect(() => {
    return () => {
      geometry.dispose();
      material.dispose();
    };
  }, [geometry, material]);

  /* --------------------------
     Animate
  --------------------------- */
  useFrame(({ clock }) => {
    if (!visibleRef.current) return;

    if (groupRef.current) {
      const t = clock.elapsedTime;

      groupRef.current.rotation.y = t * 0.08;
      groupRef.current.rotation.z = t * 0.04;
    }

    headRef.current =
      (headRef.current + SPEED) % MAX_POINTS;

    const head = headRef.current;
    const arr = colorAttr.array as Float32Array;

    /* Update only glow section */
    for (
      let i = Math.max(0, head - GLOW_LENGTH);
      i < Math.min(MAX_POINTS, head + GLOW_LENGTH);
      i++
    ) {
      const dist =
        ((head - i) + MAX_POINTS) % MAX_POINTS;

      const t = dist / GLOW_LENGTH;
      const brightness = Math.max(0, 1 - t);

      arr[i * 3] = 0.05 + brightness;
      arr[i * 3 + 1] = 0.1 + brightness * 0.8;
      arr[i * 3 + 2] = 0.35 + brightness * 0.6;
    }

    colorAttr.needsUpdate = true;
  });

  return (
    <group ref={groupRef}>
      <line>
        <primitive object={geometry} attach="geometry" />
        <primitive object={material} attach="material" />
      </line>
    </group>
  );
}

/* --------------------------
   Main Component
--------------------------- */
function Lorenz() {
  return (
    <div
      id="lorenz-container"
      className="w-full h-full min-h-[250px] max-h-[380px] rounded-lg overflow-hidden bg-black/5 dark:bg-black border border-border"
    >
      <Canvas
        dpr={[1, 1.5]} // limits retina GPU load
        frameloop="always"
        camera={{
          position: [0, 0, 20],
          fov: 60
        }}
        gl={{
          antialias: false, // huge performance gain
          powerPreference: "high-performance"
        }}
      >
        <ambientLight intensity={0.5} />

        <AttractorGeometry />

        <OrbitControls
          enablePan={false}
          enableZoom={false}
          enableDamping
          dampingFactor={0.05}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
}

export default memo(Lorenz);