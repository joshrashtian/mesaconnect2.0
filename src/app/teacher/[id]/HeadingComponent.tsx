"use client";
import React from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { CircularProgressBar } from "@/(mesaui)/CircularProgressBar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@/app/AuthContext";

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
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          Search <span className="text-xs">⌘</span>K
        </kbd>
        <Avatar>
          <AvatarImage src={userData?.avatar_url} />
          <AvatarFallback>{userData?.real_name?.charAt(0)}</AvatarFallback>
        </Avatar>
      </div>
    </motion.div>
  );
};

export default HeadingComponent;
