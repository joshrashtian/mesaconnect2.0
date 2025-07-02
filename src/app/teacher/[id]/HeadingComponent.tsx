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
import AccountModal, {
  AccountModalTrigger,
  useAccountModal,
} from "./AccountModal";
import { IoPerson } from "react-icons/io5";

interface Teacher {
  id: string;
  name: string;
  teaches: string[];
}

const HeadingComponent = ({
  teacher,
  averageRating,
}: {
  teacher: Teacher;
  averageRating: number;
}) => {
  const { scrollY } = useScroll();
  const { userData } = useUser();
  const opacity = useTransform(scrollY, [100, 300], [0, 1]);
  const { setIsOpen } = useAccountModal();
  const y = useTransform(scrollY, [0, 300], [-200, 0]);

  return (
    <motion.div
      className="fixed top-0 z-50 flex h-24 w-full flex-row items-center justify-between gap-4 border-b border-gray-200 bg-white/40 bg-clip-padding px-10 backdrop-blur-md backdrop-filter"
      style={{ opacity, y }}
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-row items-center gap-4">
        <CircularProgressBar
          percentage={(averageRating / 5) * 100}
          size={60}
          showText={false}
          color="#FFA500"
          strokeWidth={10}
        />
        <h1 className="text-2xl font-black">{teacher.name}</h1>
      </div>
      <div className="flex flex-row items-center gap-4">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="cursor-pointer rounded-full p-2 hover:bg-gray-100"
        >
          <Avatar>
            <AvatarImage src={userData?.avatar_url} />
            <AvatarFallback>
              {userData?.real_name?.charAt(0) || (
                <IoPerson className="text-2xl" />
              )}
            </AvatarFallback>
          </Avatar>
        </button>
      </div>
    </motion.div>
  );
};

export default HeadingComponent;
