"use client";

import { forwardRef } from "react";
import { motion, MotionValue } from "framer-motion";
import { IoGitBranch, IoGlobe, IoLockClosed } from "react-icons/io5";

const OpenSource = forwardRef<HTMLDivElement, { scrolledValue: MotionValue }>(
  (props, ref) => {
    return (
      <div className="relative flex h-screen flex-row items-center justify-center">
        <div className="flex h-[500px] w-full flex-col items-start justify-center rounded-3xl border-4 bg-zinc-300/30 px-8 font-eudoxus duration-1000 hover:border-orange-500/40 dark:bg-zinc-700/30 dark:text-slate-200 dark:hover:border-orange-400 lg:mx-12">
          <ul className="flex flex-row items-center gap-2">
            <ul className="mb-5 flex flex-row items-center gap-2 rounded-2xl bg-gradient-to-br from-blue-700 to-orange-500 p-4 text-6xl text-white">
              <IoGitBranch />
            </ul>
            <ul className="mb-5 flex flex-row items-center gap-2 rounded-2xl bg-gradient-to-br from-theme-blue to-teal-600 p-4 text-6xl text-white">
              <IoGlobe />
            </ul>
          </ul>
          <h1 className="text-4xl font-semibold text-slate-800 dark:text-slate-100/80">
            Open Source & Sustainablity
          </h1>
          <p>
            MESA Connect aimes to be an open source project. This means that the
            code is freely available to the public and can be used, modified,
            and distributed by anyone.
          </p>
          <p>The code will be available on GitHub soon to play around with.</p>
          <p className="font-mono text-slate-500">
            * PLEASE NOTE: the database will not be open source for security and
            privacy reasons. the open source version will be a mock database for
            testing purposes.
          </p>
        </div>
        <motion.div className="mt-12 flex h-[500px] w-full flex-col items-end justify-center rounded-3xl border-4 bg-zinc-300/30 px-8 font-eudoxus duration-1000 hover:border-orange-500/40 dark:bg-zinc-700/30 dark:text-slate-200 dark:hover:border-orange-400 lg:mx-12">
          <ul className="flex flex-row items-center gap-2">
            <ul className="mb-5 flex flex-row items-center gap-2 rounded-2xl bg-gradient-to-br from-green-700 to-orange-500 p-4 text-6xl text-white">
              <IoLockClosed />
            </ul>
          </ul>
          <h1 className="text-4xl font-semibold text-slate-800 dark:text-slate-100/80">
            Privacy First
          </h1>
          <p>
            No information is shared with third parties. We value your privacy
            and are always going to remain a free to use service for students.
          </p>
        </motion.div>
      </div>
    );
  },
);

OpenSource.displayName = "OpenSource";

export default OpenSource;
