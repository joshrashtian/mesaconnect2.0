'use client'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

const tabs = [
  {
    name: 'Home',
    link: '/'
  },
  {
    name: 'Profile',
    link: '/profile'
  },
  {
    name: 'Social',
    link: '/social'
  }
]

const Dock = () => {
  const [selected, setSelected] = useState('')
  return (
    <div className="w-full bottom-8 h-16 fixed justify-center items-center flex">
      <section className="group peer bg-white shadow-md rounded-full h-full w-16 hover:w-[35%] flex flex-row justify-center items-center duration-500 hover:scale-110 ease-in-out  ">
        <ul className="w-full flex-row flex justify-center gap-5 items-center">
          {tabs.map((tab, index) => (
            <motion.li
              key={index}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onHoverStart={() => setSelected(tab.name)}
              className=" opacity-0 group-hover:opacity-100 rounded-lg duration-300 ease-in-out"
            >
              <Link
                href={`/connect${tab.link}`}
                className="flex group-[1] flex-row p-3 justify-center items-center"
              >
                <h1 className="text-xl font-semibold group-[1]:text-amber-700 duration-500">
                  {tab.name}
                </h1>
              </Link>
            </motion.li>
          ))}
        </ul>
      </section>

      <section className=" absolute w-[10%] h-10 flex flex-row delay-150 shadow-xl justify-center items-center peer scale-0 peer-hover:scale-100 rounded-full peer-hover:-translate-y-16 -translate-y-4 transition-all duration-500  bg-white ">
        <h1 className="font-bold">{selected}</h1>
      </section>
    </div>
  )
}

export default Dock
