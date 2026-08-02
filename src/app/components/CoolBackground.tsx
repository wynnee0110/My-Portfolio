"use client";

import React, { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

interface Particle {
  x: number;
  y: number;
  z: number;
  ox: number;
  oy: number;
  vx: number;
  vy: number;
  vz: number;
  radius: number;
  baseRadius: number;
  color: string;
  alpha: number;
  pulse: number;
  pulseSpeed: number;
}

export default function CoolBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const isDark = resolvedTheme === "dark";

    // Mouse state
    const mouse = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
      radius: 180,
      active: false,
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("resize", handleResize);

    // Color palettes
    const darkColors = ["#06b6d4", "#ec4899", "#8b5cf6", "#3b82f6", "#10b981"];
    const lightColors = ["#475569", "#6366f1", "#0284c7", "#8257e5", "#0d9488"];

    let particles: Particle[] = [];

    const particleCount = Math.min(Math.floor((width * height) / 9000), 120);

    const initParticles = () => {
      particles = [];
      const colors = isDark ? darkColors : lightColors;

      for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const z = Math.random() * 600 + 100;
        const baseRadius = Math.random() * 2 + 1;

        particles.push({
          x,
          y,
          z,
          ox: x,
          oy: y,
          vx: (Math.random() - 0.5) * 0.6,
          vy: (Math.random() - 0.5) * 0.6,
          vz: (Math.random() - 0.5) * 0.4,
          radius: baseRadius,
          baseRadius,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: Math.random() * 0.6 + 0.3,
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: 0.02 + Math.random() * 0.03,
        });
      }
    };

    initParticles();

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      // Draw subtle radial glow following mouse
      if (mouse.active) {
        const glowGrad = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          350
        );
        if (isDark) {
          glowGrad.addColorStop(0, "rgba(236, 72, 153, 0.12)");
          glowGrad.addColorStop(0.5, "rgba(139, 92, 246, 0.06)");
          glowGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
        } else {
          glowGrad.addColorStop(0, "rgba(99, 102, 241, 0.12)");
          glowGrad.addColorStop(0.5, "rgba(14, 165, 233, 0.05)");
          glowGrad.addColorStop(1, "rgba(255, 255, 255, 0)");
        }
        ctx.fillStyle = glowGrad;
        ctx.fillRect(0, 0, width, height);
      }

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move
        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;

        if (p.x < -50) p.x = width + 50;
        if (p.x > width + 50) p.x = -50;
        if (p.y < -50) p.y = height + 50;
        if (p.y > height + 50) p.y = -50;
        if (p.z < 50 || p.z > 800) p.vz *= -1;

        // Pulse size
        p.pulse += p.pulseSpeed;
        p.radius = p.baseRadius + Math.sin(p.pulse) * 0.6;

        // Mouse attraction/repulsion
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        let mouseForceX = 0;
        let mouseForceY = 0;

        if (dist < mouse.radius && mouse.active) {
          const force = (1 - dist / mouse.radius) * 1.8;
          mouseForceX = (dx / dist) * force * 1.5;
          mouseForceY = (dy / dist) * force * 1.5;
        }

        const renderX = p.x + mouseForceX;
        const renderY = p.y + mouseForceY;

        // Depth perspective ratio
        const scale = 500 / (500 + p.z * 0.4);
        const finalRadius = Math.max(0.5, p.radius * scale);
        const depthAlpha = Math.min(1, Math.max(0.15, p.alpha * scale));

        // Draw node
        ctx.beginPath();
        ctx.arc(renderX, renderY, finalRadius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = depthAlpha;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = isDark ? 8 * scale : 4 * scale;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Connect with nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx2 = p2.x - p.x;
          const dy2 = p2.y - p.y;
          const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

          const maxDist = 130;
          if (dist2 < maxDist) {
            const lineAlpha = (1 - dist2 / maxDist) * 0.28 * depthAlpha;
            ctx.beginPath();
            ctx.moveTo(renderX, renderY);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = isDark ? "#a855f7" : "#6366f1";
            ctx.globalAlpha = lineAlpha;
            ctx.lineWidth = 0.7 * scale;
            ctx.stroke();
          }
        }

        // Connect mouse to close particles
        if (dist < 150 && mouse.active) {
          const mouseLineAlpha = (1 - dist / 150) * 0.45;
          ctx.beginPath();
          ctx.moveTo(renderX, renderY);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = isDark ? "#ec4899" : "#0284c7";
          ctx.globalAlpha = mouseLineAlpha;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
    };
  }, [resolvedTheme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-700"
    />
  );
}
