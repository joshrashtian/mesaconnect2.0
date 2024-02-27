'use client'

import EditWidgets from '@/_components/home/editWidgets'
import CurrentEventSegment from '@/_components/socialhub/CurrentEventSegment'
import { userContext } from '@/app/AuthContext'
import React, { useContext, useState } from 'react'
import { widgets } from '@/_components/widgets'
import { motion } from 'framer-motion'

const HomeScreenWidgets = () => {
  const user = useContext<any>(userContext)
  const [mode, setMode] = useState(0)

  const eventStyles = [
    {
      size: 'tall',
      style: 'h-full gap-x-4 flex flex-row justify-between'
    }
  ]

  if (!user.userData) return <section className="w-full h-full" />

  return (
    <motion.section
      className="w-full min-h-full flex flex-row justify-center p-10 gap-3 "
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.8 }}
    >
      <div
        onClick={() => {
          setMode(1)
        }}
        className="absolute top-10 right-10"
      >
        Edit Widgets
      </div>
      {user.userData?.widgets?.map((d: { name: string }) => {
        return (
          <motion.section>
            {widgets.map((e, i) => {
              if (d.name !== e.name) return null
              return (
                <section
                  key={i}
                  className={`w-full h-full shadow-md overflow-y-scroll rounded-3xl p-3 ${
                    e.style
                  } ${eventStyles.map((f) => {
                    if (e.size === f.size) return f.style
                  })}`}
                >
                  {e.widget()}
                </section>
              )
            })}
          </motion.section>
        )
      })}
      {mode === 1 && <EditWidgets current={user.userData.widgets} />}
    </motion.section>
  )
}

export default HomeScreenWidgets
