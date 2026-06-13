import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://luancunha.dev"),
  title: "Luan Cunha - Desenvolvedor Full Stack",
  description:
    "Portfólio de Luan Cunha, desenvolvedor full stack com experiência consolidada em produtos web, AI engineering, automações, integrações e sistemas sob demanda.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Luan Cunha - Desenvolvedor Full Stack",
    description:
      "Produtos web, AI engineering, automações, sistemas internos e apps mobile com execução full stack.",
    url: "https://luancunha.dev",
    siteName: "Luan Cunha",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Luan Cunha - Desenvolvedor Full Stack",
    description:
      "Produtos web, AI engineering, automações, sistemas internos e apps mobile com execução full stack.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
