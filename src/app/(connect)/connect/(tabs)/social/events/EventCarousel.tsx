'use client'
import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import ComingUpEvents from './UpcomingEvents(events)'
import InterestedEvents from './interested'
import CurrentEventSegment from '@/_components/socialhub/CurrentEventSegment'

const EventCarousel = () => {
  const Carousel = [
    { name: 'Up and Coming', component: () => <ComingUpEvents /> },
    { name: 'For You', component: () => <InterestedEvents /> },
    { name: 'Eventlist', component: () => <CurrentEventSegment /> }
  ]

  const [Current, setState] = useState(() => Carousel[0])

  return (
    <motion.section className="w-1/2">
      <motion.ul className="flex flex-row gap-2 mb-5 justify-between">
        {Carousel.map((item, index) => {
          return (
            <>
              <button
                className={`${
                  item.name === Current.name
                    ? 'from-teal-600 to-slate-500 text-white'
                    : 'from-slate-200 to-zinc-100'
                } p-2 w-full bg-gradient-to-tr rounded-full font-bold hover:scale-105 duration-300`}
                key={index}
                onClick={() => {
                  setState(item)
                }}
              >
                <h1 className="duration-100">{item.name}</h1>
              </button>
            </>
          )
        })}
      </motion.ul>
      <motion.main className="overflow-y-scroll p-5">
        <Current.component />
      </motion.main>
    </motion.section>
  )
}

export default EventCarousel
