import React from "react";
import { motion, MotionValue, useTransform } from "framer-motion";
import { IoCalendar, IoPeople, IoPerson } from "react-icons/io5";
const PanelTwo = ({ posY }: { posY: MotionValue }) => {
  const opacity = useTransform(posY, [600, 700], [0, 1]);
  const opacity2 = useTransform(posY, [800, 900], [0, 1]);
  const opacity3 = useTransform(posY, [1000, 1100], [0, 1]);
  return (
    <motion.section className="text-white font-eudoxus text-2xl">
      <motion.h1
        style={{ opacity }}
        className="flex flex-row gap-1 items-center"
      >
        <IoPerson /> See what is happening in a pinch.
      </motion.h1>
      <motion.h1
        style={{ opacity: opacity2 }}
        key="2"
        className="flex flex-row gap-1 items-center"
      >
        <IoCalendar /> Preview upcoming events.
      </motion.h1>
      <motion.h1
        style={{ opacity: opacity3 }}
        key="3"
        className="flex flex-row gap-1 items-center"
      >
        <IoCalendar /> Get advice / lessons from your classmates.
      </motion.h1>
    </motion.section>
  );
};

export default PanelTwo;
