import React from 'react'
import { EventType } from './CurrentEventSegment'
import { Person } from '@/_assets/types'

export const Event = ({ event }: { event: EventType }) => {
  const date = new Date(event.start)
  const peopleAttending = JSON.parse(JSON.stringify(event.people_attended))

  return (
    <div className="flex flex-col w-full p-5 bg-white rounded-2xl shadow-lg justify-between">
      <h1 className="text-xl text-slate-600 font-semibold">{event.name}</h1>
      <h2 className="text-lg text-slate-400">{event.desc}</h2>
      <ul className="w-full flex-row flex justify-between">
        <h2 className="text-md text-slate-500">{`${date.getMonth()} / ${date.getDate()}`}</h2>
        {event.tags && event.tags.map((tag) => <span className="">{tag}</span>)}
      </ul>
      {peopleAttending.people.map((person: Person) => {
        return <h1>{person.name}</h1>
      })}
    </div>
  )
}
