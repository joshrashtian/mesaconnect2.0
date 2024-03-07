'use client'
import React, { useContext, useEffect, useState } from 'react'
import { supabase } from '../../../../../../config/mesa-config'
import { userContext } from '@/app/AuthContext'
import { PollType } from '../_components/PollCard'
import { DeletePoll } from './DeletePoll'
import { MenuContext } from '@/app/(connect)/InfoContext'
import PollInfo from './PollInfo'
import { AnimatePresence } from 'framer-motion'

const PollDashboard = () => {
  const user = useContext(userContext)
  const [confirm, setConfirm] = useState(false)
  const [focus, setFocus] = useState<PollType | undefined>()
  const [data, setData] = useState<PollType[]>([])

  const modal = useContext(MenuContext)

  if (!user) return
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('questions')
        .select()
        .eq('creatorid', user.user?.id)

      if (error) {
        console.error(error)
        return
      }

      setData(data)
    }

    fetchData()
  }, [])

  if (!data) return

  const deletePoll = async (id: PollType) => {
    if (!confirm) {
      setConfirm(true)
    } else {
      DeletePoll(id)
    }
  }

  useEffect(() => {
    const channel = supabase
      .channel('polls channel')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'questions'
          //filter: `userid=eq.${user.user?.id}`
        },
        (payload) => {
          if (payload.eventType === 'DELETE') {
            console.log(payload.old.id)
            modal.toast(`Deleted your Poll `, 'success')
            setData((data) => data.filter((e) => e.id !== payload.old.id))
          }
          if (payload.eventType === 'INSERT') {
            setData((data: any) => [payload.new, ...data])
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase])

  return (
    <main className="w-full min-h-full ">
      <h1 className="font-bold text-3xl text-slate-700">Your Polls</h1>
      <section className="w-full flex flex-col gap-3 mt-5">
        {data.map((item, index) => {
          return (
            <button
              onClick={() => {
                setFocus(item)
              }}
              className="w-full bg-white group flex flex-row hover:scale-[1.01] items-center justify-between hover:bg-zinc-50 border-2 cursor-pointer hover:border-amber-500 duration-300 p-6 rounded-md"
            >
              <h1 className="font-semibold text-xl">{item.question}</h1>
              <nav className="scale-0 group-hover:scale-100 duration-300">
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    deletePoll(item)
                  }}
                  className="p-1 px-4 duration-300 ease-in-out rounded-lg bg-red-200 hover:bg-red-500 hover:text-white"
                >
                  <h2>{confirm ? 'Are You Sure?' : 'Delete'}</h2>
                </button>
              </nav>
            </button>
          )
        })}
      </section>
      <AnimatePresence>
        {focus && (
          <PollInfo
            disarmModal={() => {
              setFocus(undefined)
            }}
            active={focus}
          />
        )}
      </AnimatePresence>
    </main>
  )
}

export default PollDashboard
