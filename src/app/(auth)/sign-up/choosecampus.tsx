"use client";
import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import AutocompleteCampus from "./autocompleteCollege";

const ChooseCampus = ({
  onChangeSelected,
}: {
  onChangeSelected: (selected: string | undefined) => void;
}) => {
  const [search, setSearch] = useState<string>("");
  const [selected, setSelected] = useState<string>();
  useMemo(() => {
    onChangeSelected(selected);
  }, [selected, onChangeSelected]);
  return (
    <motion.section className="dark:text-white">
      <h1 className="font-eudoxus text-lg">
        Next, we need to pick your primary campus:
      </h1>
      <h2 className="z-10 w-full rounded-t-2xl bg-zinc-50 p-2 px-5 text-center font-eudoxus text-xl dark:bg-zinc-700">
        <span>I am attending </span>
        {selected ? selected : "..."}
      </h2>
      <input
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        type="search"
        className="z-10 w-full rounded-b-2xl bg-slate-100 p-2 px-5 text-xl dark:bg-zinc-400"
      />

      <AutocompleteCampus
        input={search}
        onChange={(e: any) => {
          setSelected(e);
        }}
      />
    </motion.section>
  );
};

export default ChooseCampus;
