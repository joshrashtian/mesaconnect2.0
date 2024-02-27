'use client'
import React, { FC, useEffect, useState } from 'react'

import { motion } from 'framer-motion'
import { Event } from '@/_components/socialhub/Event'
import { EventType } from '@/_assets/types'
import { supabase } from '../../../../../config/mesa-config'
import Link from 'next/link'

const UpcomingEvents: FC = (): JSX.Element => {
  const [data, setData] = useState<EventType[]>()

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('events')
        .select()
        .gte('start', new Date(Date.now()).toISOString())
        .limit(4)
        .order('start')

      if (error) {
        console.log(error)
        return
      }

      setData(data)
    }

    fetchData()
  }, [])

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="w-full h-full rounded-3xl gap-2 flex flex-col"
    >
      <h1 className="text-lg font-bold">Current Events This Week</h1>
      {data?.map((event, index) => {
        return <Event key={index} event={event} />
      })}
      <Link
        href={`/connect/social/events`}
        className="flex flex-col w-full p-5 bg-zinc-100 rounded-2xl hover:scale-[1.02] duration-300 shadow-md hover:shadow-lg justify-between items-center"
      >
        <h1 className="font-geist">View All Events</h1>
      </Link>
    </motion.div>
  )
}

export default UpcomingEvents
