"use client";

import { forwardRef } from "react";
import { motion, MotionValue } from "framer-motion";
import { IoArrowForward, IoDocument, IoDocumentAttach } from "react-icons/io5";
import Link from "next/link";

const JoinNow = forwardRef<HTMLDivElement, { scrolledValue: MotionValue }>(
  (props, ref) => {
    return (
      <>
        <motion.main
          ref={ref}
          style={{ scale: props.scrolledValue, opacity: props.scrolledValue }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="z-40 flex h-screen w-screen flex-col items-center justify-center px-3 font-eudoxus"
        >
          <h1 className="text-4xl font-black lg:text-6xl dark:text-slate-200">
            Want to connect with us?
          </h1>
          <h2 className="font-bold text-zinc-600 lg:text-2xl dark:text-slate-200/80">
            Join our community and be a part of something great.
          </h2>
          <ul className="mt-4 flex flex-col items-center justify-center gap-2 lg:flex-row">
            <Link
              href="/connect"
              className="group flex w-64 flex-row items-center justify-center rounded-2xl bg-theme-blue p-4 text-white duration-300 hover:w-72 hover:scale-105 hover:rounded-3xl hover:bg-theme-blue/90"
            >
              <p className="translate-x-2 duration-500 group-hover:translate-x-0">
                Join Now
              </p>
              <IoArrowForward className="translate-x-10 scale-0 duration-300 group-hover:translate-x-2 group-hover:scale-100" />
            </Link>
            <Link
              href="https://www.canyons.edu/academics/mesa/join/"
              className="group flex w-64 flex-row items-center justify-center rounded-2xl bg-orange-600 p-4 text-white duration-300 hover:w-72 hover:scale-105 hover:rounded-3xl hover:bg-orange-600/90"
            >
              <p className="translate-x-2 duration-500 group-hover:translate-x-0">
                Join MESA
              </p>
              <IoDocumentAttach className="translate-x-10 scale-0 duration-300 group-hover:translate-x-2 group-hover:scale-100" />
            </Link>
          </ul>
          <p className="text-sm text-zinc-600 dark:text-slate-200/80">
            * Join Mesa is only for College of the Canyons students, mesaconnect
            is only available for College of the Canyons students
          </p>
        </motion.main>
      </>
    );
  },
);

JoinNow.displayName = "JoinNow";

export default JoinNow;
