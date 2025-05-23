"use client";
import React, { useMemo, useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import {
  IoAnalytics,
  IoBook,
  IoChatbox,
  IoChatbubble,
  IoPrism,
} from "react-icons/io5";
import { AiFillBook } from "react-icons/ai";

const SocialPreview = () => {
  const ExpressYourself = useMemo(
    () => [
      {
        name: "Recieve feedback, test your collagues, or study for your next big test.",
        icon: <IoChatbox />,
      },
      {
        name: "Showcase your projects and skills.",
        icon: <AiFillBook />,
      },
      {
        name: "Customize your portfolio to your heart's content.",
        icon: <IoPrism />,
      },
    ],
    [],
  );

  const TeachOthers = useMemo(
    () => [
      {
        name: "Ask Questions Related To Your Classes.",
        icon: <IoChatbubble />,
      },
      {
        name: "Get Personalized Suggestions for Questions To Study Smarter.",
        icon: <IoBook />,
      },
      {
        name: "Curate and Track Your Progress In STEM.",
        icon: <IoAnalytics />,
      },
    ],
    [],
  );

  return (
    <motion.section className="flex w-screen flex-col bg-gradient-to-br from-blue-600 to-teal-600 p-5 py-16 font-eudoxus shadow-xl lg:p-16">
      <section className="flex w-full flex-col items-center justify-between gap-3 lg:flex-row">
        <ul>
          <h1 className="bg-gradient-to-l from-white to-zinc-100 bg-clip-text text-3xl font-black text-transparent drop-shadow-lg dark:from-teal-300 dark:to-purple-300 lg:text-5xl">
            Express Yourself.
          </h1>
          <p className="mb-5 text-lg text-zinc-100 dark:text-slate-200/60">
            Show off all of you talents, skills and projects within a safe,
            polished and creative environment.
          </p>
          {ExpressYourself.map((e, index) => (
            <motion.li
              whileHover={{ rotateZ: -1, scale: 1.05 }}
              key={index}
              className={`my-2 flex cursor-pointer flex-row items-center gap-4 rounded-2xl bg-zinc-200 p-5 ring-teal-400 duration-500 hover:scale-[1.02] hover:ring-2 hover:ring-offset-2 dark:bg-zinc-700/60`}
            >
              <ul className="rounded-full text-2xl text-teal-600 dark:text-teal-500">
                {e.icon}
              </ul>

              <p className="font-eudoxus dark:text-slate-200">{e.name}</p>
            </motion.li>
          ))}
        </ul>
        <video
          className="h-40 w-full rounded-2xl object-cover outline-none dark:shadow-md dark:shadow-orange-500 lg:w-[50%]"
          autoPlay
          muted
          loop
          playsInline
          disableRemotePlayback
          disablePictureInPicture
          onContextMenu={(e) => e.preventDefault()}
        >
          <source src={"ShowcasePolls.webm"} />
          Oops! The video sadly does not work on this browser :(
        </video>
      </section>
      <section className="mt-6 flex w-full flex-col items-center justify-between gap-3 lg:flex-row-reverse lg:items-center">
        <section className="flex w-full flex-col items-center lg:items-end">
          <h1 className="mb-5 bg-gradient-to-l from-white to-zinc-100 bg-clip-text text-3xl font-bold text-transparent drop-shadow-lg dark:from-purple-300 dark:to-teal-300 lg:text-5xl">
            Teach / Inspire Others.
          </h1>
          {TeachOthers.map((e, index) => (
            <motion.li
              whileHover={{ rotateZ: 1, scale: 1.05 }}
              key={index}
              className={`my-1 flex w-full cursor-pointer flex-row-reverse items-center gap-4 rounded-2xl bg-zinc-200 p-5 ring-teal-400 duration-500 hover:scale-[1.02] hover:ring-2 hover:ring-offset-2 dark:bg-zinc-700/60 lg:w-1/2`}
            >
              <ul className="rounded-full text-2xl text-teal-600 dark:text-teal-500">
                {e.icon}
              </ul>

              <p className="font-eudoxus dark:text-slate-200">{e.name}</p>
            </motion.li>
          ))}
        </section>
      </section>
    </motion.section>
  );
};

export default SocialPreview;
