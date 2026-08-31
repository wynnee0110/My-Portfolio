"use client";

import React, { useEffect, useRef, memo } from "react";

const Lissajous: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId = 0;
    let isVisible = true;
    let t = 0;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const w = Math.floor(rect.width) || 300;
      const h = Math.floor(rect.height) || 280;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
    };

    resize();
    window.addEventListener("resize", resize);

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

    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;
      const isDark = document.documentElement.classList.contains("dark");

      ctx.fillStyle = isDark ? "#0f0f11" : "#f9f9fb";
      ctx.fillRect(0, 0, W, H);

      const cx = W / 2;
      const cy = H / 2;
      const radiusX = Math.min(W, H) * 0.38;
      const radiusY = Math.min(W, H) * 0.38;

      const a = 3;
      const b = 2;
      const delta = t * 0.5;

      ctx.beginPath();
      const points = 300;
      for (let i = 0; i <= points; i++) {
        const step = (i / points) * Math.PI * 2;
        const x = cx + radiusX * Math.sin(a * step + delta);
        const y = cy + radiusY * Math.sin(b * step);

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      ctx.strokeStyle = isDark ? "#10b981" : "#059669"; // Emerald parametric line
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw orbiting node along the curve
      const nodeX = cx + radiusX * Math.sin(a * delta * 2 + delta);
      const nodeY = cy + radiusY * Math.sin(b * delta * 2);

      ctx.beginPath();
      ctx.arc(nodeX, nodeY, 4, 0, Math.PI * 2);
      ctx.fillStyle = isDark ? "#ffffff" : "#000000";
      ctx.fill();
    };

    const loop = () => {
      if (isVisible) {
        t += 0.015;
        draw();
      }
      animId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full min-h-[250px] max-h-[380px] rounded-none overflow-hidden bg-gray-50 dark:bg-[#0f0f11] border border-black/15 dark:border-white/15"
    >
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
};

export default memo(Lissajous);
