'use client'

import React, { useMemo, useState } from 'react'
import { motion } from 'framer-motion'

const temp = ['TLC', 'Valencia Campus', 'Canyon Country Campus', 'Aliso Hall']

const Recommendations = ({ input, onChange }: { input: string; onChange: any }) => {
  const results = useMemo(() => {
    return temp
      .filter((x) => x.toLowerCase().includes(input ? input.toLowerCase() : ''))
      .splice(0, 3)
  }, [input])

  return (
    <section className="bg-white shadow-md rounded-b-xl -translate-y-3 z-0 flex flex-col items-center justify-center">
      <h1 className="font-semibold mt-3">Quick Result</h1>
      <ul className="flex flex-row w-full px-2">
        {results.length > 0 ? (
          results.map((value: string) => (
            <ul
              onClick={() => {
                onChange(value)
              }}
              className="p-3 cursor-pointer text-center group hover:scale-105 duration-300 w-full"
            >
              <h1 className="">{value}</h1>
            </ul>
          ))
        ) : (
          <h1>No Results.</h1>
        )}
      </ul>
    </section>
  )
}

export default Recommendations
