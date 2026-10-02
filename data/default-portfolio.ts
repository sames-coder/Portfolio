import type { PortfolioContent } from "@/domain/portfolio/types";

export const defaultPortfolio: PortfolioContent = {
  profile: {
    initials: "JG",
    avatarUrl: "",
    name: "Jahongir G.",
    role: "Creative Full-stack Developer",
    location: "Tashkent · Available worldwide",
    email: "hello@example.com",
    availability: "Available for select projects",
    heroLead: "I build digital",
    heroAccent: "worlds that feel alive.",
    intro: "Full-stack developer focused on expressive interfaces, thoughtful systems and immersive web experiences.",
    about: "I turn ambitious product ideas into fast, refined digital experiences. My work sits at the intersection of engineering, interaction design and visual storytelling.",
    philosophy: "Useful first. Memorable always.",
    yearsExperience: "5+",
    projectsDelivered: "32",
    socialLinks: [
      { label: "GitHub", href: "https://github.com/" },
      { label: "LinkedIn", href: "https://linkedin.com/" },
      { label: "Telegram", href: "https://t.me/" },
    ],
  },
  skills: [
    { title: "Interface", skills: ["TypeScript", "React", "Next.js", "Three.js", "GSAP"] },
    { title: "Systems", skills: ["Node.js", "PostgreSQL", "REST / GraphQL", "Cloudflare", "Docker"] },
    { title: "Craft", skills: ["Creative direction", "Interaction design", "Motion", "Performance", "Accessibility"] },
  ],
  experience: [
    { period: "2024 — Now", role: "Senior Product Engineer", company: "Independent", summary: "Leading end-to-end product builds for ambitious teams, from systems architecture to polished interface delivery." },
    { period: "2022 — 2024", role: "Frontend Engineer", company: "Digital Product Studio", summary: "Built scalable design systems and interactive web products used across international markets." },
    { period: "2020 — 2022", role: "Full-stack Developer", company: "Technology Lab", summary: "Shipped web applications, internal platforms and API integrations for growing businesses." },
  ],
  education: [
    { period: "2020 — 2024", degree: "BSc, Software Engineering", school: "Technology University", note: "Software architecture, distributed systems and human-computer interaction." },
    { period: "Ongoing", degree: "Continuous Learning", school: "Independent practice", note: "Creative coding, real-time graphics, product strategy and emerging web standards." },
  ],
  projects: [
    { title: "Nexus Commerce", category: "Product platform", year: "2026", summary: "A high-conversion commerce experience with a modular content system and spatial product storytelling.", stack: ["Next.js", "Three.js", "Edge"], href: "#", accent: "#b9ff66" },
    { title: "Atlas Intelligence", category: "AI workspace", year: "2025", summary: "An intelligent research environment that transforms complex inputs into calm, actionable workflows.", stack: ["React", "AI", "PostgreSQL"], href: "#", accent: "#8d7dff" },
    { title: "Mono Finance", category: "Fintech system", year: "2025", summary: "A precise financial dashboard designed around clarity, trust and real-time performance.", stack: ["TypeScript", "Charts", "API"], href: "#", accent: "#ff8a5c" },
  ],
};
