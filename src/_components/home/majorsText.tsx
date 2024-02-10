'use client'

import { coverMajors } from '@/_assets/coverData'
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap'
})


const variants = {
  moving: {
    opacity: 0,
    y: -20
  },
  still: {
    opacity: 1,
    y: 0
  }
}

const MajorsText = () => {
  const [index, setIndex] = useState(0)
  const [isChanging, setIsChanging] = useState(false)

  useEffect(() => {
    setInterval(() => {
      setIsChanging(true)
      setTimeout(() => {
        let newValue = Math.floor(Math.random() * coverMajors.length)

        if (newValue != index) setIndex(newValue)
        else setIndex(Math.floor(Math.random() * coverMajors.length))

        setIsChanging(false)
      }, 600)
    }, 4000)
  }, [])

  return (
    <motion.h1 className={`${inter.className} text-5xl font-bold flex flex-col 2xl:flex-row gap-3 text-slate-500`}>
      A home for the majors studying{' '}
      <motion.p
        variants={variants}
        animate={isChanging ? 'moving' : 'still'}
        transition={{
          type: 'spring',
          stiffness: 100,
          duration: 2
        }}
        className={`text-teal-600`}
      >
        {coverMajors[index]}.
      </motion.p>
    </motion.h1>
  )
}

export default MajorsText
