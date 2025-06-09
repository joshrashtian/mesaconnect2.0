"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { updatePassword } from "./actions";

const NewPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [response, setResponse] = useState<{
    message: string;
    error: boolean;
  }>({ message: "", error: false });

  const handleUpdatePassword = async () => {
    if (password !== confirmPassword) {
      setResponse({ message: "Passwords do not match", error: true });
      return;
    }

    const { success, error } = await updatePassword(password);

    if (success) {
      setResponse({ message: success, error: false });
    } else {
      setResponse({ message: error, error: true });
    }
  };

  return (
    <div className="absolute flex h-full w-full items-center justify-center">
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, type: "spring" }}
        className="flex h-2/3 w-2/3 flex-col gap-4 rounded-3xl bg-white p-10 shadow-md dark:bg-zinc-600"
      >
        <AnimatePresence>
          {response.message && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, type: "spring" }}
            >
              {response.message}
            </motion.div>
          )}
        </AnimatePresence>
        <ul className="flex flex-col gap-2">
          <h1 className="mb-5 border-b-2 border-slate-200 border-opacity-65 bg-gradient-to-tr from-orange-700 to-red-800 bg-clip-text p-6 font-eudoxus text-5xl text-transparent dark:from-orange-400 dark:to-red-500">
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            Update Your Password.
          </h1>
          <div className="flex flex-col gap-2">
            <Input
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button onClick={handleUpdatePassword}>Update Password</Button>
          </div>
        </ul>
      </motion.section>
    </div>
  );
};

export default NewPassword;
