"use client";
import React, { useEffect, useState } from "react";
import { Golos_Text } from "next/font/google";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import LoginKiosk from "./login";
import { useUser } from "../AuthContext";
import LoadingObject from "@/(mesaui)/LoadingObject";
const font = Golos_Text({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});
const KioskHandler = () => {
  const { user, signOut } = useUser();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  return (
    <div
      className={`${font.className} flex h-screen w-screen flex-col items-start justify-end bg-gradient-to-b from-zinc-900 to-zinc-800 p-12`}
    >
      <h1 className="text-9xl font-black text-orange-300">
        MESA<span className="text-white">Kiosk</span>
      </h1>
      {user ? (
        <div className="flex w-full flex-col items-center justify-center">
          <h1 className="text-4xl font-bold text-white">
            Welcome {user.email}
          </h1>
          {loading ? (
            <LoadingObject className="my-7 h-10 w-10" color="white" />
          ) : (
            <Button onClick={() => signOut()}>Sign Out</Button>
          )}
        </div>
      ) : (
        <LoginKiosk />
      )}
    </div>
  );
};

export default KioskHandler;
