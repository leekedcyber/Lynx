import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "Persona — Your corner of the internet", description: "A personal page for your story, links and socials." };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}