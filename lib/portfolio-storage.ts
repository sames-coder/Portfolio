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

export async function loadPortfolio(fallback: PortfolioContent): Promise<PortfolioContent> {
  if (typeof window === "undefined") return fallback;

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

export async function savePortfolio(content: PortfolioContent) {
  await writeToDatabase(content);
  try { window.localStorage.removeItem(PORTFOLIO_STORAGE_KEY); } catch { /* IndexedDB is the source of truth. */ }
  window.dispatchEvent(new CustomEvent("portfolio-content-updated", { detail: content }));
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
