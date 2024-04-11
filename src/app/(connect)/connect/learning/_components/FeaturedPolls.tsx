'use client'
import React, { useContext, useEffect, useState } from 'react'
import PollCard, { PollType } from './PollCard'
import { supabase } from '../../../../../../config/mesa-config'
import { userContext } from '@/app/AuthContext'
import Link from 'next/link'

const FeaturedPolls = () => {
  const [data, setData] = useState<any>([])
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from('questions').select()
      if (error) {
        console.error(error)
        return
      }
      setData(data)
    }
    fetchData()
  }, [])

  return (
    <section className="flex flex-col gap-2">
      <ul className="flex flex-row justify-between items-center">
        <h2 className="font-semibold text-zinc-700 text-3xl font-eudoxus">Featured Polls</h2>
        <Link
          href="/connect/learning/creator"
          className="p-2 px-4 border-2 hover:border-opacity-100 hover:scale-105 duration-300 border-dashed border-opacity-50 border-slate-600 rounded-2xl"
        >
          <h1 className="text-slate-600 font-eudoxus">Create Question</h1>
        </Link>
      </ul>
      <div className="w-full flex flex-col md:flex-wrap lg:flex-row gap-2">
        {data.map((poll: PollType, index: number) => (
          <PollCard key={index} index={index} data={poll} />
        ))}
      </div>
    </section>
  )
}

export default FeaturedPolls
