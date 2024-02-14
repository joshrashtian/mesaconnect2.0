'use client'
import React, { FC, useEffect, useState } from 'react'
import { supabase } from '../../../config/mesa-config'

interface Event {
  id: string
  created_at: any
  name: string
  desc: string
  people_attended: JSON
  start: Date
  end: Date
  location: string
}

const CurrentEventSegment: FC = (props): JSX.Element => {
  const [data, setData] = useState<Event[]>([])
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from('events').select()

      if (error) {
        console.log(error)
        return
      }

      setData(data)
    }

    fetchData()
  }, [])
  return (
    <div className="w-full h-full rounded-3xl shadow-sm bg-slate-100 flex flex-col items-center p-3">
      <h1 className="font-bold">Current Events This Week</h1>
      {data.map((event, index) => {
        return (
          <div key={index} className="flex flex-row justify-between">
            <h1 className="text-xl text-slate-600 font-semibold">{event.name}</h1>
          </div>
        )
      })}
    </div>
  )
}

export default CurrentEventSegment
