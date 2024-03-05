'use client'
import React, { useContext } from 'react'
import FeaturedLessons from './_components/FeaturedLessons'
import PollCard from './_components/PollCard'
import FeaturedPolls from './_components/FeaturedPolls'
import { userContext } from '@/app/AuthContext'

const Learning = () => {
  return (
    <main className="flex flex-col h-full pb-20 gap-10">
      <header>
        <h1 className=" font-bold text-5xl ">Learning Lab</h1>
      </header>
      <section className="flex flex-col gap-3 h-1/2">
        <FeaturedLessons />
      </section>
      <section className="w-full">
        <FeaturedPolls />
      </section>
      <footer></footer>
    </main>
  )
}

export default Learning
