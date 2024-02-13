'use client'

import { userContext } from '@/app/AuthContext'
import { userAgent } from 'next/server'
import React, { useContext } from 'react'
import { motion } from 'framer-motion'

const TitleComponent = () => {
  const user = useContext(userContext)

  if (!user.user) return

  return (
    <motion.h1
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeInOut', delay: 0.25 }}
      className="  absolute top-12 text-transparent bg-clip-text bg-gradient-to-br from-slate-500 to-slate-800 text-3xl"
    >
      Good morning, {user?.user?.user_metadata?.real_name}
    </motion.h1>
  )
}

export default TitleComponent
