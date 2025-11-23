"use client";

import { useRouter } from "next/navigation";
import Atom3D from "./Atom3D";
import { useState, useEffect } from "react";

export default function Header() {
  const router = useRouter();
  const [time, setTime ] = useState(new Date());
  const formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000); // Update every minute
    return () => clearInterval(timer);
  }, []);
  return (
    <header className="flex items-center justify-between px-0 py-0 fixed top-0 left-0 z-50 w-full h-16 bg-transparent backdrop-blur-md border-b border-white/10 shadow-sm">
      {/* Logo (Atom3D) clickable */}
      <button
        onClick={() => router.push("/")}
        className="relative bottom-1 w-[100px] h-[100px] hover:opacity-80 transition-opacity"
        aria-label="Home"
      >
        <Atom3D />
        
      </button>
      <div className="text-white text-sm font-mono mx-8">{formattedTime}</div>
      
      </header>
  );
}