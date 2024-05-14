'use client'
import React, { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {IoCheckmark, IoCheckmarkCircle, IoInformation, IoWarning} from "react-icons/io5";
const Toast = ({
  trigger,
  type,
  message,
  turnOff
}: {
  trigger: boolean
  type: string
  message: string
  turnOff: any
}) => {
  const [toast, setToast] = React.useState({ type: type, message: message })
  const [active, setActive] = React.useState(false)

  useEffect(() => {
    setActive(trigger)
    setToast({
      type: type,
      message: message
    })
    if (trigger) {
      setTimeout(() => {
        setActive(false)
        turnOff()
      }, 6000)
    }
  }, [trigger])

  return (
    <AnimatePresence>
      {active && (
        <motion.section
          initial={{ y: 30, opacity: 0, scaleX: 0.2, scaleY: 0}}
          animate={{ y: 0, opacity: 1, scaleX: 1, scaleY: 1 }}
          exit={{ y: 30, opacity: 0, scaleX: 0.2, scaleY: 0 }}
          onClick={() => {
            setActive(false)
            turnOff()
          }}
          transition={{ duration: 1, type: 'spring' }}
          className="fixed bottom-28 z-50 font-eudoxus origin-bottom flex flex-row justify-center items-center rounded-3xl w-full h-16"
        >
          <motion.ul className="flex flex-row items-center gap-2.5 p-2 shadow-md rounded-3xl top-8 right-8 min-w-96 h-16 duration-500 hover:bg-slate-200 cursor-pointer bg-white">
            <ul className={`${ toast.type === 'success' ? "bg-green-700" : toast.type === 'error' ? "bg-red-700" : "bg-teal-700"} text-white rounded-full p-2 text-3xl`}
            >
            { toast.type === 'success' ? <IoCheckmark /> : toast.type === 'error' ? <IoWarning /> : <IoInformation />}
            </ul>
            <ul>
            <h1
            className={`font-bold capitalize ${
              toast.type === 'success' ? 'text-green-800' : toast.type === "error" && 'text-red-500'
            }`}
          >
            {toast.type}
          </h1>
          <h1>{toast.message}</h1>
          </ul>
          </motion.ul>
        </motion.section>
      )}
    </AnimatePresence>
  )
}

export default Toast
