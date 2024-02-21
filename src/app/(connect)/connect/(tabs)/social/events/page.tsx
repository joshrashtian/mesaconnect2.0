import CurrentEventSegment from '@/_components/socialhub/CurrentEventSegment'
import React from 'react'
import InterestedEvents from './interested'

const EventPage = () => {
  return (
    <main className="flex flex-col gap-3">
      <h1 className="text-5xl font-bold">Event Page</h1>

      <div className="flex flex-row">
        <section className="w-1/3">
          <CurrentEventSegment />
        </section>
        <section className="w-1/3">
          <InterestedEvents />
        </section>
      </div>
    </main>
  )
}

export default EventPage
