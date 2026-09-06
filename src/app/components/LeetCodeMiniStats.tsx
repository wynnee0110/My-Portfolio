"use client";

import { useEffect, useState } from "react";
import { SiLeetcode } from "react-icons/si";
import { ArrowUpRight } from "lucide-react";
import { LeetCodeStats } from "../api/leetcode-stats/route";

export default function LeetCodeMiniStats() {
  const [stats, setStats] = useState<LeetCodeStats | null>(null);

  useEffect(() => {
    fetch("/api/leetcode-stats")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error("Error loading LeetCode stats:", err));
  }, []);

  const username = stats?.username || "wynnee0110";

  return (
    <div className="w-full text-xs font-mono space-y-2 pt-3 border-t border-black/10 dark:border-white/10 mt-3">
      {/* Header with Icon and Link */}
      <div className="flex justify-between items-center px-2.5">
        <div className="flex items-center gap-1.5 font-semibold text-gray-800 dark:text-gray-200">
          <SiLeetcode className="w-3.5 h-3.5 text-amber-500 shrink-0" />
          <span>LeetCode Stats</span>
        </div>
        <a
          href={`https://leetcode.com/u/${username}/`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[11px] text-slate-800 dark:text-slate-200 hover:text-amber-500 dark:hover:text-amber-400 flex items-center gap-0.5 hover:underline"
        >
          Profile <ArrowUpRight className="w-3 h-3" />
        </a>
      </div>

      {/* Stats Display Card */}
      <div className="p-2.5 rounded-xl bg-black/5 dark:bg-white/[0.04] border border-black/5 dark:border-white/5 space-y-2">
        {/* Total Solved Header */}
        <div className="flex justify-between items-center text-[11px]">
          <span className="text-gray-500 dark:text-gray-400 font-medium">Problems Solved</span>
          <span className="font-bold text-gray-900 dark:text-white">
            {stats ? stats.totalSolved : 10}
          </span>
        </div>

        {/* Difficulty Breakdown Pills */}
        <div className="grid grid-cols-3 gap-1 text-[10px] text-center font-bold">
          <div className="py-1 px-1 rounded-md bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
            Easy {stats ? stats.easySolved : 4}
          </div>
          <div className="py-1 px-1 rounded-md bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
            Med {stats ? stats.mediumSolved : 6}
          </div>
          <div className="py-1 px-1 rounded-md bg-rose-500/10 text-rose-700 dark:text-rose-400 border border-rose-500/20">
            Hard {stats ? stats.hardSolved : 0}
          </div>
        </div>

        {/* Acceptance / Ranking footer info */}
        {stats && (
          <div className="flex justify-between items-center text-[10px] text-gray-400 dark:text-gray-500 pt-1 border-t border-black/5 dark:border-white/5">
            <span>Acceptance: {stats.acceptanceRate}%</span>
            <span>Rank: #{stats.ranking.toLocaleString()}</span>
          </div>
        )}
      </div>
    </div>
  );
}
