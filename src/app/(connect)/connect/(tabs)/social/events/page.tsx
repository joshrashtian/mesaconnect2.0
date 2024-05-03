import React, { useState } from 'react'
import InterestedEvents from './interested'
import CurrentEventSegment from '@/_components/socialhub/CurrentEventSegment'
import ComingUpEvents from './UpcomingEvents(events)'
import EventCarousel from './EventCarousel'
import Link from 'next/link'
import { IoSearchSharp } from 'react-icons/io5'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Events'
}

const EventPage = () => {
  return (
    <main className="flex flex-col gap-3 h-full font-eudoxus">
      <header className="flex flex-row justify-between items-center">
        <h1 className="text-5xl font-bold font-eudoxus">Events</h1>
        <Link
          className="hover:scale-105 duration-300 gap-3 px-4 absolute flex flex-row items-center justify-between right-16 top-16 bg-gradient-to-tr rounded-full text-white from-purple-600 to-blue-600 p-2 "
          href="/connect/social/search"
        >
          <IoSearchSharp size={30} />
          <h1 className="font-mono">Search</h1>
        </Link>
      </header>

      <section className="flex flex-row gap-3 h-full">
        <EventCarousel />
      </section>
    </main>
  )
}

export default EventPage
