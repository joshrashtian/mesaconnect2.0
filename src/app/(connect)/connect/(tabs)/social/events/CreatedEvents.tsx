'use client'
import React, { FC, useContext, useEffect, useState } from 'react'
import { Box } from '@/_assets/types'
import { motion } from 'framer-motion'
import { Event } from '@/_components/socialhub/Event'
import { EventType } from '@/_assets/types'

import Link from 'next/link'
import { supabase } from '../../../../../../../config/mesa-config'
import { userContext } from '@/app/AuthContext'

const CreatedEvents: FC = (): JSX.Element => {
  const [data, setData] = useState<EventType[]>()
  const activeUser: any = useContext(userContext)

  useEffect(() => {
    const fetchData = async () => {
      if (!activeUser.userData) return

      const { data, error } = await supabase
        .from('events')
        .select()
        .eq('creator', activeUser.user.id)
        .order('start')

      if (error) {
        console.log(error)
        return
      }
      // @ts-ignore
      setData(data)
    }

    fetchData()
  }, [activeUser])

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="w-full h-full rounded-3xl gap-2 flex flex-col"
    >
      <h1 className="text-lg font-bold">Your Created Events</h1>
      {data?.map((event, index) => {
        return (
          <motion.section
              key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', duration: 0.3, delay: 0.2 * index }}
          >
            <Event event={event} />
          </motion.section>
        )
      })}
    </motion.div>
  )
}

export default CreatedEvents
