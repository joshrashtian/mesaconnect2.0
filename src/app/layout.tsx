import type {Metadata} from 'next'
import './globals.css'
import {config} from '../../config/mesa-config'
import AuthContext from './AuthContext'
import {Inter} from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap'
})

export const metadata: Metadata = {
  title: {
    default: config.title,
    template: '%s | MESA Connect'
  },
  description: config.description,
  openGraph: {
    title: 'MESAConnect',
    description: 'Connecting The Next Generation Together.',
    url: 'https://mesaconnect.io',
    siteName: 'MESAConnect',
    images: [
      {
        url: "https://gnmpzioggytlqzekuyuo.supabase.co/storage/v1/object/public/seo/Messagestcon.png?t=2024-05-18T19%3A31%3A00.671Z"
      }],
    locale: 'en_US',
    type: 'website',
  },
}

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <AuthContext>
      <html>
        <body className={`${inter.className} dark:bg-zinc-800 bg-zinc-100`}>{children}</body>
      </html>
    </AuthContext>
  )
}
