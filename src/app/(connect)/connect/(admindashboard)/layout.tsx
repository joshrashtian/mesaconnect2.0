'use client'
import { userContext } from '@/app/AuthContext'
import React, { useContext } from 'react'

const layout = ({ children }: { children: React.ReactNode }) => {
  const isAdmin = useContext(userContext)

  if (isAdmin.userData?.role != 'admin') return null

  return <div>{children}</div>
}

export default layout
