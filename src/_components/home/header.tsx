'use client'
import React from 'react'

const Header = () => {
  return (
    <div className="w-full h-2 justify-between flex-row flex ">
      <h2 className="text-orange-700 text-xl font-semibold ">
        MESA<span className="text-slate-500">connect</span>
      </h2>
      <ul className="flex flex-row gap-2 p-4 py-8 rounded-full hover:shadow-sm items-center hover:scale-105 duration-300 cursor-pointer">
        <h1 className="text-xl text-zinc-600 font-semibold">Sign In</h1>
        <div className="bg-slate-300 w-8 h-8 rounded-full"></div>
      </ul>
    </div>
  )
}

export default Header
