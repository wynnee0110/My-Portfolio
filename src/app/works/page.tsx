"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Globe, Terminal, X } from "lucide-react";
import CoolBackground from "../components/CoolBackground";
import DarkModeToggle from "../components/DarkModeToggle";
import PageTransition from "../components/PageTransition";
import { projects } from "../data/projectsData";
import { FiExternalLink } from "react-icons/fi";
import { useState } from "react";

const FALLBACK = "/images/works/fallback.webp";

function WorkProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) {
  const [imgSrc, setImgSrc] = useState(project.image || FALLBACK);
  const [showDescription, setShowDescription] = useState(false);

  return (
    <div
      onClick={() => setShowDescription(!showDescription)}
      className="
        group relative w-full min-w-0 max-w-full aspect-[4/3] rounded-none overflow-hidden cursor-pointer
        border border-black/15 dark:border-white/15 bg-black/5 dark:bg-white/5
        transition-all duration-300 ease-out hover:border-slate-500/50 dark:hover:border-slate-400/50 hover:shadow-xl
        select-none
      "
    >
      {/* PHOTO / IMAGE (Only thing visible by default) */}
      <Image
        src={imgSrc}
        alt={project.title}
        fill
        sizes="(max-width: 640px) 100vw, 50vw"
        className={`object-cover transition-transform duration-500 ease-out ${showDescription ? "scale-105 filter blur-[2px] brightness-50 dark:brightness-40" : "group-hover:scale-105"
          }`}
        onError={() => setImgSrc(FALLBACK)}
      />

      {/* Default Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/40 to-transparent dark:from-black/85 dark:via-black/25 dark:to-transparent" />

      {/* Default Photo State: Title & Theme-aware Hint */}
      {!showDescription && (
        <div className="absolute inset-0 p-4 flex flex-col justify-between z-10 pointer-events-none">
          <div className="flex justify-between items-center w-full">
            <span className="px-2.5 py-0.5 rounded-none text-[10px] font-mono font-bold bg-white/85 text-gray-900 border border-black/15 dark:bg-black/70 dark:text-white/90 dark:border-white/20 backdrop-blur-md shadow-sm">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="text-[10px] font-mono bg-white/85 text-gray-900 border border-black/15 dark:bg-black/60 dark:text-white/80 dark:border-white/15 px-2 py-0.5 rounded-none backdrop-blur-md shadow-sm font-semibold">
              Click for info
            </span>
          </div>

          <div>
            <h3 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white drop-shadow-sm truncate font-sans">
              {project.title}
            </h3>
            {project.languages?.[0] && (
              <span className="text-[11px] font-mono text-gray-700 dark:text-gray-300">
                {project.languages[0]}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Clicked State: Theme-aware Description & Links Overlay */}
      {showDescription && (
        <div className="absolute inset-0 p-4 bg-white/95 text-gray-900 dark:bg-black/90 dark:text-white backdrop-blur-md flex flex-col justify-between z-20 animate-fadeIn border border-black/10 dark:border-white/10">
          <div className="space-y-2 min-w-0 max-w-full">
            <div className="flex items-start justify-between gap-2 border-b border-black/10 dark:border-white/15 pb-2">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white truncate font-sans">
                {project.title}
              </h3>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowDescription(false);
                }}
                className="p-1 rounded-none bg-black/10 hover:bg-black/20 text-gray-800 dark:bg-white/10 dark:hover:bg-white/20 dark:text-white/80 shrink-0"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <p className="text-xs text-gray-700 dark:text-gray-200 leading-relaxed font-sans min-w-0 max-w-full break-words line-clamp-4">
              {project.description}
            </p>
          </div>

          <div className="space-y-2 pt-2 border-t border-black/10 dark:border-white/15 min-w-0 max-w-full">
            {project.languages && project.languages.length > 0 && (
              <div className="flex flex-wrap gap-1 min-w-0 max-w-full">
                {project.languages.slice(0, 4).map((tag, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 text-[9px] font-mono rounded-none bg-black/5 text-gray-800 border border-black/15 dark:bg-white/10 dark:text-gray-200 dark:border-white/15 truncate"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {project.link && project.link !== "#" && (
              <div className="pt-1">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-none text-xs font-mono font-medium bg-slate-900 text-white hover:bg-slate-800 dark:bg-emerald-500 dark:text-black dark:hover:bg-emerald-400 transition-colors"
                >
                  <Globe className="w-3 h-3" />
                  <span>Visit App</span>
                  <FiExternalLink className="w-3 h-3" />
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function WorksPage() {
  return (
    <main className="portfolio-bg relative isolate min-h-[100svh] text-gray-800 dark:text-gray-200 transition-colors duration-300">
      <CoolBackground />

      {/* Top Header */}
      <header className="fixed top-3 left-1/2 -translate-x-1/2 z-50 w-[95%] sm:w-[92%] max-w-4xl flex items-center justify-between px-3.5 sm:px-5 py-2 rounded-full border border-black/10 dark:border-white/10 bg-white/50 dark:bg-black/50 backdrop-blur-md shadow-sm">
        <div className="flex items-center gap-2 font-mono text-xs text-gray-700 dark:text-gray-300 min-w-0 truncate">
          <Terminal className="w-3.5 h-3.5 text-slate-700 dark:text-slate-300 animate-pulse shrink-0" />
          <span className="font-semibold text-gray-900 dark:text-white shrink-0">hexctl</span>
          <span className="text-gray-400 dark:text-gray-500 shrink-0">/</span>
          <Link href="/" className="text-gray-500 dark:text-gray-400 hover:text-slate-700 dark:hover:text-slate-300 transition-colors shrink-0">portfolio</Link>
          <span className="text-gray-400 dark:text-gray-500 shrink-0">/</span>
          <span className="text-slate-800 dark:text-slate-200 font-medium truncate">works</span>
        </div>
        <div className="flex items-center gap-4 text-xs font-mono shrink-0">
          <DarkModeToggle />
        </div>
      </header>

      {/* Page Content */}
      <PageTransition>
        <div className="relative z-10 pt-24 pb-16 max-w-4xl mx-auto px-4 lg:px-6 w-full min-w-0 max-w-full font-mono">

          {/* Page Header */}
          <div className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-black/10 dark:border-white/10 pb-6">
            <div className="space-y-2">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-800 dark:text-slate-200 hover:text-slate-600 dark:hover:text-slate-400 transition-colors mb-2"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                back
              </Link>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white font-sans">
                Selected<br />
                <span className="text-slate-800 dark:text-slate-200">Works.</span>
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 max-w-sm mt-1 font-sans">
                Projects I built from idea to deployment — click any photo to reveal details & live links.
              </p>
            </div>

            <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
              <span className="px-3 py-1.5 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10">
                {projects.length} projects
              </span>
            </div>
          </div>

          {/* 2 Box Photo Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full min-w-0 max-w-full">
            {projects.map((project, index) => (
              <WorkProjectCard key={index} project={project} index={index} />
            ))}
          </div>

          {/* Footer */}
          <div className="mt-16 pt-6 border-t border-black/10 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500 dark:text-gray-400">
            <span>wayne.obial — portfolio works</span>
            <Link href="/" className="inline-flex items-center gap-1.5 text-slate-800 dark:text-slate-200 hover:underline">
              <ArrowLeft className="w-3 h-3" /> back to home
            </Link>
          </div>
        </div>
      </PageTransition>
    </main>
  );
}
