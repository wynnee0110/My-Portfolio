"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTop({
  containerRef,
}: {
  containerRef?: React.RefObject<HTMLElement | null>;
}) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Mobile view check (screen width < 768px)
      if (window.innerWidth >= 768) {
        setShow(false);
        return;
      }

      let isNearBottom = false;

      // Window scroll check
      const winScrollTop = window.scrollY || document.documentElement.scrollTop;
      const winScrollHeight = document.documentElement.scrollHeight;
      const winClientHeight = window.innerHeight;

      if (
        winScrollTop > 150 &&
        winScrollTop + winClientHeight >= winScrollHeight - 280
      ) {
        isNearBottom = true;
      }

      // Scroll container check
      if (containerRef?.current) {
        const el = containerRef.current;
        const cScrollTop = el.scrollTop;
        const cScrollHeight = el.scrollHeight;
        const cClientHeight = el.clientHeight;

        if (
          cScrollTop > 150 &&
          cScrollTop + cClientHeight >= cScrollHeight - 280
        ) {
          isNearBottom = true;
        }
      }

      setShow(isNearBottom);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    const containerEl = containerRef?.current;
    if (containerEl) {
      containerEl.addEventListener("scroll", handleScroll, { passive: true });
    }

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (containerEl) {
        containerEl.removeEventListener("scroll", handleScroll);
      }
    };
  }, [containerRef]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (containerRef?.current) {
      containerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (!show) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-1.5 px-3 py-2 font-mono text-xs font-bold text-gray-900 dark:text-white bg-white/95 dark:bg-black/90 border border-black/20 dark:border-white/20 shadow-2xl backdrop-blur-md rounded-none transition-all duration-200 active:scale-95 animate-fadeIn md:hidden"
    >
      <ArrowUp className="w-3.5 h-3.5 text-emerald-500" />
      <span>TOP</span>
    </button>
  );
}
