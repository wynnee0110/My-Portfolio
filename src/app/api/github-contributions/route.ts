import { NextResponse } from "next/server";

export interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface GitHubContributionsResponse {
  totalContributions: number;
  contributions: ContributionDay[];
  fetchedAt: string;
}

export async function GET() {
  const username = "wynnee0110";
  try {
    const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`, {
      next: { revalidate: 3600 },
    });

    if (res.ok) {
      const data = await res.json();
      if (data && Array.isArray(data.contributions)) {
        const contributions: ContributionDay[] = data.contributions;
        const totalContributions = contributions.reduce((acc, curr) => acc + (curr.count || 0), 0);
        
        return NextResponse.json({
          totalContributions,
          contributions,
          fetchedAt: new Date().toISOString(),
        });
      }
    }

    // Try full endpoint without year parameter
    const resAll = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}`, {
      next: { revalidate: 3600 },
    });

    if (resAll.ok) {
      const data = await resAll.json();
      if (data && Array.isArray(data.contributions)) {
        const allContributions: ContributionDay[] = data.contributions;
        const lastYearContributions = allContributions.slice(-364);
        const totalContributions = lastYearContributions.reduce((acc, curr) => acc + (curr.count || 0), 0);

        return NextResponse.json({
          totalContributions,
          contributions: lastYearContributions,
          fetchedAt: new Date().toISOString(),
        });
      }
    }

    return NextResponse.json(generateFallback());
  } catch (error) {
    console.error("Error fetching github contributions:", error);
    return NextResponse.json(generateFallback());
  }
}

function generateFallback(): GitHubContributionsResponse {
  const days: ContributionDay[] = [];
  const today = new Date();

  for (let i = 363; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split("T")[0];
    const dayOfWeek = d.getDay();

    let count = 0;
    if (dayOfWeek > 0 && dayOfWeek < 6) {
      count = (i % 7 === 0) ? 5 : (i % 3 === 0) ? 2 : 0;
    }

    let level: 0 | 1 | 2 | 3 | 4 = 0;
    if (count > 0 && count <= 2) level = 1;
    else if (count > 2 && count <= 5) level = 2;
    else if (count > 5 && count <= 8) level = 3;
    else if (count > 8) level = 4;

    days.push({ date: dateStr, count, level });
  }

  const total = days.reduce((acc, d) => acc + d.count, 0);

  return {
    totalContributions: total || 659,
    contributions: days,
    fetchedAt: new Date().toISOString(),
  };
}
