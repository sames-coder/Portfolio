import type { PortfolioContent } from "@/domain/portfolio/types";

export const PORTFOLIO_STORAGE_KEY = "jg-portfolio-content-v1";
const PORTFOLIO_DB_NAME = "jg-portfolio-studio";
const PORTFOLIO_DB_VERSION = 1;
const PORTFOLIO_STORE = "content";
const PORTFOLIO_RECORD_KEY = "portfolio";

function openPortfolioDatabase() {
  return new Promise<IDBDatabase>((resolve, reject) => {
    if (typeof indexedDB === "undefined") {
      reject(new Error("Ushbu brauzer katta hajmdagi ma’lumotlarni saqlashni qo‘llab-quvvatlamaydi."));
      return;
    }

    const request = indexedDB.open(PORTFOLIO_DB_NAME, PORTFOLIO_DB_VERSION);
    request.onerror = () => reject(request.error ?? new Error("Portfolio xotirasini ochib bo‘lmadi."));
    request.onupgradeneeded = () => {
      const database = request.result;
      if (!database.objectStoreNames.contains(PORTFOLIO_STORE)) database.createObjectStore(PORTFOLIO_STORE);
    };
    request.onsuccess = () => resolve(request.result);
  });
}

async function readFromDatabase() {
  const database = await openPortfolioDatabase();
  return new Promise<PortfolioContent | undefined>((resolve, reject) => {
    const transaction = database.transaction(PORTFOLIO_STORE, "readonly");
    const request = transaction.objectStore(PORTFOLIO_STORE).get(PORTFOLIO_RECORD_KEY);
    request.onerror = () => reject(request.error ?? new Error("Portfolio ma’lumotlarini o‘qib bo‘lmadi."));
    request.onsuccess = () => resolve(request.result as PortfolioContent | undefined);
    transaction.oncomplete = () => database.close();
    transaction.onerror = () => { database.close(); reject(transaction.error ?? new Error("Portfolio ma’lumotlarini o‘qib bo‘lmadi.")); };
  });
}

async function writeToDatabase(content: PortfolioContent) {
  const database = await openPortfolioDatabase();
  return new Promise<void>((resolve, reject) => {
    const transaction = database.transaction(PORTFOLIO_STORE, "readwrite");
    transaction.objectStore(PORTFOLIO_STORE).put(content, PORTFOLIO_RECORD_KEY);
    transaction.oncomplete = () => { database.close(); resolve(); };
    transaction.onerror = () => { database.close(); reject(transaction.error ?? new Error("Portfolio ma’lumotlarini saqlab bo‘lmadi.")); };
    transaction.onabort = () => { database.close(); reject(transaction.error ?? new Error("Portfolio ma’lumotlarini saqlash bekor qilindi.")); };
  });
}

function applyContentMigrations(stored: PortfolioContent, fallback: PortfolioContent) {
  let resolved = stored;
  if (stored.profile.heroLead === "Android apps." && stored.profile.heroAccent === "Reliable by design.") {
    resolved = { ...resolved, profile: { ...resolved.profile, heroLead: fallback.profile.heroLead, heroAccent: fallback.profile.heroAccent, intro: fallback.profile.intro } };
  }
  if (stored.profile.about === "I design and engineer Android applications that feel native, fast and thoughtfully composed. From product architecture to the smallest motion detail, every decision is made to create software people trust and enjoy using.") {
    resolved = { ...resolved, profile: { ...resolved.profile, about: fallback.profile.about, philosophy: fallback.profile.philosophy } };
  }
  return resolved;
}

function isLocalDevelopment() {
  return window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
}

async function readResponseError(response: Response, fallback: string) {
  try {
    const body = await response.json() as { error?: unknown };
    if (typeof body.error === "string") return body.error;
  } catch {
    // The endpoint may not exist while using the plain Next.js development server.
  }
  return fallback;
}

async function loadRemotePortfolio() {
  const response = await fetch("/api/portfolio", { cache: "no-store", credentials: "same-origin" });
  if (response.ok) return await response.json() as PortfolioContent;
  if (response.status === 404) return undefined;
  throw new Error(await readResponseError(response, "Serverdagi portfolio ma’lumotlarini o‘qib bo‘lmadi."));
}

