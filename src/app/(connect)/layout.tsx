'use client'
import Dock from '@/_components/navigation'
import React, { useContext } from 'react'
import { userContext } from '../AuthContext'

const Layout = ({ children }: { children: React.ReactNode }) => {
  const user = useContext(userContext)

  if (!user) {
    console.log('user not logged in')
  }

  return (
    <main className="p-16 min-h-screen">
      <Dock />
      {children}
    </main>
  )
}

export default Layout
