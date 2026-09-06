"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { GitHubStats } from "../api/github-stats/route";
import { FiGithub, FiStar, FiGitBranch, FiBookOpen, FiUsers, FiExternalLink, FiRefreshCw } from "react-icons/fi";

export default function GitHubStatsCard() {
  const [data, setData] = useState<GitHubStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchStats = async (isManual = false) => {
    if (isManual) setRefreshing(true);
    try {
      const res = await fetch("/api/github-stats");
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error("Failed to load GitHub stats", err);
    } finally {
      setLoading(false);
      if (isManual) setTimeout(() => setRefreshing(false), 500);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="w-full p-6 rounded-2xl bg-white/50 dark:bg-[#161618]/70 border border-black/10 dark:border-white/10 backdrop-blur-md animate-pulse space-y-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gray-300 dark:bg-gray-700" />
          <div className="space-y-2 flex-1">
            <div className="h-4 w-32 bg-gray-300 dark:bg-gray-700 rounded" />
            <div className="h-3 w-24 bg-gray-200 dark:bg-gray-800 rounded" />
          </div>
        </div>
        <div className="h-20 bg-gray-200 dark:bg-gray-800 rounded-xl" />
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="w-full rounded-2xl bg-white dark:bg-[#161618] border border-black/10 dark:border-white/10 shadow-lg dark:shadow-2xl overflow-hidden transition-all duration-300 hover:border-slate-400/30">
      {/* Header bar */}
      <div className="px-5 py-3.5 bg-gray-100/80 dark:bg-[#1c1c1f]/90 border-b border-black/5 dark:border-white/10 flex items-center justify-between font-mono text-xs">
        <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200 font-semibold">
          <FiGithub className="w-4 h-4 text-slate-900 dark:text-white" />
          <span>GitHub Activity Tracker</span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-500/10 dark:bg-white/10 border border-slate-500/20 text-slate-700 dark:text-slate-300">
            @{data.username}
          </span>
        </div>
        <button
          onClick={() => fetchStats(true)}
          disabled={refreshing}
          className="p-1.5 rounded-lg text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          title="Refresh stats"
        >
          <FiRefreshCw className={`w-3.5 h-3.5 ${refreshing ? "animate-spin text-cyan-500" : ""}`} />
        </button>
      </div>

      <div className="p-5 md:p-6 space-y-6">
        {/* Profile Info & Top Stats Row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <Image
              src={data.avatarUrl}
              alt={data.name}
              width={52}
              height={52}
              unoptimized
              className="w-13 h-13 rounded-full border-2 border-slate-400/30 shadow-md object-cover"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-gray-900 dark:text-white">{data.name}</h3>
                <a
                  href={`https://github.com/${data.username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 inline-flex items-center gap-0.5"
                >
                  <FiExternalLink className="w-3 h-3" />
                </a>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">{data.bio}</p>
              <div className="flex items-center gap-3 text-[11px] font-mono text-gray-400 dark:text-gray-500 mt-1">
                <span className="flex items-center gap-1">
                  <FiUsers className="w-3 h-3 text-slate-500" />
                  <strong className="text-gray-700 dark:text-gray-300">{data.followers}</strong> followers
                </span>
                <span>•</span>
                <span>
                  <strong className="text-gray-700 dark:text-gray-300">{data.following}</strong> following
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-3 gap-3 font-mono">
          <div className="p-3 rounded-xl bg-slate-500/5 dark:bg-white/[0.03] border border-black/5 dark:border-white/5 flex flex-col items-center justify-center text-center">
            <div className="flex items-center gap-1 text-[11px] text-gray-500 dark:text-gray-400 mb-0.5">
              <FiBookOpen className="w-3.5 h-3.5 text-blue-500" />
              <span>Repos</span>
            </div>
            <span className="text-lg font-bold text-gray-900 dark:text-white">{data.publicRepos}</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-500/5 dark:bg-white/[0.03] border border-black/5 dark:border-white/5 flex flex-col items-center justify-center text-center">
            <div className="flex items-center gap-1 text-[11px] text-gray-500 dark:text-gray-400 mb-0.5">
              <FiStar className="w-3.5 h-3.5 text-amber-400 fill-amber-400/20" />
              <span>Stars</span>
            </div>
            <span className="text-lg font-bold text-gray-900 dark:text-white">{data.totalStars}</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-500/5 dark:bg-white/[0.03] border border-black/5 dark:border-white/5 flex flex-col items-center justify-center text-center">
            <div className="flex items-center gap-1 text-[11px] text-gray-500 dark:text-gray-400 mb-0.5">
              <FiGitBranch className="w-3.5 h-3.5 text-purple-400" />
              <span>Forks</span>
            </div>
            <span className="text-lg font-bold text-gray-900 dark:text-white">{data.totalForks}</span>
          </div>
        </div>

        {/* Language Breakdown */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="font-medium text-gray-700 dark:text-gray-300">Top Languages</span>
            <span className="text-[10px] text-gray-400">By Repository Usage</span>
          </div>

          {/* Combined Progress Bar */}
          <div className="h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-800 overflow-hidden flex">
            {data.topLanguages.map((lang, idx) => (
              <div
                key={idx}
                style={{ width: `${lang.percentage}%`, backgroundColor: lang.color }}
                className="h-full transition-all duration-500"
                title={`${lang.name}: ${lang.percentage}%`}
              />
            ))}
          </div>

          {/* Language Legend */}
          <div className="flex flex-wrap gap-x-4 gap-y-1.5 pt-1 text-xs font-mono">
            {data.topLanguages.map((lang, idx) => (
              <div key={idx} className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: lang.color }} />
                <span className="text-gray-700 dark:text-gray-300 text-xs">{lang.name}</span>
                <span className="text-gray-400 text-[11px]">{lang.percentage}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Repositories Grid */}
        <div className="space-y-3 pt-2 border-t border-black/5 dark:border-white/5">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="font-semibold text-gray-800 dark:text-gray-200">Featured Repositories</span>
            <a
              href={`https://github.com/${data.username}?tab=repositories`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] text-slate-600 dark:text-slate-400 hover:underline flex items-center gap-1"
            >
              View all ({data.publicRepos}) <FiExternalLink className="w-2.5 h-2.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {data.topRepos.map((repo, idx) => (
              <a
                key={idx}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-3 rounded-xl bg-gray-50 dark:bg-[#1a1a1d] border border-gray-200/80 dark:border-white/5 hover:border-slate-400/40 dark:hover:border-white/20 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="font-mono text-xs font-bold text-gray-900 dark:text-white group-hover:text-blue-500 dark:group-hover:text-cyan-400 transition-colors truncate">
                      {repo.name}
                    </span>
                    <FiExternalLink className="w-3 h-3 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                  </div>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400 line-clamp-2 mb-2 font-sans">
                    {repo.description || "No description provided."}
                  </p>
                </div>

                <div className="flex items-center justify-between text-[10px] font-mono text-gray-400 dark:text-gray-500 pt-2 border-t border-black/5 dark:border-white/5">
                  {repo.language ? (
                    <span className="flex items-center gap-1">
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: langColor(repo.language) }}
                      />
                      {repo.language}
                    </span>
                  ) : (
                    <span>Text</span>
                  )}
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-0.5">
                      <FiStar className="w-2.5 h-2.5 text-amber-400" /> {repo.stars}
                    </span>
                    <span className="flex items-center gap-0.5">
                      <FiGitBranch className="w-2.5 h-2.5 text-purple-400" /> {repo.forks}
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function langColor(lang: string): string {
  const map: Record<string, string> = {
    TypeScript: "#3178c6",
    JavaScript: "#f1e05a",
    Python: "#3572A5",
    HTML: "#e34c26",
    CSS: "#563d7c",
    "C++": "#f34b7d",
  };
  return map[lang] || "#888888";
}
