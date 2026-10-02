"use client";

import { useRef } from "react";
import Link from "next/link";
import { Download, Eye, Plus, RotateCcw, Trash2, Upload } from "lucide-react";
import { PortfolioProvider, usePortfolio } from "@/components/content/portfolio-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { defaultPortfolio } from "@/data/default-portfolio";
import type { Education, Experience, PortfolioContent, Project, SkillGroup } from "@/domain/portfolio/types";
import { clearPortfolio } from "@/lib/portfolio-storage";

const emptyProject: Project = { title: "New project", category: "Category", year: "2026", summary: "Project summary", stack: ["React"], href: "#", accent: "#b9ff66" };
const emptyExperience: Experience = { period: "2026 — Now", role: "Role", company: "Company", summary: "What you achieved in this role." };
const emptyEducation: Education = { period: "2026", degree: "Program", school: "Institution", note: "What you studied." };
const emptySkill: SkillGroup = { title: "New group", skills: ["Skill one", "Skill two"] };

function Field({ label, value, onChange, multiline = false }: { label: string; value: string; onChange: (value: string) => void; multiline?: boolean }) {
  return <label className="studio-field"><span>{label}</span>{multiline ? <Textarea value={value} onChange={(event) => onChange(event.target.value)} /> : <Input value={value} onChange={(event) => onChange(event.target.value)} />}</label>;
}

