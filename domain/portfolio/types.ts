export type SocialLink = { label: string; href: string };
export type SkillGroup = { title: string; skills: string[] };
export type Experience = { period: string; role: string; company: string; summary: string };
export type Education = { period: string; degree: string; school: string; note: string };
export type Project = { title: string; category: string; year: string; summary: string; stack: string[]; href: string; accent: string };

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
