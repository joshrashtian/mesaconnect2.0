"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { supabase } from "../../../../config/mesa-config";
import { Input } from "@/components/ui/input";

const Page = () => {
  const [email, setEmail] = useState<string | undefined>();
  const [response, setResponse] = useState<string | undefined>();
  async function sendEmail() {
    if (!email) return;

    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "https://measconnect.io/reset-password",
    });

    if (error) {
      setResponse(error.message);
    } else {
      setResponse("Email sent");
    }
  }

  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (event == "PASSWORD_RECOVERY") {
        const newPassword = prompt(
          "What would you like your new password to be?",
        );
        const { data, error } = await supabase.auth.updateUser({
          password: newPassword ?? "",
        });
        if (data) alert("Password updated successfully!");
        if (error) alert("There was an error updating your password.");
      }
    });
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, type: "spring" }}
      className="absolute bottom-0 flex h-2/3 w-full origin-bottom flex-col gap-4 rounded-t-3xl bg-white p-10 font-eudoxus shadow-md dark:bg-zinc-600"
    >
      <h1 className="text-4xl font-bold">Forgot Password</h1>
      <p className="text-sm text-gray-500">
        Enter your email to reset your password.
      </p>
      <div className="flex flex-col gap-4">
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="rounded-md border border-gray-300 p-2"
        />
        <button
          onClick={sendEmail}
          className="rounded-md bg-blue-500 p-2 text-white"
        >
          Reset Password
        </button>
        {response && <p className="text-sm text-gray-500">{response}</p>}
        <p className="text-sm text-gray-500">
          Remember your password? <Link href="/login">Login</Link>
        </p>
      </div>
    </motion.section>
  );
};

export default Page;
