"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { supabase } from "../../../../config/mesa-config";
import Link from "next/link";
import { IoLogoApple, IoLogoGoogle, IoLogoLinkedin } from "react-icons/io5";

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMsg] = useState<string | undefined>();

  const signInUser = async () => {
    console.log("Signing In...");
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) setErrorMsg(error.message);
    else window.location.reload();
  };

  const loginUser = async (service: any) => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: service,
    });

    if (error) setErrorMsg(error.message);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, type: "spring" }}
      className="absolute bottom-0 flex h-2/3 w-full origin-bottom flex-col justify-between gap-4 rounded-t-3xl bg-white p-10 shadow-md dark:bg-zinc-600"
    >
      <ul className="flex flex-col gap-2">
        <h1 className="mb-5 border-b-2 border-slate-200 border-opacity-65 bg-gradient-to-tr from-orange-700 to-red-800 bg-clip-text p-6 font-eudoxus text-5xl text-transparent dark:from-orange-400 dark:to-red-500">
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          Let's Get You Signed In.
        </h1>
        <AnimatePresence>
          {errorMessage && (
            <motion.section
              onClick={() => {
                setErrorMsg(undefined);
              }}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              className="rounded-full bg-red-200 p-5 shadow-md"
            >
              <h2 className="font-eudoxus">
                <span className="text-red-800">Error:</span> {errorMessage}
              </h2>
            </motion.section>
          )}
        </AnimatePresence>

        <input
          placeholder="username"
          className="xl:1/2 rounded-full bg-gradient-to-br from-zinc-50 to-slate-100 p-3 px-5 text-xl duration-300 hover:scale-[1.02] hover:shadow-sm focus:outline-none md:w-3/4 2xl:w-2/5 dark:from-zinc-800 dark:via-slate-700 dark:to-slate-900 dark:text-white"
          type="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          placeholder="password"
          type="password"
          className="xl:1/2 rounded-full bg-gradient-to-tr from-zinc-50 to-slate-100 p-3 px-5 text-xl duration-300 hover:scale-[1.02] hover:shadow-sm focus:outline-none md:w-3/4 2xl:w-2/5 dark:from-zinc-800 dark:via-slate-700 dark:to-slate-900 dark:text-white"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />

        <ul className="font-eudoxus">
          <p className="mb-2 text-2xl text-slate-700">Alternative Logins</p>

          <ul className="flex flex-row gap-3">
            <button
              onClick={() => loginUser("google")}
              className="z-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#174EA6] to-[#4285F4] text-2xl text-white duration-500 hover:scale-110"
            >
              <IoLogoGoogle className="text-2xl" />
            </button>
            <button
              onClick={() => loginUser("apple")}
              className="z-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-600 to-zinc-600 text-2xl text-white duration-500 hover:scale-110"
            >
              <IoLogoApple className="text-2xl" />
            </button>
            <button
              onClick={() => loginUser("linkedin_oidc")}
              className="z-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-teal-600 text-2xl text-white duration-500 hover:scale-110"
            >
              <IoLogoLinkedin className="text-2xl" />
            </button>
          </ul>
        </ul>
      </ul>
      <ul className="xl:1/2 flex flex-col justify-center gap-2 md:w-3/4 2xl:w-2/5">
        <button
          className="flex w-full flex-row items-center justify-between rounded-full bg-gradient-to-r from-red-700 to-orange-500 p-3 px-8 duration-500 hover:scale-[1.02] hover:bg-orange-700 hover:shadow-lg dark:bg-orange-400"
          onClick={() => {
            signInUser();
          }}
        >
          <h1 className="font-eudoxus font-bold text-white">Sign In</h1>
          <h1 className="text-white">{">"}</h1>
        </button>
        <Link
          className="flex w-full flex-row items-center justify-between rounded-full bg-gradient-to-r from-teal-700 to-green-500 p-3 px-8 duration-500 hover:scale-[1.02] hover:bg-orange-700 hover:shadow-lg dark:bg-orange-400"
          href="/sign-up"
        >
          <h1 className="font-eudoxus font-bold text-white">Join Connect</h1>
          <h1 className="font-bold text-white">+</h1>
        </Link>
      </ul>
    </motion.section>
  );
};

export default Page;
