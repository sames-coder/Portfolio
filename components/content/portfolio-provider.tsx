"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { defaultPortfolio } from "@/data/default-portfolio";
import type { PortfolioContent } from "@/domain/portfolio/types";
import { loadPortfolio, savePortfolio } from "@/lib/portfolio-storage";

type PortfolioContextValue = {
  content: PortfolioContent;
  setContent: (content: PortfolioContent) => void;
};

const PortfolioContext = createContext<PortfolioContextValue | null>(null);

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [content, setState] = useState(defaultPortfolio);

  useEffect(() => {
    setState(loadPortfolio(defaultPortfolio));
    const onUpdate = (event: Event) => setState((event as CustomEvent<PortfolioContent>).detail);
    window.addEventListener("portfolio-content-updated", onUpdate);
    return () => window.removeEventListener("portfolio-content-updated", onUpdate);
  }, []);

  const value = useMemo(() => ({
    content,
    setContent: (next: PortfolioContent) => { setState(next); savePortfolio(next); },
  }), [content]);

  return <PortfolioContext.Provider value={value}>{children}</PortfolioContext.Provider>;
}

export function usePortfolio() {
  const value = useContext(PortfolioContext);
  if (!value) throw new Error("usePortfolio must be used inside PortfolioProvider");
  return value;
}
