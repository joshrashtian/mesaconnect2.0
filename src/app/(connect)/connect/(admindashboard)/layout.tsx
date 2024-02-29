'use client'
import { userContext } from '@/app/AuthContext'
import React, { useContext } from 'react'
import AdminModalContainer from './AdminModal'

const layout = ({ children }: { children: React.ReactNode }) => {
  const isAdmin = useContext(userContext)

  if (isAdmin.userData?.role != 'admin') return null

  return <AdminModalContainer>{children}</AdminModalContainer>
}

export default layout
