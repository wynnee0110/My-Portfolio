"use client";

import resourcesData from "../data/resources.json";
import { ArrowUpRight, Download } from "lucide-react";

export default function ResourcesSection() {
  const categoryOrder = [
    "Downloads",
    "Learning & Docs",
    "Learning Platforms",
    "Development Tools",
    "Frontend Stack",
    "Backend & APIs",
    "Cloud & Database",
    "Deployment",
    "AI & Automation",
    "Linux & Terminal",
    "Embedded & Hardware",
    "Productivity",
    "Design Tools",
    "Utilities & Tools",
  ];

  const categories = Array.from(
    new Set(resourcesData.map((item) => item.category))
  ).sort((a, b) => {
    const idxA = categoryOrder.indexOf(a);
    const idxB = categoryOrder.indexOf(b);
    if (idxA !== -1 && idxB !== -1) return idxA - idxB;
    if (idxA !== -1) return -1;
    if (idxB !== -1) return 1;
    return a.localeCompare(b);
  });

  return (
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div className="space-y-2">
        <div className="text-xs font-mono text-gray-500 dark:text-gray-400 pb-2 border-b border-black/10 dark:border-white/10">
          {"/* Resources & Documentation */"}
        </div>
        <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
          A collection of developer resources, documentation links, and assets arranged by category.
        </p>
      </div>

      {/* Category Sections with 2 Columns */}
      <div className="space-y-7">
        {categories.map((category) => {
          const items = resourcesData.filter(
            (item) => item.category === category
          );

          return (
            <div key={category} className="space-y-3">
              {/* Category Header */}
              <h2 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 border-b border-black/5 dark:border-white/5 pb-1.5">
                {`// ${category}`}
              </h2>

              {/* 2-Column Grid with Bigger Titles & Shorter Descriptions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 pt-1">
                {items.map((item) => (
                  <div key={item.id} className="space-y-0.5 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <a
                        href={item.url}
                        target={item.isDownload ? "_self" : "_blank"}
                        rel={item.isDownload ? undefined : "noopener noreferrer"}
                        download={item.isDownload ? true : undefined}
                        className="font-semibold text-sm text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 underline decoration-gray-300 dark:decoration-gray-600 underline-offset-2 transition-colors inline-flex items-center gap-1 truncate"
                      >
                        <span className="truncate">{item.title}</span>
                        {item.isDownload ? (
                          <Download className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                        ) : (
                          <ArrowUpRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                        )}
                      </a>
                    </div>

                    <p className="text-xs text-gray-500 dark:text-gray-400 leading-normal">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