function StudioInner() {
  const { content, setContent } = usePortfolio();
  const fileInput = useRef<HTMLInputElement>(null);
  const updateProfile = (key: keyof PortfolioContent["profile"], value: string) => setContent({ ...content, profile: { ...content.profile, [key]: value } });
  const updateArray = <K extends "projects" | "experience" | "education" | "skills">(key: K, index: number, item: PortfolioContent[K][number]) => {
    const list = [...content[key]] as PortfolioContent[K];
    list[index] = item as never;
    setContent({ ...content, [key]: list });
  };
  const removeItem = (key: "projects" | "experience" | "education" | "skills", index: number) => setContent({ ...content, [key]: content[key].filter((_, itemIndex) => itemIndex !== index) });
  const exportContent = () => {
    const blob = new Blob([JSON.stringify(content, null, 2)], { type: "application/json" });
    const anchor = document.createElement("a"); anchor.href = URL.createObjectURL(blob); anchor.download = "portfolio-content.json"; anchor.click(); URL.revokeObjectURL(anchor.href);
  };
  const importContent = async (file?: File) => {
    if (!file) return;
    try { setContent(JSON.parse(await file.text()) as PortfolioContent); } catch { window.alert("This JSON file is not valid portfolio content."); }
  };
  const reset = () => { if (window.confirm("Restore the starter content? Your browser draft will be removed.")) { clearPortfolio(); setContent(defaultPortfolio); } };

  return (
    <main className="studio-shell">
      <aside className="studio-sidebar">
        <div><span className="brand-mark">{content.profile.initials}</span><div><strong>Content Studio</strong><small>Local-first portfolio editor</small></div></div>
        <p>Changes save instantly in this browser. Export the final JSON to keep a portable backup.</p>
        <div className="studio-actions">
          <Button asChild><Link href="/" target="_blank"><Eye /> Preview portfolio</Link></Button>
          <Button variant="outline" onClick={exportContent}><Download /> Export JSON</Button>
          <Button variant="outline" onClick={() => fileInput.current?.click()}><Upload /> Import JSON</Button>
          <input ref={fileInput} type="file" accept="application/json" hidden onChange={(event) => importContent(event.target.files?.[0])} />
          <Button variant="ghost" onClick={reset}><RotateCcw /> Restore starter</Button>
        </div>
        <div className="studio-note"><strong>No backend required</strong><span>Your content stays private on this device until you export and publish it.</span></div>
      </aside>

      <section className="studio-workspace">
        <header><div><p>Portfolio management</p><h1>Edit your story.</h1></div><span className="saved-state"><i /> Saved locally</span></header>
        <Tabs defaultValue="profile" className="studio-tabs">
          <TabsList><TabsTrigger value="profile">Profile</TabsTrigger><TabsTrigger value="projects">Projects</TabsTrigger><TabsTrigger value="experience">Experience</TabsTrigger><TabsTrigger value="education">Education</TabsTrigger><TabsTrigger value="skills">Skills</TabsTrigger></TabsList>

          <TabsContent value="profile" className="studio-panel">
            <div className="panel-heading"><div><h2>Profile & hero</h2><p>The core identity and opening message visitors see first.</p></div></div>
            <div className="studio-grid">
              <Field label="Display name" value={content.profile.name} onChange={(v) => updateProfile("name", v)} />
              <Field label="Initials" value={content.profile.initials} onChange={(v) => updateProfile("initials", v)} />
              <Field label="Professional role" value={content.profile.role} onChange={(v) => updateProfile("role", v)} />
              <Field label="Location" value={content.profile.location} onChange={(v) => updateProfile("location", v)} />
              <Field label="Email" value={content.profile.email} onChange={(v) => updateProfile("email", v)} />
              <Field label="Availability" value={content.profile.availability} onChange={(v) => updateProfile("availability", v)} />
              <Field label="Hero first line" value={content.profile.heroLead} onChange={(v) => updateProfile("heroLead", v)} />
              <Field label="Hero accent line" value={content.profile.heroAccent} onChange={(v) => updateProfile("heroAccent", v)} />
              <Field label="Avatar image URL" value={content.profile.avatarUrl} onChange={(v) => updateProfile("avatarUrl", v)} />
              <Field label="Years of experience" value={content.profile.yearsExperience} onChange={(v) => updateProfile("yearsExperience", v)} />
              <Field label="Projects delivered" value={content.profile.projectsDelivered} onChange={(v) => updateProfile("projectsDelivered", v)} />
              <Field label="Personal philosophy" value={content.profile.philosophy} onChange={(v) => updateProfile("philosophy", v)} />
              <div className="studio-span"><Field label="Short introduction" value={content.profile.intro} onChange={(v) => updateProfile("intro", v)} multiline /></div>
              <div className="studio-span"><Field label="About paragraph" value={content.profile.about} onChange={(v) => updateProfile("about", v)} multiline /></div>
            </div>
          </TabsContent>

          <TabsContent value="projects" className="studio-panel">
            <div className="panel-heading"><div><h2>Selected projects</h2><p>Curate your strongest work and the story behind each build.</p></div><Button onClick={() => setContent({ ...content, projects: [...content.projects, emptyProject] })}><Plus /> Add project</Button></div>
            <div className="editor-list">{content.projects.map((project, index) => <div className="editor-card" key={index}><div className="editor-card-title"><strong>0{index + 1} · {project.title}</strong><Button size="icon" variant="ghost" onClick={() => removeItem("projects", index)} aria-label="Remove project"><Trash2 /></Button></div><div className="studio-grid"><Field label="Title" value={project.title} onChange={(v) => updateArray("projects", index, { ...project, title: v })} /><Field label="Category" value={project.category} onChange={(v) => updateArray("projects", index, { ...project, category: v })} /><Field label="Year" value={project.year} onChange={(v) => updateArray("projects", index, { ...project, year: v })} /><Field label="Project URL" value={project.href} onChange={(v) => updateArray("projects", index, { ...project, href: v })} /><Field label="Accent color" value={project.accent} onChange={(v) => updateArray("projects", index, { ...project, accent: v })} /><Field label="Stack, comma separated" value={project.stack.join(", ")} onChange={(v) => updateArray("projects", index, { ...project, stack: v.split(",").map((item) => item.trim()).filter(Boolean) })} /><div className="studio-span"><Field label="Summary" value={project.summary} onChange={(v) => updateArray("projects", index, { ...project, summary: v })} multiline /></div></div></div>)}</div>
          </TabsContent>

          <TabsContent value="experience" className="studio-panel">
            <div className="panel-heading"><div><h2>Experience</h2><p>Show roles, impact and progression.</p></div><Button onClick={() => setContent({ ...content, experience: [...content.experience, emptyExperience] })}><Plus /> Add role</Button></div>
            <div className="editor-list">{content.experience.map((item, index) => <div className="editor-card" key={index}><div className="editor-card-title"><strong>{item.role}</strong><Button size="icon" variant="ghost" onClick={() => removeItem("experience", index)}><Trash2 /></Button></div><div className="studio-grid"><Field label="Period" value={item.period} onChange={(v) => updateArray("experience", index, { ...item, period: v })} /><Field label="Role" value={item.role} onChange={(v) => updateArray("experience", index, { ...item, role: v })} /><Field label="Company" value={item.company} onChange={(v) => updateArray("experience", index, { ...item, company: v })} /><div className="studio-span"><Field label="Summary" value={item.summary} onChange={(v) => updateArray("experience", index, { ...item, summary: v })} multiline /></div></div></div>)}</div>
          </TabsContent>

          <TabsContent value="education" className="studio-panel">
            <div className="panel-heading"><div><h2>Education</h2><p>Degrees, certifications and meaningful learning.</p></div><Button onClick={() => setContent({ ...content, education: [...content.education, emptyEducation] })}><Plus /> Add education</Button></div>
            <div className="editor-list">{content.education.map((item, index) => <div className="editor-card" key={index}><div className="editor-card-title"><strong>{item.degree}</strong><Button size="icon" variant="ghost" onClick={() => removeItem("education", index)}><Trash2 /></Button></div><div className="studio-grid"><Field label="Period" value={item.period} onChange={(v) => updateArray("education", index, { ...item, period: v })} /><Field label="Program" value={item.degree} onChange={(v) => updateArray("education", index, { ...item, degree: v })} /><Field label="Institution" value={item.school} onChange={(v) => updateArray("education", index, { ...item, school: v })} /><div className="studio-span"><Field label="Note" value={item.note} onChange={(v) => updateArray("education", index, { ...item, note: v })} multiline /></div></div></div>)}</div>
          </TabsContent>

          <TabsContent value="skills" className="studio-panel">
            <div className="panel-heading"><div><h2>Skills</h2><p>Group capabilities so they are easy to scan.</p></div><Button onClick={() => setContent({ ...content, skills: [...content.skills, emptySkill] })}><Plus /> Add group</Button></div>
            <div className="editor-list">{content.skills.map((group, index) => <div className="editor-card" key={index}><div className="editor-card-title"><strong>{group.title}</strong><Button size="icon" variant="ghost" onClick={() => removeItem("skills", index)}><Trash2 /></Button></div><div className="studio-grid"><Field label="Group title" value={group.title} onChange={(v) => updateArray("skills", index, { ...group, title: v })} /><Field label="Skills, comma separated" value={group.skills.join(", ")} onChange={(v) => updateArray("skills", index, { ...group, skills: v.split(",").map((item) => item.trim()).filter(Boolean) })} /></div></div>)}</div>
          </TabsContent>
        </Tabs>
      </section>
    </main>
  );
}

export function ContentStudio() { return <PortfolioProvider><StudioInner /></PortfolioProvider>; }
