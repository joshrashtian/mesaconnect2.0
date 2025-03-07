"use client";
import { Button } from "@/components/ui/button";
import { ArrowLeft, RefreshCcw } from "lucide-react";
import { Golos_Text } from "next/font/google";
import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { IoPersonRemove } from "react-icons/io5";
import { useUser } from "../AuthContext";
const font = Golos_Text({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const HeaderMenu = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { signOut } = useUser();
  return (
    <div className="absolute left-0 top-0 flex w-full flex-row items-center justify-between bg-zinc-700/20 p-2.5">
      <h1 className="font-geist text-lg text-white">{pathname}</h1>
      <div className="flex flex-row items-center justify-center gap-2">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft />
        </Button>
        <Button variant="outline" size="icon" onClick={() => signOut()}>
          <IoPersonRemove />
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
