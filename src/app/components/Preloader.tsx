"use client";
import { useEffect, useState } from "react";

interface PreloaderTailwindProps {
  minMs?: number;
}

export default function PreloaderTailwind({ minMs = 600 }: PreloaderTailwindProps) {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const start = performance.now();

    function hide() {
      const elapsed = performance.now() - start;
      const wait = Math.max(0, minMs - elapsed);

      setTimeout(() => {
        setFadeOut(true); 
        setTimeout(() => setVisible(false), 500); 
      }, wait);
    }

    if (document.readyState === "complete") hide();
    else {
      window.addEventListener("load", hide);
      return () => window.removeEventListener("load", hide);
    }
  }, [minMs]);

  if (!visible) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black 
        transition-opacity duration-500 ${fadeOut ? "opacity-0" : "opacity-100"}`}
    >
      <div className="w-14 h-14 rounded-full border-4 border-white/20 border-t-white animate-spin transform scale-[0.5]" />
      <span className="sr-only">Loading...</span>
    </div>
  );
}
