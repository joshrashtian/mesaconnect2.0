import React from 'react'
import PollCard from './PollCard'
import { supabase } from '../../../../../../config/mesa-config'

const FeaturedPolls = async () => {
  const { data, error } = await supabase.from('questions').select()

  if (error) {
    console.error(error)
    return
  }

  return (
    <main className="flex flex-col gap-2">
      <h2 className="font-semibold text-zinc-700 text-3xl">Featured Polls</h2>
      <section className="w-full flex flex-row gap-2">
        {data?.map((poll, index) => (
          <PollCard key={index} index={index} data={poll} />
        ))}
      </section>
    </main>
  )
}

export default FeaturedPolls
