"use client";
import { useUser } from "@/app/AuthContext";
import Link from "next/link";
import React from "react";

const SchoolHeader = () => {
  const { userData } = useUser();
  return (
    <div className="fixed left-4 top-4 z-50 rounded-2xl border-2 border-white/30 bg-white/20 p-6 shadow-lg backdrop-blur-lg">
      <h1 className="text-2xl font-bold">{userData?.college}</h1>
    </div>
  );
};

export default SchoolHeader;
