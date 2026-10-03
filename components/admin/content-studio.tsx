"use client";
/* eslint-disable @next/next/no-img-element -- Local previews use browser-generated data URLs. */

import { type FormEvent, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Download, Eye, ImagePlus, LockKeyhole, LogOut, Plus, RotateCcw, Save, ShieldCheck, Trash2, Upload, X } from "lucide-react";
import { toast } from "sonner";
import { PortfolioProvider, usePortfolio } from "@/components/content/portfolio-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Toaster } from "@/components/ui/sonner";
import { defaultPortfolio } from "@/data/default-portfolio";
import type { Education, Experience, PortfolioContent, Project, SkillGroup } from "@/domain/portfolio/types";
import { optimizeDataUrl, optimizeImage } from "@/lib/image-upload";

const emptyProject: Project = { title: "Yangi ilova", logo: "YA", platform: "Android", category: "Ilova kategoriyasi", year: "2026", summary: "Loyiha haqida qisqa va aniq ma’lumot.", stack: ["Kotlin", "Compose"], href: "#", accent: "#b9ff66", screenshots: [] };
const emptyExperience: Experience = { period: "2026 — Hozir", duration: "1 yil", role: "Android Developer", company: "Kompaniya", companyAbout: "Kompaniya haqida qisqa ma’lumot.", companyUrl: "#", location: "Masofaviy", logo: "KO", summary: "Bu lavozimdagi asosiy natijalaringiz." };
const emptyEducation: Education = { period: "2026", degree: "Yo‘nalish", school: "Ta’lim muassasasi", note: "O‘rgangan bilimlaringiz." };
const emptySkill: SkillGroup = { title: "Yangi guruh", skills: ["Ko‘nikma 1", "Ko‘nikma 2"] };

function Field({ label, value, onChange, multiline = false, hint }: { label: string; value: string; onChange: (value: string) => void; multiline?: boolean; hint?: string }) {
  return <label className="studio-field"><span>{label}</span>{multiline ? <Textarea value={value} onChange={(event) => onChange(event.target.value)} /> : <Input value={value} onChange={(event) => onChange(event.target.value)} />}{hint && <small>{hint}</small>}</label>;
}

function UploadField({ id, label, image, onUpload, onRemove, multiple = false }: { id: string; label: string; image?: string; onUpload: (files: FileList) => void; onRemove?: () => void; multiple?: boolean }) {
  return <div className="upload-field"><span>{label}</span><div className="upload-control">{image ? <div className="upload-preview"><img src={image} alt="Yuklangan rasm" /><button type="button" onClick={onRemove} aria-label="Rasmni o‘chirish"><X /></button></div> : <div className="upload-placeholder"><ImagePlus /><small>PNG, JPG yoki WEBP</small></div>}<label htmlFor={id} className="upload-button"><Upload />{multiple ? "Rasmlarni tanlash" : image ? "Rasmni almashtirish" : "Rasm yuklash"}</label><input id={id} type="file" accept="image/png,image/jpeg,image/webp" multiple={multiple} hidden onChange={(event) => event.target.files && onUpload(event.target.files)} /></div></div>;
}

