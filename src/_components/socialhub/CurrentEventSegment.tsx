'use client'
import React, { FC, useEffect, useState } from 'react'
import { supabase } from '../../../config/mesa-config'
import { Event } from './Event'
import { motion } from 'framer-motion'
import { EventType } from '@/_assets/types'


const CurrentEventSegment: FC = (): JSX.Element => {
  const [data, setData] = useState<EventType[]>()

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
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="w-full h-full rounded-3xl border-2 gap-5 flex flex-col items-center p-3"
    >
      <h1 className="font-bold">Current Events This Week</h1>
      {data?.map((event, index) => {
        return <Event key={index} event={event} />
      })}
    </motion.div>
  )
}

export default CurrentEventSegment
