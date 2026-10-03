"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { defaultPortfolio } from "@/data/default-portfolio";
import type { PortfolioContent } from "@/domain/portfolio/types";
import { loadPortfolio, savePortfolio } from "@/lib/portfolio-storage";

type PortfolioContextValue = {
  content: PortfolioContent;
  setContent: (content: PortfolioContent) => void;
  saveContent: () => void;
};

const PortfolioContext = createContext<PortfolioContextValue | null>(null);

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [content, setState] = useState(defaultPortfolio);

  useEffect(() => {
    const hydrate = window.setTimeout(() => setState(loadPortfolio(defaultPortfolio)), 0);
    const onUpdate = (event: Event) => setState((event as CustomEvent<PortfolioContent>).detail);
    window.addEventListener("portfolio-content-updated", onUpdate);
    return () => { window.clearTimeout(hydrate); window.removeEventListener("portfolio-content-updated", onUpdate); };
  }, []);

  const value = useMemo(() => ({
    content,
    setContent: setState,
    saveContent: () => savePortfolio(content),
  }), [content]);

  return <PortfolioContext.Provider value={value}>{children}</PortfolioContext.Provider>;
}

export function usePortfolio() {
  const value = useContext(PortfolioContext);
  if (!value) throw new Error("usePortfolio must be used inside PortfolioProvider");
  return value;
}
