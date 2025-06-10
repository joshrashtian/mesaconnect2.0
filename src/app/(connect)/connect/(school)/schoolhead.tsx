"use client";
import { useUser } from "@/app/AuthContext";
import Link from "next/link";
import React from "react";
import { IoPerson, IoPersonAdd, IoSchool } from "react-icons/io5";

const SchoolHeader = () => {
  const { userData } = useUser();
  return (
    <div className="fixed left-4 top-4 z-50 flex flex-row items-center gap-4 rounded-2xl border-2 border-white/30 bg-white/20 p-6 shadow-lg backdrop-blur-lg">
      <h1 className="text-2xl font-bold">{userData?.college}</h1>
      <Link href={`/connect/classes`}>
        <IoSchool />
      </Link>
      <Link href={`/connect/teachers`}>
        <IoPersonAdd />
      </Link>
    </div>
  );
};

export default SchoolHeader;
