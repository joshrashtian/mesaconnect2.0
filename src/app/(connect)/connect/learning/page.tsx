'use client'
import React from 'react'
import FeaturedLessons from './(components)/FeaturedLessons'
import PollCard from './(components)/PollCard'
import FeaturedPolls from './(components)/FeaturedPolls'

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
