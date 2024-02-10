"use client";

import React from "react";
import { motion } from "framer-motion";

const Page = () => {

  async function signUpNewUser() {
    const { data, error } = await supabase.auth.signUp({
      email: 'example@email.com',
      password: 'example-password',
      options: {
        emailRedirectTo: 'https://example.com/welcome',
      },
    })
  }

  return (
    <main className="h-screen flex justify-center items-center">
      <motion.section className="bg-white rounded-3xl h-2/3 w-2/3 flex gap-4 flex-col justify-center items-center ">
        <h1 className="text-transparent bg-clip-text bg-gradient-to-tr from-orange-700 to-red-800 font-bold text-5xl p-6 mb-12 border-b-2 border-opacity-65 border-slate-200">
          Let's Get You Signed In.
        </h1>
        <input
          placeholder="username"
          className="bg-slate-100 focus:outline-none hover:shadow-sm hover:scale-105 duration-300 w-1/4 rounded-full px-5 p-2"
        />
        <input
          placeholder="password"
          type="password"
          className="bg-slate-100 focus:outline-none hover:shadow-sm hover:scale-105 duration-300 w-1/4 rounded-full px-5 p-2"
        />
      </motion.section>
    </main>
  );
};

export default Page;
