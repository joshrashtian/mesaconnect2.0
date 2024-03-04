"use client";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import PollBuilder from "./PollBuilder";

const options = [
  { name: "Lesson", comp: () => {} },
  { name: "Poll", comp: () => <PollBuilder /> },
  { name: "Question", comp: () => {} },
];

const page = () => {
  const [selected, setSelected] = useState();
  return (
    <main className="flex flex-col gap-10">
      <h1 className="text-4xl font-bold">Lesson Builder</h1>
      <AnimatePresence>
        {!selected && (
          <motion.section
            exit={{ y: -10, opacity: 0 }}
            className="flex flex-row gap-3"
          >
            {options.map((option, index) => {
              return (
                <button
                  onClick={() => setSelected(option)}
                  key={index}
                  className="w-full h-36  border-2 border-slate-500 border-dashed text-slate-800 font-bold rounded-3xl"
                >
                  <h2 className="font-mono text-2xl">{option.name}</h2>
                </button>
              );
            })}
          </motion.section>
        )}
      </AnimatePresence>
      {selected && (
        <motion.section
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", delay: 0.5 }}
          exit={{ y: -10, opacity: 0 }}
          className="flex flex-row gap-3"
        >
          <selected.comp />
        </motion.section>
      )}
    </main>
  );
};

export default page;
