"use client";
import { useDarkMode, useUser } from "@/app/AuthContext";
import {
  AnimatePresence,
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import Link from "next/link";
import React, { useState } from "react";
import { HeaderContext } from "@/_components/home/HeaderContext";
import {
  IoPerson,
  IoCalendar,
  IoDocument,
  IoHelpCircle,
  IoNewspaper,
  IoPhonePortrait,
} from "react-icons/io5";
import Image from "next/image";

const Header = ({ scrollRefrence }: { scrollRefrence: any }) => {
  const user = useUser();
  const [menu, setMenu] = useState(false);
  const { scrollYProgress } = useScroll({
    target: scrollRefrence,
    offset: ["start end", "end end"],
  });

  const isDark = useDarkMode();

  const springedValue = useSpring(scrollYProgress);

  const opacity = useTransform(springedValue, [0.4, 1], [0, 1]);
  const color = useTransform(
    springedValue,
    [0.4, 1],
    isDark ? ["#FFF", "#fff"] : ["#FFF", "#FFFF"],
  );

  const headerComponents = [
    {
      name: "News",
      href: "/news",
      icon: <IoNewspaper />,
    },
    {
      name: "Support",
      href: "/support",
      icon: <IoHelpCircle />,
    },
    {
      name: "Events",
      href: "/events",
      icon: <IoCalendar />,
    },
    {
      name: "Docs",
      href: "/docs",
      icon: <IoDocument />,
    },
    {
      name: "MESAMobile",
      href: "/mobile",
      icon: <IoPhonePortrait />,
    },
  ];
  return (
    <motion.div
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 5, type: "spring" }}
      className="fixed top-0 z-50 flex h-28 w-full flex-row items-center justify-center px-[5%]"
    >
      {/*
      <motion.ul
        style={{ opacity: opacity }}
        className="fixed left-0 top-0 -z-10 h-28 w-full rounded-b-3xl bg-gradient-to-br from-purple-500/50 to-orange-500/50 drop-shadow-lg backdrop-blur-sm dark:from-orange-900 dark:to-zinc-800"
      />
      */}
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 5, type: "spring" }}
        className="flex flex-row items-center gap-3 self-center rounded-3xl bg-white px-4 py-2 shadow-2xl shadow-black/50"
      >
        <Image
          src={require("../../../public/mesalogo.png")}
          alt="logo"
          width={100}
          height={100}
          className="h-10 w-10 rounded-xl border shadow-lg"
        />
        <motion.h2
          initial="colorone"
          animate={
            Number(scrollYProgress.get()) < 0.9 ? "colorone" : "colortwo"
          }
          className="font-eudoxus text-sm font-black text-red-600 shadow-black drop-shadow-2xl lg:text-xl"
        >
          MESA
          <motion.span className="text-zinc-500">connect</motion.span>
          <motion.span className="rounded-full text-xs">beta</motion.span>
        </motion.h2>
        <ul className="mx-4 h-12 w-0.5 bg-zinc-200 dark:bg-white" />
        {headerComponents.map((e, index) => (
          <motion.ul
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1 + 0.5 * index, duration: 2 }}
            className="mx-3 flex h-full w-full items-center"
            key={index}
          >
            <Link
              href={e.href}
              className="flex flex-row items-center gap-2 text-lg font-light duration-300 hover:scale-105 hover:cursor-pointer hover:font-medium"
            >
              {e.name}
            </Link>
            {/*headerComponents.length - 1 > index && (
              <ul className="bg-zinc-200 dark:bg-white w-0.5 ml-4 h-12" />
            )*/}
          </motion.ul>
        ))}
      </motion.div>
      <motion.section className="absolute right-[5%] flex flex-row items-center gap-5 text-nowrap">
        <button
          onClick={() => setMenu(!menu)}
          className="flex cursor-pointer flex-row items-center gap-1 rounded-full drop-shadow-2xl duration-300 hover:scale-105"
        >
          <motion.h1
            style={{ color: color }}
            className="text-sm drop-shadow-xl lg:text-xl"
          >
            {user.user
              ? user.user.user_metadata.full_name
                ? user.user.user_metadata.full_name
                : user.user.user_metadata.username
              : "Sign In"}
          </motion.h1>
          <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-slate-300">
            {/* eslint-disable-next-line @next/next/no-img-element,jsx-a11y/alt-text */}
            {user.userData?.avatar_url ? (
              <Image
                src={user.userData?.avatar_url}
                className="h-8 w-8 rounded-full"
                fill
                alt={user.userData?.username}
              />
            ) : (
              <IoPerson className="h-4 w-4 text-slate-400" />
            )}
          </div>
        </button>
      </motion.section>
      <AnimatePresence>
        <HeaderContext user={user} isActive={menu} />
      </AnimatePresence>
    </motion.div>
  );
};

export default Header;
