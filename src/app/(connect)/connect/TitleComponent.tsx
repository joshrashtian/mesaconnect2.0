"use client";

import { useUser } from "@/app/AuthContext";
import React, { use, useEffect, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { IoMdClock } from "react-icons/io";

const TitleComponent = () => {
  const { user, userData } = useUser();
  const [date, setDate] = useState(new Date());

  const { scrollY } = useScroll();
  const springed = useSpring(scrollY, { stiffness: 400, damping: 30 });

  const height = useTransform(springed, [400, 500], [0, -70]);
  const profheight = useTransform(springed, [400, 500], [0, -20]);
  const x = useTransform(springed, [400, 500], [0, 80]);
  const yClock = useTransform(springed, [400, 500], [0, -60]);
  const scaleClock = useTransform(springed, [400, 500], [1, 0.7]);
  const opacity = useTransform(springed, [400, 500], [0, 1]);

  useEffect(() => {
    const updateClock = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => clearInterval(updateClock);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Date.now()]);

  const greeting =
    date.getHours() < 12
      ? "Good Morning"
      : date.getHours() < 18
        ? "Good Afternoon"
        : "Good Evening";

  return (
    <>
      <motion.main className="fixed top-12 z-40 flex w-full flex-col gap-5 text-center font-eudoxus duration-300 xl:gap-0 xl:text-left">
        {userData?.avatar_url && (
          <motion.ul
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 1, ease: "easeInOut" }}
            style={{ y: profheight }}
            className="relative mx-auto h-16 w-16 overflow-hidden rounded-full shadow-lg xl:mx-0"
          >
            <Image
              src={userData?.avatar_url}
              fill
              alt="Profile Picture"
              className="rounded-full object-cover"
            />
          </motion.ul>
        )}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          style={{ y: height, x }}
          transition={{ duration: 0.5, ease: "easeInOut", delay: 0.25 }}
          className="bg-gradient-to-br from-slate-500 to-slate-800 bg-clip-text text-3xl text-transparent dark:from-slate-400 dark:to-white"
        >
          {greeting},{" "}
          {user?.user_metadata.full_name
            ? user.user_metadata.full_name
            : userData?.real_name}
        </motion.h1>
        <motion.ul
          style={{ y: yClock, scale: scaleClock }}
          className="mt-2 flex w-fit origin-left flex-row items-start gap-2 rounded-2xl bg-zinc-200 px-6 py-2 text-2xl font-semibold text-slate-600 duration-500 dark:text-slate-200"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeInOut", delay: 1 }}
        >
          <IoMdClock className="h-8 w-8 text-blue-600" />
          <p className="-mr-2 bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-3xl text-transparent">
            {date.getHours()}:
            {date.getMinutes() < 10
              ? `0${date.getMinutes()}`
              : date.getMinutes()}
            :
            {date.getSeconds() < 10
              ? `0${date.getSeconds()}`
              : date.getSeconds()}
          </p>
        </motion.ul>
      </motion.main>
      <motion.ul
        style={{ opacity }}
        className="fixed left-0 top-0 -z-0 h-40 w-full bg-white"
      />
    </>
  );
};

export default TitleComponent;
