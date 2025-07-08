"use client";
import React from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { CircularProgressBar } from "@/(mesaui)/CircularProgressBar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@/app/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAccountModal } from "@/app/teacher/[id]/AccountModal";
import { IoPerson, IoSearch } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface Teacher {
  id: string;
  name: string;
  teaches: string[];
}

const FrontHeader = () => {
  const { userData } = useUser();
  const router = useRouter();
  const { setIsOpen } = useAccountModal();

  return (
    <motion.div className="fixed left-0 top-0 z-50 flex h-24 w-full flex-row items-center justify-between gap-4 border-b border-gray-200 bg-white/40 bg-clip-padding px-4 backdrop-blur-md backdrop-filter lg:px-16">
      <div className="flex flex-row items-center gap-4">
        <div>
          <h1 className="text-2xl font-black">MESAInsight</h1>
        </div>
      </div>
      <div className="flex flex-row items-center gap-2">
        <Button
          onClick={() => router.push("/teacher/search")}
          variant="outline"
          className="h-12 w-12 rounded-full"
        >
          <IoSearch className="text-2xl" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage src={userData?.avatar_url} />
              <AvatarFallback>
                {userData?.real_name?.charAt(0) || (
                  <IoPerson className="text-2xl" />
                )}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48">
            <DropdownMenuItem onClick={() => setIsOpen(true)}>
              <IoPerson className="mr-2 text-2xl" />
              {userData?.real_name ? "Account Details" : "Sign In"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </motion.div>
  );
};

export default FrontHeader;
