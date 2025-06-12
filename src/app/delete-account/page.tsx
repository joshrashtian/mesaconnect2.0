"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUser } from "../AuthContext";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const DeleteAccount = () => {
  const { user } = useUser();
  const [email, setEmail] = useState("");
  const supabase = createClientComponentClient();

  async function deleteCurrentUser() {
    if (email !== user?.email) {
      alert("Email does not match");
      return;
    }
    const {
      data: { session },
    } = await supabase.auth.getSession();
    const token = session?.access_token;
    if (!token) throw new Error("Not authenticated");

    const resp = await fetch(
      "https://gnmpzioggytlqzekuyuo.functions.supabase.co/delete_account",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!resp.ok) {
      const err = await resp.json();
      console.error("Could not delete account:", err);
      return;
    }

    // If deletion worked, optionally sign them out locally
    await supabase.auth.signOut();
    console.log("Account deleted.");
  }
  return (
    <div className="absolute flex h-full w-full items-center justify-center">
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, type: "spring" }}
        className="flex h-2/3 w-2/3 flex-col gap-4 rounded-3xl bg-white p-10 shadow-md dark:bg-zinc-600"
      >
        <ul className="flex flex-col gap-2">
          <h1 className="mb-5 border-b-2 border-slate-200 border-opacity-65 bg-gradient-to-tr from-orange-700 to-red-800 bg-clip-text p-6 font-eudoxus text-5xl text-transparent dark:from-orange-400 dark:to-red-500">
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            Delete Your Account.
          </h1>
          <p className="text-sm text-gray-500">
            Please enter your email to confirm that you want to delete your
            account.
          </p>
          <p className="text-sm text-gray-500">
            This action is irreversible and will delete all your data.
          </p>
          <div className="flex flex-col gap-2">
            <Input
              type="email"
              placeholder="Confirm Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button onClick={deleteCurrentUser}>Delete Account</Button>
          </div>
        </ul>
      </motion.section>
    </div>
  );
};

export default DeleteAccount;
