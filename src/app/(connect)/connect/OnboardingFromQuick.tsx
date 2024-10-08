"use client";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useUser } from "@/app/AuthContext";
import { UpdateUser } from "@/_functions/edituser";
import { useToast } from "@/app/(connect)/InfoContext";

const OnboardingFromQuick = () => {
  const { user, userData: data } = useUser();
  const [changes, setChanges] = useState<any>();
  const toast = useToast();

  const uploadChanges = async () => {
    const { error } = await UpdateUser(changes);

    if (error) toast.CreateErrorToast(error.message);
  };

  return (
    <AnimatePresence>
      <motion.section
        initial={{ opacity: 0, backgroundColor: "#000" }}
        animate={{ opacity: 1, backgroundColor: "rgb(234 88 12)" }}
        exit={{ opacity: 0, backgroundColor: "#fff", scale: 0.9 }}
        key="our_second_page_please_track_and_thank_you_sir"
        transition={{ duration: 0.5, delay: 1 }}
        className="min-w-screen flex min-h-screen flex-col items-center justify-center font-eudoxus"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          transition={{ delay: 1 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-eudoxus text-3xl text-white"
        >
          Hold on one more moment!
        </motion.h1>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          transition={{ delay: 1.9, duration: 0.5 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-eudoxus text-2xl text-white"
        >
          We just need a few more things set up before we let you go.
        </motion.h2>
        <motion.ul
          className="flex w-96 flex-col gap-3"
          initial={{ opacity: 0, y: 20 }}
          transition={{ delay: 3 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {!data?.username && (
            <React.Fragment>
              <p className="text-2xl text-slate-100">Create Your Username</p>
              <input
                className="w-full rounded-2xl p-4 px-6 font-eudoxus shadow-md duration-300 hover:scale-[1.01] focus:scale-[1.01] focus:outline-none"
                placeholder="@handle"
                onChange={(e) => {
                  setChanges({ ...changes, username: e.target.value });
                }}
              />
            </React.Fragment>
          )}
          {!data?.real_name && (
            <React.Fragment>
              <p className="text-2xl text-slate-100">Add Your Full Name!</p>
              <input
                className="w-full rounded-2xl p-4 px-6 font-eudoxus shadow-md duration-300 hover:scale-[1.01] focus:scale-[1.01] focus:outline-none"
                placeholder="@handle"
                onChange={(e) => {
                  setChanges({ ...changes, real_name: e.target.value });
                }}
              />
            </React.Fragment>
          )}

          <button
            onClick={uploadChanges}
            className="w-full rounded-2xl bg-theme-blue p-3 font-eudoxus text-white duration-500 hover:scale-105 hover:bg-teal-700"
          >
            Confirm
          </button>
        </motion.ul>
      </motion.section>
    </AnimatePresence>
  );
};

export default OnboardingFromQuick;
