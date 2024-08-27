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
    isDark ? ["#FFF", "#fff"] : ["#FFF", "#FFFF"]
  );

  const headerComponents = [
    // eslint-disable-next-line react/jsx-key
    <Link
      href="/news"
      className="flex flex-row gap-2 rounded-full items-center hover:scale-105 duration-300 cursor-pointer"
    >
      <motion.h1
        style={{ color: color }}
        className=" text-sm lg:text-xl drop-shadow-xl"
      >
        News
      </motion.h1>
    </Link>,
    // eslint-disable-next-line react/jsx-key
    <Link
      href="/support"
      className="flex flex-row gap-2 rounded-full items-center hover:scale-105 duration-300 cursor-pointer"
    >
      <motion.h1
        style={{ color: color }}
        className="text-sm lg:text-xl drop-shadow-xl"
      >
        Support
      </motion.h1>
    </Link>,
    // eslint-disable-next-line react/jsx-key
    <button
      onClick={() => setMenu(!menu)}
      className="flex flex-row gap-1 rounded-full items-center hover:scale-105 duration-300 cursor-pointer"
    >
      <motion.h1
        style={{ color: color }}
        className="text-sm lg:text-xl drop-shadow-xl"
      >
        {user.user
          ? user.user.user_metadata.full_name
            ? user.user.user_metadata.full_name
            : user.user.user_metadata.username
          : "Sign In"}
      </motion.h1>
      <div className="bg-slate-300 w-8 rounded-full">
        {/* eslint-disable-next-line @next/next/no-img-element,jsx-a11y/alt-text */}
        <img
          src={user.userData?.avatar_url}
          className="w-8 h-8 rounded-full"
          alt={user.userData?.username}
        />
      </div>
    </button>,
  ];

  return (
    <motion.div
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 5, type: "spring" }}
      className="w-full h-28 px-[5%] fixed top-0 z-50 justify-between items-center flex-row flex "
    >
      <motion.ul
        style={{ opacity: opacity }}
        className="h-28 w-full fixed top-0 left-0 bg-gradient-to-b rounded-b-3xl -z-10 dark:from-orange-900 dark:to-zinc-800 from-orange-50 to-zinc-100 shadow-sm"
      />
      <motion.h2
        initial="colorone"
        animate={Number(scrollYProgress.get()) < 0.9 ? "colorone" : "colortwo"}
        className="text-orange-600 text-sm lg:text-xl drop-shadow-xl font-black font-eudoxus "
      >
        MESA
        <motion.span style={{ color: color }}>connect</motion.span>
      </motion.h2>
      <motion.section className="flex flex-row gap-5 text-nowrap items-center">
        {headerComponents.map((e, index) => (
          <motion.ul
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1 + 0.5 * index, duration: 2 }}
            className="flex h-full w-full ml-4 items-center"
            key={index}
          >
            {e}
            {/*headerComponents.length - 1 > index && (
              <ul className="bg-zinc-200 dark:bg-white w-0.5 ml-4 h-12" />
            )*/}
          </motion.ul>
        ))}
      </motion.section>
      <AnimatePresence>
        <HeaderContext user={user} isActive={menu} />
      </AnimatePresence>
    </motion.div>
  );
};

export default Header;
