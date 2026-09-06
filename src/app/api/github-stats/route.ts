import { NextResponse } from "next/server";

export interface GitHubStats {
  username: string;
  name: string;
  avatarUrl: string;
  bio: string;
  location: string;
  publicRepos: number;
  followers: number;
  following: number;
  totalStars: number;
  totalForks: number;
  topLanguages: { name: string; percentage: number; color: string }[];
  topRepos: {
    name: string;
    description: string | null;
    stars: number;
    forks: number;
    language: string | null;
    url: string;
    updatedAt: string;
  }[];
  fetchedAt: string;
}

interface GitHubApiRepo {
  fork: boolean;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  name: string;
  description: string | null;
  html_url: string;
  updated_at: string;
}

const FALLBACK_DATA: GitHubStats = {
  username: "wynnee0110",
  name: "Wayne Obial",
  avatarUrl: "https://github.com/wynnee0110.png",
  bio: "Software Developer & Technology Enthusiast",
  location: "Philippines",
  publicRepos: 52,
  followers: 18,
  following: 24,
  totalStars: 42,
  totalForks: 15,
  topLanguages: [
    { name: "TypeScript", percentage: 42, color: "#3178c6" },
    { name: "Python", percentage: 28, color: "#3572A5" },
    { name: "JavaScript", percentage: 18, color: "#f1e05a" },
    { name: "HTML/CSS", percentage: 12, color: "#e34c26" },
  ],
  topRepos: [
    {
      name: "My-Portfolio",
      description: "Personal portfolio website built with Next.js 15, React 19, and Tailwind CSS",
      stars: 12,
      forks: 3,
      language: "TypeScript",
      url: "https://github.com/wynnee0110/My-Portfolio",
      updatedAt: "2026-08-08",
    },
    {
      name: "smart-iot-monitor",
      description: "Real-time IoT telemetry system with dashboard and predictive analytics",
      stars: 8,
      forks: 2,
      language: "Python",
      url: "https://github.com/wynnee0110",
      updatedAt: "2026-07-20",
    },
    {
      name: "ai-vision-classifier",
      description: "Computer vision classification model with PyTorch & OpenCV",
      stars: 7,
      forks: 4,
      language: "Python",
      url: "https://github.com/wynnee0110",
      updatedAt: "2026-06-15",
    },
    {
      name: "react-math-simulations",
      description: "Interactive WebGL math and physics simulations",
      stars: 9,
      forks: 1,
      language: "TypeScript",
      url: "https://github.com/wynnee0110",
      updatedAt: "2026-05-30",
    },
  ],
  fetchedAt: new Date().toISOString(),
};

const LANG_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  HTML: "#e34c26",
  CSS: "#563d7c",
  C: "#555555",
  "C++": "#f34b7d",
  Java: "#b07219",
  Go: "#00ADD8",
  Rust: "#dea584",
  PHP: "#4F5D95",
  Shell: "#89e051",
};

export async function GET() {
  const username = "wynnee0110";
  try {
    const headers: Record<string, string> = {
      "User-Agent": "My-Portfolio-App",
      Accept: "application/vnd.github.v3+json",
    };

    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`, {
        headers,
        next: { revalidate: 3600 },
      }),
      fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, {
        headers,
        next: { revalidate: 3600 },
      }),
    ]);

    if (!userRes.ok || !reposRes.ok) {
      console.warn("GitHub API request failed or rate-limited, returning fallback data.");
      return NextResponse.json(FALLBACK_DATA);
    }

    const userData = await userRes.json();
    const reposData = (await reposRes.json()) as GitHubApiRepo[];

    if (!Array.isArray(reposData)) {
      return NextResponse.json(FALLBACK_DATA);
    }

    let totalStars = 0;
    let totalForks = 0;
    const langCounts: Record<string, number> = {};

    reposData.forEach((repo) => {
      if (!repo.fork) {
        totalStars += repo.stargazers_count || 0;
        totalForks += repo.forks_count || 0;
        if (repo.language) {
          langCounts[repo.language] = (langCounts[repo.language] || 0) + 1;
        }
      }
    });

    const totalLangRepos = Object.values(langCounts).reduce((a, b) => a + b, 0) || 1;
    const topLanguages = Object.entries(langCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([name, count]) => ({
        name,
        percentage: Math.round((count / totalLangRepos) * 100),
        color: LANG_COLORS[name] || "#888888",
      }));

    const topRepos = reposData
      .filter((r) => !r.fork)
      .sort((a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0))
      .slice(0, 4)
      .map((r) => ({
        name: r.name,
        description: r.description,
        stars: r.stargazers_count || 0,
        forks: r.forks_count || 0,
        language: r.language,
        url: r.html_url,
        updatedAt: r.updated_at ? r.updated_at.split("T")[0] : "",
      }));

    const result: GitHubStats = {
      username: userData.login || username,
      name: userData.name || "Wayne Obial",
      avatarUrl: userData.avatar_url || FALLBACK_DATA.avatarUrl,
      bio: userData.bio || FALLBACK_DATA.bio,
      location: userData.location || FALLBACK_DATA.location,
      publicRepos: userData.public_repos || FALLBACK_DATA.publicRepos,
      followers: userData.followers || FALLBACK_DATA.followers,
      following: userData.following || FALLBACK_DATA.following,
      totalStars,
      totalForks,
      topLanguages: topLanguages.length > 0 ? topLanguages : FALLBACK_DATA.topLanguages,
      topRepos: topRepos.length > 0 ? topRepos : FALLBACK_DATA.topRepos,
      fetchedAt: new Date().toISOString(),
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching GitHub stats:", error);
    return NextResponse.json(FALLBACK_DATA);
  }
}
