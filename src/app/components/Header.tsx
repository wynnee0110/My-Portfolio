"use client";

import { useRouter } from "next/navigation";
import DarkModeToggle from "./DarkModeToggle";

export default function Header() {
  const router = useRouter();

  return (
    <header className="flex items-center justify-between px-0 py-0 fixed top-0 left-0 z-50 w-full h-16 bg-transparent backdrop-blur-md border-b border-white/10 shadow-sm">
      {/* Navbar Component */}
      <div className="flex flex-row gap-3">
        <button onClick={() => router.push("/")}
          className="w-20 h-10 rounded-xl flex items-center justify-center hover:bg-white/30 transition-colors">
        </button>
      </div>

      <div className="text-sm font-mono mx-5 flex flex-row gap-3 mt-2">
        <div><DarkModeToggle /></div>
      </div>
    </header>
  );
}