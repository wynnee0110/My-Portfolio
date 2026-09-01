"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { flushSync } from "react-dom";

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

  const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    const nextTheme = isDark ? "light" : "dark";

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTheme(nextTheme);
      return;
    }

    const x = e.clientX;
    const y = e.clientY;

    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const doc = document as unknown as {
      startViewTransition?: (cb: () => void) => { ready: Promise<void> };
    };

    if (typeof doc.startViewTransition === "function") {
      const transition = doc.startViewTransition(() => {
        flushSync(() => setTheme(nextTheme));
      });

      transition.ready.then(() => {
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${endRadius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 600,
            easing: "cubic-bezier(0.4, 0, 0.2, 1)",
            pseudoElement: "::view-transition-new(root)",
          }
        );
      });
    } else {
      setTheme(nextTheme);
    }
  };

  return (
    <button
      onClick={handleToggle}
      aria-label="Toggle theme"
      className="inline-flex items-center gap-1.5 text-xs font-mono text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 active:scale-95 group focus:outline-none"
    >
      {isDark ? (
        <>
          <Sun className="w-3.5 h-3.5 group-hover:rotate-45 transition-transform duration-300" />
          <span>dark</span>
        </>
      ) : (
        <>
          <Moon className="w-3.5 h-3.5 group-hover:-rotate-12 transition-transform duration-300" />
          <span>light</span>
        </>
      )}
    </button>
  );
}