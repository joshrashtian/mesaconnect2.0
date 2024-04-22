"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { IoIosUndo } from "react-icons/io";

const ReturnButton = () => {
  const router = useRouter();
  return (
    <button
      className="font-mono flex flex-row rounded-xl duration-300 hover:scale-105 hover:bg-slate-400 p-2 gap-3 bg-slate-300 items-center"
      onClick={() => router.back()}
    >
      <IoIosUndo />
      <p>Let's Go Back A Step</p>
    </button>
  );
};

export default ReturnButton;
