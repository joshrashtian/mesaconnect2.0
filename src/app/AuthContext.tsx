'use client'

import React, { useEffect, createContext, useMemo, useState, use } from 'react'
import { supabase } from '../../config/mesa-config'
import { User } from '@supabase/supabase-js'

export const userContext = createContext<ContextProps>({})
export interface ContextProps {
  user: User | undefined
  signOut: () => void
}

const AuthContext = ({ children }: { children: React.ReactNode }) => {
  const [u, setUser] = useState<User>()

  const value = useMemo(() => {
    return {
      user: u,
      signOut: () => {
        supabase.auth.signOut()
      }
    }
  }, [u])

  const getUser = async () => {
    try {
      const {
        data: { user }
      } = await supabase.auth.getUser()
      if (user) {
        setUser(user)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getUser()
  }, [])

  const { data } = supabase.auth.onAuthStateChange((event, session) => {
    if (event === 'INITIAL_SESSION') {
      // handle initial session
    } else if (event === 'SIGNED_IN') {
      console.log('signed in as' + session?.user.email)
      setUser(session?.user)
    } else if (event === 'SIGNED_OUT') {
      console.warn('signed out')
      setUser(undefined)
    } else if (event === 'PASSWORD_RECOVERY') {
      // handle password recovery event
    } else if (event === 'TOKEN_REFRESHED') {
      // handle token refreshed event
    } else if (event === 'USER_UPDATED') {
      // handle user updated event
    }
  })

  return <userContext.Provider value={value}>{children}</userContext.Provider>
}

export default AuthContext
