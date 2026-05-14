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
  // 🔽 MOCK PROJECTS BASED ON YOU 
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
    title: "Safety Map & Risk-Aware Routing",
    description: "A safety-focused mapping platform that visualizes incidents and danger zones.",
    description2: "Uses weighted pathfinding to suggest safer routes in real time.",
    languages: ["Next.js", "Mapbox", "PostgreSQL", "Node.js", "Algorithms"],
    link: "#",
  },
  {
    title: "Sign Language to Text Translator",
    description: "A real-time system that converts hand gestures into readable text.",
    description2: "Uses computer vision and machine learning for gesture recognition.",
    languages: ["Python", "OpenCV", "TensorFlow", "MediaPipe"],
    link: "#",
  },
  {
    title: "AI Chatbot Platform",
    description: "A locally hosted AI chatbot designed for privacy-focused conversations.",
    description2: "Runs offline with customizable models and a web-based chat interface.",
    languages: ["Node.js", "GPT4All", "Next.js", "Docker"],
    link: "#",
  },

  {
    title: "Flutter Cross-Platform App",
    description: "A responsive mobile and web application built from a single codebase.",
    description2: "Optimized for performance with adaptive layouts.",
    languages: ["Flutter", "Dart", "Firebase"],
    link: "#",
  },
  {
    title: "AI Automation Dashboard",
    description: "A dashboard for managing automated workflows powered by AI.",
    description2: "Integrates APIs, background jobs, and analytics.",
    languages: ["Next.js", "FastAPI", "Redis", "TypeScript"],
    link: "#",
  },

  
];
