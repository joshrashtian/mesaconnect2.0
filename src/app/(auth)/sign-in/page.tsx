"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { supabase } from "../../../../config/mesa-config";
import Link from "next/link";
import {IoLogoGoogle} from "react-icons/io5";

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMsg] = useState<string | undefined>();

  const signInUser = async () => {
    console.log("Signing In...");
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) setErrorMsg(error.message);
  };

  const loginUser = async (service: any) => {
    supabase.auth.signInWithOAuth({
      provider: service,
    });
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, type: "spring" }}
      className="bg-white absolute origin-bottom bottom-0 rounded-t-3xl h-2/3 p-10 w-full shadow-md flex gap-4 flex-col justify-between "
    >
      <ul className="flex flex-col gap-2">
        <h1 className="text-transparent bg-clip-text bg-gradient-to-tr from-orange-700 to-red-800 font-eudoxus text-5xl p-6 mb-5 border-b-2 border-opacity-65 border-slate-200">
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          Let's Get You Signed In.
        </h1>
        <AnimatePresence>
          {errorMessage && (
              <motion.section
                  onClick={() => {
                    setErrorMsg(undefined);
                  }}
                  initial={{y: 10, opacity: 0}}
                  animate={{y: 0, opacity: 1}}
                  exit={{y: -10, opacity: 0}}
                  className=" shadow-md rounded-full p-5 bg-red-200"
              >
                <h2 className=" font-eudoxus ">
                  <span className="text-red-800">Error:</span> {errorMessage}
                </h2>
              </motion.section>
          )}
        </AnimatePresence>


        <input
            placeholder="username"
            className="bg-gradient-to-br from-zinc-50 to-slate-100 text-xl focus:outline-none hover:shadow-sm hover:scale-[1.02] duration-300 md:w-3/4 xl:1/2 2xl:w-2/5 rounded-full px-5 p-3"
            type="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
        />
        <input
            placeholder="password"
            type="password"
            className="bg-gradient-to-tr from-zinc-50 to-slate-100 text-xl focus:outline-none hover:shadow-sm hover:scale-[1.02] duration-300  md:w-3/4 xl:1/2 2xl:w-2/5 rounded-full px-5 p-3"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
        />

        <ul className="font-eudoxus">
          <p className="text-2xl text-slate-700 mb-2">Alternative Logins</p>
          {/*
          <button onClick={() => loginUser('google')} className="w-16 h-16 z-10 rounded-2xl duration-500 hover:scale-110 bg-gradient-to-br from-[#174EA6] to-[#4285F4]  flex justify-center items-center text-2xl text-white
          "><IoLogoGoogle className="text-2xl "/>


          </button>*/}
        </ul>
      </ul>
      <ul className="md:w-3/4 xl:1/2 2xl:w-2/5 justify-center flex-col gap-2 flex">
        <button
            className="p-3 px-8 bg-gradient-to-r hover:scale-[1.02] duration-500 hover:shadow-lg from-red-700 to-orange-500 hover:bg-orange-700 rounded-full flex flex-row justify-between items-center dark:bg-orange-400 w-full"
          onClick={() => {
            signInUser();
          }}
        >
          <h1 className="text-white font-bold font-eudoxus">Sign In</h1>
          <h1 className="text-white">{">"}</h1>
        </button>
        <Link
          className="p-3 px-8 bg-gradient-to-r hover:scale-[1.02] duration-500 hover:shadow-lg from-teal-700 to-green-500 hover:bg-orange-700 rounded-full flex flex-row justify-between items-center dark:bg-orange-400 w-full"
          href="/sign-up"
        >
          <h1 className="text-white font-bold font-eudoxus">Join Connect</h1>
          <h1 className="text-white font-bold">+</h1>
        </Link>
      </ul>
    </motion.section>
  );
};

export default Page;
