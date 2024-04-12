import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PollType } from '../_components/PollCard'
import ResponsesPollInfo from './ResponsesPollInfo'

const PollInfo = ({ disarmModal, active }: { disarmModal: () => void; active: PollType }) => {
  return (
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
          transition={{ delay: 0.2, duration: 0.5, type: 'spring' }}
          className="bg-white shadow-lg flex flex-col justify-between w-3/4 h-1/2 min-h-[600px] p-16 z-50 rounded-3xl"
        >
          <h1 className="font-bold text-4xl">{active.question}</h1>
          <section className="p-10 bg-slate-100 rounded-lg font-mono">
            <h2>Options: {active.options.toString().split(',').join(' | ')}</h2>
            <h2>Type: {active.correct ? 'Question' : 'Poll'}</h2>
            {active.correct && <h2>Answer: {active.options[active.correct]}</h2>}
            <h2>Created {new Date(active.created_at).toDateString()}</h2>
            <h2>{active.context && `Has Context of Type .${active.contextType} `}</h2>
          </section>
          <ResponsesPollInfo id={active.id} options={active.options} />
        </motion.section>
      </AnimatePresence>
      <ul
        onClick={() => {
          disarmModal()
        }}
        className="absolute inset-0 bg-gray-500 opacity-50 "
      />
    </motion.main>
  )
}

export default PollInfo
