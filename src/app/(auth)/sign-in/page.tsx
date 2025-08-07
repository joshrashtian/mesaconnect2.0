"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { supabase } from "../../../../config/mesa-config";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { IoLogoApple, IoLogoGoogle, IoLogoLinkedin } from "react-icons/io5";

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMsg] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/connect";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg("Please enter both email and password");
      return;
    }

    setIsLoading(true);
    setErrorMsg(undefined);

    console.log("Signing In...");
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      setErrorMsg(error.message);
    } else {
      window.location.href = callbackUrl;
    }

    setIsLoading(false);
  };

  const loginUser = async (service: "google" | "apple") => {
    setIsLoading(true);
    setErrorMsg(undefined);

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: service,
      options: {
        redirectTo: `${window.location.origin}${callbackUrl}`,
      },
    });

    if (error) {
      setErrorMsg(error.message);
    }

    setIsLoading(false);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, type: "spring" }}
      className="flex h-fit w-full flex-col justify-center gap-4 rounded-3xl bg-white p-10 shadow-md dark:bg-zinc-600 lg:w-2/3"
      role="main"
      aria-labelledby="signin-title"
    >
      <div className="flex flex-col gap-4">
        <h1
          id="signin-title"
          className="mb-5 border-b-2 border-slate-200 border-opacity-65 bg-gradient-to-tr from-orange-700 to-red-800 bg-clip-text p-6 font-eudoxus text-5xl font-black text-transparent dark:from-orange-400 dark:to-red-500"
        >
          Let&apos;s Get You Signed In.
        </h1>

        <AnimatePresence>
          {errorMessage && (
            <motion.div
              id="error-message"
              role="alert"
              aria-live="polite"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              className="rounded-full border border-red-300 bg-red-200 p-5 shadow-md"
            >
              <h2 className="font-eudoxus">
                <span className="font-semibold text-red-800">Error:</span>{" "}
                {errorMessage}
              </h2>
              <button
                onClick={() => setErrorMsg(undefined)}
                className="mt-2 rounded text-sm text-red-700 underline hover:text-red-900 focus:outline-none focus:ring-2 focus:ring-red-500"
                aria-label="Dismiss error message"
              >
                Dismiss
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <form
          id="signin-form"
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="email-input" className="sr-only">
              Email Address
            </label>
            <input
              id="email-input"
              name="email"
              placeholder="Email Address"
              className="w-full rounded-full bg-gradient-to-br from-zinc-50 to-slate-100 p-3 px-5 text-xl duration-300 hover:scale-[1.02] hover:shadow-sm focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 dark:from-zinc-800 dark:via-slate-700 dark:to-slate-900 dark:text-white dark:focus:ring-orange-400"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-describedby={errorMessage ? "error-message" : undefined}
              disabled={isLoading}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password-input" className="sr-only">
              Password
            </label>
            <input
              id="password-input"
              name="password"
              placeholder="Password"
              type="password"
              className="w-full rounded-full bg-gradient-to-br from-zinc-50 to-slate-100 p-3 px-5 text-xl duration-300 hover:scale-[1.02] hover:shadow-sm focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 dark:from-zinc-800 dark:via-slate-700 dark:to-slate-900 dark:text-white dark:focus:ring-orange-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              aria-describedby={errorMessage ? "error-message" : undefined}
              disabled={isLoading}
            />
          </div>

          <Link
            href="/forgot-password"
            className="rounded px-1 py-1 text-slate-500 duration-500 hover:text-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <p>Forgot Password? Click over here.</p>
          </Link>

          <div className="font-eudoxus">
            <p className="sr-only">Sign in with social accounts</p>
            <div className="flex flex-row gap-3">
              <button
                type="button"
                onClick={() => loginUser("google")}
                className="z-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#174EA6] to-[#4285F4] text-2xl text-white duration-500 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                disabled={isLoading}
                aria-label="Sign in with Google"
              >
                <IoLogoGoogle className="text-2xl" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => loginUser("apple")}
                className="z-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-600 to-zinc-600 text-2xl text-white duration-500 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                disabled={isLoading}
                aria-label="Sign in with Apple"
              >
                <IoLogoApple className="text-2xl" aria-hidden="true" />
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className="flex flex-col justify-center gap-4">
        <button
          type="submit"
          form="signin-form"
          className="flex w-full flex-row items-center justify-between rounded-full bg-gradient-to-r from-red-700 to-orange-500 p-3 px-8 duration-500 hover:scale-[1.02] hover:bg-orange-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-orange-400"
          disabled={isLoading}
          aria-describedby={isLoading ? "loading-text" : undefined}
        >
          <h1 className="font-eudoxus font-bold text-white">
            {isLoading ? "Signing In..." : "Sign In"}
          </h1>
          <h1 className="text-white" aria-hidden="true">
            {">"}
          </h1>
        </button>

        <Link
          className="flex w-full flex-row items-center justify-between rounded-full bg-gradient-to-r from-teal-700 to-green-500 p-3 px-8 duration-500 hover:scale-[1.02] hover:bg-orange-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 dark:bg-orange-400"
          href={`/sign-up?callbackUrl=${encodeURIComponent(callbackUrl)}`}
        >
          <h1 className="font-eudoxus font-bold text-white">Join Connect</h1>
          <h1 className="font-bold text-white" aria-hidden="true">
            +
          </h1>
        </Link>
      </div>

      {isLoading && (
        <div id="loading-text" className="sr-only">
          Loading, please wait
        </div>
      )}
    </motion.section>
  );
};

export default Page;
