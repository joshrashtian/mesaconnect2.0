'use client'
import { motion } from 'framer-motion'
import React from 'react'

export type PollType = {
  question: string
  id: string
  options: string[]
  context: boolean
  due: Date
  created_at: Date
  creator: {
    id: string
    picture: string
    realname: string
    username: string
  }
}

const PollCard = ({ data, index }: { data: PollType; index?: number }) => {
  return (
    <motion.ul
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2 * (index ? index : 1) }}
      className="p-4 w-1/6 h-24 hover:scale-105 scale-100 cursor-pointer flex shadow-md flex-col justify-center bg-white rounded-xl"
    >
      <h2 className="font-mono">{data.question}</h2>
      <h2>by {data.creator.realname}</h2>
    </motion.ul>
  )
}

export default PollCard
