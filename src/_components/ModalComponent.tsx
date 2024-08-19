"use client";
import React, { use, useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

type ModalScrollViewProps = {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

const ModalScrollView: React.FC<ModalScrollViewProps> = (props) => {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    container: ref,
  });

  const scrollValue = useSpring(scrollYProgress, {
    stiffness: 400,
    damping: 90,
  });
  return (
    <motion.div
      ref={ref}
      className={`overflow-y-scroll self-center flex flex-row-reverse no-scrollbar w-64 lg:w-96 xl:[500px] 2xl:w-[720px] h-72 duration-300 ${props.className}`}
    >
      <ul>{props.children}</ul>
      <motion.ul
        style={{ scaleY: scrollValue, x: 10 }}
        className="absolute h-72 origin-top bg-orange-400  w-1.5 rounded-t-xl"
      />
    </motion.div>
  );
};

export default ModalScrollView;
