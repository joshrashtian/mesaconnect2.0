"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function AuthCodeError() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-tr from-purple-400 to-teal-500 dark:from-purple-300 dark:to-red-400">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, type: "spring" }}
        className="flex w-full flex-col gap-4 rounded-3xl bg-white p-10 shadow-md dark:bg-zinc-600 lg:w-2/3"
      >
        <h1 className="mb-5 border-b-2 border-slate-200 border-opacity-65 bg-gradient-to-tr from-red-700 to-orange-800 bg-clip-text p-6 font-eudoxus text-5xl font-black text-transparent dark:from-red-400 dark:to-orange-500">
          Authentication Error
        </h1>

        <div className="space-y-4">
          <p className="text-lg text-gray-700 dark:text-gray-300">
            There was an error processing your authentication request. This
            could be due to:
          </p>

          <ul className="list-disc space-y-2 pl-6 text-gray-600 dark:text-gray-400">
            <li>An expired or invalid authentication code</li>
            <li>Network connectivity issues</li>
            <li>Authentication provider temporarily unavailable</li>
            <li>Invalid redirect URL configuration</li>
          </ul>

          <div className="space-y-3 pt-4">
            <Link
              href="/sign-in"
              className="inline-block rounded-full bg-gradient-to-r from-red-700 to-orange-500 p-3 px-8 font-bold text-white transition-transform duration-200 hover:scale-[1.02]"
            >
              Try Signing In Again
            </Link>

            <div className="pt-2">
              <Link
                href="/"
                className="text-blue-600 underline hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Return to Home
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
