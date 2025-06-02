import type { Metadata } from "next";
import "./globals.css";
import { config } from "../../config/mesa-config";
import AuthContext from "./AuthContext";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import OneTapComponent from "@/_components/home/OneTap";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: config.title,
    template: "%s | MESA Connect",
  },
  description: config.description,
  openGraph: {
    title: "MESAConnect",
    description: "Using STEM to Unite STEM Together.",
    url: "https://mesaconnect.io",
    images: ["/public/mesaconnectbanner.png"],
    siteName: "MESAConnect",
    locale: "en_US",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <head>
        {/* Load the local copy of pdf.min.js from public/pdfjs */}
        <Script src="/pdfjs/pdf.min.js" strategy="beforeInteractive" />

        {/* Load the local copy of pdf.worker.min.js from public/pdfjs */}
        <Script src="/pdfjs/pdf.worker.min.js" strategy="beforeInteractive" />
      </head>
      <AuthContext>
        <body className={`${inter.className} bg-zinc-100 dark:bg-zinc-800`}>
          {children}
          <Analytics />
        </body>
      </AuthContext>
    </html>
  );
}
