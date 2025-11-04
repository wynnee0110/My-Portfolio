"use client";

import { useRouter } from "next/navigation";
import Atom3D from "./Atom3D";

export default function Header() {
  const router = useRouter();
  
  return (
    <header className="flex items-center justify-start px-0 py-0 fixed top-0 left-0 z-50 w-full bg-transparent">
      {/* Logo (Atom3D) clickable */}
      <button
        onClick={() => router.push("/")}
        className="relative bottom-3 w-[100px] h-[100px] hover:opacity-80 transition-opacity"
        aria-label="Home"
      >
        <Atom3D />
      </button>
    </header>
  );
}