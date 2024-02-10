import React from 'react'

import { Inter } from 'next/font/google'
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

const Layout = ({ children } : { children: React.ReactNode } ) => {
  return (
    <div className={inter.className}>
        {children}
    </div>
  )
}

export default Layout