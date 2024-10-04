"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { supabase } from "../../../../config/mesa-config";
import ChooseCampus from "./choosecampus";
import ChooseMajor from "./ChooseMajor";
import {
  IoCheckmark,
  IoChevronForward,
  IoKey,
  IoLogoGoogle,
} from "react-icons/io5";
import { Key } from "@/app/(connect)/connect/settings/InviteKeys";
import { useDarkMode } from "@/app/AuthContext";
import Input from "@/_components/Input";
import Link from "next/link";
import React from "react";

const SignUp = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [realname, setRealname] = useState<string>();
  const [username, setUsername] = useState<string>();
  const [college, setCollege] = useState<string>();
  const [major, setMajor] = useState<string>();
  const [key, setKey] = useState<string>();
  const [validKey, setValidKey] = useState<Key>();
  const dark = useDarkMode();

  const [errorMsg, setErrorMsg] = useState<string | undefined>();

  const signUpUser = async () => {
    if (!email || !password) {
      setErrorMsg("All fields are required!");
      return;
    }

    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          //real_name: realname,
          //username: username,
          college: college,
          major: major,
        },
      },
    });

    if (error) {
      console.error(error);
      setErrorMsg(error.message);
      return;
    } else window.location.reload();
  };

  const withGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    if (error) setErrorMsg(error.message);
    else window.location.reload();
  };
  return (
    <>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="no-scrollbar absolute left-0 top-0 h-screen w-screen overflow-y-scroll bg-gradient-to-tr from-purple-400 to-teal-500 dark:from-purple-300 dark:to-red-400"
      />
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, type: "spring" }}
        className="no-scrollbar absolute bottom-0 flex h-2/3 w-full origin-bottom flex-col gap-2 overflow-y-scroll rounded-t-3xl bg-white p-10 pb-20 shadow-md dark:bg-zinc-600"
      >
        <motion.h1 className="border-b-2 border-slate-200 border-opacity-65 bg-gradient-to-tr from-pink-700 to-blue-800 bg-clip-text p-6 font-eudoxus text-5xl font-bold text-transparent duration-300 dark:from-pink-400 dark:to-blue-300">
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          Let's Build Your MESA Account.
        </motion.h1>
        {/*
        <ul className="font-eudoxus">
          <p className="text-2xl dark:text-slate-200">
            Quickstart - Requires Key
          </p>
          <p className="text-slate-400">
            Note: You may have to set up profile details later.
          </p>
          <button
            onClick={() =>
              validKey
                ? withGoogle()
                : setErrorMsg("Requries Invite Key To Join.")
            }
            className="flex h-16 w-16 items-center justify-center rounded-xl bg-blue-400 text-2xl text-white"
          >
            <IoLogoGoogle />
          </button>
        </ul>
*/}
        <h2 className="p-2 font-eudoxus text-2xl dark:text-white">
          <span className="text-green-700 dark:text-green-400">First,</span>{" "}
          Starting with some basic account information:
        </h2>
        {errorMsg ? (
          <AnimatePresence>
            <motion.ul
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 10 }}
              onClick={() => setErrorMsg(undefined)}
              className="w-1/3 rounded-3xl bg-red-200 p-4"
            >
              <code>{errorMsg}</code>
            </motion.ul>
          </AnimatePresence>
        ) : (
          email && password && <></>
        )}
        <Link href={"/support/terms"} className="my-2 text-sm text-slate-400">
          <h3>
            *By signing up, you are agreeing to the Terms and Conditions. Click
            here to view them
          </h3>
        </Link>
        {/*
        <section className="flex flex-col gap-1.5 rounded-2xl bg-white p-6 shadow-md dark:bg-zinc-500">
          {!validKey ? (
            <>
              <h1 className="dark:text-white">
                Due to our beta status, before you can create a profile, you
                need to verify a key.
              </h1>

              <Input
                placeholder="key"
                className="w-full rounded-full bg-slate-100 p-3 px-5 text-xl duration-300 hover:scale-[1.02] hover:shadow-sm focus:outline-none"
                type="email"
                onChange={(e) => setKey(e.target.value)}
                icon={<IoKey />}
              />
              <button
                className="w-16 rounded-full bg-gradient-to-br from-orange-500 to-red-600 p-3 px-5 text-xl duration-300 hover:scale-[1.02] hover:shadow-sm focus:outline-none"
                onClick={async () => {
                  if (!key) {
                    setErrorMsg("Please Enter A Valid Key!");
                    return;
                  }

                  let { data, error } = await supabase.rpc("check_invite_key", {
                    input_key: key,
                  });
                  if (error) setErrorMsg(error.message);
                  else {
                    // @ts-ignore
                    console.log(data[0]);
                    // @ts-ignore
                    setValidKey(data[0]);
                  }
                }}
              >
                <IoChevronForward />
              </button>
            </>
          ) : (
            <h1 className="flex flex-row items-center justify-center gap-5 font-eudoxus text-lg">
              <IoCheckmark size={25} color="#0A0" /> Your Key Has Been Verified.
            </h1>
          )}
        </section>
          */}
        <section className="flex flex-col gap-2 lg:flex-row lg:flex-wrap">
          <input
            placeholder="email"
            className="w-full rounded-full bg-slate-100 p-3 px-5 text-xl duration-300 hover:scale-[1.02] hover:shadow-sm focus:outline-none lg:w-2/5"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            placeholder="password"
            type="password"
            className="w-full rounded-full bg-slate-100 p-3 px-5 text-xl duration-300 hover:scale-[1.02] hover:shadow-sm focus:outline-none lg:w-2/5"
            onChange={(e) => setPassword(e.target.value)}
          />
          {/*<input
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
          /> */}
        </section>
        {email && password && (
          <ChooseCampus
            onChangeSelected={(e) => {
              setCollege(e);
            }}
          />
        )}
        {college && (
          <ChooseMajor
            onChangeMajor={(e) => {
              setMajor(e);
            }}
          />
        )}
        {major && (
          <motion.ul
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="xl:1/2 flex flex-row justify-center md:w-3/4 2xl:w-2/5"
          >
            <button
              className="flex w-full flex-row items-center justify-between rounded-full bg-gradient-to-r from-purple-700 to-teal-500 p-3 px-8 duration-500 hover:scale-[1.02] hover:bg-orange-700 hover:shadow-lg dark:bg-orange-400"
              onClick={() => {
                signUpUser();
              }}
            >
              <h1 className="font-eudoxus text-white">
                Create Your New Connect Profile
              </h1>
              <h1 className="text-white">+</h1>
            </button>
          </motion.ul>
        )}
      </motion.section>
    </>
  );
};

export default SignUp;
