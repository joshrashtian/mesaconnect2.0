import React from 'react'
import { EventType } from './CurrentEventSegment'

export const Event = ({ event }: { event: EventType }) => {
  return (
    <div className="flex flex-col bg-black justify-between">
      <h1 className="text-xl text-slate-600 font-semibold">{event.name}</h1>
      <h2 className="text-lg text-slate-400">{event.desc}</h2>
    </div>
  )
}
