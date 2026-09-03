"use client";

import Link from "next/link";
import { Terminal } from "lucide-react";
import DarkModeToggle from "./DarkModeToggle";

export default function Header({ pageTitle }: { pageTitle?: string }) {
  return (
    <header className="fixed top-3 left-1/2 -translate-x-1/2 z-50 w-[95%] sm:w-[92%] max-w-4xl flex items-center justify-between px-3.5 sm:px-5 py-2 rounded-full border border-black/10 dark:border-white/10 bg-white/50 dark:bg-black/50 backdrop-blur-md shadow-sm">
      <div className="flex items-center gap-2 font-mono text-xs text-gray-700 dark:text-gray-300 min-w-0 truncate">
        <Terminal className="w-3.5 h-3.5 text-slate-700 dark:text-slate-300 animate-pulse shrink-0" />
        <Link href="/" className="font-semibold text-gray-900 dark:text-white shrink-0 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
          hexctl
        </Link>
        {pageTitle && (
          <>
            <span className="text-gray-400 dark:text-gray-500 shrink-0">/</span>
            <span className="text-slate-800 dark:text-slate-200 font-medium truncate">{pageTitle}</span>
          </>
        )}
      </div>

      <div className="flex items-center gap-4 text-xs font-mono shrink-0">
        <DarkModeToggle />
      </div>
    </header>
  );
}