"use client";
import React, { useContext } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { userContext } from "../AuthContext";

const Dashboard = () => {
  const user = useContext(userContext);
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, type: "spring" }}
      className="bg-white absolute origin-bottom bottom-0 rounded-t-3xl h-2/3 p-10 w-full shadow-md flex gap-2 flex-col "
    >
      <h1 className="font-eudoxus text-2xl">
        You are successfully signed in as {user?.user?.email}
      </h1>
      <Link
        className="font-eudoxus p-2 px-4 hover:scale-[1.02] duration-300 text-white rounded-xl hover:rounded-2xl bg-gradient-to-tr from-blue-500 to-teal-500 text-xl flex flex-row justify-between"
        href="/connect"
      >
        <h1>Enter Connect</h1>
        <h1>{">"}</h1>
      </Link>
      <div
        className="font-eudoxus p-2 px-4 hover:scale-[1.02] duration-300 text-white rounded-xl hover:rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-500 text-xl flex flex-row justify-between"
        onClick={() => {
          user.signOut();
        }}
      >
        <h1>Sign Out</h1>
        <h1>{"<"}</h1>
      </div>
    </motion.section>
  );
};

export default Dashboard;
