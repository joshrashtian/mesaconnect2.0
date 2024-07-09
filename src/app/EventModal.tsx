'use client'

import { EventType } from '@/_assets/types'
import { createContext, useState, useEffect, useContext } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { MenuContext } from './(connect)/InfoContext'
import { supabase } from '../../config/mesa-config'
import { userContext } from './AuthContext'
import { calendar, months } from '../../config/calendar'
import Image from 'next/image'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { IoMdClock } from 'react-icons/io'
import { IoCalendarNumber, IoPricetags } from 'react-icons/io5'

export const EventModalContext: any = createContext({})

const EventModal = ({ children }: { children: React.ReactNode }) => {
  const [event, setEvent] = useState<EventType>()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { replace } = useRouter()

  useEffect(() => {
    const fetchEvent = async () => {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        // @ts-ignore
        .eq('id', searchParams.get('event'))
        .single()
      if (error) {
        console.log(error)
      } else {
        // @ts-ignore
        setEvent(data)
      }
    }

    if (searchParams.get('event')) {
      fetchEvent()
    }
  }, [])

  function handleParams(term?: string) {
    const params = new URLSearchParams(searchParams)
    if (term) {
      params.set('event', term)
    } else {
      params.delete('event')
    }
    replace(`${pathname}?${params.toString()}`)
  }

  const value = {
    createModal: (event: EventType) => {
      setEvent(event)
      handleParams(event.id)
    },
    disarmModal: () => {
      setEvent(undefined)
      handleParams()
    }
  }

  return (
    <EventModalContext.Provider value={value}>
      <AnimatePresence>{event && <Modal event={event} />}</AnimatePresence>
      {children}
    </EventModalContext.Provider>
  )
}

