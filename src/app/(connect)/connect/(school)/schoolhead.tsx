"use client";
import { useUser } from "@/app/AuthContext";
import Link from "next/link";
import React from "react";

const SchoolHeader = () => {
  const { userData } = useUser();
  return (
    <div className="fixed left-4 top-4 z-50 rounded-2xl border-2 border-white/30 bg-white/20 p-6 shadow-lg backdrop-blur-lg">
      <h1 className="text-2xl font-bold">{userData?.college}</h1>
      <div className="mt-3 flex flex-row items-center justify-center gap-4">
        <Link
          className="rounded-md bg-white/20 px-4 py-2"
          href={`/connect/classes?college=${userData?.college}`}
        >
          Classes
        </Link>
        <Link
          className="rounded-md bg-white/20 px-4 py-2"
          href={`/connect/teachers?college=${userData?.college}`}
        >
          Teachers
        </Link>
      </div>
    </div>
  );
};

export default SchoolHeader;
