'use client'
import React, { useCallback, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import AutocompleteCampus from './autocompleteCollege'

const ChooseCampus = ({
  onChangeSelected
}: {
  onChangeSelected: (selected: string | undefined) => void
}) => {
  const [search, setSearch] = useState<string>('')
  const [selected, setSelected] = useState<string>()

  const changeSearch = useMemo(() => {
    onChangeSelected(selected)
  }, [selected])

  return (
    <motion.section>
      <h1 className="font-eudoxus text-lg">Next, we need to pick your primary campus:</h1>
      <h2 className="p-2 px-5 text-xl w-full text-center z-10 bg-slate-50 font-eudoxus rounded-t-2xl">
        <span>I am attending </span>
        {selected ? selected : '...'}
      </h2>
      <input
        onChange={(e) => {
          setSearch(e.target.value)
        }}
        type="search"
        className="p-2 px-5 text-xl w-full z-10 bg-slate-100 rounded-b-2xl"
      />

      <AutocompleteCampus
        input={search}
        onChange={(e: any) => {
          setSelected(e)
        }}
      />
    </motion.section>
  )
}

export default ChooseCampus
