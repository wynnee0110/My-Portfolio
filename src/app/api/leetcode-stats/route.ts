import { NextResponse } from "next/server";

export interface LeetCodeStats {
  username: string;
  totalSolved: number;
  totalQuestions: number;
  easySolved: number;
  easyTotal: number;
  mediumSolved: number;
  mediumTotal: number;
  hardSolved: number;
  hardTotal: number;
  acceptanceRate: number;
  ranking: number;
  contributionPoints: number;
  reputation: number;
  recentSubmissions: {
    title: string;
    titleSlug: string;
    timestamp: string;
    statusDisplay: string;
    lang: string;
    difficulty?: "Easy" | "Medium" | "Hard";
  }[];
  topicSkills: { name: string; count: number }[];
  fetchedAt: string;
}

interface AcSubmission {
  difficulty: string;
  count: number;
}

const ACCURATE_LEETCODE: LeetCodeStats = {
  username: "wynnee0110",
  totalSolved: 10,
  totalQuestions: 3300,
  easySolved: 4,
  easyTotal: 850,
  mediumSolved: 6,
  mediumTotal: 1750,
  hardSolved: 0,
  hardTotal: 700,
  acceptanceRate: 66.7,
  ranking: 5000001,
  contributionPoints: 120,
  reputation: 0,
  recentSubmissions: [
    {
      title: "Two Sum",
      titleSlug: "two-sum",
      timestamp: "Recent",
      statusDisplay: "Accepted",
      lang: "Python3",
      difficulty: "Easy",
    },
    {
      title: "3Sum",
      titleSlug: "3sum",
      timestamp: "Recent",
      statusDisplay: "Accepted",
      lang: "Python3",
      difficulty: "Medium",
    },
    {
      title: "Add Two Numbers",
      titleSlug: "add-two-numbers",
      timestamp: "Recent",
      statusDisplay: "Accepted",
      lang: "Python3",
      difficulty: "Medium",
    },
  ],
  topicSkills: [
    { name: "Array & Hashing", count: 6 },
    { name: "Two Pointers", count: 3 },
    { name: "Math", count: 1 },
  ],
  fetchedAt: new Date().toISOString(),
};

export async function GET() {
  const username = "wynnee0110";

  try {
    // Official LeetCode GraphQL query directly
    const gqlQuery = {
      query: `
        query getUserProfile($username: String!) {
          matchedUser(username: $username) {
            username
            profile {
              ranking
              reputation
            }
            submitStats {
              acSubmissionNum {
                difficulty
                count
              }
            }
          }
        }
      `,
      variables: { username },
    };

    const gqlRes = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
      },
      body: JSON.stringify(gqlQuery),
      next: { revalidate: 1800 },
    });

    if (gqlRes.ok) {
      const gqlData = await gqlRes.json();
      const user = gqlData?.data?.matchedUser;
      if (user) {
        const acStats: AcSubmission[] = user.submitStats?.acSubmissionNum || [];
        const easyObj = acStats.find((s) => s.difficulty === "Easy");
        const medObj = acStats.find((s) => s.difficulty === "Medium");
        const hardObj = acStats.find((s) => s.difficulty === "Hard");
        const allObj = acStats.find((s) => s.difficulty === "All");

        const stats: LeetCodeStats = {
          username,
          totalSolved: allObj?.count ?? ACCURATE_LEETCODE.totalSolved,
          totalQuestions: ACCURATE_LEETCODE.totalQuestions,
          easySolved: easyObj?.count ?? ACCURATE_LEETCODE.easySolved,
          easyTotal: ACCURATE_LEETCODE.easyTotal,
          mediumSolved: medObj?.count ?? ACCURATE_LEETCODE.mediumSolved,
          mediumTotal: ACCURATE_LEETCODE.mediumTotal,
          hardSolved: hardObj?.count ?? ACCURATE_LEETCODE.hardSolved,
          hardTotal: ACCURATE_LEETCODE.hardTotal,
          acceptanceRate: ACCURATE_LEETCODE.acceptanceRate,
          ranking: user.profile?.ranking || ACCURATE_LEETCODE.ranking,
          contributionPoints: ACCURATE_LEETCODE.contributionPoints,
          reputation: user.profile?.reputation || ACCURATE_LEETCODE.reputation,
          recentSubmissions: ACCURATE_LEETCODE.recentSubmissions,
          topicSkills: ACCURATE_LEETCODE.topicSkills,
          fetchedAt: new Date().toISOString(),
        };
        return NextResponse.json(stats);
      }
    }

    return NextResponse.json(ACCURATE_LEETCODE);
  } catch (err) {
    console.error("Error fetching LeetCode stats:", err);
    return NextResponse.json(ACCURATE_LEETCODE);
  }
}
