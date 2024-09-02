"use client";

import Benefits from "@/_components/home/benefits";
import Header from "@/_components/home/header";
import MajorsText from "@/_components/home/majorsText";

import { motion, useScroll, useSpring } from "framer-motion";
import Link from "next/link";
import { useContext, useRef } from "react";
import { userContext } from "./AuthContext";
import SocialPreview from "@/_components/home/SocialPreview";
import {
  IoChevronForward,
  IoNewspaper,
  IoPerson,
  IoPhonePortrait,
} from "react-icons/io5";
import { BiSupport } from "react-icons/bi";

export default function Home() {
  useRef();
  const firstRef = useRef(null);
  const mainRef = useRef(null);

  const { scrollYProgress: FirstScroll } = useScroll({
    target: mainRef,
    offset: ["start start", "end end"],
  });
  useSpring(FirstScroll, {
    stiffness: 100,
    damping: 50,
    restDelta: 0.001,
  });
  const { scrollYProgress } = useScroll({
    target: firstRef,
    offset: ["0 1.3", "0.5 0.67"],
  });

  const user = useContext(userContext);

  return (
    <motion.main className="no-scrollbar" ref={mainRef}>
      <Header scrollRefrence={firstRef} />
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex h-[112vh] w-screen flex-col-reverse items-center justify-between gap-10 bg-opacity-10 bg-gradient-to-br from-indigo-700/50 to-orange-500/50 text-sm shadow-2xl shadow-slate-500/30 2xl:flex-row"
      >
        <ul className="relative flex h-full w-full flex-col items-center justify-center gap-4 px-4 text-center sm:gap-6 sm:px-10 md:gap-10 md:px-28">
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, type: "just" }}
            className="cursor-default font-eudoxus text-lg font-black text-white/60 drop-shadow-xl duration-300 ease-in-out sm:text-xl md:text-3xl lg:text-5xl xl:text-6xl 2xl:text-7xl dark:text-white"
          >
            Join us in the new chapter of{" "}
            <span className="bg-gradient-to-br from-red-600 to-orange-400/30 bg-clip-text text-transparent duration-300 hover:text-black/20">
              MESA
            </span>
            , where we are{" "}
            <span className="bg-orange-600/60 bg-clip-text text-transparent duration-500 hover:text-black/20">
              connecting
            </span>{" "}
            the{" "}
            <span className="bg-gradient-to-r from-indigo-500 to-blue-400 bg-clip-text text-transparent duration-500 ease-in-out hover:scale-105 hover:text-black/20 dark:from-indigo-400 dark:to-pink-500">
              next generation of leaders.
            </span>
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7, type: "just" }}
            className="font-eudoxus text-2xl text-white dark:text-slate-50"
          >
            A community for the students, by the students.
          </motion.h2>
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.3 }}
            className="mt-6 flex w-[620px] flex-col justify-center gap-2 md:flex-row"
          >
            {!user.user ? (
              <Link
                href="/sign-in"
                className="text-md flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-3xl bg-theme-blue text-white shadow-sm ring-blue-700 ring-offset-1 transition-all duration-500 ease-in-out hover:scale-[1.02] hover:rounded-2xl hover:bg-theme-blue-2 hover:shadow-xl hover:ring-2 lg:h-16 lg:text-lg 2xl:text-xl"
              >
                <IoPerson />
                <h2 className="font-eudoxus duration-300">Sign In</h2>
              </Link>
            ) : (
              <Link
                href="/connect"
                className="text-md flex h-12 w-full cursor-pointer items-center justify-center gap-3 rounded-3xl bg-gradient-to-tr from-red-700 to-orange-500 text-white shadow-lg ring-orange-400 ring-offset-1 transition-all duration-500 ease-in-out hover:rounded-2xl hover:bg-orange-700 hover:ring-2 lg:h-16 lg:text-lg 2xl:text-xl"
              >
                <h2 className="font-eudoxus duration-300">Enter Connect</h2>
                <IoChevronForward />
              </Link>
            )}
            <Link
              href="/news"
              className="flex h-12 w-full cursor-pointer items-center justify-center rounded-[32px] bg-indigo-600 text-2xl text-white shadow-lg ring-indigo-500 ring-offset-1 transition-all duration-500 ease-in-out hover:scale-105 hover:rounded-2xl hover:shadow-2xl hover:ring-2 md:w-24 lg:h-16"
            >
              <IoNewspaper />
            </Link>
            <Link
              href="/support"
              className="flex h-12 w-full cursor-pointer items-center justify-center rounded-[32px] bg-teal-700 text-2xl text-white shadow-lg ring-indigo-500 ring-offset-1 transition-all duration-500 ease-in-out hover:scale-105 hover:rounded-2xl hover:shadow-2xl hover:ring-2 md:w-24 lg:h-16"
            >
              <BiSupport />
            </Link>
            <Link
              href="/mobile"
              className="flex h-12 w-full cursor-pointer items-center justify-center rounded-[32px] bg-gray-500 text-2xl text-white shadow-lg ring-indigo-500 ring-offset-1 transition-all duration-500 ease-in-out hover:scale-105 hover:rounded-2xl hover:shadow-2xl hover:ring-2 md:w-24 lg:h-16"
            >
              <IoPhonePortrait />
            </Link>
          </motion.section>
        </ul>
      </motion.section>

      <motion.section
        style={{ scale: scrollYProgress, opacity: scrollYProgress }}
        className={`mt-16 flex h-screen w-full max-w-[90%] flex-col items-center justify-center gap-10 rounded-2xl border-slate-300 p-10 text-sm text-slate-400`}
        ref={firstRef}
      >
        <section className="flex w-full flex-col gap-12 rounded-3xl bg-zinc-50 p-10 shadow-md dark:bg-zinc-700/30">
          <MajorsText />
          <section className="flex flex-row justify-between">
            <ul className="flex w-3/5 flex-col gap-5 font-eudoxus font-light md:text-lg lg:text-2xl 2xl:text-3xl">
              <h1 className=" ">
                As a community, MESA is here to push and motivate our best
                selves. Leveraging modern technologies, we can help you
                exprience your major and see your ideas come to life.
              </h1>
              <h1 className="bg-gradient-to-br from-slate-400 to-slate-500 bg-clip-text text-transparent">
                MESA is here to allow students to experiment, socialize, and
                inspire. Connect takes it to the next level by bringing MESA a
                new dimesion of community.
              </h1>
            </ul>
          </section>
        </section>
        <section className="flex w-full flex-row gap-12 rounded-3xl">
          <section className="flex w-full flex-col gap-12 rounded-3xl bg-zinc-50 p-10 shadow-md dark:bg-zinc-700/30">
            <h2 className="font-eudoxus text-4xl font-semibold text-slate-500 dark:text-slate-100/80">
              A Million Reasons To Join.
            </h2>
            <Benefits />
          </section>
        </section>
      </motion.section>
      <SocialPreview />
    </motion.main>
  );
}