function StudioInner({ localMode = false, onLogout }: { localMode?: boolean; onLogout?: () => void }) {
  const { content, isHydrated, setContent, saveContent } = usePortfolio();
  const [hasChanges, setHasChanges] = useState(false);
  const [needsInitialPublish, setNeedsInitialPublish] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (localMode || !isHydrated) return;
    let active = true;
    void fetch("/api/portfolio", { cache: "no-store", credentials: "same-origin" }).then((response) => {
      if (!active || response.status !== 404) return;
      setNeedsInitialPublish(true);
      setHasChanges(true);
      toast.info("Serverga birinchi nashr tayyor", { description: "Ushbu brauzerdagi kontentni barcha qurilmalarga chiqarish uchun Saqlash tugmasini bosing." });
    }).catch(() => undefined);
    return () => { active = false; };
  }, [isHydrated, localMode]);

  const changeContent = (next: PortfolioContent) => { setContent(next); setHasChanges(true); };
  const updateProfile = (key: keyof PortfolioContent["profile"], value: string) => changeContent({ ...content, profile: { ...content.profile, [key]: value } });
  const updateArray = <K extends "projects" | "experience" | "education" | "skills">(key: K, index: number, item: PortfolioContent[K][number]) => {
    const list = [...content[key]] as PortfolioContent[K];
    list[index] = item as never;
    changeContent({ ...content, [key]: list });
  };
  const removeItem = (key: "projects" | "experience" | "education" | "skills", index: number) => changeContent({ ...content, [key]: content[key].filter((_, itemIndex) => itemIndex !== index) });

  const compactImages = async (source: PortfolioContent): Promise<PortfolioContent> => ({
    ...source,
    profile: { ...source.profile, avatarUrl: await optimizeDataUrl(source.profile.avatarUrl, "avatar") ?? "" },
    projects: await Promise.all(source.projects.map(async (project) => ({
      ...project,
      logoImage: await optimizeDataUrl(project.logoImage, "logo"),
      screenshots: await Promise.all((project.screenshots ?? []).map(async (screen) => ({ ...screen, image: await optimizeDataUrl(screen.image, "screenshot") }))),
    }))),
    experience: await Promise.all(source.experience.map(async (item) => ({ ...item, logoImage: await optimizeDataUrl(item.logoImage, "logo") }))),
  });
  const save = async () => {
    setIsSaving(true);
    try {
      const optimized = await compactImages(content);
      setContent(optimized);
      const saved = await saveContent(optimized);
      setContent(saved);
      setHasChanges(false);
      setNeedsInitialPublish(false);
      toast.success("Barcha o‘zgarishlar saqlandi", { description: "Rasmlar avtomatik optimallashtirildi va portfolio yangilandi." });
    } catch (error) {
      toast.error("Saqlash amalga oshmadi", { description: error instanceof Error ? error.message : "Brauzer ma’lumotlar bazasiga yozib bo‘lmadi." });
    } finally {
      setIsSaving(false);
    }
  };
  const exportContent = () => {
    const blob = new Blob([JSON.stringify(content, null, 2)], { type: "application/json" });
    const anchor = document.createElement("a"); anchor.href = URL.createObjectURL(blob); anchor.download = "portfolio-content.json"; anchor.click(); URL.revokeObjectURL(anchor.href);
    toast.success("JSON nusxa yuklandi");
  };
  const importContent = async (file?: File) => {
    if (!file) return;
    try { changeContent(JSON.parse(await file.text()) as PortfolioContent); toast.info("Ma’lumotlar yuklandi", { description: "Tasdiqlash uchun Saqlash tugmasini bosing." }); }
    catch { toast.error("JSON fayl noto‘g‘ri yoki buzilgan."); }
  };
  const reset = () => {
    if (!window.confirm("Boshlang‘ich ma’lumotlarni qaytarmoqchimisiz?")) return;
    changeContent(defaultPortfolio);
    toast.info("Boshlang‘ich ma’lumotlar tayyor", { description: "Tasdiqlash uchun Saqlash tugmasini bosing." });
  };
  const uploadAvatar = async (files: FileList) => {
    try { updateProfile("avatarUrl", await optimizeImage(files[0], "avatar")); toast.success("Avatar tayyorlandi"); }
    catch (error) { toast.error(error instanceof Error ? error.message : "Rasmni yuklab bo‘lmadi."); }
  };
  const uploadProjectLogo = async (project: Project, index: number, files: FileList) => {
    try { updateArray("projects", index, { ...project, logoImage: await optimizeImage(files[0], "logo") }); }
    catch (error) { toast.error(error instanceof Error ? error.message : "Logo yuklanmadi."); }
  };
  const uploadScreens = async (project: Project, index: number, files: FileList) => {
    try {
      const uploaded = await Promise.all(Array.from(files).map(async (file, screenIndex) => ({ label: file.name.replace(/\.[^.]+$/, ""), tone: ["lime", "violet", "blue", "orange"][screenIndex % 4], image: await optimizeImage(file, "screenshot") })));
      updateArray("projects", index, { ...project, screenshots: [...(project.screenshots ?? []), ...uploaded] });
      toast.success(`${uploaded.length} ta screenshot tayyorlandi`);
    } catch (error) { toast.error(error instanceof Error ? error.message : "Screenshotlar yuklanmadi."); }
  };
  const uploadExperienceLogo = async (item: Experience, index: number, files: FileList) => {
    try { updateArray("experience", index, { ...item, logoImage: await optimizeImage(files[0], "logo") }); }
    catch (error) { toast.error(error instanceof Error ? error.message : "Logo yuklanmadi."); }
  };

  return <>
    <main className="studio-shell">
      <aside className="studio-sidebar">
        <div><span className="brand-mark">{content.profile.initials}</span><div><strong>Portfolio boshqaruvi</strong><small>{localMode ? "Mahalliy ishlab chiqish rejimi" : "Xavfsiz server muharriri"}</small></div></div>
        <p>Ma’lumotlarni tahrirlang, rasmlarni kompyuterdan yuklang va barcha qurilmalar uchun bitta umumiy nusxani saqlang.</p>
        <div className="studio-actions">
          <Button asChild><Link href="/" target="_blank"><Eye /> Portfolioni ko‘rish</Link></Button>
          <Button variant="outline" onClick={exportContent}><Download /> JSON nusxa olish</Button>
          <Button variant="outline" onClick={() => fileInput.current?.click()}><Upload /> JSON yuklash</Button>
          <input ref={fileInput} type="file" accept="application/json" hidden onChange={(event) => importContent(event.target.files?.[0])} />
          <Button variant="ghost" onClick={reset}><RotateCcw /> Boshlang‘ich holat</Button>
          {onLogout && <Button variant="ghost" onClick={onLogout}><LogOut /> Tizimdan chiqish</Button>}
        </div>
        <div className="studio-note"><strong>{localMode ? "Mahalliy rejim" : "Netlify Blobs faol"}</strong><span>{localMode ? "Ma’lumotlar faqat ushbu brauzerning IndexedDB xotirasiga yoziladi." : "Matn va rasmlar xavfsiz server xotirasiga yozilib, barcha tashrifchilarga bir xil ko‘rsatiladi."}</span></div>
      </aside>

      <section className="studio-workspace">
        <header><div><p>Portfolio boshqaruvi</p><h1>Kontentni tahrirlash.</h1></div><div className={`saved-state ${hasChanges ? "unsaved" : ""}`}><i />{hasChanges ? "Saqlanmagan o‘zgarishlar" : "Barcha ma’lumot saqlangan"}</div></header>
        <Tabs defaultValue="profile" className="studio-tabs">
          <TabsList><TabsTrigger value="profile">Profil</TabsTrigger><TabsTrigger value="projects">Loyihalar</TabsTrigger><TabsTrigger value="experience">Tajriba</TabsTrigger><TabsTrigger value="education">Ta’lim</TabsTrigger><TabsTrigger value="skills">Ko‘nikmalar</TabsTrigger></TabsList>

          <TabsContent value="profile" className="studio-panel">
            <div className="panel-heading"><div><h2>Profil va bosh ekran</h2><p>Tashrifchi birinchi ko‘radigan asosiy ma’lumotlar.</p></div></div>
            <div className="studio-grid">
              <div className="studio-span"><UploadField id="avatar-upload" label="Avatar rasmi" image={content.profile.avatarUrl} onUpload={uploadAvatar} onRemove={() => updateProfile("avatarUrl", "")} /></div>
              <Field label="Ism va familiya" value={content.profile.name} onChange={(v) => updateProfile("name", v)} />
              <Field label="Initsiallar" value={content.profile.initials} onChange={(v) => updateProfile("initials", v)} hint="Avatar bo‘lmaganda ko‘rsatiladi." />
              <Field label="Professional yo‘nalish" value={content.profile.role} onChange={(v) => updateProfile("role", v)} />
              <Field label="Joylashuv" value={content.profile.location} onChange={(v) => updateProfile("location", v)} />
              <Field label="Email" value={content.profile.email} onChange={(v) => updateProfile("email", v)} />
              <Field label="Ish uchun holat" value={content.profile.availability} onChange={(v) => updateProfile("availability", v)} />
              <Field label="Hero — birinchi qator" value={content.profile.heroLead} onChange={(v) => updateProfile("heroLead", v)} />
              <Field label="Hero — ajratilgan qator" value={content.profile.heroAccent} onChange={(v) => updateProfile("heroAccent", v)} />
              <Field label="Tajriba yillari" value={content.profile.yearsExperience} onChange={(v) => updateProfile("yearsExperience", v)} />
              <Field label="Yakunlangan loyihalar" value={content.profile.projectsDelivered} onChange={(v) => updateProfile("projectsDelivered", v)} />
              <div className="studio-span"><Field label="Qisqa tanishtiruv" value={content.profile.intro} onChange={(v) => updateProfile("intro", v)} multiline /></div>
              <div className="studio-span"><Field label="Men haqimda" value={content.profile.about} onChange={(v) => updateProfile("about", v)} multiline /></div>
              <div className="studio-span"><Field label="Shaxsiy tamoyil" value={content.profile.philosophy} onChange={(v) => updateProfile("philosophy", v)} /></div>
            </div>
          </TabsContent>

          <TabsContent value="projects" className="studio-panel">
            <div className="panel-heading"><div><h2>Tanlangan loyihalar</h2><p>Ilova logosi, tafsilotlari va haqiqiy screenshotlarini kiriting.</p></div><Button onClick={() => changeContent({ ...content, projects: [...content.projects, emptyProject] })}><Plus /> Loyiha qo‘shish</Button></div>
            <div className="editor-list">{content.projects.map((project, index) => <div className="editor-card" key={index}>
              <div className="editor-card-title"><strong>0{index + 1} · {project.title}</strong><Button size="icon" variant="ghost" onClick={() => removeItem("projects", index)} aria-label="Loyihani o‘chirish"><Trash2 /></Button></div>
              <div className="studio-grid">
                <UploadField id={`project-logo-${index}`} label="Ilova logosi" image={project.logoImage} onUpload={(files) => uploadProjectLogo(project, index, files)} onRemove={() => updateArray("projects", index, { ...project, logoImage: "" })} />
                <Field label="Logo uchun qisqa harflar" value={project.logo ?? ""} onChange={(v) => updateArray("projects", index, { ...project, logo: v })} hint="Logo rasmi bo‘lmaganda ishlatiladi." />
                <Field label="Loyiha nomi" value={project.title} onChange={(v) => updateArray("projects", index, { ...project, title: v })} />
                <Field label="Platforma" value={project.platform ?? "Android"} onChange={(v) => updateArray("projects", index, { ...project, platform: v })} />
                <Field label="Kategoriya" value={project.category} onChange={(v) => updateArray("projects", index, { ...project, category: v })} />
                <Field label="Yil" value={project.year} onChange={(v) => updateArray("projects", index, { ...project, year: v })} />
                <Field label="Loyiha havolasi" value={project.href} onChange={(v) => updateArray("projects", index, { ...project, href: v })} />
                <Field label="Aksent rang" value={project.accent} onChange={(v) => updateArray("projects", index, { ...project, accent: v })} />
                <div className="studio-span"><Field label="Texnologiyalar (vergul bilan)" value={project.stack.join(", ")} onChange={(v) => updateArray("projects", index, { ...project, stack: v.split(",").map((item) => item.trim()).filter(Boolean) })} /></div>
                <div className="studio-span"><Field label="Loyiha tavsifi" value={project.summary} onChange={(v) => updateArray("projects", index, { ...project, summary: v })} multiline /></div>
                <div className="studio-span"><UploadField id={`project-screens-${index}`} label="Ilova screenshotlari" multiple onUpload={(files) => uploadScreens(project, index, files)} /></div>
                {!!project.screenshots?.length && <div className="studio-span screen-manager">{project.screenshots.map((screen, screenIndex) => <div key={`${screen.label}-${screenIndex}`}>{screen.image ? <img src={screen.image} alt={screen.label} /> : <span>{screen.label}</span>}<Input value={screen.label} onChange={(event) => updateArray("projects", index, { ...project, screenshots: project.screenshots?.map((item, itemIndex) => itemIndex === screenIndex ? { ...item, label: event.target.value } : item) })} /><button type="button" onClick={() => updateArray("projects", index, { ...project, screenshots: project.screenshots?.filter((_, itemIndex) => itemIndex !== screenIndex) })}><Trash2 /></button></div>)}</div>}
              </div>
            </div>)}</div>
          </TabsContent>

          <TabsContent value="experience" className="studio-panel">
            <div className="panel-heading"><div><h2>Ish tajribasi</h2><p>Lavozim, kompaniya va erishilgan natijalarni ko‘rsating.</p></div><Button onClick={() => changeContent({ ...content, experience: [...content.experience, emptyExperience] })}><Plus /> Tajriba qo‘shish</Button></div>
            <div className="editor-list">{content.experience.map((item, index) => <div className="editor-card" key={index}>
              <div className="editor-card-title"><strong>{item.role}</strong><Button size="icon" variant="ghost" onClick={() => removeItem("experience", index)} aria-label="Tajribani o‘chirish"><Trash2 /></Button></div>
              <div className="studio-grid">
                <UploadField id={`experience-logo-${index}`} label="Kompaniya logosi" image={item.logoImage} onUpload={(files) => uploadExperienceLogo(item, index, files)} onRemove={() => updateArray("experience", index, { ...item, logoImage: "" })} />
                <Field label="Logo uchun qisqa harflar" value={item.logo ?? ""} onChange={(v) => updateArray("experience", index, { ...item, logo: v })} />
                <Field label="Davr" value={item.period} onChange={(v) => updateArray("experience", index, { ...item, period: v })} />
                <Field label="Davomiyligi" value={item.duration ?? ""} onChange={(v) => updateArray("experience", index, { ...item, duration: v })} />
                <Field label="Lavozim" value={item.role} onChange={(v) => updateArray("experience", index, { ...item, role: v })} />
                <Field label="Kompaniya" value={item.company} onChange={(v) => updateArray("experience", index, { ...item, company: v })} />
                <Field label="Joylashuv" value={item.location ?? ""} onChange={(v) => updateArray("experience", index, { ...item, location: v })} />
                <Field label="Kompaniya havolasi" value={item.companyUrl ?? ""} onChange={(v) => updateArray("experience", index, { ...item, companyUrl: v })} />
                <div className="studio-span"><Field label="Kompaniya haqida" value={item.companyAbout ?? ""} onChange={(v) => updateArray("experience", index, { ...item, companyAbout: v })} multiline /></div>
                <div className="studio-span"><Field label="Sizning natijangiz" value={item.summary} onChange={(v) => updateArray("experience", index, { ...item, summary: v })} multiline /></div>
              </div>
            </div>)}</div>
          </TabsContent>

          <TabsContent value="education" className="studio-panel">
            <div className="panel-heading"><div><h2>Ta’lim</h2><p>Asosiy ta’lim, kurs va sertifikatlar.</p></div><Button onClick={() => changeContent({ ...content, education: [...content.education, emptyEducation] })}><Plus /> Ta’lim qo‘shish</Button></div>
            <div className="editor-list">{content.education.map((item, index) => <div className="editor-card" key={index}><div className="editor-card-title"><strong>{item.degree}</strong><Button size="icon" variant="ghost" onClick={() => removeItem("education", index)}><Trash2 /></Button></div><div className="studio-grid"><Field label="Davr" value={item.period} onChange={(v) => updateArray("education", index, { ...item, period: v })} /><Field label="Yo‘nalish yoki kurs" value={item.degree} onChange={(v) => updateArray("education", index, { ...item, degree: v })} /><Field label="Ta’lim muassasasi" value={item.school} onChange={(v) => updateArray("education", index, { ...item, school: v })} /><div className="studio-span"><Field label="Izoh" value={item.note} onChange={(v) => updateArray("education", index, { ...item, note: v })} multiline /></div></div></div>)}</div>
          </TabsContent>

          <TabsContent value="skills" className="studio-panel">
            <div className="panel-heading"><div><h2>Ko‘nikmalar</h2><p>Texnologiyalarni oson ko‘rinadigan guruhlarga ajrating.</p></div><Button onClick={() => changeContent({ ...content, skills: [...content.skills, emptySkill] })}><Plus /> Guruh qo‘shish</Button></div>
            <div className="editor-list">{content.skills.map((group, index) => <div className="editor-card" key={index}><div className="editor-card-title"><strong>{group.title}</strong><Button size="icon" variant="ghost" onClick={() => removeItem("skills", index)}><Trash2 /></Button></div><div className="studio-grid"><Field label="Guruh nomi" value={group.title} onChange={(v) => updateArray("skills", index, { ...group, title: v })} /><Field label="Ko‘nikmalar (vergul bilan)" value={group.skills.join(", ")} onChange={(v) => updateArray("skills", index, { ...group, skills: v.split(",").map((item) => item.trim()).filter(Boolean) })} /></div></div>)}</div>
          </TabsContent>
        </Tabs>
        <div className="studio-savebar"><div><strong>{isSaving ? "Serverga yuborilmoqda" : needsInitialPublish ? "Birinchi server nashri kutilmoqda" : hasChanges ? "O‘zgarishlar saqlanmagan" : "Portfolio yangilangan"}</strong><span>{isSaving ? "Rasmlar optimallashtirilib, xavfsiz xotiraga yuklanmoqda." : needsInitialPublish ? "Ushbu brauzerdagi kontentni barcha qurilmalarga chiqarish uchun saqlang." : hasChanges ? "Tayyor bo‘lganda barcha ma’lumotlarni saqlang." : localMode ? "Oxirgi o‘zgarishlar mahalliy xotirada." : "Oxirgi o‘zgarishlar barcha qurilmalar uchun saqlangan."}</span></div><Button onClick={save} disabled={!isHydrated || !hasChanges || isSaving}><Save /> {isSaving ? "Saqlanmoqda…" : needsInitialPublish ? "Serverga nashr qilish" : "Saqlash"}</Button></div>
      </section>
    </main>
  </>;
}

