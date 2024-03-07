import React from 'react'
import { motion } from 'framer-motion'

const List = [
  {
    name: 'Express Yourself'
  }
]

const SocialPreview = () => {
  return (
    <motion.section className="flex flex-row p-10 w-screen h-screen">
      <section className="w-1/2">
        {List.map((item, index) => {
          return <h1 key={index}>{item.name}</h1>
        })}
      </section>
      <section className="w-1/2">
        <video className="min-w-full" autoPlay muted loop playsInline>
          <source src={'ShowcasePolls.webm'} />
          Not Working
        </video>
      </section>
    </motion.section>
  )
}

export default SocialPreview
