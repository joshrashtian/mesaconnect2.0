'use client'

import {useUser} from '@/app/AuthContext'
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const TitleComponent = () => {
  const { user, userData } = useUser()
  const [date, setDate] = useState(new Date())

  useEffect(() => {
    const updateClock = setInterval(() => {
      setDate(new Date())
    }, 1000)

    return () => clearInterval(updateClock)
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Date.now()])

  const greeting =
    date.getHours() < 12 ? 'Good Morning' : date.getHours() < 18 ? 'Good Afternoon' : 'Good Evening'

  return (
    <main className="w-full font-eudoxus text-center xl:text-left duration-300 flex flex-col xl:gap-0 gap-5">
      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeInOut', delay: 0.25 }}
        className=" text-transparent bg-clip-text bg-gradient-to-br from-slate-500 to-slate-800 text-3xl"
      >
        {greeting}, {user?.user_metadata.full_name ? user.user_metadata.full_name : userData?.real_name}
      </motion.h1>
      <motion.h1
        className="text-2xl text-slate-600 font-semibold duration-500"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeInOut', delay: 1 }}
      >
        It is{'  '}
        <code className="bg-clip-text text-transparent text-3xl bg-gradient-to-r -mr-2 from-blue-600 to-teal-600">
          {date.getHours()}:{date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()}:
          {date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds()}{' '}
        </code>
        and the date is{' '}
        <code className="bg-clip-text text-transparent bg-gradient-to-br from-slate-600 to-teal-800">
          {date.getMonth() + 1}/{date.getDate()}/{date.getFullYear()}
        </code>
      </motion.h1>
    </main>
  )
}

export default TitleComponent
