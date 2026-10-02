import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "JG — Creative Developer",
  description: "Creative developer crafting expressive interfaces, scalable systems and immersive digital experiences.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