type SessionState = "checking" | "authenticated" | "signed-out" | "unconfigured" | "local";

function StudioAccess() {
  const [state, setState] = useState<SessionState>("checking");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    let active = true;
    void fetch("/api/admin/session", { cache: "no-store", credentials: "same-origin" })
      .then(async (response) => {
        if (response.status === 404 && ["localhost", "127.0.0.1"].includes(window.location.hostname)) return { local: true };
        if (!response.ok) throw new Error("Admin sessiyasini tekshirib bo‘lmadi.");
        return await response.json() as { authenticated?: boolean; configured?: boolean };
      })
      .then((session) => {
        if (!active) return;
        if ("local" in session) setState("local");
        else if (!session.configured) setState("unconfigured");
        else setState(session.authenticated ? "authenticated" : "signed-out");
      })
      .catch((reason: unknown) => {
        if (!active) return;
        setError(reason instanceof Error ? reason.message : "Admin serveriga ulanib bo‘lmadi.");
        setState("signed-out");
      });
    return () => { active = false; };
  }, []);

  const login = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/admin/session", {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const body = await response.json().catch(() => ({})) as { error?: string };
      if (!response.ok) throw new Error(body.error ?? "Tizimga kirib bo‘lmadi.");
      setPassword("");
      setState("authenticated");
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Tizimga kirib bo‘lmadi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const logout = async () => {
    await fetch("/api/admin/session", { method: "DELETE", credentials: "same-origin" }).catch(() => undefined);
    setState("signed-out");
  };

  if (state === "authenticated") return <StudioInner onLogout={logout} />;
  if (state === "local") return <StudioInner localMode />;

  return <main className="studio-auth-shell">
    <section className="studio-auth-card">
      <div className="studio-auth-icon">{state === "unconfigured" ? <ShieldCheck /> : <LockKeyhole />}</div>
      <p>Portfolio boshqaruvi</p>
      <h1>{state === "checking" ? "Tekshirilmoqda…" : state === "unconfigured" ? "Server sozlamasi kerak." : "Admin panelga kirish."}</h1>
      {state === "unconfigured" ? <>
        <span>Netlify’da <code>PORTFOLIO_ADMIN_PASSWORD</code> va <code>PORTFOLIO_SESSION_SECRET</code> environment variable’larini kiriting, so‘ng saytni qayta deploy qiling.</span>
      </> : state === "checking" ? <span>Xavfsiz sessiya holati aniqlanmoqda.</span> : <form onSubmit={login}>
        <label htmlFor="admin-password">Admin paroli</label>
        <Input id="admin-password" type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Parolni kiriting" required />
        {error && <div className="studio-auth-error">{error}</div>}
        <Button type="submit" disabled={isSubmitting || !password}><LockKeyhole /> {isSubmitting ? "Tekshirilmoqda…" : "Tizimga kirish"}</Button>
      </form>}
      <Link href="/"><Eye /> Portfolioga qaytish</Link>
    </section>
  </main>;
}

export function ContentStudio() { return <PortfolioProvider><StudioAccess /><Toaster position="bottom-right" richColors closeButton /></PortfolioProvider>; }
