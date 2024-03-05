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
}

const PollCard = ({ data, index }: { data: PollType; index?: number }) => {
  const modal = useContext(LearningContext)
  return (
    <button
      onClick={() => {
        modal.PollModal(data)
      }}
      className="p-4 w-1/6 h-24 hover:scale-105 scale-100 cursor-pointer flex shadow-md flex-col justify-center bg-white rounded-xl"
    >
      <h2 className="font-mono">{data.question}</h2>
      <h2>by {data.creator.realname}</h2>
    </button>
  )
}

export default PollCard
