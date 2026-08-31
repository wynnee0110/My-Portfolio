"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export default function DarkModeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-10 h-4" />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle theme"
      className="inline-flex items-center gap-1.5 text-xs font-mono text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors active:scale-95 group focus:outline-none"
    >
      {isDark ? (
        <>
          <Sun className="w-3.5 h-3.5 text-gray-300 group-hover:rotate-45 transition-transform duration-300" />
          <span>dark</span>
        </>
      ) : (
        <>
          <Moon className="w-3.5 h-3.5 text-gray-700 group-hover:-rotate-12 transition-transform duration-300" />
          <span>light</span>
        </>
      )}
    </button>
  );
}