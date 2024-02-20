'use client'

import React, { Provider, useContext } from 'react'

import { Inter } from 'next/font/google'
import { ContextProps, userContext } from '../AuthContext'
import Link from 'next/link'
import { User } from '@supabase/supabase-js'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap'
})

const Layout = ({ children }: { children: React.ReactNode }) => {
  const user = useContext(userContext)

  if (user?.user) {
    return (
      <div className="">
        <h1>You are successfully signed in as {user?.user.email}</h1>
        <Link href="/">
          <h1>Dashboard</h1>
        </Link>
        <div
          onClick={() => {
            user.signOut()
          }}
        >
          <h1>Sign Out</h1>
        </div>
      </div>
    )
  }
  return <div className={inter.className}>{children}</div>
}

export default Layout
