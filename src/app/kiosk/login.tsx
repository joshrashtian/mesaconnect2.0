"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import React, { useState } from "react";
import { supabase } from "../../../config/mesa-config";
import { useToast } from "../(connect)/InfoContext";

const LoginKiosk = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();

  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: username,
      password: password,
    });
    if (error) {
      toast.CreateErrorToast(error.message);
    }
  };
  return (
    <div className="flex w-full flex-col gap-2">
      <h5 className="text-2xl font-bold text-white">Login</h5>
      <input
        type="text"
        placeholder="Username..."
        className="w-full rounded-md bg-white p-2 px-3.5 text-lg text-black focus:outline-none"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password..."
        className="w-full rounded-md bg-white p-2 px-3.5 text-lg text-black focus:outline-none"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        onClick={() => {
          window.location.href = "/sign-in?callbackUrl=/kioskhandler";
        }}
      >
        If You Use Google or Apple for Sign In, Use This
      </Button>
      <Button
        onClick={handleLogin}
        className="flex w-full flex-row items-center justify-start gap-2 p-5 text-left"
      >
        Login
        <ArrowRight className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default LoginKiosk;
