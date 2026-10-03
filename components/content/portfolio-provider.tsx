"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { defaultPortfolio } from "@/data/default-portfolio";
import type { PortfolioContent } from "@/domain/portfolio/types";
import { loadPortfolio, savePortfolio } from "@/lib/portfolio-storage";

type PortfolioContextValue = {
  content: PortfolioContent;
  isHydrated: boolean;
  setContent: (content: PortfolioContent) => void;
  saveContent: (contentOverride?: PortfolioContent) => Promise<PortfolioContent>;
};

const PortfolioContext = createContext<PortfolioContextValue | null>(null);

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [content, setState] = useState(defaultPortfolio);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    let active = true;
    void loadPortfolio(defaultPortfolio).then((stored) => {
      if (active) setState(stored);
    }).finally(() => {
      if (active) setIsHydrated(true);
    });
    const onUpdate = (event: Event) => setState((event as CustomEvent<PortfolioContent>).detail);
    window.addEventListener("portfolio-content-updated", onUpdate);
    return () => { active = false; window.removeEventListener("portfolio-content-updated", onUpdate); };
  }, []);

  const value = useMemo(() => ({
    content,
    isHydrated,
    setContent: setState,
    saveContent: async (contentOverride?: PortfolioContent) => {
      const saved = await savePortfolio(contentOverride ?? content);
      setState(saved);
      return saved;
    },
  }), [content, isHydrated]);

  return <PortfolioContext.Provider value={value}>{children}</PortfolioContext.Provider>;
}

export function usePortfolio() {
  const value = useContext(PortfolioContext);
  if (!value) throw new Error("usePortfolio must be used inside PortfolioProvider");
  return value;
}
