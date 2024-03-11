import React, { useRef, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'

const SocialPreview = () => {
  const scrollRef = useRef<any>()

  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ['start end', 'end end']
  })

  const opacity = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 50,
    restDelta: 0.001
  })

  const ExpressYourself = [
    {
      name: 'Recieve feedback, test your collagues, or study for your next big test.'
    },
    {
      name: 'Showcase your projects and skills.'
    },
    {
      name: "Customize your portfolio to your heart's content."
    }
  ]

  const [focusedExpress, setFocusedExpress] = useState()

  return (
    <motion.section
      ref={scrollRef}
      style={{ opacity: opacity, scale: opacity }}
      className="flex flex-col w-screen h-[80vh] p-16"
    >
      <section className="w-full flex flex-row items-center justify-between gap-3">
        <ul>
          <h1 className="font-bold text-5xl bg-clip-text text-transparent bg-gradient-to-l from-teal-600 to-slate-500">
            Express Yourself.
          </h1>
          <p className="font-geist">
            Show off all of you talents, skills and projects within a safe, polished and creative
            environment.
          </p>
          {ExpressYourself.map((e, index) => (
            <li
              key={index}
              className={`bg-zinc-200 hover:scale-[1.02] items-center gap-4 cursor-pointer border-opacity-0 hover:border-opacity-100 border-2 border-orange-400 duration-500 my-2 flex flex-row p-5 rounded-2xl`}
            >
              <ul className="w-2 h-2 bg-orange-900 rounded-full" />
              <p className="font-geist">{e.name}</p>
            </li>
          ))}
        </ul>
        <video
          className="w-[50%] h-full outline-none"
          autoPlay
          muted
          loop
          playsInline
          disableRemotePlayback
          disablePictureInPicture
        >
          <source src={'ShowcasePolls.webm'} />
          Oops! The video sadly does not work on this browser :(
        </video>
      </section>
      <section className="w-full flex flex-col gap-3">
        <h1 className="font-bold text-5xl bg-clip-text text-transparent bg-gradient-to-l from-teal-600 to-slate-500">
          Teach / Inspire Others.
        </h1>
      </section>
    </motion.section>
  )
}

export default SocialPreview
