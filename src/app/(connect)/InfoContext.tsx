'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'

import React from 'react'
import { supabase } from '../../../config/mesa-config'
import { userContext } from '../AuthContext'

export const InfoContext = createContext({})

const InfoContextContainer = ({ children }: { children: React.ReactNode }) => {
  const authen = useContext(userContext)
  const [user, setUser] = useState<any[] | null>()

  const value = useMemo(() => {
    return {
      user
    }
  }, [user])

  useEffect(() => {
    const fetchUserData = async () => {
      const { data, error } = await supabase.from('users').select().eq('id', authen.user?.id)

      if (error) {
        console.log(error)
        return
      }

      setUser(data)
    }

    fetchUserData()
  }, [authen])

  return <InfoContext.Provider value={value}>{children}</InfoContext.Provider>
}

export default InfoContextContainer
