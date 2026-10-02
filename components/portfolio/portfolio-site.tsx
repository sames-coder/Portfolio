"use client";

import { useEffect, useRef } from "react";
import { ArrowDown, ArrowUpRight, Code2, Mail, Menu, Network, X } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroScene from "@/components/scene/hero-scene";
import { usePortfolio } from "@/components/content/portfolio-provider";

gsap.registerPlugin(ScrollTrigger);

export function PortfolioSite() {
  const { content } = usePortfolio();
  const { profile } = content;
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const context = gsap.context(() => {
      gsap.from(".hero-copy > *", { opacity: 0, y: 32, duration: 1, stagger: 0.11, ease: "power3.out" });
      gsap.utils.toArray<HTMLElement>(".reveal").forEach((element) => {
        gsap.from(element, { opacity: 0, y: 48, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: element, start: "top 84%", once: true } });
      });
    }, root);
    return () => context.revert();
  }, []);

  const toggleMenu = () => document.documentElement.classList.toggle("menu-open");

  return (
    <main className="site-shell" ref={root}>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Portfolio home"><span className="brand-mark">{profile.initials}</span><span className="brand-copy">{profile.role}</span></a>
        <nav aria-label="Primary navigation" className="desktop-nav">
          <a href="#about">About</a><a href="#work">Work</a><a href="#experience">Experience</a><a href="#contact">Contact</a>
        </nav>
        <a className="availability" href={`mailto:${profile.email}`}><span /> {profile.availability}</a>
        <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle navigation"><Menu className="menu-icon-open" /><X className="menu-icon-close" /></button>
      </header>

      <div className="mobile-menu">
        {[["About", "#about"], ["Work", "#work"], ["Experience", "#experience"], ["Contact", "#contact"]].map(([label, href]) => <a key={href} href={href} onClick={toggleMenu}>{label}</a>)}
      </div>

      <section id="top" className="hero" aria-labelledby="hero-title">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-copy">
          <p className="eyebrow"><span>01</span> Portfolio / 2026</p>
          <h1 id="hero-title">{profile.heroLead}<span>{profile.heroAccent}</span></h1>
          <p className="hero-intro">{profile.intro}</p>
          <div className="hero-actions"><a className="primary-button" href="#work">Explore selected work</a><a className="text-link" href="#about">Meet the developer</a></div>
        </div>
        <div className="scene-wrap" aria-label="Interactive three-dimensional artwork"><HeroScene /><div className="scene-badge"><span>Drag to explore</span><span>WebGL / real-time</span></div></div>
        <div className="hero-footer">
          <div className="socials" aria-label="Social links">
            <a href={profile.socialLinks[0]?.href ?? "#"} aria-label={profile.socialLinks[0]?.label ?? "Code profile"}><Code2 size={17} /></a>
            <a href={profile.socialLinks[1]?.href ?? "#"} aria-label={profile.socialLinks[1]?.label ?? "Network profile"}><Network size={17} /></a>
            <a href={`mailto:${profile.email}`} aria-label="Email"><Mail size={17} /></a>
          </div>
          <a className="scroll-cue" href="#about">Scroll to discover <ArrowDown size={15} /></a>
        </div>
      </section>

      <section id="about" className="section about-section">
        <div className="section-index reveal"><p className="eyebrow"><span>02</span> About</p><p>{profile.location}</p></div>
        <div className="about-main reveal">
          <p className="about-statement">{profile.about}</p>
          <div className="about-detail">
            <div className="avatar-frame">
              {profile.avatarUrl ? <img src={profile.avatarUrl} alt={`${profile.name} portrait`} /> : <span>{profile.initials}</span>}
              <small>Replace portrait in Content Studio</small>
            </div>
            <div><p className="quote">“{profile.philosophy}”</p><p className="body-copy">I care about the invisible details: how quickly a page responds, how naturally motion guides attention, and how well the system grows after launch.</p></div>
          </div>
        </div>
        <div className="stats reveal"><div><strong>{profile.yearsExperience}</strong><span>Years of practice</span></div><div><strong>{profile.projectsDelivered}</strong><span>Projects delivered</span></div><div><strong>∞</strong><span>Curiosity</span></div></div>
      </section>

      <section id="work" className="section work-section">
        <div className="section-heading reveal"><p className="eyebrow"><span>03</span> Selected work</p><h2>Projects with<br /><em>purpose &amp; presence.</em></h2></div>
        <div className="project-list">
          {content.projects.map((project, index) => (
            <a className="project-card reveal" href={project.href} key={`${project.title}-${index}`} style={{ "--project-accent": project.accent } as React.CSSProperties}>
              <div className="project-visual"><span className="project-number">0{index + 1}</span><div className="project-orbit"><i /><i /><i /></div><span className="project-year">{project.year}</span></div>
              <div className="project-info"><div><p>{project.category}</p><h3>{project.title}</h3></div><p className="project-summary">{project.summary}</p><div className="project-stack">{project.stack.map((item) => <span key={item}>{item}</span>)}</div><ArrowUpRight className="project-arrow" /></div>
            </a>
          ))}
        </div>
      </section>

      <section id="skills" className="section skills-section">
        <div className="section-heading reveal"><p className="eyebrow"><span>04</span> Capabilities</p><h2>Built across the<br /><em>whole product.</em></h2></div>
        <div className="skill-grid">
          {content.skills.map((group, index) => <div className="skill-column reveal" key={group.title}><span>0{index + 1}</span><h3>{group.title}</h3><ul>{group.skills.map((skill) => <li key={skill}>{skill}</li>)}</ul></div>)}
        </div>
      </section>

      <section id="experience" className="section timeline-section">
        <div className="section-heading reveal"><p className="eyebrow"><span>05</span> Experience</p><h2>A track record of<br /><em>shipping well.</em></h2></div>
        <div className="timeline">
          {content.experience.map((item, index) => <article className="timeline-row reveal" key={`${item.role}-${index}`}><span>{item.period}</span><div><h3>{item.role}</h3><p className="company">{item.company}</p></div><p>{item.summary}</p></article>)}
        </div>
      </section>

      <section id="education" className="section education-section">
        <div className="section-index reveal"><p className="eyebrow"><span>06</span> Education</p><p>Formal foundations · constant evolution</p></div>
        <div className="education-grid">
          {content.education.map((item, index) => <article className="education-card reveal" key={`${item.degree}-${index}`}><span>{item.period}</span><h3>{item.degree}</h3><p className="company">{item.school}</p><p>{item.note}</p></article>)}
        </div>
      </section>

      <footer id="contact" className="contact-section">
        <div className="contact-glow" />
        <p className="eyebrow reveal"><span>07</span> Start a conversation</p>
        <h2 className="reveal">Have an idea?<br /><em>Let’s make it real.</em></h2>
        <a className="contact-link reveal" href={`mailto:${profile.email}`}>{profile.email}<ArrowUpRight /></a>
        <div className="footer-meta"><span>© 2026 {profile.name}</span><div>{profile.socialLinks.map((link) => <a href={link.href} key={link.label}>{link.label}</a>)}</div><a href="#top">Back to top</a></div>
      </footer>
    </main>
  );
}
