'use client'

import React from 'react'
import { motion } from 'framer-motion'

const PostContext = ({
  rightClick,
  positionX,
  positionY,
  isToggled,
  buttons,
  contextMenuRef,
  dismount
}: {
  rightClick: any
  positionX: number
  positionY: number
  isToggled: boolean
  buttons: any
  contextMenuRef: any
  dismount: () => void

}) => {
  if (!isToggled) return null

  return (
    <motion.menu
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.4, type: 'spring' }}
      drag
      dragMomentum={false}
      style={{ top: `${positionY + 2}px`, left: `${positionX + 2}px` }}
      className={`fixed z-50 bg-white origin-top-left min-w-[200px] p-1.5 drop-shadow-lg flex flex-col items-center`}
    >
      <ul className="w-[70%] cursor-pointer active:scale-110 hover:scale-105 h-1 my-2 duration-150 rounded-full bg-slate-200" />
      {buttons.map((e: any, index: number) => {
        if (!e.visible) return

        return (
          <li
            key={e.name}
            className="cursor-pointer rounded-lg text-md text-left items-center text-nowrap px-3 p-2 flex flex-row w-full hover:bg-blue-100 duration-500"
            onClick={() => {
              e.function();
              dismount()
            }}
          >
            <h1 className=" w-full font-eudoxus">{e.name}</h1>
            <image className="text-xl">{e.icon ?? null}</image>
          </li>
        )
      })}
    </motion.menu>
  )
}

export default PostContext
