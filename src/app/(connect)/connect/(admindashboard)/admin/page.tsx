'use client'

import React, { useContext, useState } from 'react'
import { motion } from 'framer-motion'
import {userContext, useUser} from '@/app/AuthContext'
import AdminIndex, { AdminPanel } from '.'
import {useToast} from "@/app/(connect)/InfoContext";

const page = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
  const user = useUser()
    // eslint-disable-next-line react-hooks/rules-of-hooks
  const [selected, setSelected] = useState<AdminPanel>(AdminIndex[0])
    // eslint-disable-next-line react-hooks/rules-of-hooks
  const toast = useToast()

  return (
    <motion.main initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
      <h1 className="font-bold">Admin Dashboard</h1>

      <section className="w-full gap-4 flex flex-row">
        <section className="w-1/5">
          <ul className="h-0.5 w-full bg-slate-300 my-4" />
          {AdminIndex.map((e, i) => {
            return (
              <ul
                onClick={() => {
                  setSelected(e)
                }}
                key={i}
                className={`w-full p-2 flex justify-center ${
                  selected.name === e.name ? 'bg-slate-600 text-white' : ''
                } duration-300 hover:bg-slate-500 hover:text-white cursor-pointer rounded-2xl `}
              >
                <h1 className="font-semibold text-xl">{e.displayname}</h1>
              </ul>
            )
          })}
        </section>
        <section className="w-4/5">
          <selected.component />
        </section>
      </section>
    </motion.main>
  )
}

export default page
