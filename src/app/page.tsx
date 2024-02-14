'use client'

import Button from '@/components/Button'
import Benefits from '@/components/home/benefits'
import Header from '@/components/home/header'
import MajorsText from '@/components/home/majorsText'

import { motion, useScroll } from 'framer-motion'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import { useContext, useRef } from 'react'
import { supabase } from '../../config/mesa-config'
import { userContext } from './AuthContext'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap'
})

export default function Home() {
  const firstRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: firstRef,
    offset: ['0 1.3', '0.5 0.67']
  })

  const user = useContext(userContext)

  return (
    <main className={`${inter.className} flex min-h-screen flex-col items-center gap-y-24 p-12`}>
      <Header />

      <section
        className={` border-b-2 border-slate-300 max-w-6xl w-full h-[70vh] items-center justify-center flex flex-col gap-10 text-sm`}
      >
        <h1 className="text-xl cursor-default text-center font-bold md:text-3xl lg:text-5xl xl:text-6xl 2xl:text-7xl text-zinc-700 dark:text-white duration-300 ease-in-out">
          Welcome to the next generation of{' '}
          <span className=" bg-gradient-to-br from-red-700 to-orange-500 bg-clip-text text-transparent">
            MESA
          </span>
          , ready to <span className="hover:text-green-700 duration-500">lead</span> the{' '}
          <span className=" bg-gradient-to-r hover:text-green-700 from-indigo-700 to-blue-500 bg-clip-text hover:scale-105 text-transparent duration-500 ease-in-out">
            next generation.
          </span>
        </h1>
        <h2 className="text-lg text-slate-500">A community for the students, by the students.</h2>
        <section className="w-full flex flex-row mt-6 justify-center gap-4">
          <Link
            href="/sign-in"
            className=" shadow-lg cursor-pointer rounded-3xl hover:rounded-2xl hover:scale-105 bg-gradient-to-tr from-amber-400 to-orange-600 w-1/4 h-12 lg:h-16 flex justify-center items-center duration-500 transition-all ease-in-out"
          >
            <h2 className=" text-white text-md lg:text-lg 2xl:text-xl duration-300">Sign In</h2>
          </Link>
          <Link
            href={user?.user ? '/connect' : '/sign-up'}
            className=" shadow-lg cursor-pointer rounded-3xl hover:rounded-2xl hover:scale-105 bg-gradient-to-tl from-slate-400 to-slate-600 w-1/4 h-12 lg:h-16 flex justify-center items-center duration-500 transition-all ease-in-out"
          >
            <h2 className=" text-white text-md lg:text-lg 2xl:text-xl duration-300">
              Jump In For Free
            </h2>
          </Link>
        </section>
      </section>
      <motion.section
        style={{ scale: scrollYProgress, opacity: scrollYProgress }}
        className={`max-w-[90%] border-b-2 border-slate-300 mt-16 gap-10 text-slate-400  rounded-2xl w-full h-screen items-center justify-center p-10 flex flex-col text-sm`}
        ref={firstRef}
      >
        <section className="w-full gap-12 flex flex-col bg-zinc-50 shadow- p-10 rounded-3xl">
          <MajorsText />
          <section className="flex flex-row justify-between ">
            <ul className="w-3/5 flex flex-col gap-5  md:text-lg lg:text-2xl 2xl:text-3xl">
              <h1 className="  ">
                As a community, MESA is here to push and motivate our best selves. Leveraging modern
                technologies, we can help you exprience your major and see your ideas come to life.
              </h1>
              <h1 className="text-transparent bg-clip-text bg-gradient-to-br from-slate-400 to-slate-500">
                MESA is here to allow students to experiment, socialize, and inspire. Connect takes
                it to the next level by bringing MESA a new dimesion of community.
              </h1>
            </ul>
            <ul className="w-2/5 bg-teal-200"></ul>
          </section>
        </section>
        <section className="w-full gap-12 flex flex-col bg-zinc-50 shadow- p-10 rounded-3xl">
          <h2 className="text-4xl text-slate-500 font-semibold">
            with many amazing reasons to join.{' '}
          </h2>
          <Benefits />
        </section>
      </motion.section>
      <div className="h-screen" />
    </main>
  )
}
