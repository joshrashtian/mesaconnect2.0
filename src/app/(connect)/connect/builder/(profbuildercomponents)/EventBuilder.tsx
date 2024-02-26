'use client'
import { EventType } from '@/_assets/types'
import { userContext } from '@/app/AuthContext'
import React, { useContext, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Recommendations from './EventBuilder/Recommendations'
import { supabase } from '../../../../../../config/mesa-config'
import { MenuContext } from '@/app/(connect)/InfoContext'
import { useRouter } from 'next/navigation'

const types = [
  {
    type: 'User Created'
  },
  {
    type: 'Official MESA',
    permissions: ['admin']
  },
  {
    type: 'Tutoring',
    permissions: ['admin', 'tutor', 'moderator']
  }
]

const timeTypes = ['In-Person', 'Zoom']

const EventBuilder = () => {
  const [event, setEvent] = useState<EventType>({
    type: 'User Created'
  })
  const [timeType, setTimeType] = useState()
  const [submitting, setSubmitting] = useState(false)
  const user = useContext(userContext)
  const toast = useContext<any>(MenuContext)
  const router = useRouter()

  const eventSubmit = async () => {
    setSubmitting(true)
    const { error } = await supabase.from('events').insert({
      name: event.name,
      desc: event.desc,
      type: event.type,
      start: event.start,
      end: event.end,
      location: event.location,
      tags: event.tags,
      creator: user.user?.id
    })

    if (error) {
      toast.toast(error.message, 'Error')
      return
    }

    toast.toast('Successfully Posted!', 'Success')
    router.push('/connect/social/events')
  }

  if (!user.userData) return <h1>Loading...</h1>

  return (
    <motion.main className="flex flex-col gap-10">
      <motion.header>
        <ul className="flex flex-col gap-2">
          <h1 className="font-bold text-2xl">
            Let's start with some basics of <span className=" text-indigo-800">your</span> event.
          </h1>
          <input
            onChange={(e) => {
              setEvent({ ...event, name: e.target.value })
            }}
            placeholder="Name Your New Event"
            maxLength={65}
            className="w-full text-2xl p-3 my-2 rounded-xl shadow-md focus:text-black focus:scale-[1.03] focus:shadow-lg focus:outline-zinc-200 focus:outline-dotted duration-300 text-transparent bg-clip-text bg-gradient-to-tr from-blue-500 via-emerald-600 to-slate-700 inline-block "
          />
          <textarea
            onChange={(e) => {
              setEvent({ ...event, desc: e.target.value })
            }}
            placeholder="Give Your Event A Fitting Description"
            maxLength={240}
            className="w-full text-2xl resize-y overflow-hidden min-h-36 max-h-64 p-3 my-2 rounded-xl shadow-md focus:text-black focus:scale-[1.03] focus:shadow-lg focus:outline-zinc-200 focus:outline-dotted duration-300 text-transparent bg-clip-text bg-gradient-to-tr from-blue-500 via-emerald-600 to-slate-700 inline-block "
          />
          <AnimatePresence>
            {event.desc && (
              <motion.h2
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: -50 }}
                exit={{ opacity: 0, y: -40 }}
                className=" text-slate-400 text-center "
              >
                {event.desc.length} Characters / {event.desc.split(' ').length} Words
              </motion.h2>
            )}
          </AnimatePresence>
          <section className="flex flex-row gap-2 justify-center flex-wrap">
            {user.userData.role !== 'guest' &&
              types.map((e) => {
                if (e.permissions && !e.permissions.includes(user.userData?.role)) return null
                return (
                  <button
                    key={e.type}
                    className={` ${
                      event.type === e.type ? 'bg-indigo-500' : 'bg-slate-600'
                    } hover:scale-105 duration-300 text-white p-2 w-[30%] rounded-full `}
                    onClick={() => {
                      setEvent({ ...event, type: e.type })
                    }}
                  >
                    {e.type}
                  </button>
                )
              })}
          </section>
        </ul>
      </motion.header>
      <AnimatePresence>
        {event.type && event.name && event.name.length > 5 && event.desc && (
          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col gap-4"
          >
            <h1 className="font-bold text-2xl">
              <span className="text-green-600">Perfect!</span> Let's learn a little more about your
              new event... starting with timing.
            </h1>

            <section className="w-full flex gap-3">
              {timeTypes.map((e) => (
                <button
                  key={e}
                  onClick={() => {
                    setTimeType(e)
                  }}
                  className={` ${
                    timeType === e ? 'bg-green-700' : 'bg-slate-400'
                  } w-full ease-in-out font-semibold hover:bg-slate-500 p-3 flex text-white justify-center rounded-full duration-300`}
                >
                  {e}
                </button>
              ))}
            </section>

            {timeType === 'In-Person' ? (
              <section className="flex flex-col gap-0">
                <input
                  onChange={(e) => {
                    setEvent({ ...event, location: e.target.value })
                  }}
                  value={event.location ? event.location : ''}
                  contentEditable
                  placeholder="Name Your New Event"
                  maxLength={65}
                  className="w-full z-10 text-2xl p-3 my-2 rounded-xl shadow-md focus:text-black focus:scale-[1.03] focus:shadow-lg focus:outline-zinc-200 focus:outline-dotted duration-300 text-transparent bg-clip-text bg-gradient-to-tr from-blue-500 via-emerald-600 to-slate-700 inline-block "
                />
                <Recommendations
                  input={event.location}
                  onChange={(e: any) => {
                    setEvent({ ...event, location: e })
                  }}
                />
              </section>
            ) : null}

            <AnimatePresence>
              {event.location && (
                <motion.section
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="flex flex-col gap-3 p-5 text-center"
                >
                  <h1 className="font-bold text-3xl">and it starts at</h1>
                  <input
                    type="datetime-local"
                    onChange={(e) => {
                      setEvent({ ...event, start: new Date(e.target.value) })
                    }}
                    className=" shadow-md p-3 rounded-full "
                  />
                  {event.start?.getTime() < Date.now() && (
                    <h1 className="bg-zinc-100 p-3 font-geist rounded-xl">
                      <span className="text-orange-700 font-bold ">WARN</span> The time / date
                      stated has already passed
                    </h1>
                  )}
                  {event.start && (
                    <>
                      <motion.section
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ type: 'spring ' }}
                        className="gap-3 flex flex-col"
                      >
                        <ul className="flex flex-row justify-center items-center gap-5">
                          <h1 className="font-bold text-2xl">...and goes until (optional)</h1>

                          <input
                            type="datetime-local"
                            onChange={(e) => {
                              setEvent({ ...event, end: new Date(e.target.value) })
                            }}
                            className=" shadow-md p-3 rounded-full "
                          />
                        </ul>
                        {event.end?.getTime() < Date.now() && (
                          <h1 className="bg-zinc-100 p-3 font-geist rounded-xl">
                            <span className="text-orange-700 font-bold ">WARN</span> The time / date
                            stated has already passed
                          </h1>
                        )}
                        <section>
                          <input
                            onChange={(e) => {
                              setEvent({
                                ...event,
                                tags: e.target.value
                                  .split(',')

                                  .map((e) => e.trim())
                                  .filter((e) => e.length > 0)
                              })
                            }}
                            placeholder="Some Tags..."
                            maxLength={65}
                            className="w-full text-2xl p-3 my-2 rounded-xl shadow-md focus:text-black focus:scale-[1.03] focus:shadow-lg focus:outline-zinc-200 focus:outline-dotted duration-300 text-transparent bg-clip-text bg-gradient-to-tr from-blue-500 via-emerald-600 to-slate-700 inline-block "
                          />
                          <AnimatePresence>
                            <motion.div className="flex flex-row gap-3">
                              {event.tags &&
                                event.tags.map((value, index) => (
                                  <motion.ul
                                    initial={{ y: 5, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: -5, opacity: 0 }}
                                    key={index}
                                    className="p-3 bg-zinc-100 rounded-full"
                                  >
                                    <li className=" font-geist ">{value}</li>
                                  </motion.ul>
                                ))}
                            </motion.div>
                          </AnimatePresence>
                        </section>
                      </motion.section>
                    </>
                  )}
                </motion.section>
              )}
            </AnimatePresence>
          </motion.main>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {event.name && event.tags && (
          <motion.footer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col gap-4 items-center absolute bottom-28 w-2/3"
          >
            <button
              onClick={() => {
                eventSubmit()
              }}
              className={`w-2/3 h-12  bg-orange-500 shadow-lg z-40 text-white font-bold rounded-2xl`}
            >
              Submit
            </button>
          </motion.footer>
        )}
      </AnimatePresence>
    </motion.main>
  )
}

export default EventBuilder
