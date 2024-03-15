'use client'
import React, { Provider, useContext } from 'react'
import { userContext } from '../AuthContext'
import Link from 'next/link'
import { redirect, useRouter } from 'next/navigation'
import Dashboard from './Dashboard'

const Layout = ({ children }: { children: React.ReactNode }) => {
  const user = useContext(userContext)

  {
    if (user?.user) {
      return (
        <div className="bg-orange-600 h-screen">
          <Dashboard />
        </div>
      )
    }
    return <div className="bg-orange-600 h-screen">{children}</div>
  }
}

export default Layout
