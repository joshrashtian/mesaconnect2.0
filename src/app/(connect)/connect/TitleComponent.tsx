'use client'

import { userContext } from '@/app/AuthContext'
import { userAgent } from 'next/server'
import React, { useContext } from 'react'
import { motion } from 'framer-motion'

const TitleComponent = () => {
  const user = useContext(userContext)
  const date = new Date(Date.now())

  const greeting =
    date.getHours() < 12 ? 'Good Morning' : date.getHours() < 18 ? 'Good Afternoon' : 'Good Evening'

  if (!user.user) return

  return (
    <main className="w-full">
      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeInOut', delay: 0.25 }}
        className=" text-transparent bg-clip-text bg-gradient-to-br from-slate-500 to-slate-800 text-3xl"
      >
        {greeting}, {user?.user?.user_metadata?.real_name}
      </motion.h1>
      <motion.h1
        className="text-2xl text-slate-600 font-semibold duration-500"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeInOut', delay: 1 }}
      >
        It is{' '}
        <code className="bg-clip-text text-transparent bg-gradient-to-br from-orange-600 to-teal-600">
          {date.getHours()}:{date.getMinutes()}:{date.getSeconds()}{' '}
        </code>
        and the date is{'  '}
        <code className="bg-clip-text text-transparent bg-gradient-to-br from-slate-600 to-teal-800">
          {date.getMonth() + 1}/{date.getDate()}/{date.getFullYear()}
        </code>
      </motion.h1>
    </main>
  )
}

export default TitleComponent
