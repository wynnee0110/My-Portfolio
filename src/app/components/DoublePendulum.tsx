"use client";

import React, { useEffect, useRef, memo } from "react";

const DoublePendulum: React.FC = () => {
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

    // Physical Constants & Initial States
    const r1 = 65;
    const r2 = 65;
    const m1 = 10;
    const m2 = 10;
    const g = 1;

    let a1 = Math.PI / 2;
    let a2 = Math.PI / 2;
    let a1_v = 0;
    let a2_v = 0;

    // Trace canvas buffer to draw trailing chaotic paths
    const traceCanvas = document.createElement("canvas");
    const traceCtx = traceCanvas.getContext("2d");

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const w = Math.floor(rect.width) || 300;
      const h = Math.floor(rect.height) || 280;

      canvas.width = w;
      canvas.height = h;
      traceCanvas.width = w;
      traceCanvas.height = h;
      if (traceCtx) {
        traceCtx.clearRect(0, 0, w, h);
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

    let prevX2 = -1;
    let prevY2 = -1;

    const stepPhysics = () => {
      // Equations of motion for double pendulum (Lagrangian mechanics)
      const num1 = -g * (2 * m1 + m2) * Math.sin(a1);
      const num2 = -m2 * g * Math.sin(a1 - 2 * a2);
      const num3 = -2 * Math.sin(a1 - a2) * m2;
      const num4 = a2_v * a2_v * r2 + a1_v * a1_v * r1 * Math.cos(a1 - a2);
      const den1 = r1 * (2 * m1 + m2 - m2 * Math.cos(2 * a1 - 2 * a2));
      const a1_a = (num1 + num2 + num3 * num4) / den1;

      const num5 = 2 * Math.sin(a1 - a2);
      const num6 = a1_v * a1_v * r1 * (m1 + m2);
      const num7 = g * (m1 + m2) * Math.cos(a1);
      const num8 = a2_v * a2_v * r2 * m2 * Math.cos(a1 - a2);
      const den2 = r2 * (2 * m1 + m2 - m2 * Math.cos(2 * a1 - 2 * a2));
      const a2_a = (num5 * (num6 + num7 + num8)) / den2;

      a1_v += a1_a;
      a2_v += a2_a;
      a1 += a1_v;
      a2 += a2_v;

      // Dampening to prevent numerical explosion
      a1_v *= 0.9995;
      a2_v *= 0.9995;
    };

    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;
      const cx = W / 2;
      const cy = H / 3;

      const x1 = cx + r1 * Math.sin(a1);
      const y1 = cy + r1 * Math.cos(a1);

      const x2 = x1 + r2 * Math.sin(a2);
      const y2 = y1 + r2 * Math.cos(a2);

      const isDark = document.documentElement.classList.contains("dark");

      // Fade out trace canvas slightly for glowing path trail effect
      if (traceCtx) {
        traceCtx.fillStyle = isDark ? "rgba(0, 0, 0, 0.04)" : "rgba(255, 255, 255, 0.04)";
        traceCtx.fillRect(0, 0, W, H);

        if (prevX2 > 0 && prevY2 > 0) {
          traceCtx.beginPath();
          traceCtx.moveTo(prevX2, prevY2);
          traceCtx.lineTo(x2, y2);
          traceCtx.strokeStyle = isDark ? "#10b981" : "#059669"; // Emerald chaos trace
          traceCtx.lineWidth = 1.5;
          traceCtx.stroke();
        }
      }

      prevX2 = x2;
      prevY2 = y2;

      // Clear main canvas
      ctx.fillStyle = isDark ? "#0f0f11" : "#f9f9fb";
      ctx.fillRect(0, 0, W, H);

      // Draw trace layer
      ctx.drawImage(traceCanvas, 0, 0);

      // Draw rods
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = isDark ? "rgba(255, 255, 255, 0.4)" : "rgba(0, 0, 0, 0.4)";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw joints & bobs
      ctx.fillStyle = isDark ? "#ffffff" : "#000000";

      ctx.beginPath();
      ctx.arc(cx, cy, 3, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.arc(x1, y1, 5, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.arc(x2, y2, 6, 0, Math.PI * 2);
      ctx.fillStyle = isDark ? "#10b981" : "#059669";
      ctx.fill();
    };

    const loop = () => {
      if (isVisible) {
        for (let i = 0; i < 2; i++) {
          stepPhysics();
        }
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

export default memo(DoublePendulum);
