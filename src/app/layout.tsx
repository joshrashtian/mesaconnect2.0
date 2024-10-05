import type { Metadata } from "next";
import "./globals.css";
import { config } from "../../config/mesa-config";
import AuthContext from "./AuthContext";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import OneTapComponent from "@/_components/home/OneTap";

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
    description: "Connecting The Next Generation Together.",
    url: "https://mesaconnect.io",
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
    <AuthContext>
      <html>
        <body className={`${inter.className} bg-zinc-100 dark:bg-zinc-800`}>
          {children}
          <Analytics />
        </body>
      </html>
    </AuthContext>
  );
}
