import type { Metadata } from "next";
import { Inter_Tight, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-ibm-plex-mono",
});

export const metadata: Metadata = {
  title: "Quantara - AI SaaS Platform",
  description:
    "Discover Quantara, an intelligent AI-driven platform designed to unify systems, automate workflows, and enable smarter decision-making. Built with a sleek, modern interface, Quantara delivers a seamless experience for transforming complex data into actionable insights.",
  openGraph: {
    title: "Quantara - AI SaaS Platform",
    description:
      "Discover Quantara, an intelligent AI-driven platform designed to unify systems, automate workflows, and enable smarter decision-making.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Quantara - AI SaaS Platform",
    description:
      "Discover Quantara, an intelligent AI-driven platform designed to unify systems, automate workflows, and enable smarter decision-making.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${interTight.className} ${ibmPlexMono.variable}`}>
      <body className="body">{children}</body>
    </html>
  );
}
