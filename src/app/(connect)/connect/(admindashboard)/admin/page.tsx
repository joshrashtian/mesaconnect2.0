"use client";

import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { userContext, useUser } from "@/app/AuthContext";
import AdminIndex, { AdminPanel } from ".";
import { useToast } from "@/app/(connect)/InfoContext";

const page = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const user = useUser();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [selected, setSelected] = useState<AdminPanel>(AdminIndex[0]);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const toast = useToast();

  return (
    <motion.main initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
      <h1 className="font-bold">Admin Dashboard</h1>
      <ul className="my-4 h-1 w-full bg-orange-500" />
      <section className="flex w-full flex-row gap-4">
        <section className="w-48">
          {AdminIndex.map((e, i) => {
            return (
              <ul
                onClick={() => {
                  setSelected(e);
                }}
                key={i}
                className={`flex w-full justify-center p-2 ${
                  selected.name === e.name ? "bg-slate-600 text-white" : ""
                } cursor-pointer rounded-2xl duration-300 hover:bg-slate-500 hover:text-white`}
              >
                <h1 className="text-md font-semibold">{e.displayname}</h1>
              </ul>
            );
          })}
        </section>
        <section className="w-full">
          <selected.component />
        </section>
      </section>
    </motion.main>
  );
};

export default page;
