'use client'
import React, { FC, useContext, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Event } from '@/_components/socialhub/Event'
import { EventType } from '@/_assets/types'

import { supabase } from '../../../../../../../config/mesa-config'
import { userContext } from '@/app/AuthContext'

const ComingUpEvents: FC = (): JSX.Element => {
  const [data, setData] = useState<EventType[]>()
  const activeUser: any = useContext(userContext)

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
      exit={{ y: 20, opacity: 0 }}
      className="w-full h-full rounded-3xl gap-2 flex flex-col"
    >
      <h1 className="text-lg font-bold">Events Coming Up Soon</h1>
      {data?.map((event, index) => {
        return (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', duration: 0.3, delay: 0.2 * index }}
          >
            <Event key={index} event={event} />
          </motion.section>
        )
      })}
    </motion.div>
  )
}

export default ComingUpEvents
