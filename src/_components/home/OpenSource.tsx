"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";
import {
  IoArrowForward,
  IoGitBranch,
  IoGlobe,
  IoLockClosed,
  IoLogoGithub,
} from "react-icons/io5";
import Link from "next/link";

const OpenSource = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <motion.section
      ref={ref}
      className="flex w-full flex-col items-start justify-start gap-2 bg-gradient-to-br from-zinc-900 to-zinc-800 p-5 font-eudoxus text-sm text-white lg:p-10 lg:py-20"
    >
      <header className="flex flex-row items-center justify-between gap-2">
        <div className="flex flex-row items-center justify-center gap-2 rounded-full bg-gradient-to-br from-blue-600 to-teal-600 p-2">
          <IoGitBranch className="text-4xl" />
        </div>
        <div className="flex flex-row items-center justify-center gap-2 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 p-2">
          <IoLockClosed className="text-4xl" />
        </div>
      </header>
      <h1 className="text-3xl font-bold text-white">
        Open Source and Privacy First
      </h1>
      <p className="text-white/80">
        MESA is a community and platform for the students, by the students. It
        is open source and free to use, and has a commitment to privacy and open
        source. All data is kept on an remote server as well, safe and secure.
        Note breaking rules may result in information being sent to college.
      </p>
      <Link
        href={"/support/privacy"}
        className="group flex flex-row items-center gap-3 text-white/80 duration-300 hover:text-blue-200"
      >
        Check out our privacy policy here{" "}
        <IoArrowForward className="text-2xl duration-300 group-hover:translate-x-3 group-hover:scale-105" />
      </Link>
      <Link
        href="https://github.com/joshrashtian/mesaconnect2.0"
        className="mt-3 flex flex-row items-center gap-2 rounded-3xl bg-gradient-to-r from-blue-600 to-blue-400 px-8 py-2 text-white shadow-lg ring-blue-400 ring-offset-transparent transition-all duration-500 ease-in-out hover:rounded-2xl hover:bg-blue-700/60 hover:ring-2"
      >
        <IoLogoGithub className="text-2xl" />
        <p>In fact, here is also our source code!</p>
      </Link>
    </motion.section>
  );
});

OpenSource.displayName = "OpenSource";

export default OpenSource;
