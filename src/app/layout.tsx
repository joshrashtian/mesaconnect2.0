import type { Metadata } from 'next'
import './globals.css'
import { config } from '../../config/mesa-config'
import AuthContext from './AuthContext'
import { Inter } from 'next/font/google'
import {SpeedInsights} from "@vercel/speed-insights/next";

const inter = Inter({
  subsets: ['latin'],
  display: 'swap'
})

export const metadata: Metadata = {
  title: {
    default: config.title,
    template: '%s | MESA Connect'
  },
  description: config.description
}

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <AuthContext>
      <html>
        <body className={`${inter.className} dark:bg-zinc-800 bg-zinc-100`}>{children}<SpeedInsights /></body>
      </html>
    </AuthContext>
  )
}
