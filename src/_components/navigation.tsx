'use client'
import React from 'react'

const Dock = () => {
  return (
    <div className="w-full bottom-8 h-16 fixed justify-center items-center flex">
      <section className="group bg-[#EEE] shadow-md rounded-full h-full w-16 hover:w-96 flex flex-row justify-center items-center duration-500 hover:scale-105 ease-in-out  ">
        <div className="w-1/3 h-1/3 border-slate-300 group-hover:opacity-0 border-2 rounded-lg duration-300 ease-in-out" />
      </section>
    </div>
  )
}

export default Dock
