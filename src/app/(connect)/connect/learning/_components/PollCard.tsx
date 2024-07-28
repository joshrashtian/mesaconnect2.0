"use client";
import { motion } from "framer-motion";
import React from "react";
import { usePollModal } from "../LearningContext";

export type PollType = {
  question: string;
  id: string;
  options: string[];
  context: boolean;
  due: Date;
  created_at: Date;
  creator: {
    id: string;
    picture: string;
    realname: string;
    username: string;
  };
  correct: number;
  contextType: string;
};

const PollCard = ({ data, index }: { data: PollType; index: number }) => {
  const { createModal } = usePollModal();

  return (
    <motion.div
      onClick={() => {
        createModal(data);
      }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 * index }}
      className="p-6 w-64 lg:w-72 h-24 hover:scale-110 hover:shadow-lg border-2 border-amber-600 border-opacity-0 hover:border-opacity-100 duration-300 scale-100 cursor-pointer flex shadow-md flex-col  justify-center bg-white dark:bg-slate-700/50 text-black dark:text-white rounded-xl"
    >
      <h2 className="font-eudoxus font-bold">{data.question}</h2>
      <h3 className="font-eudoxus text-sm text-slate-600 dark:text-slate-200/60">
        by {data.creator.realname}
      </h3>
    </motion.div>
  );
};

export default PollCard;
