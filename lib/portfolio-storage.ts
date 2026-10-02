import type { PortfolioContent } from "@/domain/portfolio/types";

export const PORTFOLIO_STORAGE_KEY = "jg-portfolio-content-v1";

export function loadPortfolio(fallback: PortfolioContent): PortfolioContent {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(PORTFOLIO_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as PortfolioContent) : fallback;
  } catch {
    return fallback;
  }
}

export function savePortfolio(content: PortfolioContent) {
  window.localStorage.setItem(PORTFOLIO_STORAGE_KEY, JSON.stringify(content));
  window.dispatchEvent(new CustomEvent("portfolio-content-updated", { detail: content }));
}

export function clearPortfolio() {
  window.localStorage.removeItem(PORTFOLIO_STORAGE_KEY);
}
