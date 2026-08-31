"use client";

import { useEffect, useState } from "react";

interface PreloaderProps {
  minMs?: number;
}

export default function Preloader({ minMs = 400 }: PreloaderProps) {
  const [mounted, setMounted] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    // Skip preloader for sub-routes
    if (typeof window !== "undefined" && window.location.pathname !== "/") {
      setMounted(false);
      return;
    }

    const start = performance.now();

    const finishLoading = () => {
      const elapsed = performance.now() - start;
      const remainingWait = Math.max(0, minMs - elapsed);

      setTimeout(() => {
        setFading(true);
        setTimeout(() => setMounted(false), 300); // Unmount after smooth fade out
      }, remainingWait);
    };

    if (document.readyState === "complete") {
      finishLoading();
    } else {
      window.addEventListener("load", finishLoading);
      return () => window.removeEventListener("load", finishLoading);
    }
  }, [minMs]);

  if (!mounted) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white dark:bg-[#0a0a0c] text-gray-900 dark:text-white font-mono select-none transition-opacity duration-300 ease-out will-change-[opacity] ${fading ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
    >
      <div className="flex flex-col items-center gap-3">
        {/* Minimal Sharp Pulse Indicator */}
        <div className="relative w-8 h-8 flex items-center justify-center border border-black/20 dark:border-white/20 rounded-none bg-black/5 dark:bg-white/5">
          <div className="w-2 h-2 bg-slate-800 dark:bg-slate-200 animate-pulse" />
        </div>

        {/* Minimalist Status Text */}
        <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
          <span className="font-semibold text-gray-900 dark:text-white">hexctl</span>

        </div>
      </div>
    </div>
  );
}