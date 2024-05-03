"use client";

import LoadingPage from "@/_components/LoadingPage";
import { useUser } from "../AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { IoPeopleCircleOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
export const UserCheck = ({ children }: { children: React.ReactNode }) => {
  const { userData } = useUser();
  const [tooLong, setTooLong] = useState(false);
  useEffect(() => {
    const time = setTimeout(() => {
      setTooLong(true);
    }, 6000);

    return () => clearTimeout(time);
  }, []);

  return (
    <AnimatePresence>
      {userData ? (
        children
      ) : (
        <motion.section
          initial={{ opacity: 1, backgroundColor: "#000" }}
          animate={{ backgroundColor: "rgb(234 88 12)" }}
          exit={{ opacity: 0, backgroundColor: "#fff", scale: 0.9 }}
          key="our_first_page_please_track_and_thank_you_sir"
          transition={{ duration: 0.5 }}
          className="min-h-screen flex-col flex justify-center items-center min-w-screen"
        >
          <IoPeopleCircleOutline className=" text-white text-8xl" />
          <h1 className="bg-gradient-to-br from-white to-slate-300 bg-clip-text inline-block text-transparent text-8xl font-bold font-eudoxus">
            MESAconnect
          </h1>
          {tooLong && (
            <motion.div
              className="mt-10"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-white font-eudoxus text-xl">
                Taking too long?{" "}
                <span
                  onClick={() => window.location.reload()}
                  className="cursor-pointer duration-300 hover:text-blue-300 text-blue-700"
                >
                  Reload the page.
                </span>
              </h1>
            </motion.div>
          )}
        </motion.section>
      )}
    </AnimatePresence>
  );
};
