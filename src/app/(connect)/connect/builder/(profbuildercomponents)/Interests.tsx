'use client'
import { useUser } from '@/app/AuthContext'
import React, { useEffect, useState } from 'react'
import { IoBook, IoCode, IoFlask, IoGameController } from 'react-icons/io5'
import { supabase } from '../../../../../../config/mesa-config'
import { icons, Interest } from '../../(tabs)/social/community/InterestButtons'
import { Reorder } from 'framer-motion'

const Interests = () => {
  const [interest, setInterests] = useState<Interest[]>()

  const { user } = useUser()

  useEffect(() => {
    const getInterests = async () => {
      const { data, error } = await supabase
        .from('interests')
        .select('*')
        .eq('userid', user?.id)
        .limit(4)

      if (error) {
        console.log(error)
        return
      }
      setInterests(data)
    }

    getInterests()
  }, [])

  return (
    <main>
      <section className="flex flex-col gap-6">
        {interest && (
          <Reorder.Group values={interest} onReorder={setInterests}>
            {interest?.map((interest) => (
              <Reorder.Item
                className="p-5 bg-zinc-50 shadow-md"
                key={interest.id}
                value={interest.id}
              >
                {icons.find((e) => interest.fieldType === e.name)?.icon}
                <h1>{interest.interest}</h1>
                <p className="text-slate-400">{interest.fieldType}</p>
              </Reorder.Item>
            ))}
          </Reorder.Group>
        )}
        <button className="p-5 bg-zinc-50 shadow-md duration-300 hover:scale-105">
          <h1>New Interest</h1>
        </button>
      </section>
    </main>
  )
}

export default Interests
