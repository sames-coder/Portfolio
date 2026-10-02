export type SocialLink = { label: string; href: string };
export type SkillGroup = { title: string; skills: string[]; accent?: string };
export type Experience = { period: string; duration?: string; role: string; company: string; companyAbout?: string; companyUrl?: string; location?: string; logo?: string; summary: string };
export type Education = { period: string; degree: string; school: string; note: string };
export type ProjectScreenshot = { label: string; image?: string; tone: string };
export type Project = { title: string; logo?: string; category: string; year: string; summary: string; stack: string[]; href: string; accent: string; screenshots?: ProjectScreenshot[]; platform?: string };

export type PortfolioContent = {
  profile: {
    initials: string;
    avatarUrl: string;
    name: string;
    role: string;
    location: string;
    email: string;
    availability: string;
    heroLead: string;
    heroAccent: string;
    intro: string;
    about: string;
    philosophy: string;
    yearsExperience: string;
    projectsDelivered: string;
    socialLinks: SocialLink[];
  };
  skills: SkillGroup[];
  experience: Experience[];
  education: Education[];
  projects: Project[];
};
