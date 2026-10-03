"use client";
/* eslint-disable @next/next/no-img-element -- Project artwork can be a browser-generated data URL. */

import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import type { Project } from "@/domain/portfolio/types";

export function AppProjectCard({ project, index, hint, viewLabel }: { project: Project; index: number; hint: string; viewLabel: string }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const screens = project.screenshots?.length ? project.screenshots : [{ label: "Preview", tone: "lime" }];
  const move = (direction: number) => setActive((current) => (current + direction + screens.length) % screens.length);
  useEffect(() => {
    if (paused || screens.length < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setActive((current) => (current + 1) % screens.length), 4600);
    return () => window.clearInterval(timer);
  }, [paused, screens.length]);

  return <article className="app-case reveal" style={{ "--project-accent": project.accent } as React.CSSProperties} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>
    <div className="app-case-copy">
      <div className="app-identity"><span className="app-logo">{project.logoImage ? <img src={project.logoImage} alt={`${project.title} logo`} /> : project.logo ?? project.title.slice(0, 2)}</span><div><small>{project.platform ?? "Android"} · {project.year}</small><h3>{project.title}</h3></div></div>
      <p className="app-category">{project.category}</p><p className="app-summary">{project.summary}</p>
      <div className="project-stack">{project.stack.map((item) => <span key={item}>{item}</span>)}</div>
      <a className="case-link" href={project.href}>{viewLabel}<ArrowUpRight size={17} /></a>
    </div>
    <div className="app-gallery">
      <div className="gallery-top"><span>0{index + 1} / 0{screens.length}</span><span>{hint}</span></div>
      <div className="phone-stage">
        {screens.map((screen, screenIndex) => {
          const relative = (screenIndex - active + screens.length) % screens.length;
          const position = relative === 0 ? "active" : relative === 1 ? "next" : "previous";
          return <div className={`phone-shot phone-${position} tone-${screen.tone}`} key={`${screen.label}-${screenIndex}`}>
            {screen.image ? <img src={screen.image} alt={`${project.title} — ${screen.label}`} /> : <div className="mock-screen"><div className="mock-status" /><div className="mock-hero"><i /><strong>{project.logo}</strong></div><div className="mock-lines"><i /><i /><i /></div><div className="mock-card"><i /><i /></div><span>{screen.label}</span></div>}
          </div>;
        })}
      </div>
      <div className="gallery-controls"><button onClick={() => move(-1)} aria-label="Previous screenshot"><ArrowLeft /></button><div>{screens.map((_, dot) => <button key={dot} onClick={() => setActive(dot)} className={dot === active ? "active" : ""} aria-label={`Screenshot ${dot + 1}`} />)}</div><button onClick={() => move(1)} aria-label="Next screenshot"><ArrowRight /></button></div>
    </div>
  </article>;
}
