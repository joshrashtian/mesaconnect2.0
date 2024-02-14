'use client'
import Dock from '@/_components/navigation'
import React, { useContext } from 'react'
import { userContext } from '../AuthContext'
import InfoContextContainer from './InfoContext'

const Layout = ({ children }: { children: React.ReactNode }) => {
  const user = useContext(userContext)

  if (!user) {
    console.log('user not logged in')
  }

  return (
    <InfoContextContainer>
      <main className="p-16 min-h-screen">
        <Dock />
        <div className="w-32 h-32 absolute blur-3xl top-0 left-0 opacity-25 bg-orange-300" />
        <div className="w-32 h-32 absolute blur-3xl bottom-0 right-0 opacity-50 bg-purple-800" />
        {children}
      </main>
    </InfoContextContainer>
  )
}

export default Layout
