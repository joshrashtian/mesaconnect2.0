"use client";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";
import { IoHammer } from "react-icons/io5";
import { useUser } from "../AuthContext";

const Header = () => {
  const { userData } = useUser();
  return (
    <div className="absolute left-0 top-0 flex h-24 w-full flex-row items-center justify-between bg-white px-10 font-eudoxus shadow-lg">
      <h1 className="flex flex-row items-center gap-2 text-2xl font-black">
        {" "}
        <IoHammer />
        MESAConnectToolbox
      </h1>
      {userData ? (
        <div className="flex flex-row items-center gap-2">
          <Avatar className="h-10 w-10">
            <AvatarImage src={userData?.avatar_url} />
            <AvatarFallback className="text-lg font-bold">
              {userData?.real_name?.charAt(0)}
            </AvatarFallback>
          </Avatar>
        </div>
      ) : (
        <div className="flex flex-row items-center gap-2">
          <Button variant="outline">Login</Button>
        </div>
      )}
    </div>
  );
};

export default Header;
