import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ia-par-metier.vercel.app"),
  alternates: {
    canonical: "./",
  },
  verification: {
    google: "VOTRE_CODE_GSC_ICI",
  },
  title: {
    default: "IA Par Métier | Les Meilleurs Outils IA Classés Par Profession (2026)",
    template: "%s | IA Par Métier",
  },
  description:
    "Trouvez en 2 minutes les meilleurs outils d'intelligence artificielle et d'automatisation pour votre métier. Comparatifs indépendants, tests concrets et gains de temps chiffrés.",
  keywords: [
    "outils ia par métier",
    "meilleures ia professionnelles",
    "comparatif ia 2026",
    "intelligence artificielle b2b",
    "automatisation metier",
  ],
  authors: [{ name: "IA Par Métier" }],
  creator: "IA Par Métier",
  publisher: "IA Par Métier",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://ia-par-metier.vercel.app",
    siteName: "IA Par Métier",
    title: "IA Par Métier | Comparateur d'Outils IA par Profession (2026)",
    description:
      "Trouvez les logiciels d'intelligence artificielle les plus rentables pour votre activité professionnelle. Comparatifs complets et avis indépendants.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth`}>
      <body className="min-h-full flex flex-col bg-[#fbfcfd] text-slate-900 antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
