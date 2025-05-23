"use client";
import { useDarkMode, useUser } from "@/app/AuthContext";
import {
  AnimatePresence,
  motion,
  useAnimation,
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
import { usePathname } from "next/navigation";
const Header = () => {
  const user = useUser();
  const pathname = usePathname();
  const [menu, setMenu] = useState(false);

  const isDark = useDarkMode();

  const headerComponents = [
    {
      name: "Connect",
      href: "/connect",
      icon: <IoPhonePortrait />,
    },
    {
      name: "News",
      href: "/news",
      icon: <IoNewspaper />,
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
  const controls = useAnimation();

  const handleDragEnd = () => {
    // Animate back to origin (x: 0, y: 0)
    controls.start({
      x: 0,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 20 },
    });
  };

  return (
    <motion.div
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 5, type: "spring" }}
      className="fixed top-0 z-50 flex h-28 w-full flex-row items-center justify-between px-[5%] lg:justify-center lg:px-10"
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
        className="flex flex-row items-center gap-3 rounded-3xl bg-white px-4 py-2 opacity-0 shadow-2xl shadow-black/50 xl:opacity-100"
      >
        <motion.div
          drag
          draggable
          whileHover={{
            borderColor: "#777",
          }}
          className={`relative h-12 w-12 min-w-12 overflow-hidden rounded-xl border ${
            pathname === "/"
              ? "bg-white"
              : "bg-gradient-to-r from-white to-orange-100"
          } shadow-lg`}
          onDragEnd={handleDragEnd}
          animate={controls}
          transition={{ duration: 0.5 }}
        >
          <Image
            src={require("../../../public/mesalogo.png")}
            alt="logo"
            fill
            className="pointer-events-none object-contain"
          />
        </motion.div>
        <motion.h2
          initial="colorone"
          className="hidden font-eudoxus text-sm font-black text-red-600 shadow-black drop-shadow-2xl lg:block lg:text-xl"
        >
          MESA
          <motion.span className="text-zinc-500">
            {pathname.includes("mobile") ? "mobile" : "connect"}
          </motion.span>
          <motion.span className="ml-1 rounded-full text-xs">beta</motion.span>
        </motion.h2>
        <ul className="mx-4 hidden h-12 w-0.5 bg-zinc-200 dark:bg-white lg:block" />
        {headerComponents.map((e, index) => (
          <motion.ul
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1 + 0.5 * index, duration: 2 }}
            className="mx-3 hidden h-full w-full items-center lg:flex"
            key={index}
          >
            <Link
              href={e.href}
              className="flex flex-row items-center gap-2 text-lg duration-300 hover:scale-105 hover:cursor-pointer hover:font-medium"
            >
              {e.name}
            </Link>
            {/*headerComponents.length - 1 > index && (
              <ul className="bg-zinc-200 dark:bg-white w-0.5 ml-4 h-12" />
            )*/}
          </motion.ul>
        ))}
      </motion.div>
      <motion.section className="absolute right-[5%] flex flex-row items-center gap-5 text-nowrap text-white">
        <button
          onClick={() => setMenu(!menu)}
          className="flex cursor-pointer flex-row items-center gap-1 rounded-full drop-shadow-2xl duration-300 hover:scale-105"
        >
          <motion.h1 className="text-sm drop-shadow-xl lg:text-xl">
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
