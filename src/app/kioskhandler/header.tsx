"use client";
import { Button } from "@/components/ui/button";
import { ArrowLeft, RefreshCcw } from "lucide-react";
import { Golos_Text } from "next/font/google";
import React from "react";

const font = Golos_Text({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const HeaderMenu = () => {
  return (
    <div className="absolute left-0 top-0 flex w-full flex-row items-center justify-between bg-zinc-700/20 p-2.5">
      <h1 className="text-2xl font-bold text-white">MESA Kiosk</h1>
      <div className="flex flex-row items-center justify-center gap-2">
        <Button variant="outline" size="icon">
          <ArrowLeft />
        </Button>
        <Button
          variant="outline"
          onClick={() => window.location.reload()}
          size="icon"
        >
          <RefreshCcw />
        </Button>
      </div>
    </div>
  );
};

export default HeaderMenu;
