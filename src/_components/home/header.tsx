"use client";
import { userContext } from "@/app/AuthContext";
import Link from "next/link";
import React, { useContext } from "react";

const Header = () => {
  const user = useContext(userContext);

  return (
    <div className="w-full h-8 px-[5%] absolute justify-between flex-row flex ">
      <h2 className="text-orange-700 text-xl font-semibold ">
        MESA<span className="text-slate-500">connect</span>
      </h2>
      <Link
        href="/sign-in"
        className="flex flex-row gap-2 p-4 py-8 rounded-full hover:shadow-sm items-center hover:scale-105 duration-300 cursor-pointer"
      >
        <h1 className="text-xl text-zinc-600 font-semibold">
          {user.user ? user.user.user_metadata.username : "Sign In"}
        </h1>
        <div className="bg-slate-300 w-8 rounded-full">
          <img
            src={user.userData?.avatar_url}
            className="w-8 h-8 rounded-full"
          />
        </div>
      </Link>
    </div>
  );
};

export default Header;
