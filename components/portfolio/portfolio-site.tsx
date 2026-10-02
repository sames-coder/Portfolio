"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight, Code2, Mail, MapPin, Menu, Network, X } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AndroidCoreScene from "@/components/scene/android-core-scene";
import SkillConstellation from "@/components/scene/skill-constellation";
import { AppProjectCard } from "@/components/portfolio/app-project-card";
import { usePortfolio } from "@/components/content/portfolio-provider";
import { contentTranslations, locales, translations, type Locale } from "@/i18n/translations";

gsap.registerPlugin(ScrollTrigger);

export function PortfolioSite() {
  const { content } = usePortfolio();
  const { profile } = content;
  const root = useRef<HTMLElement>(null);
  const [locale, setLocale] = useState<Locale>("en");
  const t = translations[locale];
  const localized = contentTranslations[locale];

  useEffect(() => {
    const saved = window.localStorage.getItem("portfolio-locale") as Locale | null;
    if (saved && locales.some((item) => item.code === saved)) setLocale(saved);
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
    window.localStorage.setItem("portfolio-locale", locale);
  }, [locale]);

  useEffect(() => {
    const context = gsap.context(() => {
      gsap.from(".hero-copy > *, .profile-dock", { opacity: 0, y: 34, duration: 1, stagger: 0.1, ease: "power3.out" });
      gsap.utils.toArray<HTMLElement>(".reveal").forEach((element) => gsap.from(element, { opacity: 0, y: 46, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: element, start: "top 86%", once: true } }));
      gsap.to(".android-watermark", { xPercent: -18, ease: "none", scrollTrigger: { trigger: ".about-section", scrub: 1.2, start: "top bottom", end: "bottom top" } });
    }, root);
    return () => context.revert();
  }, []);

  const chooseLocale = (next: Locale) => setLocale(next);
  const toggleMenu = () => document.documentElement.classList.toggle("menu-open");

  return <main className="site-shell android-portfolio" ref={root}>
    <header className="site-header advanced-header">
      <a className="brand" href="#top" aria-label="Portfolio home"><span className="brand-mark">{profile.initials}</span><span className="brand-copy">{localized.role}</span></a>
      <nav aria-label="Primary navigation" className="desktop-nav">{t.nav.map((label, index) => <a key={label} href={["#about", "#work", "#experience", "#skills", "#contact"][index]}>{label}</a>)}</nav>
      <div className="header-tools"><div className="language-switcher" aria-label="Language">{locales.map((item) => <button key={item.code} className={locale === item.code ? "active" : ""} onClick={() => chooseLocale(item.code)}>{item.label}</button>)}</div><a className="availability" href={`mailto:${profile.email}`}><span /> {t.available}</a></div>
      <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle navigation"><Menu className="menu-icon-open" /><X className="menu-icon-close" /></button>
    </header>

    <div className="mobile-menu">{t.nav.map((label, index) => <a key={label} href={["#about", "#work", "#experience", "#skills", "#contact"][index]} onClick={toggleMenu}>{label}</a>)}<div className="mobile-languages">{locales.map((item) => <button key={item.code} className={locale === item.code ? "active" : ""} onClick={() => chooseLocale(item.code)}>{item.label}</button>)}</div></div>

    <section id="top" className="hero android-hero" aria-labelledby="hero-title">
      <div className="hero-grid" aria-hidden="true" /><span className="hero-vertical-label">Kotlin · Compose · Architecture · Mobile</span>
      <div className="hero-copy">
        <p className="eyebrow"><span>01</span>{t.portfolio}</p>
        <h1 id="hero-title">{localized.heroLead}<span>{localized.heroAccent}</span></h1>
        <p className="hero-intro">{localized.intro}</p>
        <div className="hero-actions"><a className="primary-button" href="#work">{t.explore}</a><a className="text-link" href="#about">{t.meet}</a></div>
      </div>
      <div className="scene-wrap android-scene" aria-label="Interactive Android mobile ecosystem"><AndroidCoreScene /><div className="scene-badge"><span>{t.drag}</span><span>{t.realtime}</span></div></div>
      <aside className="profile-dock">
        <div className="profile-mini-avatar">{profile.avatarUrl ? <img src={profile.avatarUrl} alt={profile.name} /> : <span>{profile.initials}</span>}</div>
        <div><small>{t.about}</small><strong>{profile.name}</strong><span>{localized.role}</span></div>
        <a href="#about" aria-label={t.meet}><ArrowDown size={17} /></a>
      </aside>
      <div className="hero-footer"><div className="socials"><a href={profile.socialLinks[0]?.href ?? "#"} aria-label="GitHub"><Code2 size={17} /></a><a href={profile.socialLinks[1]?.href ?? "#"} aria-label="LinkedIn"><Network size={17} /></a><a href={`mailto:${profile.email}`} aria-label="Email"><Mail size={17} /></a></div><span className="system-status"><i /> Android systems online</span></div>
    </section>

    <section id="about" className="section about-section android-about">
      <span className="android-watermark" aria-hidden="true">ANDROID</span>
      <div className="section-index reveal"><p className="eyebrow"><span>02</span>{t.about}</p><p><MapPin size={13} /> {profile.location}</p></div>
      <div className="about-layout">
        <div className="portrait-panel reveal"><div className="portrait-frame">{profile.avatarUrl ? <img src={profile.avatarUrl} alt={`${profile.name} portrait`} /> : <div className="portrait-placeholder"><span>{profile.initials}</span><i /></div>}<div className="portrait-caption"><span>{profile.name}</span><small>{localized.role}</small></div></div><div className="portrait-orbit"><i /><span>Kotlin first</span></div></div>
        <div className="about-content reveal"><p className="about-statement">{localized.about}</p><div className="about-quote"><span>“</span><p>{localized.philosophy}</p></div><p className="body-copy">{t.detail}</p></div>
      </div>
      <div className="stats reveal"><div><strong>{profile.yearsExperience}</strong><span>{t.practice}</span></div><div><strong>{profile.projectsDelivered}</strong><span>{t.shipped}</span></div><div><strong>100%</strong><span>{t.focus}<b>{t.focusValue}</b></span></div></div>
    </section>

    <section id="work" className="section work-section android-work">
      <div className="section-heading reveal"><p className="eyebrow"><span>03</span>{t.projects}</p><h2>{t.projectsTitle}<br /><em>{t.projectsAccent}</em></h2></div>
      <div className="app-case-list">{content.projects.map((project, index) => <AppProjectCard project={{ ...project, category: localized.projects[index]?.category ?? project.category, summary: localized.projects[index]?.summary ?? project.summary }} index={index} hint={t.projectHint} viewLabel={t.viewCase} key={`${project.title}-${index}`} />)}</div>
    </section>

    <section id="experience" className="section experience-section">
      <div className="section-heading reveal"><p className="eyebrow"><span>04</span>{t.experience}</p><h2>{t.experienceTitle}<br /><em>{t.experienceAccent}</em></h2></div>
      <div className="experience-rail">
        {content.experience.map((item, index) => <article className={`experience-card reveal ${index === 0 ? "current" : ""}`} key={`${item.role}-${index}`}>
          <div className="experience-side"><span className="company-logo">{item.logo ?? item.company.slice(0, 2)}</span><span className="experience-index">0{index + 1}</span></div>
          <div className="experience-main"><div className="experience-meta"><span>{item.period}</span><span>{item.duration}</span><span>{item.location}</span></div><h3>{localized.experience[index]?.role ?? item.role}</h3><a href={item.companyUrl ?? "#"} className="experience-company">{item.company}<ArrowUpRight size={16} /></a><p className="company-about">{localized.experience[index]?.companyAbout ?? item.companyAbout}</p><p className="experience-summary">{localized.experience[index]?.summary ?? item.summary}</p></div>
          {index === 0 && <span className="current-badge"><i />{t.present}</span>}
        </article>)}
      </div>
    </section>

    <section id="skills" className="section android-skills">
      <div className="section-heading reveal"><p className="eyebrow"><span>05</span>{t.skills}</p><h2>{t.skillsTitle}<br /><em>{t.skillsAccent}</em></h2></div>
      <div className="skills-system reveal"><div className="skills-canvas"><SkillConstellation /><span>{t.skillsHint}</span></div><div className="skill-stack">{content.skills.map((group, index) => <article key={group.title} style={{ "--skill-accent": group.accent ?? "#b9ff66" } as React.CSSProperties}><div><span>0{index + 1}</span><i /></div><h3>{group.title}</h3><ul>{group.skills.map((skill) => <li key={skill}>{skill}<span /></li>)}</ul></article>)}</div></div>
    </section>

    <section id="education" className="section education-section android-education">
      <div className="section-index reveal"><p className="eyebrow"><span>06</span>{t.education}</p><p>{t.educationHint}</p></div>
      <div className="education-grid">{content.education.map((item, index) => <article className="education-card reveal" key={`${item.degree}-${index}`}><div className="education-number">0{index + 1}</div><span>{item.period}</span><h3>{localized.education[index]?.degree ?? item.degree}</h3><p className="company">{item.school}</p><p>{localized.education[index]?.note ?? item.note}</p><div className="education-line" /></article>)}</div>
    </section>

    <footer id="contact" className="contact-section android-contact"><div className="contact-glow" /><div className="contact-code" aria-hidden="true">&lt;/connect&gt;</div><p className="eyebrow reveal"><span>07</span>{t.contact}</p><h2 className="reveal">{t.contactTitle}<br /><em>{t.contactAccent}</em></h2><a className="contact-link reveal" href={`mailto:${profile.email}`}>{profile.email}<ArrowUpRight /></a><div className="footer-meta"><span>© 2026 {profile.name}</span><div>{profile.socialLinks.map((link) => <a href={link.href} key={link.label}>{link.label}</a>)}</div><a href="#top">{t.back}</a></div></footer>
  </main>;
}
