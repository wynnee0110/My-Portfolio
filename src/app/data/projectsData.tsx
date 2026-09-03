export type Project = {
  title: string;
  description: string;
  description2?: string;
  languages?: string[];
  link: string;
  image?: string;
};

export const projects: Project[] = [
  {
    title: "School Sports Management System",
    description: "A web application to manage school sports events, teams, and schedules.",
    description2: "Built with Next.js, Tailwind CSS, and Supabase for real-time data handling.",
    languages: ["Next.js", "Tailwind CSS", "Supabase", "TypeScript", "React"],
    link: "#",
    image: "/images/works/3.webp",
  },
  {
    title: "archive",
    description: "A community-driven social platform where users share posts, interact, and build their online presence.",
    description2: "Features authentication, profiles, avatars, likes, comments, and real-time engagement powered by a modern full-stack architecture.",
    languages: ["Next.js", "React", "TypeScript", "Supabase", "Tailwind CSS", "postgreSQL"],
    link: "https://ar7.vercel.app/",
    image: "/images/works/fallback.webp",
  },
  {
    title: "ERP System with AI Database Query",
    description: "An intelligent ERP platform that streamlines business operations and team workflows through automation and centralized data management.",
    description2: "Built with the PERN stack, it features AI-powered query assistance, real-time dashboards, task tracking, and secure role-based access.",
    languages: ["PostgreSQL", "Express.js", "React", "Node.js", "Tailwind CSS", "Refine", "Neon DB", "Gemini API"],
    link: "#",
    image: "/images/works/fallback.webp",
  },
  {
    title: "VaultCli",
    description: "A self hosted vault for your secrets, and keys.",
    description2: "Supports satellite view, building extrusion, and indoor street-view–style exploration.",
    languages: ["Python", "Supabase", "Argon2", "CLI", "JSON", "Rest API", "Cryptography"],
    link: "https://vault-cli-site.vercel.app/",
    image: "/images/works/4.webp",
  },
  {
    title: "Cinefy",
    description: "A movie platform for movie lovers",
    description2: "Features authentication, profiles, avatars, likes, comments, and real-time engagement powered by a modern full-stack architecture.",
    languages: ["React", "Tailwind CSS", "express.js", "redis"],
    link: "https://cinefy-pi.vercel.app/",
    image: "/images/works/6.webp",
  },
  {
    title: "Cortex",
    description: "A memory layer for AI agents for your projects",
    description2: "Features context management, memory storage, and retrieval for AI agents, enabling them to learn and adapt over time.",
    languages: ["React", "Tailwind CSS", "express.js", "redis"],
    link: "https://github.com/wynnee0110/Cortex",
    image: "/images/works/7.webp",
  },
  {
    title: "Image-EXIF-tool",
    description: "a npm package for extracting EXIF data, edit, delete, and add EXIF data to images",
    description2: "it is a fast and efficient tool for working with EXIF data",
    languages: ["Typescript"],
    link: "https://github.com/wynnee0110/Image-EXIF-tool",
    image: "/images/works/fallback.webp",
  },
  {
    title: "tg-devtools",
    description: "a telegram bot that has essential tools for a dev",
    description2: "",
    languages: ["python", "google cloud", "botfather"],
    link: "https://github.com/wynnee0110/tg-devtools",
    image: "/images/works/fallback.webp",
  },
  {
    title: "ScanSync",
    description:
      "A QR-based attendance management system built for ICpEP.SE-USTP.",
    description2:
      "Built with a React Native mobile app using Expo and a FastAPI backend, ScanSync enables fast QR attendance scanning, event management, real-time attendance tracking, and personalized dashboards.",
    languages: [
      "React Native",
      "Expo",
      "FastAPI",
      "Python",
      "Supabase",
      "Google Cloud",
    ],
    link: "https://scan-sync-app.vercel.app/",
    image: "/images/works/fallback.webp",
  },
  {
    title: "NLP Scheduling Automation",
    description:
      "A telegram bot to create an event schedule using natural language, using patterns from everyday language, and will automatically set in google calendar",
    description2: "personal project",
    languages: [
      "python",
      "google cloud",
      "Bot Father",
      "google calender api",

    ],
    link: "",
    image: "/images/works/fallback.webp",
  },

  {
    title: "Tunnel",
    description: "a random stranger chat app where chats disapear after few exchanges of messages",
    description2: "Built with Next.js, Tailwind CSS, and firebase for real-time data handling.",
    languages: ["Next.js", "Tailwind CSS", "firebase", "TypeScript", "React"],
    link: "https://tunnel-delta-indol.vercel.app/",
    image: "/images/works/9.webp",
  },
];
