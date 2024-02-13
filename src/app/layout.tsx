import type { Metadata } from 'next'
import './globals.css'
import Dock from '@/_components/navigation'
import { config } from '../../config/mesa-config'
import AuthContext from './AuthContext'

export const metadata: Metadata = {
  title: {
    default: config.title,
    template: '%s | ${config.title}'
  },
  description: config.description,
  icons: [
    {
      url: '/src/app/MesaIcon.png',
      href: '/src/app/MesaIcon.png'
    }
  ]
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <AuthContext>
      <html>
        <body className="bg-zinc-100 scroll-smooth">
          <Dock />
          {children}
        </body>
      </html>
    </AuthContext>
  )
}
