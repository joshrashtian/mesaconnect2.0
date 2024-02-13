'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Button from '@/_components/Button'
import { checkEmail } from '../../../../config/functions'
import { supabase } from '../../../../config/mesa-config'

const SignUp = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [realname, setRealname] = useState<string>()
  const [username, setUsername] = useState<string>()

  const [errorMsg, setErrorMsg] = useState<string | undefined>()

  const signUpUser = async () => {
    if (!email || !password || !realname || !username) { setErrorMsg('All fields are required!'); return } 
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
  }

  return (
    <main className="h-screen flex justify-center items-center">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, damping: 10, type: 'spring' }}
        className="bg-white rounded-3xl h-4/5 3xl:h-2/3 w-2/3 shadow-md flex gap-4 flex-col justify-center items-center "
      >
        <motion.h1 className="text-transparent bg-clip-text bg-gradient-to-tr from-pink-700 to-blue-800 font-bold text-5xl p-6 mb-12 border-b-2 border-opacity-65 border-slate-200 duration-300">
          Let's Set Up Your MESA Profile
        </motion.h1>
        {errorMsg ? (
          <AnimatePresence>
            <motion.ul
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 10 }}
              className="w-1/3 bg-slate-200 rounded-3xl p-4"
            >
              <code>Invalid Email.</code>
            </motion.ul>
          </AnimatePresence>
        ) : (
          email && password && <></>
        )}
        <input
          placeholder="email"
          className="bg-slate-100 text-xl focus:outline-none hover:shadow-sm hover:scale-105 duration-300 md:w-3/4 xl:1/2 2xl:w-1/3 rounded-full px-5 p-3"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="password"
          type="password"
          className="bg-slate-100 text-xl focus:outline-none hover:shadow-sm hover:scale-105 duration-300  md:w-3/4 xl:1/2 2xl:w-1/3 rounded-full px-5 p-3"
        />
        <input
          placeholder="username"
          type="text"
          className="bg-slate-100 text-xl focus:outline-none hover:shadow-sm hover:scale-105 duration-300  md:w-3/4 xl:1/2 2xl:w-1/3 rounded-full px-5 p-3"
        />
        <input
          placeholder="display name"
          type="text"
          className="bg-slate-100 text-xl focus:outline-none hover:shadow-sm hover:scale-105 duration-300  md:w-3/4 xl:1/2 2xl:w-1/3 rounded-full px-5 p-3"
        />
        <ul className="md:w-3/4 xl:1/2 2xl:w-1/4 justify-center flex-row flex">
          <Button
            style="p-3 bg-slate-600 hover:bg-orange-700 rounded-full dark:bg-orange-400 w-full"
            pressed={() => {}}
          >
            <h1 className="text-white">Sign Up</h1>
          </Button>
        </ul>
        <h1 className="text-slate-400 text-xl font-black">- or -</h1>
        <Button style="bg-blue-500 group p-3 w-1/3 rounded-full" pressed={() => {}}>
          <h1 className="text-white font-semibold">Sign In With Google</h1>
        </Button>
      </motion.section>
    </main>
  )
}

export default SignUp
