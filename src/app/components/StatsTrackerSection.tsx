"use client";

import { useState } from "react";
import GitHubStatsCard from "./GitHubStatsCard";
import LeetCodeStatsCard from "./LeetCodeStatsCard";
import { FiActivity, FiGithub } from "react-icons/fi";
import { SiLeetcode } from "react-icons/si";

type ActiveTab = "all" | "github" | "leetcode";

export default function StatsTrackerSection() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("all");

  return (
    <div className="w-full space-y-6">
      {/* Header and Tab Switcher */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-3 border-b border-black/10 dark:border-white/10 font-mono text-xs">
        <div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <FiActivity className="w-5 h-5 text-emerald-500 animate-pulse" />
            Developer Activity & Stats Tracker
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 font-sans mt-0.5">
            Real-time metric telemetry & problem-solving progress across GitHub and LeetCode
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-gray-100 dark:bg-[#1a1a1c] border border-gray-200 dark:border-[#2d2d2d] shrink-0">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === "all"
                ? "bg-white dark:bg-[#252528] text-gray-900 dark:text-white font-bold shadow-xs border border-black/5 dark:border-white/10"
                : "text-gray-500 hover:text-gray-900 dark:hover:text-gray-200"
            }`}
          >
            <FiActivity className="w-3.5 h-3.5" />
            <span>All Stats</span>
          </button>

          <button
            onClick={() => setActiveTab("github")}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === "github"
                ? "bg-white dark:bg-[#252528] text-gray-900 dark:text-white font-bold shadow-xs border border-black/5 dark:border-white/10"
                : "text-gray-500 hover:text-gray-900 dark:hover:text-gray-200"
            }`}
          >
            <FiGithub className="w-3.5 h-3.5" />
            <span>GitHub</span>
          </button>

          <button
            onClick={() => setActiveTab("leetcode")}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === "leetcode"
                ? "bg-white dark:bg-[#252528] text-gray-900 dark:text-white font-bold shadow-xs border border-black/5 dark:border-white/10"
                : "text-gray-500 hover:text-gray-900 dark:hover:text-gray-200"
            }`}
          >
            <SiLeetcode className="w-3.5 h-3.5 text-amber-500" />
            <span>LeetCode</span>
          </button>
        </div>
      </div>

      {/* Cards Layout */}
      <div className="grid grid-cols-1 gap-6">
        {(activeTab === "all" || activeTab === "github") && <GitHubStatsCard />}
        {(activeTab === "all" || activeTab === "leetcode") && <LeetCodeStatsCard />}
      </div>
    </div>
  );
}
