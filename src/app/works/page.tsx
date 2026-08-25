"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink, ArrowUpRight, Code2, Globe } from "lucide-react";
import CoolBackground from "../components/CoolBackground";
import DarkModeToggle from "../components/DarkModeToggle";
import PageTransition from "../components/PageTransition";
import { projects } from "../data/projectsData";
import { Terminal } from "lucide-react";
import { useEffect, useState } from "react";

export default function WorksPage() {
  const [currentTime, setCurrentTime] = useState<string>("");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="portfolio-bg relative isolate min-h-[100svh] text-gray-800 dark:text-gray-200 transition-colors duration-300">
      <CoolBackground />

      {/* Top Header */}
      <header className="fixed top-3 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-4xl flex items-center justify-between px-5 py-2 rounded-full border border-black/10 dark:border-white/10 bg-white/50 dark:bg-black/50 backdrop-blur-md shadow-sm">
        <div className="flex items-center gap-2 font-mono text-xs text-gray-700 dark:text-gray-300">
          <Terminal className="w-3.5 h-3.5 text-slate-700 dark:text-slate-300 animate-pulse" />
          <span className="font-semibold text-gray-900 dark:text-white">hexctl</span>
          <span className="text-gray-400 dark:text-gray-500">/</span>
          <Link href="/" className="text-gray-500 dark:text-gray-400 hover:text-slate-700 dark:hover:text-slate-300 transition-colors">portfolio</Link>
          <span className="text-gray-400 dark:text-gray-500">/</span>
          <span className="text-slate-800 dark:text-slate-200 font-medium">works</span>
        </div>
        <div className="flex items-center gap-4 text-xs font-mono">
          <span className="hidden sm:inline-block px-3 py-0.5 rounded-full bg-black/5 dark:bg-white/10 text-gray-600 dark:text-gray-400 border border-black/5 dark:border-white/10">
            {currentTime || "--:--"}
          </span>
          <DarkModeToggle />
        </div>
      </header>

      {/* Page Content */}
      <PageTransition>
        <div className="relative z-10 pt-24 pb-16 max-w-4xl mx-auto px-4 lg:px-6">

          {/* Page Header */}
          <div className="mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-black/10 dark:border-white/10 pb-8">
            <div className="space-y-2">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-800 dark:text-slate-200 hover:text-slate-600 dark:hover:text-slate-400 transition-colors mb-3"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                back
              </Link>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
                Selected<br />
                <span className="text-slate-800 dark:text-slate-200">Works.</span>
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-mono max-w-sm mt-2">
                Projects I built from idea to deployment — ranging from full-stack apps to CLI tools.
              </p>
            </div>

            <div className="flex items-center gap-3 text-xs font-mono text-gray-500 dark:text-gray-400">
              <span className="px-3 py-1.5 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10">
                {projects.length} projects
              </span>
              <span className="px-3 py-1.5 rounded-full bg-slate-500/10 dark:bg-white/10 border border-slate-500/20 dark:border-white/15 text-slate-800 dark:text-slate-200">
                <Code2 className="w-3 h-3 inline mr-1" />
                all open for review
              </span>
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {projects.map((project, index) => (
              <div
                key={index}
                className="stagger-item works-card rounded-2xl group cursor-pointer"
                onClick={() => setSelectedIndex(index === selectedIndex ? null : index)}
              >
                {/* Image */}
                <div className="relative w-full h-48 overflow-hidden rounded-t-2xl">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-500/10 via-gray-500/10 to-slate-400/10">
                      <Code2 className="w-8 h-8 text-gray-400/40" />
                    </div>
                  )}
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  {/* Index number */}
                  <span className="absolute top-3 left-3 text-xs font-mono font-bold text-white/50">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {/* External link */}
                  {project.link && project.link !== "#" && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="absolute top-3 right-3 p-1.5 rounded-full bg-black/40 text-white/70 hover:text-white hover:bg-slate-700/70 transition-all opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}

                  {/* Title on image */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h2 className="font-semibold text-sm text-white leading-tight">{project.title}</h2>
                  </div>
                </div>

                {/* Body */}
                <div className="p-4 space-y-3">
                  <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-2">
                    {project.description}
                  </p>

                  {/* Tech pills */}
                  {project.languages && (
                    <div className="flex flex-wrap gap-1.5">
                      {project.languages.slice(0, 4).map((lang, li) => (
                        <span
                          key={li}
                          className="px-2 py-0.5 text-[10px] font-mono rounded-full bg-black/8 dark:bg-white/8 border border-black/10 dark:border-white/10 text-gray-600 dark:text-gray-400"
                        >
                          {lang}
                        </span>
                      ))}
                      {project.languages.length > 4 && (
                        <span className="px-2 py-0.5 text-[10px] font-mono rounded-full bg-slate-500/10 border border-slate-500/20 text-slate-800 dark:text-slate-200">
                          +{project.languages.length - 4}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Footer row */}
                  <div className="flex items-center justify-between pt-1 border-t border-black/8 dark:border-white/8">
                    <span className="text-[10px] font-mono text-gray-400 dark:text-gray-500">
                      {project.languages?.[0] ?? "project"}
                    </span>
                    {project.link && project.link !== "#" ? (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1 text-[10px] font-mono font-semibold text-slate-800 dark:text-slate-200 hover:text-slate-600 dark:hover:text-slate-400 transition-colors"
                      >
                        <Globe className="w-3 h-3" />
                        Live <ArrowUpRight className="w-3 h-3" />
                      </a>
                    ) : (
                      <span className="text-[10px] font-mono text-gray-400/60 italic">private</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-16 pt-6 border-t border-black/10 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-gray-500 dark:text-gray-400">
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
