import type { PortfolioContent } from "@/domain/portfolio/types";

export const defaultPortfolio: PortfolioContent = {
  profile: {
    initials: "JG",
    avatarUrl: "",
    name: "Jahongir G.",
    role: "Android Product Engineer",
    location: "Tashkent · Available worldwide",
    email: "hello@example.com",
    availability: "Available for select projects",
    heroLead: "Android products.",
    heroAccent: "Engineered to feel effortless.",
    intro: "Android developer crafting reliable, elegant mobile products with Kotlin, Jetpack Compose and scalable architecture.",
    about: "I design and engineer Android applications that feel native, fast and thoughtfully composed. From product architecture to the smallest motion detail, every decision is made to create software people trust and enjoy using.",
    philosophy: "Complex engineering. Effortless experience.",
    yearsExperience: "5+",
    projectsDelivered: "32",
    socialLinks: [
      { label: "GitHub", href: "https://github.com/" },
      { label: "LinkedIn", href: "https://linkedin.com/" },
      { label: "Telegram", href: "https://t.me/" },
    ],
  },
  skills: [
    { title: "Android Core", skills: ["Kotlin", "Coroutines", "Flow", "Android SDK", "Gradle"], accent: "#b9ff66" },
    { title: "Modern UI", skills: ["Jetpack Compose", "Material 3", "Motion", "Adaptive layouts", "Accessibility"], accent: "#8d7dff" },
    { title: "Architecture", skills: ["Clean Architecture", "MVVM / MVI", "Room", "Retrofit", "Dependency Injection"], accent: "#67d4ff" },
  ],
  experience: [
    { period: "2024 — Present", duration: "2 yrs", role: "Senior Android Developer", company: "Independent Product Lab", companyAbout: "A focused mobile product practice partnering with ambitious digital teams.", companyUrl: "#", location: "Remote", logo: "IP", summary: "Leading Android products from architecture and design systems to store-ready delivery, observability and iterative growth." },
    { period: "2022 — 2024", duration: "2 yrs 3 mos", role: "Android Developer", company: "Mobile Technology Studio", companyAbout: "A multidisciplinary studio building consumer and enterprise mobile applications.", companyUrl: "#", location: "Tashkent", logo: "MT", summary: "Built modular Kotlin applications, migrated legacy screens to Compose and improved release reliability across multiple products." },
    { period: "2020 — 2022", duration: "1 yr 8 mos", role: "Junior Android Engineer", company: "Digital Systems Group", companyAbout: "Product engineering team delivering connected services for regional businesses.", companyUrl: "#", location: "Tashkent", logo: "DS", summary: "Delivered core application features, offline-first data flows, API integrations and a reusable UI component library." },
  ],
  education: [
    { period: "2020 — 2024", degree: "BSc, Software Engineering", school: "Technology University", note: "Software architecture, distributed systems and human-computer interaction." },
    { period: "Ongoing", degree: "Continuous Learning", school: "Independent practice", note: "Creative coding, real-time graphics, product strategy and emerging web standards." },
  ],
  projects: [
    { title: "Orbit Finance", logo: "OF", platform: "Android", category: "Personal finance", year: "2026", summary: "A calm personal finance companion with instant insights, smart budgets and secure offline-first data.", stack: ["Kotlin", "Compose", "Room", "Biometrics"], href: "#", accent: "#b9ff66", screenshots: [{ label: "Overview", tone: "lime" }, { label: "Analytics", tone: "violet" }, { label: "Budget", tone: "blue" }] },
    { title: "Nomad Guide", logo: "NG", platform: "Android", category: "Travel & discovery", year: "2025", summary: "An adaptive travel companion that keeps routes, places and essential trip details available everywhere.", stack: ["Compose", "Maps", "Offline", "MVI"], href: "#", accent: "#8d7dff", screenshots: [{ label: "Discover", tone: "violet" }, { label: "Place", tone: "orange" }, { label: "Route", tone: "lime" }] },
    { title: "Pulse Health", logo: "PH", platform: "Android", category: "Health technology", year: "2025", summary: "A privacy-minded wellbeing tracker designed around useful patterns instead of overwhelming metrics.", stack: ["Kotlin", "Health Connect", "Charts", "WorkManager"], href: "#", accent: "#67d4ff", screenshots: [{ label: "Today", tone: "blue" }, { label: "Activity", tone: "lime" }, { label: "Insights", tone: "violet" }] },
  ],
};
