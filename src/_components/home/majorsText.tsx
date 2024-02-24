"use client";

import { coverMajors } from "@/_assets/coverData";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

const variants = {
  moving: {
    opacity: 0,
    y: -20,
  },
  still: {
    opacity: 1,
    y: 0,
  },
};

const MajorsText = () => {
  const [index, setIndex] = useState(0);
  const [isChanging, setIsChanging] = useState(false);
  const [color, setColor] = useState("");

  const colors = [
    "teal",
    "orange",
    "green",
    "blue",
    "indigo",
    "purple",
    "pink",
  ];
  const samples = [
    "text-teal-500",
    "text-orange-500",
    "text-green-500",
    "text-blue-500",
    "text-indigo-500",
    "text-purple-500",
    "text-pink-500",
  ];

  useEffect(() => {
    setInterval(() => {
      setIsChanging(true);

      setTimeout(() => {
        while (true) {
          let newValue = Math.floor(Math.random() * coverMajors.length);

          if (newValue !== index) {
            setIndex(Math.floor(Math.random() * coverMajors.length));
            break;
          }
        }

        setColor(colors[Math.floor(Math.random() * colors.length)]);
        setIsChanging(false);
      }, 600);
    }, 4000);
  }, []);

  return (
    <motion.h1
      className={`${inter.className} text-3xl md:text-4xl lg:text-5xl font-bold text-center lg:text-left gap-3 text-slate-500`}
    >
      A home for the majors studying{" "}
      <motion.span
        variants={variants}
        animate={isChanging ? "moving" : "still"}
        transition={{
          type: "spring",
          stiffness: 100,
          duration: 2,
        }}
        className={`text-${color}-500 transition-colors`}
      >
        {coverMajors[index]}.
      </motion.span>
    </motion.h1>
  );
};

export default MajorsText;
