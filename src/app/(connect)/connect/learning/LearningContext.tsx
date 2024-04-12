'use client'
import { AnimatePresence } from 'framer-motion'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import { createContext } from 'react'
import { motion } from 'framer-motion'
import { PollType } from './_components/PollCard'
import { UploadResult } from './SubmitResponse'
import { userContext } from '@/app/AuthContext'
import { supabase } from '../../../../../config/mesa-config'

export type LearningContextType = {
  PollModal: (e: PollType) => void
}

export const LearningContext = createContext<LearningContextType>({
  PollModal: (e) => <div>Error</div>
})

const LearningContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [modal, setModal] = useState<any>()
  const value = {
    PollModal: (e: PollType) => setModal(<PollModal data={e} disarm={() => disarmModal()} />)
  }

  const disarmModal = () => {
    setModal(undefined)
  }
  return (
    <LearningContext.Provider value={value}>
      {children}{' '}
      <AnimatePresence>
        {modal && (
          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-10 flex justify-center items-center overflow-y-auto"
          >
            <AnimatePresence>
              <motion.section
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{ duration: 0.5, type: 'spring' }}
                className="bg-white shadow-lg flex flex-col z-50 w-[50%] h-[60%] rounded-3xl"
                drag
                onClick={(e) => e.preventDefault()}
                dragMomentum={false}
                whileDrag={{ scale: 0.95 }}
              >
                {modal}
              </motion.section>
            </AnimatePresence>
            <ul
              onClick={() => {
                disarmModal()
              }}
              className="absolute inset-0 bg-gray-500 opacity-50 "
            />
          </motion.main>
        )}
      </AnimatePresence>
    </LearningContext.Provider>
  )
}

export default LearningContextProvider

const PollModal = ({ data, disarm }: { data: PollType; disarm: () => void }) => {
  const [loaded, setLoaded] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [context, setContext] = useState<string>()
  const [selected, setSelected] = useState<any>()

  const user = useContext(userContext)

  const isQuestion = typeof data.correct === 'number'

  useEffect(() => {
    setSelected(false)
    const see = async () => {
      const { data: SeeData, error } = await supabase
        .from('questionRepsonses')
        .select()
        .match({ responder_id: user.user?.id, question_id: data.id })

      if (error) {
        console.error(error)
        return
      }

      if (SeeData.length !== 0) {
        setSubmitted(true)
      }
    }

    see()

    if (data.context) {
      setContext(
        `https://gnmpzioggytlqzekuyuo.supabase.co/storage/v1/object/public/questionContexts/${data.id}.${data.contextType}`
      )
      setLoaded(true)
    } else setLoaded(true)
  }, [])

  return (
    <main className={`p-12  flex flex-col justify-between h-full`}>
      <section
        onClick={(e) => {
          e.preventDefault()
        }}
        className={`${context ? 'h-1/2' : 'h-24'} flex flex-col gap-2`}
      >
        <h2 className="font-eudoxus font-bold text-3xl text-slate-700">
          {isQuestion ? 'Question' : 'Poll'}
        </h2>
        <h1 className="font-bold font-eudoxus text-5xl">{data.question}</h1>
        {context && (
          <img src={context} onClick={() => {}} className="w-full h-full mt-4 object-contain" />
        )}
      </section>
      <section className="flex flex-row gap-1 flex-wrap">
        {data.options.map((option: string, index: number) => (
          <button
            className={`w-[49%] p-5 rounded-2xl ${
              selected === index
                ? isQuestion
                  ? index === data.correct
                    ? 'bg-green-500 text-white'
                    : 'bg-red-500 text-white'
                  : 'bg-orange-200'
                : 'bg-slate-100 hover:bg-slate-50'
            } duration-300 hover:scale-105`}
            key={index}
            onClick={() => {
              if (selected && !submitted) {
                UploadResult(user, data.id, index)
              }
              setSelected(index)
              setSubmitted(true)
            }}
          >
            <h1 className="font-mono">{option}</h1>
          </button>
        ))}
      </section>
    </main>
  )
}
