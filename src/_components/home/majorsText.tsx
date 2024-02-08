"use client"

import { coverMajors } from '@/_assets/coverData'
import React, { useEffect, useState } from 'react'

const MajorsText = () => {
  const [index, setIndex] = useState(0)

  useEffect(() => { 
    setInterval(() => {
      setIndex(Math.floor(Math.random() * coverMajors.length))
    }, 1000)
   },[])

  return (
    <h1 className='text-5xl font-bold'>For majors in {coverMajors[index]}</h1>
  )
}

export default MajorsText