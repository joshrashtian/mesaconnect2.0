"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const PostContext = ({
  rightClick,
  positionX,
  positionY,
  isToggled,
  buttons,
  contextMenuRef,
}: {
  rightClick: any;
  positionX: number;
  positionY: number;
  isToggled: boolean;
  buttons: any;
  contextMenuRef: any;
}) => {
  if (!isToggled) return null;

  return (
    <motion.menu
      initial={{ opacity: 0, scaleY: 0 }}
      animate={{ opacity: 1, scaleY: 1 }}
      exit={{ opacity: 0, scaleY: 0 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.4, type: "spring" }}
      drag
      dragMomentum={false}
      style={{ top: `${positionY + 2}px`, left: `${positionX + 2}px` }}
      className={`absolute bg-white w-32 rounded-xl p-2 shadow-md flex flex-col items-center`}
    >
      <ul className="w-[70%] cursor-pointer active:scale-110 hover:scale-105 h-1 my-2 duration-150 rounded-full bg-slate-200" />
      {buttons.map((e: any, index: number) => {
        if (!e.visible) return;

        return (
          <li
            key={e.name}
            className="cursor-pointer w-full rounded-xl flex flex-row p-2 hover:bg-slate-100 duration-500"
            onClick={() => {
              e.function();
            }}
          >
            <h1 className="text-md">{e.name}</h1>
          </li>
        );
      })}
    </motion.menu>
  );
};

export default PostContext;
