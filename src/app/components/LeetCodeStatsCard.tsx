"use client";

import { useEffect, useState } from "react";
import { LeetCodeStats } from "../api/leetcode-stats/route";
import { SiLeetcode } from "react-icons/si";
import { FiCheckCircle, FiAward, FiTrendingUp, FiExternalLink, FiRefreshCw, FiCode } from "react-icons/fi";

export default function LeetCodeStatsCard() {
  const [data, setData] = useState<LeetCodeStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchStats = async (isManual = false) => {
    if (isManual) setRefreshing(true);
    try {
      const res = await fetch("/api/leetcode-stats");
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error("Failed to load LeetCode stats", err);
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
        <div className="h-6 w-40 bg-gray-300 dark:bg-gray-700 rounded" />
        <div className="h-28 bg-gray-200 dark:bg-gray-800 rounded-xl" />
      </div>
    );
  }

  if (!data) return null;

  const easyPercent = Math.min(100, Math.round((data.easySolved / (data.easyTotal || 1)) * 100));
  const mediumPercent = Math.min(100, Math.round((data.mediumSolved / (data.mediumTotal || 1)) * 100));
  const hardPercent = Math.min(100, Math.round((data.hardSolved / (data.hardTotal || 1)) * 100));

  return (
    <div className="w-full rounded-2xl bg-white dark:bg-[#161618] border border-black/10 dark:border-white/10 shadow-lg dark:shadow-2xl overflow-hidden transition-all duration-300 hover:border-slate-400/30">
      {/* Header bar */}
      <div className="px-5 py-3.5 bg-gray-100/80 dark:bg-[#1c1c1f]/90 border-b border-black/5 dark:border-white/10 flex items-center justify-between font-mono text-xs">
        <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200 font-semibold">
          <SiLeetcode className="w-4 h-4 text-amber-500" />
          <span>LeetCode Metrics Tracker</span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400">
            @{data.username}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <a
            href={`https://leetcode.com/u/${data.username}/`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-lg text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            title="Open LeetCode Profile"
          >
            <FiExternalLink className="w-3.5 h-3.5" />
          </a>
          <button
            onClick={() => fetchStats(true)}
            disabled={refreshing}
            className="p-1.5 rounded-lg text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            title="Refresh stats"
          >
            <FiRefreshCw className={`w-3.5 h-3.5 ${refreshing ? "animate-spin text-amber-500" : ""}`} />
          </button>
        </div>
      </div>

      <div className="p-5 md:p-6 space-y-6">
        {/* Main Solved Ring / Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          {/* Circular Badge / Total count */}
          <div className="p-4 rounded-xl bg-slate-500/5 dark:bg-white/[0.03] border border-black/5 dark:border-white/5 flex flex-col items-center justify-center text-center">
            <div className="relative flex items-center justify-center w-24 h-24 my-1">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-gray-200 dark:text-gray-800"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-emerald-500"
                  strokeDasharray={`${(data.easySolved / data.totalSolved) * 100 || 0}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute flex flex-col items-center font-mono">
                <span className="text-xl font-bold text-gray-900 dark:text-white leading-tight">
                  {data.totalSolved}
                </span>
                <span className="text-[10px] text-gray-400 uppercase tracking-widest">Solved</span>
              </div>
            </div>
            <div className="text-[11px] font-mono text-gray-500 dark:text-gray-400 mt-1">
              Rank: <strong className="text-gray-800 dark:text-gray-200">#{data.ranking.toLocaleString()}</strong>
            </div>
          </div>

          {/* Difficulty Breakdown Bars */}
          <div className="md:col-span-2 space-y-3 font-mono">
            {/* Easy */}
            <div className="space-y-1">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" /> Easy
                </span>
                <span className="text-gray-600 dark:text-gray-300 font-bold">
                  {data.easySolved} <span className="text-gray-400 font-normal">/ {data.easyTotal}</span>
                </span>
              </div>
              <div className="h-2 w-full rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                  style={{ width: `${easyPercent}%` }}
                />
              </div>
            </div>

            {/* Medium */}
            <div className="space-y-1">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-amber-600 dark:text-amber-400 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-amber-500" /> Medium
                </span>
                <span className="text-gray-600 dark:text-gray-300 font-bold">
                  {data.mediumSolved} <span className="text-gray-400 font-normal">/ {data.mediumTotal}</span>
                </span>
              </div>
              <div className="h-2 w-full rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
                <div
                  className="h-full bg-amber-500 rounded-full transition-all duration-500"
                  style={{ width: `${mediumPercent}%` }}
                />
              </div>
            </div>

            {/* Hard */}
            <div className="space-y-1">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-rose-600 dark:text-rose-400 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-rose-500" /> Hard
                </span>
                <span className="text-gray-600 dark:text-gray-300 font-bold">
                  {data.hardSolved} <span className="text-gray-400 font-normal">/ {data.hardTotal}</span>
                </span>
              </div>
              <div className="h-2 w-full rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
                <div
                  className="h-full bg-rose-500 rounded-full transition-all duration-500"
                  style={{ width: `${hardPercent}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Secondary Metrics Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono">
          <div className="p-3 rounded-xl bg-slate-500/5 dark:bg-white/[0.03] border border-black/5 dark:border-white/5 flex items-center gap-2.5">
            <FiCheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
            <div>
              <div className="text-[10px] text-gray-400 uppercase">Acceptance</div>
              <div className="text-sm font-bold text-gray-900 dark:text-white">{data.acceptanceRate}%</div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-500/5 dark:bg-white/[0.03] border border-black/5 dark:border-white/5 flex items-center gap-2.5">
            <FiAward className="w-4 h-4 text-amber-500 shrink-0" />
            <div>
              <div className="text-[10px] text-gray-400 uppercase">Points</div>
              <div className="text-sm font-bold text-gray-900 dark:text-white">{data.contributionPoints}</div>
            </div>
          </div>

          <div className="col-span-2 sm:col-span-1 p-3 rounded-xl bg-slate-500/5 dark:bg-white/[0.03] border border-black/5 dark:border-white/5 flex items-center gap-2.5">
            <FiTrendingUp className="w-4 h-4 text-cyan-500 shrink-0" />
            <div>
              <div className="text-[10px] text-gray-400 uppercase">Reputation</div>
              <div className="text-sm font-bold text-gray-900 dark:text-white">{data.reputation}</div>
            </div>
          </div>
        </div>

        {/* Topic Skill Tags */}
        <div className="space-y-2">
          <div className="text-xs font-mono font-medium text-gray-700 dark:text-gray-300">
            Core Problem Domains
          </div>
          <div className="flex flex-wrap gap-1.5">
            {data.topicSkills.map((topic, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/5 text-[11px] font-mono text-gray-700 dark:text-gray-300 flex items-center gap-1.5"
              >
                <span>{topic.name}</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-black/5 dark:bg-white/10 text-gray-500 dark:text-gray-400 font-bold">
                  {topic.count}
                </span>
              </span>
            ))}
          </div>
        </div>

        {/* Recent Submissions Feed */}
        <div className="space-y-3 pt-2 border-t border-black/5 dark:border-white/5 font-mono">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-1.5">
              <FiCode className="w-3.5 h-3.5 text-slate-500" /> Recent Accepted Solves
            </span>
            <span className="text-[10px] text-gray-400">Live feed</span>
          </div>

          <div className="space-y-2">
            {data.recentSubmissions.map((sub, idx) => (
              <div
                key={idx}
                className="p-2.5 rounded-xl bg-gray-50 dark:bg-[#1a1a1d] border border-gray-200/80 dark:border-white/5 flex items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                  <a
                    href={`https://leetcode.com/problems/${sub.titleSlug}/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-gray-900 dark:text-gray-100 hover:text-amber-500 dark:hover:text-amber-400 transition-colors truncate"
                  >
                    {sub.title}
                  </a>
                  {sub.difficulty && (
                    <span
                      className={`text-[9px] px-1.5 py-0.2 rounded shrink-0 ${
                        sub.difficulty === "Easy"
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                          : sub.difficulty === "Medium"
                          ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20"
                          : "bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20"
                      }`}
                    >
                      {sub.difficulty}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 text-[10px] text-gray-400 shrink-0">
                  <span className="px-1.5 py-0.5 rounded bg-black/5 dark:bg-white/5">{sub.lang}</span>
                  <span>{sub.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