async function uploadAsset(dataUrl: string) {
  const response = await fetch("/api/portfolio/assets", {
    method: "POST",
    credentials: "same-origin",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ dataUrl }),
  });
  if (!response.ok) {
    if (response.status === 401) throw new Error("Admin sessiyasi tugagan. Sahifani yangilang va qayta kiring.");
    throw new Error(await readResponseError(response, "Rasmni serverga yuklab bo‘lmadi."));
  }
  const body = await response.json() as { url?: unknown };
  if (typeof body.url !== "string") throw new Error("Server rasm manzilini qaytarmadi.");
  return body.url;
}

async function uploadPendingImages(content: PortfolioContent) {
  const uploaded = new Map<string, Promise<string>>();
  const resolveImage = (image?: string) => {
    if (!image?.startsWith("data:image/")) return Promise.resolve(image);
    const existing = uploaded.get(image);
    if (existing) return existing;
    const request = uploadAsset(image);
    uploaded.set(image, request);
    return request;
  };

  return {
    ...content,
    profile: { ...content.profile, avatarUrl: await resolveImage(content.profile.avatarUrl) ?? "" },
    projects: await Promise.all(content.projects.map(async (project) => ({
      ...project,
      logoImage: await resolveImage(project.logoImage),
      screenshots: await Promise.all((project.screenshots ?? []).map(async (screen) => ({
        ...screen,
        image: await resolveImage(screen.image),
      }))),
    }))),
    experience: await Promise.all(content.experience.map(async (item) => ({
      ...item,
      logoImage: await resolveImage(item.logoImage),
    }))),
  } satisfies PortfolioContent;
}

export async function loadPortfolio(fallback: PortfolioContent): Promise<PortfolioContent> {
  if (typeof window === "undefined") return fallback;

  try {
    const remote = await loadRemotePortfolio();
    if (remote) {
      const resolved = applyContentMigrations(remote, fallback);
      try { await writeToDatabase(resolved); } catch { /* The shared server copy remains authoritative. */ }
      return resolved;
    }
  } catch {
    // Keep the cached copy available during a temporary network or Functions outage.
  }

  try {
    const stored = await readFromDatabase();
    if (stored) return applyContentMigrations(stored, fallback);
  } catch {
    // Legacy local data remains available below when IndexedDB is temporarily unavailable.
  }

  try {
    const raw = window.localStorage.getItem(PORTFOLIO_STORAGE_KEY);
    if (!raw) return fallback;
    const resolved = applyContentMigrations(JSON.parse(raw) as PortfolioContent, fallback);
    try {
      await writeToDatabase(resolved);
      window.localStorage.removeItem(PORTFOLIO_STORAGE_KEY);
    } catch {
      // Preserve the legacy copy until migration succeeds.
    }
    return resolved;
  } catch {
    return fallback;
  }
}

export async function savePortfolio(content: PortfolioContent): Promise<PortfolioContent> {
  try {
    const serverReadyContent = await uploadPendingImages(content);
    const response = await fetch("/api/portfolio", {
      method: "PUT",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(serverReadyContent),
    });
    if (!response.ok) {
      if (response.status === 401) throw new Error("Admin sessiyasi tugagan. Sahifani yangilang va qayta kiring.");
      throw new Error(await readResponseError(response, "Portfolio serverga saqlanmadi."));
    }

    const body = await response.json() as { content?: PortfolioContent };
    const saved = body.content ?? serverReadyContent;
    try { await writeToDatabase(saved); } catch { /* The shared server copy is already saved. */ }
    try { window.localStorage.removeItem(PORTFOLIO_STORAGE_KEY); } catch { /* No legacy copy to remove. */ }
    window.dispatchEvent(new CustomEvent("portfolio-content-updated", { detail: saved }));
    return saved;
  } catch (error) {
    if (!isLocalDevelopment()) throw error;
    await writeToDatabase(content);
    try { window.localStorage.removeItem(PORTFOLIO_STORAGE_KEY); } catch { /* IndexedDB is the local source of truth. */ }
    window.dispatchEvent(new CustomEvent("portfolio-content-updated", { detail: content }));
    return content;
  }
}

export async function clearPortfolio() {
  const database = await openPortfolioDatabase();
  await new Promise<void>((resolve, reject) => {
    const transaction = database.transaction(PORTFOLIO_STORE, "readwrite");
    transaction.objectStore(PORTFOLIO_STORE).delete(PORTFOLIO_RECORD_KEY);
    transaction.oncomplete = () => { database.close(); resolve(); };
    transaction.onerror = () => { database.close(); reject(transaction.error ?? new Error("Portfolio xotirasini tozalab bo‘lmadi.")); };
  });
  try { window.localStorage.removeItem(PORTFOLIO_STORAGE_KEY); } catch { /* No legacy copy to clear. */ }
}
