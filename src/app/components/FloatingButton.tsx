"use client";

import { HiQuestionMarkCircle } from "react-icons/hi";
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import {
    SiNextdotjs,
    SiReact,
    SiTypescript,
    SiTailwindcss,
    SiVercel,
} from "react-icons/si";
import { FiX, FiGithub, FiLayers, FiZap } from "react-icons/fi";

// ── static metadata ───────────────────────────────────────────
const SITE_META = {
    name: "hexctl · Wayne Obial",
    version: "v2.0.0",
    firstCommit: "Oct 20, 2025",
    lastUpdated: "Aug 08, 2026",
    repo: "https://github.com/Wynnee0110/My-Portfolio",
};

const STACK = [
    { icon: SiNextdotjs, label: "Next.js 15", desc: "App Router" },
    { icon: SiReact, label: "React 19", desc: "UI Library" },
    { icon: SiTypescript, label: "TypeScript 5", desc: "Type Safety" },
    { icon: SiTailwindcss, label: "Tailwind 4", desc: "Styling" },
    { icon: FiZap, label: "GSAP 3", desc: "Animations" },
    { icon: SiVercel, label: "Vercel", desc: "Deployment" },
];

// ── helper sub-component ──────────────────────────────────────
function InfoChip({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex flex-col gap-0.5 px-3 py-2.5 rounded-lg bg-gray-100 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.07]">
            <p className="text-[9px] font-mono text-gray-400 dark:text-gray-600 uppercase tracking-widest">{label}</p>
            <p className="text-[11px] font-medium text-gray-700 dark:text-gray-300">{value}</p>
        </div>
    );
}

// ── main component ────────────────────────────────────────────
export default function FloatingButton() {
    const [open, setOpen] = useState(false);
    const [visible, setVisible] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);
    const btnRef = useRef<HTMLButtonElement>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => { setMounted(true); }, []);

    // Animate in / out
    useEffect(() => {
        if (open) {
            requestAnimationFrame(() => setVisible(true));
        } else {
            setVisible(false);
        }
    }, [open]);

    // Close on outside click
    useEffect(() => {
        if (!open) return;
        const handler = (e: MouseEvent) => {
            if (
                modalRef.current && !modalRef.current.contains(e.target as Node) &&
                btnRef.current && !btnRef.current.contains(e.target as Node)
            ) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, [open]);

    // Close on Escape
    useEffect(() => {
        if (!open) return;
        const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
        document.addEventListener("keydown", handler);
        return () => document.removeEventListener("keydown", handler);
    }, [open]);

    // ── modal markup (rendered into portal) ──────────────────────
    const modal = (
        <div
            ref={modalRef}
            style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0) scale(1)" : "translateY(10px) scale(0.97)",
                transition: "opacity 0.2s ease, transform 0.2s ease",
                position: "fixed",
                bottom: "5.5rem",
                right: "2rem",
                zIndex: 9999,
            }}
            className="w-76 rounded-xl border border-gray-200 dark:border-white/8 bg-white dark:bg-[#111111] shadow-xl overflow-hidden"
        >
            {/* Header */}
            <div className="px-4 pt-4 pb-3 border-b border-gray-100 dark:border-white/6 flex items-start justify-between">
                <div>
                    <p className="text-[10px] font-mono text-gray-400 dark:text-gray-600 uppercase tracking-widest mb-0.5">
                        About This Site
                    </p>
                    <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100">{SITE_META.name}</h3>
                    <span className="text-[10px] font-mono text-gray-400 dark:text-gray-600">{SITE_META.version}</span>
                </div>
                <button
                    onClick={() => setOpen(false)}
                    className="mt-0.5 p-1 rounded-md text-gray-400 dark:text-gray-600 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/6 transition-colors"
                    aria-label="Close"
                >
                    <FiX size={14} />
                </button>
            </div>

            {/* Body */}
            <div className="px-4 py-3 space-y-3">

                {/* Dates */}
                <div className="grid grid-cols-2 gap-2">
                    <InfoChip label="First Commit" value={SITE_META.firstCommit} />
                    <InfoChip label="Last Updated" value={SITE_META.lastUpdated} />
                </div>

                {/* Stack */}
                <div>
                    <div className="flex items-center gap-1.5 mb-2">
                        <FiLayers size={11} className="text-gray-400 dark:text-gray-600" />
                        <p className="text-[9px] font-mono text-gray-400 dark:text-gray-600 uppercase tracking-widest">Tech Stack</p>
                    </div>
                    <div className="grid grid-cols-3 gap-1.5">
                        {STACK.map(({ icon: Icon, label, desc }) => (
                            <div
                                key={label}
                                className="flex flex-col items-center gap-1 py-2 px-1 rounded-lg bg-gray-100 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.06] hover:bg-gray-200 dark:hover:bg-white/[0.06] transition-colors cursor-default"
                            >
                                <Icon size={16} className="text-gray-500 dark:text-gray-400" />
                                <span className="text-[9px] font-medium text-gray-600 dark:text-gray-400 leading-none text-center">{label}</span>
                                <span className="text-[8px] text-gray-400 dark:text-gray-600 leading-none text-center">{desc}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Extras */}
                <div className="grid grid-cols-2 gap-2">
                    <InfoChip label="Framework" value="App Router" />
                    <InfoChip label="Theme" value="Dark / Light" />
                </div>

                {/* Repo link */}
                <a
                    href={SITE_META.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 w-full py-2 rounded-lg border border-gray-200 dark:border-white/8 hover:border-gray-300 dark:hover:border-white/15 text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors text-[11px] font-mono"
                >
                    <FiGithub size={12} />
                    View Source
                </a>
            </div>

            {/* Footer */}
            <div className="px-4 py-2 border-t border-gray-100 dark:border-white/6 flex items-center justify-between">
                <span className="text-[9px] font-mono text-gray-400 dark:text-gray-700">Built by Wayne Obial</span>
                <span className="flex items-center gap-1 text-[9px] font-mono text-gray-400 dark:text-gray-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-gray-600 animate-pulse" />
                    Live
                </span>
            </div>
        </div>
    );

    return (
        <>
            {/* ── Portal: modal renders above all layers ── */}
            {mounted && open && createPortal(modal, document.body)}

            {/* ── Trigger Button ── */}
            <div className="fixed bottom-8 right-8 z-50">
                <button
                    ref={btnRef}
                    onClick={() => setOpen((p) => !p)}
                    aria-label="Site info"
                    className="glass-card p-3 rounded-full shadow-md transition-all duration-200 hover:scale-105 active:scale-95"
                >
                    <HiQuestionMarkCircle
                        className={`text-xl transition-colors duration-200 ${open ? "text-gray-200" : "text-gray-500"
                            }`}
                    />
                </button>
            </div>
        </>
    );
}