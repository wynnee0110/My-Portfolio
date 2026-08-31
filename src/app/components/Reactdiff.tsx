"use client";

import React, { useEffect, useRef } from "react";

const SIZE = 200; // Resolution tuned for fast, crisp Gray-Scott pattern generation
const dA = 1.0;
const dB = 0.5;
const feed = 0.0545;
const kill = 0.062;

const ReactionDiffusion: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;

    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", {
      willReadFrequently: true,
      alpha: false,
    });

    if (!ctx) return;

    canvas.width = SIZE;
    canvas.height = SIZE;

    let gridA = new Float32Array(SIZE * SIZE);
    let gridB = new Float32Array(SIZE * SIZE);
    let nextA = new Float32Array(SIZE * SIZE);
    let nextB = new Float32Array(SIZE * SIZE);

    let animationFrameId = 0;
    let isVisible = true;
    let lastPointerTime = 0;

    const imageData = ctx.createImageData(SIZE, SIZE);
    const pixels = imageData.data;

    // Helper: Seed chemical B in a square
    const seedSquare = (cx: number, cy: number, r: number) => {
      for (let dy = -r; dy <= r; dy++) {
        for (let dx = -r; dx <= r; dx++) {
          const x = cx + dx;
          const y = cy + dy;
          if (x > 1 && x < SIZE - 1 && y > 1 && y < SIZE - 1) {
            gridB[x + y * SIZE] = 0.9;
          }
        }
      }
    };

    const init = () => {
      gridA.fill(1.0);
      gridB.fill(0.0);

      // Seed center square & 4 surrounding spots for Turing pattern growth
      const mid = Math.floor(SIZE / 2);
      seedSquare(mid, mid, 12);
      seedSquare(mid - 35, mid - 35, 8);
      seedSquare(mid + 35, mid + 35, 8);
      seedSquare(mid - 35, mid + 35, 8);
      seedSquare(mid + 35, mid - 35, 8);
    };

    const update = () => {
      for (let y = 1; y < SIZE - 1; y++) {
        const rowOffset = y * SIZE;
        const prevRow = (y - 1) * SIZE;
        const nextRow = (y + 1) * SIZE;

        for (let x = 1; x < SIZE - 1; x++) {
          const i = x + rowOffset;

          const a = gridA[i];
          const b = gridB[i];

          const lapA =
            -a +
            gridA[i - 1] * 0.2 +
            gridA[i + 1] * 0.2 +
            gridA[prevRow + x] * 0.2 +
            gridA[nextRow + x] * 0.2 +
            gridA[prevRow + x - 1] * 0.05 +
            gridA[prevRow + x + 1] * 0.05 +
            gridA[nextRow + x - 1] * 0.05 +
            gridA[nextRow + x + 1] * 0.05;

          const lapB =
            -b +
            gridB[i - 1] * 0.2 +
            gridB[i + 1] * 0.2 +
            gridB[prevRow + x] * 0.2 +
            gridB[nextRow + x] * 0.2 +
            gridB[prevRow + x - 1] * 0.05 +
            gridB[prevRow + x + 1] * 0.05 +
            gridB[nextRow + x - 1] * 0.05 +
            gridB[nextRow + x + 1] * 0.05;

          const abb = a * b * b;

          nextA[i] = Math.min(Math.max(a + (dA * lapA - abb + feed * (1 - a)), 0), 1);
          nextB[i] = Math.min(Math.max(b + (dB * lapB + abb - (kill + feed) * b), 0), 1);
        }
      }

      [gridA, nextA] = [nextA, gridA];
      [gridB, nextB] = [nextB, gridB];
    };

    const draw = () => {
      const isDark = document.documentElement.classList.contains("dark");

      for (let i = 0; i < SIZE * SIZE; i++) {
        const bVal = gridB[i];
        // High-contrast sigmoidal mapping for Gray-Scott Turing patterns
        const norm = Math.max(0, Math.min(1, bVal * 3.2));
        const val = Math.floor(norm * 255);

        const p = i * 4;
        if (isDark) {
          // Dark mode: glowing emerald/white patterns on dark slate
          pixels[p] = Math.floor(val * 0.9);
          pixels[p + 1] = Math.floor(val * 0.95);
          pixels[p + 2] = val;
          pixels[p + 3] = 255;
        } else {
          // Light mode: dark slate spots on clean background
          const inv = 255 - val;
          pixels[p] = inv;
          pixels[p + 1] = inv;
          pixels[p + 2] = inv;
          pixels[p + 3] = 255;
        }
      }

      ctx.putImageData(imageData, 0, 0);
    };

    const handlePointerMove = (e: PointerEvent) => {
      const now = performance.now();
      if (now - lastPointerTime < 16) return;
      lastPointerTime = now;

      const rect = canvas.getBoundingClientRect();
      const x = Math.floor(((e.clientX - rect.left) / rect.width) * SIZE);
      const y = Math.floor(((e.clientY - rect.top) / rect.height) * SIZE);

      seedSquare(x, y, 6);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );

    observer.observe(container);

    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    let lastTime = 0;
    const animate = (time: number) => {
      if (isVisible && time - lastTime > 16) {
        for (let i = 0; i < 4; i++) {
          update();
        }
        draw();
        lastTime = time;
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    canvas.addEventListener("pointermove", handlePointerMove);
    canvas.addEventListener("pointerdown", handlePointerMove);

    init();
    animate(0);

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      canvas.removeEventListener("pointermove", handlePointerMove);
      canvas.removeEventListener("pointerdown", handlePointerMove);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex justify-center items-center w-full h-full bg-transparent overflow-hidden"
    >
      <canvas
        ref={canvasRef}
        className="w-full max-w-[350px] aspect-square rounded-none 
        shadow-[0_4px_20px_rgba(0,0,0,0.04)]
        cursor-crosshair transition-opacity duration-300"
      />
    </div>
  );
};

export default React.memo(ReactionDiffusion);