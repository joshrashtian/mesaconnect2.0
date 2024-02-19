'use client'
import Dock from '@/_components/navigation'
import React, { useContext } from 'react'
import { userContext } from '../AuthContext'
import InfoContextContainer from './InfoContext'
import { config } from '../../../config/mesa-config'

const Layout = ({ children }: { children: React.ReactNode }) => {
  const user = useContext(userContext)

  if (!user) {
    console.log('user not logged in')
  }

  return (
    <InfoContextContainer>
      <main className="p-16 h-screen">
        <Dock />

        {children}
        <h1 className="fixed bottom-2 right-2 font-mono">{config.versionNumber}</h1>
      </main>
    </InfoContextContainer>
  )
}

export default Layout
