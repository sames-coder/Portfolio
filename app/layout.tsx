import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "JG — Android Product Engineer",
  description: "Android developer crafting reliable, elegant mobile products with Kotlin, Jetpack Compose and scalable architecture.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
