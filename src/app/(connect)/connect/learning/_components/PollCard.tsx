'use client'
import { motion } from 'framer-motion'
import React, { useContext } from 'react'
import { LearningContext } from '../LearningContext'

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
  correct: number
  contextType: string
}

const PollCard = ({ data, index }: { data: PollType; index?: number }) => {
  const modal = useContext(LearningContext)

  return (
    <button
      onClick={() => {
        modal.PollModal(data)
      }}
      className="p-6 w-full md:w-[45%] lg:w-1/6 h-24 hover:scale-105 hover:shadow-lg border-2 border-amber-600 border-opacity-0 hover:border-dashed hover:border-opacity-100 duration-300 scale-100 cursor-pointer flex shadow-md flex-col justify-center bg-white rounded-xl"
    >
      <h2 className="font-mono">{data.question}</h2>
      <h2>by {data.creator.realname}</h2>
    </button>
  )
}

export default PollCard
