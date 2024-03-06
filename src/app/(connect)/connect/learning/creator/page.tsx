"use client";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import PollBuilder from "./PollBuilder";
import PollDashboard from "./PollDashboard";

const options = [
  { name: "Lesson", type: 0, comp: () => {} },
  { name: "Poll", type: 0, comp: () => <PollBuilder /> },
  { name: "Question", type: 0, comp: () => {} },
  { name: "Edit Polls", type: 1, comp: () => <PollDashboard /> },
];

const page = () => {
  const [selected, setSelected] = useState<any>();
  return (
    <main className="flex flex-col gap-10">
      <h1 className="text-4xl font-bold">Lesson Builder</h1>
      <AnimatePresence>
        {!selected && (
          <motion.section
            exit={{ y: -10, opacity: 0 }}
            className="flex flex-row flex-wrap justify-center gap-3"
          >
            {options.map((option, index) => {
              switch (option.type) {
                case 0:
                  return (
                    <button
                      onClick={() => setSelected(option)}
                      key={index}
                      className="w-[32.84%] h-36  border-2 border-slate-500 border-dashed text-slate-800 font-bold rounded-3xl"
                    >
                      <h2 className="font-mono text-2xl">{option.name}</h2>
                    </button>
                  );
                case 1:
                  return (
                    <button
                      onClick={() => setSelected(option)}
                      key={index}
                      className="w-1/2 h-24  border-2 border-slate-500 text-slate-800 font-bold rounded-3xl"
                    >
                      <h2 className="font-mono text-2xl">{option.name}</h2>
                    </button>
                  );
              }
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
