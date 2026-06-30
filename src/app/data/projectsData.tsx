type Project = {
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
    image: "/images/works/3.png",
    
  },
  {
    title: "archive",
    description: "A community-driven social platform where users share posts, interact, and build their online presence.",
    description2: "Features authentication, profiles, avatars, likes, comments, and real-time engagement powered by a modern full-stack architecture.",
    languages: ["Next.js", "React", "TypeScript", "Supabase", "Tailwind CSS", "postgreSQL"],
    link: "https://ar7.vercel.app/",
    image: "/images/works/2.png",

  },
{
  title: "ERP System with AI Database Query",
  description: "An intelligent ERP platform that streamlines business operations and team workflows through automation and centralized data management.",
  description2: "Built with the PERN stack, it features AI-powered query assistance, real-time dashboards, task tracking, and secure role-based access.",
  languages: ["PostgreSQL", "Express.js", "React", "Node.js", "Tailwind CSS", "Refine", "Neon DB", "Gemini API"],
  link: "#",
  image: "/images/works/1.png",
}
 
,
  {
    title: "VaultCli",
    description: "A self hosted vault for your secrets, and keys.",
    description2: "Supports satellite view, building extrusion, and indoor street-view–style exploration.",
    languages: ["Python", "Supabase", "Argon2", "CLI", "JSON", "Rest API","Cryptography"],
    link: "https://vault-cli-site.vercel.app/",
    image: "/images/works/4.png"
  },

  {
    title: "Cinefy",
    description: "A movie platform for movie lovers",
    description2: "Features authentication, profiles, avatars, likes, comments, and real-time engagement powered by a modern full-stack architecture.",
    languages: ["React", "Tailwind CSS", "express.js", "redis",],
    link: "https://cinefy-pi.vercel.app/",
    image: "/images/works/6.png"
  }
,
  {
        title: "Cortex",
    description: "A memory layer for AI agents for your projects",
    description2: "Features context management, memory storage, and retrieval for AI agents, enabling them to learn and adapt over time.",
    languages: ["React", "Tailwind CSS", "express.js", "redis",],
    link: "https://github.com/wynnee0110/Cortex",
    image: "/images/works/7.png"
  }

];
