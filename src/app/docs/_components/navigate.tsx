"use client";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { motion } from "framer-motion";
import { IoMdArrowDropleft } from "react-icons/io";
import { IoChevronBack } from "react-icons/io5";

const Navigate = () => {
  const params = useSearchParams();
  const isFrom = params.get("fromelse");
  const router = useRouter();

  if (isFrom) {
    return (
      <motion.button
        onClick={() => router.back()}
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 3 }}
        className="fixed top-24 flex h-16 w-56 origin-center flex-row items-center justify-center gap-2 self-center rounded-3xl bg-white font-eudoxus shadow-md duration-300 hover:bg-slate-100"
      >
        <IoChevronBack className="text-3xl" />
        <p>Return To Connect</p>
      </motion.button>
    );
  }

  return null;
};

export default Navigate;
