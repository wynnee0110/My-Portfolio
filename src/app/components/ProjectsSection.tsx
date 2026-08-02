"use client";

import { projects } from "../data/projectsData";
import { FiExternalLink } from "react-icons/fi";
import Image from "next/image";

export default function ProjectsSection() {
  return (
    <section className="max-w-5xl mx-auto py-2" id="projects">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <div
            key={index}
            className="
              group relative flex flex-col h-full min-h-[22rem]
              rounded-2xl overflow-hidden
              glass-card
              transition-all duration-300 ease-out
              hover:-translate-y-1.5 hover:shadow-2xl
            "
          >
            {/* IMAGE */}
            <div className="relative w-full h-44 overflow-hidden bg-black/5 dark:bg-white/5">
              {project.image ? (
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="
                    object-cover
                    transition-transform duration-500 ease-out
                    group-hover:scale-105
                  "
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-indigo-500/10 to-pink-500/10">
                  <span className="text-xs font-mono text-gray-500 dark:text-gray-400">
                    [ No Preview ]
                  </span>
                </div>
              )}

              {/* Hover overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <span className="text-xs font-medium text-white/90 tracking-wide flex items-center gap-1">
                  View details <FiExternalLink className="w-3 h-3" />
                </span>
              </div>
            </div>

            {/* CONTENT */}
            <div className="flex flex-col flex-1 justify-between p-5 space-y-4">
              <div>
                <div className="flex justify-between items-start mb-2 gap-2">
                  <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">
                    {project.title}
                  </h3>

                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit ${project.title}`}
                    className="
                      p-1.5 rounded-lg
                      bg-black/5 dark:bg-white/10
                      text-gray-600 dark:text-gray-300
                      hover:text-pink-600 dark:hover:text-pink-400
                      hover:bg-pink-500/10 dark:hover:bg-pink-500/20
                      transition-all duration-200 shrink-0
                    "
                  >
                    <FiExternalLink className="w-4 h-4" />
                  </a>
                </div>

                <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-3 leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* TAGS */}
              <div className="flex flex-wrap gap-1.5 pt-3 border-t border-black/5 dark:border-white/10">
                {project.languages?.map((tag, i) => (
                  <span
                    key={i}
                    className="
                      px-2.5 py-0.5 text-[11px] font-mono font-medium
                      rounded-full
                      bg-pink-500/10 dark:bg-pink-400/15
                      text-pink-700 dark:text-pink-300
                      border border-pink-500/20 dark:border-pink-400/30
                    "
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}