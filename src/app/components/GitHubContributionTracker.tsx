"use client";

import { useEffect, useState, useMemo } from "react";
import { FiGithub, FiExternalLink, FiRefreshCw } from "react-icons/fi";
import { ContributionDay, GitHubContributionsResponse } from "../api/github-contributions/route";

function formatTooltipDate(dateStr: string): string {
  if (!dateStr) return "";
  const parts = dateStr.split("-");
  if (parts.length !== 3) return dateStr;
  const year = parts[0];
  const monthIdx = parseInt(parts[1], 10) - 1;
  const day = parseInt(parts[2], 10);
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  const monthName = months[monthIdx] || "";
  return `${monthName} ${day}, ${year}`;
}

function getContributionText(count: number, dateStr: string): string {
  const formattedDate = formatTooltipDate(dateStr);
  if (count === 0) return `No contributions on ${formattedDate}`;
  if (count === 1) return `1 contribution on ${formattedDate}`;
  return `${count} contributions on ${formattedDate}`;
}

export default function GitHubContributionTracker() {
  const [contribData, setContribData] = useState<GitHubContributionsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [hoveredDay, setHoveredDay] = useState<{ date: string; count: number } | null>(null);

  const loadData = async (isManual = false) => {
    if (isManual) setRefreshing(true);
    try {
      const res = await fetch("/api/github-contributions");
      const json = await res.json();
      setContribData(json);
    } catch (err) {
      console.error("Error loading GitHub contributions:", err);
    } finally {
      setLoading(false);
      if (isManual) setTimeout(() => setRefreshing(false), 500);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const username = "wynnee0110";

  // Group real 1-year contribution days into 52+ columns of 7 days (weeks) and calculate month header positions
  const { weeks, monthHeaders } = useMemo(() => {
    const rawDays: ContributionDay[] = contribData?.contributions || [];
    if (rawDays.length === 0) return { weeks: [], monthHeaders: [] };

    const weeksArr: ContributionDay[][] = [];
    for (let i = 0; i < rawDays.length; i += 7) {
      weeksArr.push(rawDays.slice(i, i + 7));
    }

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const monthHeadersArr: (string | null)[] = new Array(weeksArr.length).fill(null);

    let lastMonth = -1;
    let lastColPlaced = -3;

    weeksArr.forEach((week, colIdx) => {
      if (week.length > 0 && week[0].date) {
        const newMonthDay = week.find((d) => d.date && parseInt(d.date.split("-")[2], 10) <= 7);
        const dateToCheck = newMonthDay ? newMonthDay.date : week[0].date;
        const monthIdx = parseInt(dateToCheck.split("-")[1], 10) - 1;

        if (monthIdx !== lastMonth && colIdx - lastColPlaced >= 2) {
          monthHeadersArr[colIdx] = monthNames[monthIdx];
          lastMonth = monthIdx;
          lastColPlaced = colIdx;
        }
      }
    });

    return { weeks: weeksArr, monthHeaders: monthHeadersArr };
  }, [contribData]);

  // Blue theme contribution graph color levels
  const getCellColorClass = (level: number) => {
    switch (level) {
      case 1:
        return "bg-blue-300 dark:bg-blue-900/90";
      case 2:
        return "bg-blue-400 dark:bg-blue-700";
      case 3:
        return "bg-blue-500 dark:bg-blue-500 shadow-xs";
      case 4:
        return "bg-blue-600 dark:bg-cyan-400 shadow-sm";
      default:
        return "bg-gray-200/80 dark:bg-[#26262c] border border-black/[0.04] dark:border-white/[0.05]";
    }
  };

  return (
    <div className="w-full space-y-2 font-mono">
      {/* Header Bar */}
      <div className="flex items-center justify-between text-[11px] text-gray-500 dark:text-gray-400 pb-1">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
          <strong className="text-gray-800 dark:text-gray-200 font-bold">
            {contribData ? `${contribData.totalContributions} contributions in the last year` : "Loading..."}
          </strong>
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => loadData(true)}
            disabled={refreshing}
            className="p-1 rounded-md text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
            title="Refresh live activity"
          >
            <FiRefreshCw className={`w-3.5 h-3.5 ${refreshing ? "animate-spin text-blue-500" : ""}`} />
          </button>
          <a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1 rounded-md text-gray-400 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors"
            title={`@${username} on GitHub`}
          >
            <FiGithub className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Heatmap Grid Container - Elegant translucent card background */}
      <div className="w-full p-4 pt-7 rounded-2xl bg-white/60 dark:bg-[#161618]/80 border border-black/10 dark:border-white/10 backdrop-blur-md overflow-visible relative [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden shadow-xs">
        {loading ? (
          <div className="h-24 w-full animate-pulse bg-gray-200/60 dark:bg-gray-800/40 rounded-lg" />
        ) : (
          <div className="w-full flex flex-col space-y-1.5">

            {/* Month Header Row */}
            <div className="flex items-center gap-1.5 w-full">
              <div className="w-6 shrink-0" />
              <div className="flex gap-[2px] sm:gap-[3px] flex-1 justify-between items-center w-full min-w-0 text-[10px] text-gray-400 dark:text-gray-500 font-mono select-none h-4">
                {monthHeaders.map((m, idx) => (
                  <div key={idx} className="flex-1 min-w-0 relative">
                    {m && (
                      <span className="absolute top-0 left-0 whitespace-nowrap text-[10px] font-medium leading-none">
                        {m}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Grid Area with Day Labels */}
            <div className="flex items-center gap-1.5 w-full">
              {/* Day Labels - Perfectly aligned 1:1 with grid rows */}
              <div className="flex flex-col gap-[2px] sm:gap-[3px] w-6 shrink-0 select-none font-mono">
                <div className="w-full aspect-square max-w-[11px] max-h-[11px] flex items-center justify-start text-[9px] text-gray-400 dark:text-gray-500 leading-none"></div>
                <div className="w-full aspect-square max-w-[11px] max-h-[11px] flex items-center justify-start text-[9px] text-gray-400 dark:text-gray-500 leading-none">Mon</div>
                <div className="w-full aspect-square max-w-[11px] max-h-[11px] flex items-center justify-start text-[9px] text-gray-400 dark:text-gray-500 leading-none"></div>
                <div className="w-full aspect-square max-w-[11px] max-h-[11px] flex items-center justify-start text-[9px] text-gray-400 dark:text-gray-500 leading-none">Wed</div>
                <div className="w-full aspect-square max-w-[11px] max-h-[11px] flex items-center justify-start text-[9px] text-gray-400 dark:text-gray-500 leading-none"></div>
                <div className="w-full aspect-square max-w-[11px] max-h-[11px] flex items-center justify-start text-[9px] text-gray-400 dark:text-gray-500 leading-none">Fri</div>
                <div className="w-full aspect-square max-w-[11px] max-h-[11px] flex items-center justify-start text-[9px] text-gray-400 dark:text-gray-500 leading-none"></div>
              </div>

              {/* 52+ Columns Grid */}
              <div className="flex gap-[2px] sm:gap-[3px] flex-1 justify-between items-center w-full min-w-0">
                {weeks.map((week, wIdx) => (
                  <div key={wIdx} className="flex flex-col gap-[2px] sm:gap-[3px] flex-1">
                    {week.map((day, dIdx) => {
                      const isHovered = hoveredDay?.date === day.date;
                      const isLeftEdge = wIdx <= 3;
                      const isRightEdge = wIdx >= weeks.length - 4;

                      let tooltipAlignClass = "left-1/2 -translate-x-1/2 items-center";
                      let caretAlignClass = "left-1/2 -translate-x-1/2";

                      if (isLeftEdge) {
                        tooltipAlignClass = "left-0 translate-x-0 items-start";
                        caretAlignClass = "left-1.5";
                      } else if (isRightEdge) {
                        tooltipAlignClass = "right-0 translate-x-0 items-end";
                        caretAlignClass = "right-1.5";
                      }

                      return (
                        <div key={dIdx} className="relative flex items-center justify-center">
                          <div
                            onMouseEnter={() => setHoveredDay({ date: day.date, count: day.count })}
                            onMouseLeave={() => setHoveredDay(null)}
                            className={`w-full aspect-square max-w-[11px] max-h-[11px] rounded-[2px] transition-all duration-100 cursor-pointer hover:scale-125 hover:z-20 ${getCellColorClass(
                              day.level
                            )}`}
                          />
                          {isHovered && (
                            <div className={`absolute bottom-full mb-2 z-50 pointer-events-none flex flex-col animate-in fade-in zoom-in-95 duration-100 ${tooltipAlignClass}`}>
                              <div className="px-2.5 py-1 text-[11px] font-sans font-medium text-white bg-[#1c2128] dark:bg-[#22272e] border border-gray-700/60 dark:border-gray-600/60 rounded-md shadow-xl whitespace-nowrap">
                                {getContributionText(day.count, day.date)}
                              </div>
                              <div className={`w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-[#1c2128] dark:border-t-[#22272e] -mt-[1px] ${caretAlignClass}`} />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer Legend */}
      <div className="flex items-center justify-between text-[10px] text-gray-400 dark:text-gray-500 pt-0.5 px-0.5">
        <span>Accurate telemetry synced with GitHub</span>
        <div className="flex items-center gap-1.5 font-mono">
          <span>Less</span>
          <div className="flex gap-1">
            <span className="w-2.5 h-2.5 rounded-[2px] bg-gray-200/80 dark:bg-[#26262c] border border-black/[0.04] dark:border-white/[0.05]" />
            <span className="w-2.5 h-2.5 rounded-[2px] bg-blue-300 dark:bg-blue-900/90" />
            <span className="w-2.5 h-2.5 rounded-[2px] bg-blue-400 dark:bg-blue-700" />
            <span className="w-2.5 h-2.5 rounded-[2px] bg-blue-500 dark:bg-blue-500" />
            <span className="w-2.5 h-2.5 rounded-[2px] bg-blue-600 dark:bg-cyan-400" />
          </div>
          <span>More</span>
        </div>
      </div>
    </div>
  );
}





