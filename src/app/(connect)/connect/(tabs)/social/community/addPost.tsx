'use client'
import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { IoAdd, IoClose, IoNewspaper, IoPeople } from 'react-icons/io5'
import { IoIosChatbubbles } from 'react-icons/io'
import QuickWimModal from '@/_components/socialhub/QuickWimModal'
const AddPost = () => {
  const [menu, setMenu] = useState(false)
  const [wimMenu, setwim] = useState(false)
  return (
    <AnimatePresence>
      <motion.ul
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1 }}
        className={` fixed z-50  cursor-pointer shadow-lg text-2xl text-white bottom-8 rounded-[30px] hover:rounded-3xl hover:scale-105 right-6 w-16 h-16 ${
          menu ? 'bg-white' : 'bg-red-600'
        } hover:bg-red-400 duration-300`}
      >
        <button
          className="w-full flex justify-center items-center h-full"
          onClick={() => setMenu(!menu)}
        >
          <IoAdd className={`${menu ? 'scale-0' : 'scale-100 '} duration-300 translate-x-3`} />
          <IoClose
            className={`${
              menu ? 'scale-100 ' : 'scale-0 '
            } text-red-600 duration-300 -translate-x-3`}
          />
        </button>
      </motion.ul>
      <AnimatePresence>
        {menu && (
          <>
            <motion.ul
              initial={{ scale: 0, rotate: -10, x: 50, y: 40 }}
              animate={{ scale: 1, rotate: 8, x: -15, y: 14 }}
              exit={{ scale: 0, rotate: 0, x: 60, y: 40 }}
              transition={{ duration: 0.6, type: 'spring' }}
              onClick={() => setwim(true)}
              className="w-40 h-12 px-6 group cursor-pointer border-2 hover:border-orange-300 font-eudoxus text-xl bg-white flex justify-between items-center gap-6 fixed origin-right bottom-14 rotate-12 right-24 shadow-xl drop-shadow-2xl "
            >
              <p>Wim</p>
              <IoIosChatbubbles />
            </motion.ul>
            <motion.ul
              initial={{ scale: 0, rotate: -10, x: 55, y: 40 }}
              animate={{ scale: 1, rotate: 13, x: -38, y: 16 }}
              exit={{ scale: 0, rotate: 0, x: 50, y: 70 }}
              transition={{ duration: 0.6, type: 'spring' }}
              className="w-40 h-12 group cursor-pointer  font-eudoxus text-xl bg-white  gap-6 fixed origin-right bottom-28 rotate-12 right-16 shadow-xl drop-shadow-lg "
            >
              <Link
                className="flex w-full px-6 h-full hover:text-amber-600 justify-between duration-300 border-2 hover:border-orange-300 scale-100 hover:scale-105 items-center"
                href="/connect/builder?type=post"
              >
                <p>Post</p>
                <IoNewspaper />
              </Link>
            </motion.ul>
            <motion.ul
              initial={{ scale: 0, rotate: -10, x: 55, y: 40 }}
              animate={{ scale: 1, rotate: 17, x: -20, y: -34 }}
              exit={{ scale: 0, rotate: -40, x: 50, y: 90 }}
              transition={{ duration: 0.6, type: 'spring' }}
              className="w-40 h-12 group cursor-pointer font-eudoxus text-xl bg-white  gap-6 fixed origin-right bottom-28 rotate-12 right-16 shadow-xl drop-shadow-lg "
            >
              <Link
                className="flex w-full px-6 h-full hover:text-amber-600 justify-between duration-300 border-2 hover:border-orange-300 scale-100 hover:scale-105 items-center"
                href="/connect/builder?type=event"
              >
                <p>Event</p>
                <IoPeople />
              </Link>
            </motion.ul>
          </>
        )}
      </AnimatePresence>
      {wimMenu && <QuickWimModal disengageModal={() => setwim(false)} />}
    </AnimatePresence>
  )
}

export default AddPost
