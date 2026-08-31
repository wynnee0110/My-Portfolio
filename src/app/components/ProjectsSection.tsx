"use client";

import { projects } from "../data/projectsData";
import { FiExternalLink } from "react-icons/fi";
import { Globe, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const FALLBACK = "/images/works/fallback.webp";

function ProjectCard({
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
        className={`object-cover transition-transform duration-500 ease-out ${
          showDescription ? "scale-105 filter blur-[2px] brightness-50 dark:brightness-40" : "group-hover:scale-105"
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

export default function ProjectsSection() {
  return (
    <section className="w-full min-w-0 max-w-full py-1" id="projects">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full min-w-0 max-w-full">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
