'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { checkEmail } from '../../../../config/functions'
import { supabase } from '../../../../config/mesa-config'
import { User } from '@supabase/supabase-js'
import ChooseCampus from './choosecampus'
import ChooseMajor from './ChooseMajor'

const SignUp = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [realname, setRealname] = useState<string>()
  const [username, setUsername] = useState<string>()
  const [college, setCollege] = useState<string>()

  const [errorMsg, setErrorMsg] = useState<string | undefined>()

  const signUpUser = async () => {
    if (!email || !password || !realname || !username) {
      setErrorMsg('All fields are required!')
      return
    }

    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          real_name: realname,
          username: username
        }
      }
    })
  }

  return (
    <>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute top-0 left-0 w-screen h-screen overflow-y-scroll no-scrollbar bg-gradient-to-tr from-purple-400 to-teal-500"
      />
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, type: 'spring' }}
        className="bg-white absolute origin-bottom bottom-0 rounded-t-3xl h-2/3 p-10 w-full shadow-md flex gap-2 flex-col  "
      >
        <motion.h1 className="text-transparent bg-clip-text font-eudoxus bg-gradient-to-tr from-pink-700 to-blue-800 font-bold text-5xl p-6  border-b-2 border-opacity-65 border-slate-200 duration-300">
          Let's Build Your MESA Account.
        </motion.h1>
        <h2 className="font-eudoxus text-2xl p-2">
          <span className="text-green-700">First,</span> Starting with some basic account
          information:
        </h2>
        <section className="flex flex-col lg:flex-row lg:flex-wrap gap-2">
          {errorMsg ? (
            <AnimatePresence>
              <motion.ul
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 10 }}
                className="w-1/3 bg-slate-200 rounded-3xl p-4"
              >
                <code>{errorMsg}</code>
              </motion.ul>
            </AnimatePresence>
          ) : (
            email && password && <></>
          )}
          <input
            placeholder="email"
            className="bg-slate-100 text-xl focus:outline-none hover:shadow-sm hover:scale-[1.02] duration-300 w-full lg:w-2/5 rounded-full px-5 p-3"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            placeholder="password"
            type="password"
            className="bg-slate-100 text-xl focus:outline-none hover:shadow-sm hover:scale-[1.02] duration-300 w-full lg:w-2/5 rounded-full px-5 p-3"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            placeholder="username"
            type="text"
            className="bg-slate-100 text-xl focus:outline-none hover:shadow-sm hover:scale-[1.02] duration-300 w-full lg:w-2/5 rounded-full px-5 p-3"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            placeholder="display name"
            type="text"
            className="bg-slate-100 text-xl focus:outline-none hover:shadow-sm hover:scale-[1.02] duration-300 w-full lg:w-2/5 rounded-full px-5 p-3"
            onChange={(e) => setRealname(e.target.value)}
          />
        </section>
        {email && password && realname && username && (
          <ChooseCampus
            onChangeSelected={(e) => {
              setCollege(e)
            }}
          />
        )}
        {college && <ChooseMajor />}
        <ul className="md:w-3/4 xl:1/2 2xl:w-2/5 justify-center flex-row flex">
          <button
            className="p-3 px-8 bg-gradient-to-r hover:scale-[1.02] duration-500 hover:shadow-lg from-purple-700 to-teal-500 hover:bg-orange-700 rounded-full flex flex-row justify-between items-center dark:bg-orange-400 w-full"
            onClick={() => {
              signUpUser()
            }}
          >
            <h1 className="text-white font-eudoxus">Create Your New Connect Profile</h1>
            <h1 className="text-white">+</h1>
          </button>
        </ul>
      </motion.section>
    </>
  )
}

export default SignUp
