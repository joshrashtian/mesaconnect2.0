"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "../../../../config/mesa-config";
import Button from "@/_components/Button";

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signInUser = async () => {
    console.log('Signing In...')
    const { data, error } = await supabase.auth.signInWithPassword({
      email: "example@email.com",
      password: "example-password",
    });
    if(error) console.error('Error Signing Up')
  }

  const loginUser = async (service: any) => {
    supabase.auth.signInWithOAuth({
      provider: service,
    })
  }

  return (
    <main className="h-screen flex justify-center items-center">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, damping: 10, type: "spring" }}
        className="bg-white rounded-3xl h-2/3 w-2/3 shadow-md flex gap-4 flex-col justify-center items-center "
      >
        <h1 className="text-transparent bg-clip-text bg-gradient-to-tr from-orange-700 to-red-800 font-bold text-5xl p-6 mb-12 border-b-2 border-opacity-65 border-slate-200">
          Let's Get You Signed In.
        </h1>
        <input
          placeholder="username"
          className="bg-slate-100 text-xl focus:outline-none hover:shadow-sm hover:scale-105 duration-300 md:w-3/4 xl:1/2 2xl:w-1/3 rounded-full px-5 p-3"
          type="email"
          onChange={(e) => {setEmail(e.target.value)}}
        />
        <input
          placeholder="password"
          type="password"
          className="bg-slate-100 text-xl focus:outline-none hover:shadow-sm hover:scale-105 duration-300  md:w-3/4 xl:1/2 2xl:w-1/3 rounded-full px-5 p-3"
          onChange={(e) => {setPassword(e.target.value)}}
        />
        <ul className="md:w-3/4 xl:1/2 2xl:w-1/4 justify-center flex-row flex">
          <Button
            style="p-3 bg-slate-600 hover:bg-orange-700 rounded-full dark:bg-orange-400 w-1/2"
            pressed={() => {
              signInUser()
            }}
          >
            <h1 className="text-white">Sign In</h1>
          </Button>
        </ul>
        <h1 className="text-slate-400 text-xl font-black">- or -</h1>
        <Button style="bg-blue-500 group p-3 w-1/3 rounded-full" pressed={() => {loginUser('google')}}>
          <h1 className="text-white font-semibold">Sign In With Google</h1>
        </Button>
      </motion.section>
    </main>
  );
};

export default Page;
