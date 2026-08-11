"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

const MOODS = [
  { emoji: "💻", label: "Coding something cool", color: "#3b82f6" },
  { emoji: "☕", label: "Fueled by coffee", color: "#a16207" },
  { emoji: "🎧", label: "In the zone", color: "#8b5cf6" },
  { emoji: "🌙", label: "Late-night grind", color: "#6366f1" },
  { emoji: "🔥", label: "Building in public", color: "#ef4444" },
  { emoji: "🤔", label: "Deep in thought", color: "#f59e0b" },
  { emoji: "🎯", label: "Focused", color: "#10b981" },
  { emoji: "🚀", label: "Shipping features", color: "#ec4899" },
];

const DEFAULT_MOOD_IDX = 0;

function MoodPopover({ anchorRect, currentIdx, onSelect, onClose }: { anchorRect: DOMRect; currentIdx: number; onSelect: (idx: number) => void; onClose: () => void; }) {
  const popRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (popRef.current && !popRef.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  const top = anchorRect.top + window.scrollY - 8;
  const left = anchorRect.left + window.scrollX;

  return createPortal(
    <div
      ref={popRef}
      style={{ position: "absolute", top, left, transform: "translateY(-100%)", zIndex: 9999 }}
      className="w-56 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#111] shadow-2xl overflow-hidden"
    >
      <div className="px-3 pt-3 pb-2 border-b border-gray-100 dark:border-white/6">
        <p className="text-[10px] font-mono text-gray-400 dark:text-gray-600 uppercase tracking-widest">Set your mood</p>
      </div>
      <ul className="py-1.5">
        {MOODS.map((m, i) => (
          <li key={i}>
            <button
              onClick={() => { onSelect(i); onClose(); }}
              className={i === currentIdx ? "w-full flex items-center gap-2.5 px-3 py-1.5 text-left text-xs transition-colors bg-pink-500/10 text-pink-600 dark:text-pink-400" : "w-full flex items-center gap-2.5 px-3 py-1.5 text-left text-xs transition-colors text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5"}
            >
              <span className="text-base leading-none">{m.emoji}</span>
              <span className="font-medium">{m.label}</span>
              {i === currentIdx && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-pink-500 shrink-0" />}
            </button>
          </li>
        ))}
      </ul>
    </div>,
    document.body
  );
}

export default function MoodBadge() {
  const [moodIdx, setMoodIdx] = useState(DEFAULT_MOOD_IDX);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [anchorRect, setAnchorRect] = useState<DOMRect | null>(null);
  const badgeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => { setMounted(true); }, []);

  const mood = MOODS[moodIdx];

  const handleOpen = () => {
    if (badgeRef.current) {
      setAnchorRect(badgeRef.current.getBoundingClientRect());
    }
    setOpen(true);
  };

  return (
    <>
      <button
        ref={badgeRef}
        onClick={open ? () => setOpen(false) : handleOpen}
        title="Set your current mood"
        style={{ animation: "mood-float 3.5s ease-in-out infinite" }}
        className="group flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5 backdrop-blur-sm shadow-sm text-gray-600 dark:text-gray-400 hover:border-pink-400/50 hover:shadow-pink-500/10 transition-all duration-200 cursor-pointer active:scale-95"
      >
        <span className="text-sm leading-none" style={{ display: "inline-block" }}>{mood.emoji}</span>
        <span className="text-[10px] font-mono font-medium leading-none whitespace-nowrap">{mood.label}</span>
        <span
          className="w-1.5 h-1.5 rounded-full shrink-0"
          style={{ backgroundColor: mood.color, boxShadow: "0 0 4px " + mood.color + "88", animation: "mood-dot-glow 2s ease-in-out infinite" }}
        />
      </button>

      {mounted && open && anchorRect && (
        <MoodPopover
          anchorRect={anchorRect}
          currentIdx={moodIdx}
          onSelect={setMoodIdx}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
