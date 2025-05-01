"use client";
import { MotionValue, motion, useScroll, useTransform } from "framer-motion";
import React from "react";
import Image from "next/image";
import UniSVG from "@/(mesaui)/UniSVG";
import { Circle } from "lucide-react";
const PanelFour = ({ posY }: { posY: MotionValue }) => {
  const opacity = useTransform(posY, [2200, 2500], [0, 1]);

  const position = useTransform(posY, [2200, 3300], [-500, 0]);

  return (
    <motion.section className="mt-24 flex h-screen w-full items-center justify-center overflow-hidden">
      <motion.ul
        style={{ opacity }}
        className="flex w-full flex-col items-center text-wrap px-3"
      >
        <h1 className="text-center font-eudoxus text-xl font-black text-white xl:text-4xl">
          See your progress through college at the tip of your fingers.
        </h1>
        <p className="font-eudoxus text-sm text-white/80">
          Pathway System is not guaranteed and is not a replacement for your
          counselor.
        </p>
        <motion.ol
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="z-20 mt-3 flex h-96 w-full snap-x flex-row flex-nowrap gap-3 overflow-x-hidden py-4"
        >
          <motion.div
            style={{ x: position }}
            className="flex h-64 w-96 flex-col items-start justify-between rounded-2xl bg-white p-3 text-emerald-500 shadow-2xl shadow-emerald-500"
          >
            <UniSVG name="UCI" width={100} height={50} />

            <ol className="flex w-full flex-row items-center justify-center gap-4 px-4">
              <Circle className="h-24 w-24 rounded-full" />
              <p className="font-eudoxus text-2xl font-bold">--% Complete</p>
            </ol>
            <p className="font-eudoxus text-2xl font-bold">Biology</p>
          </motion.div>
          <motion.div
            style={{ x: position }}
            className="flex h-64 w-96 flex-col items-start justify-between rounded-2xl bg-white p-3 text-blue-500 shadow-2xl shadow-blue-500"
          >
            <UniSVG name="UCLA" width={100} height={50} />

            <ol className="flex w-full flex-row items-center justify-center gap-4 px-4">
              <Circle className="h-24 w-24 rounded-full" />
              <p className="font-eudoxus text-2xl font-bold">--% Complete</p>
            </ol>
            <p className="font-eudoxus text-2xl font-bold">
              Electrical Engineering
            </p>
          </motion.div>
          <motion.div
            style={{ x: position }}
            className="flex h-64 w-96 flex-col items-start justify-between rounded-2xl bg-white p-3 text-red-500 shadow-2xl shadow-red-500"
          >
            <UniSVG name="UCB" width={100} height={50} />

            <ol className="flex w-full flex-row items-center justify-center gap-4 px-4">
              <Circle className="h-24 w-24 rounded-full" />
              <p className="font-eudoxus text-2xl font-bold">--% Complete</p>
            </ol>
            <p className="font-eudoxus text-2xl font-bold">Computer Science</p>
          </motion.div>
          <motion.div
            style={{ x: position }}
            className="flex h-64 w-96 flex-col items-start justify-between rounded-2xl bg-white p-3 text-yellow-500 shadow-2xl shadow-yellow-500"
          >
            <UniSVG name="UCSD" width={100} height={50} />

            <ol className="flex w-full flex-row items-center justify-center gap-4 px-4">
              <Circle className="h-24 w-24 rounded-full" />
              <p className="font-eudoxus text-2xl font-bold">--% Complete</p>
            </ol>
            <p className="font-eudoxus text-2xl font-bold">Bioengineering</p>
          </motion.div>
          <motion.div
            style={{ x: position }}
            className="flex h-64 w-96 flex-col items-start justify-between rounded-2xl bg-white p-3 text-blue-500 shadow-2xl shadow-blue-500"
          >
            <UniSVG name="UCLA" width={100} height={50} />

            <ol className="flex w-full flex-row items-center justify-center gap-4 px-4">
              <Circle className="h-24 w-24 rounded-full" />
              <p className="font-eudoxus text-2xl font-bold">--% Complete</p>
            </ol>
            <p className="font-eudoxus text-2xl font-bold">
              Mechanical Engineering
            </p>
          </motion.div>
          <motion.div
            style={{ x: position }}
            className="flex h-64 w-96 flex-col items-start justify-between rounded-2xl bg-white p-3 text-orange-500 shadow-2xl shadow-orange-500"
          >
            <UniSVG name="SLO" width={270} height={70} />

            <ol className="flex w-full flex-row items-center justify-center gap-4 px-4">
              <Circle className="h-24 w-24 rounded-full" />
              <p className="font-eudoxus text-2xl font-bold">--% Complete</p>
            </ol>
            <p className="font-eudoxus text-2xl font-bold">Computer Science</p>
          </motion.div>
          <motion.div
            style={{ x: position }}
            className="flex h-64 w-96 flex-col items-start justify-between rounded-2xl bg-white p-3 text-orange-500 shadow-2xl shadow-orange-500"
          >
            <UniSVG name="UCI" width={270} height={70} />

            <ol className="flex w-full flex-row items-center justify-center gap-4 px-4">
              <Circle className="h-24 w-24 rounded-full" />
              <p className="font-eudoxus text-2xl font-bold">--% Complete</p>
            </ol>
            <p className="font-eudoxus text-2xl font-bold">Chemistry</p>
          </motion.div>
        </motion.ol>
      </motion.ul>
    </motion.section>
  );
};

export default PanelFour;