const Modal = ({ event }: { event: EventType }) => {
  const [state, setState] = useState(3)

  const user = useContext(userContext)

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('eventinterest')
        .select()
        //@ts-ignore
        .eq('user_id', user.user?.id)
        .eq('event_id', event.id)

      if (error) {
        console.error(error)
        return
      }

      if (data.length !== 0) setState(2)
      else setState(0)
    }

    if (state !== 1) fetchData()
  }, [])

  const InterestedContext = [
    {
      text: "I'm Interested",
      precursor: '+',
      context: 0
    },
    {
      text: 'Added!',
      precursor: '✔',
      context: 1
    },
    {
      text: "I've Lost Interest",
      precursor: 'x',
      context: 2
    }
  ]

  const disarm = useContext<any>(EventModalContext)
  const toast = useContext<any>(MenuContext)
  const [dateMessage, setDateMessage] = useState<string>()

  const dates = {
    startDate: new Date(event.start),
    endDate: event.endtime ? new Date(event.endtime) : undefined
  }
  dates.endDate && new calendar(dates.startDate, dates.endDate)
  const onInterest = async () => {
    setState(1)
    toast.toast('Added to your List!', 'success')
    setTimeout(() => {
      setState(2)
    }, 4000)

    const { error } = await supabase.from('eventinterest').insert({
      event_id: event.id,
      user_id: user.user?.id,
      data: {
        name: user.userData?.real_name,
        username: user.userData?.username,
        major: user.userData?.major ? user.userData.major : 'Undecided'
      }
    })
    if (error) {
      console.error(error)
      return
    }

    setState(1)
    toast.toast('Added to your List!', 'success')
    setTimeout(() => {
      setState(2)
    }, 3400)
  }

  const onInterestLost = async () => {
    setState(1)

    const { error } = await supabase
      .from('eventinterest')
      .delete()
      .match({ event_id: event.id, user_id: user.user?.id })

    if (error) {
      console.error(error)
      return
    }

    toast.toast('Removed from your List!', 'success')
    setState(0)
  }

  useEffect(() => {
    const now = Date.now()

    if (dates.endDate && now > dates.endDate.getTime()) {
      setDateMessage('Event has ended')
    } else if (now < dates.startDate.getTime()) {
      setDateMessage('Upcoming Event')
    } else {
      setDateMessage('Currently Ongoing')
    }
  }, [dates.endDate, dates.startDate])

  const [creator, setCreator] = useState()

  if (state === 3) return
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex justify-center font-eudoxus items-center overflow-y-auto"
    >
      <AnimatePresence>
        <motion.section
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ duration: 0.5, type: 'spring' }}
          className="bg-white shadow-lg flex flex-col z-50 min-h-1/2 min-w-[50%] rounded-3xl"
          drag
          onClick={(e) => e.preventDefault()}
          dragMomentum={false}
          whileDrag={{ scale: 0.95 }}
        >
          <ul
            className={`min-w-full h-6 z-10 right-0 flex ${
              event.image ? 'bg-white hover:opacity-75 opacity-0 -mb-6 ' : 'bg-gray-50'
            }  items-center rounded-t-full rounded-bl-2xl duration-300 px-5 flex-row-reverse
            relative`}
          >
            <p
              onClick={() => {
                disarm.disarmModal()
              }}
              className="font-medium cursor-pointer hover:text-red-600  duration-300  font-mono text-lg "
            >
              x
            </p>
          </ul>
          {event.image && (
            <motion.section className="w-full relative h-48">
              <Image
                fill={true}
                objectFit="cover"
                className="rounded-t-3xl"
                src={event.image.url}
                alt="event image"
              />
            </motion.section>
          )}
          <main className="p-5 px-10 justify-between gap-10 flex flex-col h-full">
            <header>
              <ul className=" justify-between flex flex-row items-center ">
                <h1 className="font-bold text-4xl bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
                  {event.name}
                </h1>
              </ul>
              <h2 className="text-xl font-light text-slate-600">
                {event.desc ? event.desc : 'This event does not have a description.'}
              </h2>
              <ul className=" justify-between flex flex-row items-center ">
                <ul className="flex flex-row">
                  <span className="px-2 p-1 bg-gradient-to-tr mr-2 from-slate-500 to-zinc-700 rounded-md text-white">
                    <IoCalendarNumber />
                  </span>
                  <h2>
                    {` ${
                      months[dates.startDate.getMonth()]
                    } ${dates.startDate.getDate()}, ${dates.startDate.getFullYear()}`}
                  </h2>
                </ul>
                <div className="flex flex-row gap-2">
                  <ul className="p-2 px-4 bg-zinc-100 rounded-full">
                    <h2 className="text-teal-700 font-medium">{dateMessage?.toUpperCase()}</h2>
                  </ul>
                  <ul className="p-2 px-4 bg-zinc-100 rounded-full">
                    <h2 className="text-orange-700 font-medium">{event.type.toUpperCase()}</h2>
                  </ul>
                </div>
              </ul>
              <h2 className="font-semibold flex flex-row gap-1 items-center">
                <span className="px-2 p-1 bg-gradient-to-tr mr-2 from-slate-500 to-zinc-700 rounded-md text-white">
                  <IoMdClock />
                </span>
                <span className=" font-normal">
                  {` ${
                    dates.startDate.getHours() > 12
                      ? dates.startDate.getHours() - 12
                      : dates.startDate.getHours()
                  }:${
                    dates.startDate.getMinutes() < 10
                      ? `0${dates.startDate.getMinutes()}`
                      : dates.startDate.getMinutes()
                  } ${
                    dates.endDate
                      ? ` - ${
                          dates.endDate.getHours() > 12
                            ? dates.endDate.getHours() - 12
                            : dates.endDate.getHours()
                        }:${
                          dates.endDate.getMinutes() < 10
                            ? `0${dates.endDate.getMinutes()}`
                            : dates.endDate.getMinutes()
                        }`
                      : ''
                  } ${dates.startDate.getHours() > 12 ? 'PM' : 'AM'}`}
                </span>
              </h2>
              <ul className="w-full flex flex-row mt-2 items-center gap-1">
                <h1 className="px-2 p-1 bg-gradient-to-tr from-slate-500 to-zinc-700 rounded-md text-white">
                  <IoPricetags />
                </h1>
                {event.tags &&
                  event.tags.map((e, i) => (
                    <div key={e} className="">
                      <h1>
                        {e}
                        {i !== event.tags.length - 1 && ', '}
                      </h1>
                    </div>
                  ))}
              </ul>
            </header>
            <motion.footer className="pb-6 gap-3">
              <button
                onClick={() => {
                  state === 0 ? onInterest() : onInterestLost()
                }}
                className={`p-3 ${
                  state === 0
                    ? 'from-blue-600 to-indigo-700 animate-none'
                    : state === 1
                    ? 'from-green-600 to-emerald-800  scale-110 animate-bounce'
                    : 'from-red-600 animate-none to-amber-700 '
                } bg-gradient-to-br w-full xl:w-1/2 3xl:w-1/4 hover:scale-105 focus:scale-95 shadow-md hover:shadow-lg rounded-full transition-all duration-500`}
              >
                <p className=" font-semibold text-xl flex flex-row items-center justify-center gap-3 text-white">
                  <span className="text-2xl font-medium w-8 h-8 border-[2px] items-center flex justify-center rounded-full">
                    {InterestedContext[state].precursor}
                  </span>

                  {InterestedContext[state].text.toUpperCase()}
                </p>
              </button>
            </motion.footer>
          </main>
        </motion.section>
      </AnimatePresence>

      <ul
        className="absolute inset-0 bg-gray-500 opacity-50 "
        onClick={() => {
          disarm.disarmModal()
        }}
      />
    </motion.main>
  )
}

export default EventModal
