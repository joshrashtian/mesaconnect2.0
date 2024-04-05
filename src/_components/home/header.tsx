"use client";
import { userContext } from "@/app/AuthContext";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import Link from "next/link";
import React, { Ref, useContext, useRef } from "react";

const Header = ({ scrollRefrence }: { scrollRefrence: any }) => {
  const user = useContext(userContext);
  const { scrollYProgress } = useScroll({
    target: scrollRefrence,
    offset: ["start end", "end end"],
  });

  const color = useTransform(scrollYProgress, [0, 1], ["#FFF", "#000"]);

  const headerComponents = [
    <Link
      href="/news"
      className="flex flex-row gap-2 p-4 py-8 rounded-full hover:shadow-sm items-center hover:scale-105 duration-300 cursor-pointer"
    >
      <motion.h1 style={{ color: color }} className="text-xl font-eudoxus">
        News
      </motion.h1>
    </Link>,
    <Link
      href="/sign-in"
      className="flex flex-row gap-2 py-8 rounded-full hover:shadow-sm items-center hover:scale-105 duration-300 cursor-pointer"
    >
      <motion.h1 style={{ color: color }} className="text-xl font-eudoxus">
        {user.user ? user.user.user_metadata.username : "Sign In"}
      </motion.h1>
      <div className="bg-slate-300 w-8 rounded-full">
        <img src={user.userData?.avatar_url} className="w-8 h-8 rounded-full" />
      </div>
    </Link>,
  ];

  return (
    <motion.div
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 5, type: "spring" }}
      className="w-full h-28 px-[5%] fixed justify-between items-center flex-row flex "
    >
      <motion.ul
        style={{ opacity: scrollYProgress }}
        className="h-28 w-full fixed top-0 left-0 bg-gradient-to-b rounded-b-3xl -z-10 dark:from-orange-900 dark:to-zinc-800 from-orange-50 to-zinc-100 shadow-sm"
      />
      <motion.h2
        initial="colorone"
        animate={Number(scrollYProgress.get()) < 0.5 ? "colorone" : "colortwo"}
        className="text-orange-500 text-xl font-eudoxus "
      >
        MESA
        <motion.span style={{ color: color }}>connect</motion.span>
      </motion.h2>
      <section className="flex flex-row text-nowrap items-center">
        {headerComponents.map((e, index) => (
          <motion.ul
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1 + 0.5 * index, duration: 2 }}
            className="flex h-full w-full ml-4 items-center"
          >
            {e}
            {/*headerComponents.length - 1 > index && (
              <ul className="bg-zinc-200 dark:bg-white w-0.5 ml-4 h-12" />
            )*/}
          </motion.ul>
        ))}
      </section>
    </motion.div>
  );
};

export default Header;
