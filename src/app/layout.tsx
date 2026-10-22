import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "LensLoop — Professional Camera & Lens Rental",
    template: "%s | LensLoop",
  },
  description:
    "Find the right gear, book your dates, and get ready to shoot. Automated inventory, serial-tracked cameras, instant checkout holds, and curated shoot kits.",
  keywords: [
    "camera rental",
    "lens rental",
    "cinematography gear",
    "Sony A7 IV rental",
    "RED Komodo rental",
    "wedding photography kit",
    "equipment rental",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans bg-[var(--background)] text-[var(--foreground)]">
        {children}
      </body>
    </html>
  );
}
