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

  const pathnameIds = pathname.split("/").filter((item) => item !== "");
  return (
    <div className="absolute left-0 top-0 flex w-full flex-row items-center justify-between bg-zinc-700/20 p-2.5">
      <h1 className="font-geist text-lg text-white">
        {pathnameIds.map((e) => `/${e}`)}
      </h1>
      <div className="flex flex-row items-center justify-center gap-2">
        <Button
          variant="outline"
          className="h-12 w-12"
          size="icon"
          onClick={() => {
            const audio = new Audio("/click2.mp3");
            audio.volume = 1;
            audio.play();

            router.back();
          }}
        >
          <ArrowLeft />
        </Button>
        <Button
          variant="outline"
          className="h-12 w-12"
          size="icon"
          onClick={() => {
            const audio = new Audio("/ui_button.mp3");
            audio.volume = 1;
            audio.play();

            signOut();
            router.push("/kioskhandler");
          }}
        >
          <IoPersonRemove />
        </Button>
        <Button
          variant="outline"
          className="h-12 w-12"
          onClick={() => {
            const audio = new Audio("/ui_button.mp3");
            audio.volume = 1;
            audio.play();

            window.location.reload();
          }}
          size="icon"
        >
          <RefreshCcw />
        </Button>
      </div>
    </div>
  );
};

export default HeaderMenu;
