'use client'

import React from 'react'
import { supabase } from '../../config/mesa-config'

const AuthContext = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = React.useState(null)

  const { data } = supabase.auth.onAuthStateChange((event, session) => {
    console.log(event, session)

    if (event === 'INITIAL_SESSION') {
      // handle initial session
    } else if (event === 'SIGNED_IN') {
      console.log('signed in as' + session?.user.email)
    } else if (event === 'SIGNED_OUT') {
      // handle sign out event
    } else if (event === 'PASSWORD_RECOVERY') {
      // handle password recovery event
    } else if (event === 'TOKEN_REFRESHED') {
      // handle token refreshed event
    } else if (event === 'USER_UPDATED') {
      // handle user updated event
    }
  })

  return <main>{children}</main>
}

export default AuthContext
