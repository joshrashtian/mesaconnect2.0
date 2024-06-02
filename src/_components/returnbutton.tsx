"use client";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { IoIosUndo } from "react-icons/io";

const ReturnButton = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <>
      <p className="font-extralight">{pathname} does not exist.</p>
      <button
        className=" flex flex-row mt-1 rounded-xl duration-300 hover:scale-105 hover:bg-slate-400 p-2 gap-3 bg-slate-300 items-center"
        onClick={() => router.back()}
      >
        <IoIosUndo />
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        <p>Let's Go Back A Step</p>
      </button>
    </>
  );
};

export default ReturnButton;
