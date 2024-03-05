'use client'
import React, { useContext } from 'react'
import LearningContextProvider from './LearningContext'
import { userContext } from '@/app/AuthContext'

const layout = ({ children }: { children: React.ReactNode }) => {
  const user = useContext(userContext)

  if (!user) return null

  return (
    <section className="bg-zinc-100 p-12 h-screen  min-w-full absolute top-0 left-0 ">
      <LearningContextProvider>{children}</LearningContextProvider>
    </section>
  )
}

export default layout
