"use client";
import React, { createContext } from "react";
import { UserData } from "@/_assets/types";
import Link from "next/link";
import Image from "next/image";
import { IoPerson } from "react-icons/io5";

interface UserItemProps {
  user: UserData | any;
}

const userContext = createContext<UserData | null>(null);

const UserItem: React.FC<UserItemProps & { children: React.ReactNode }> = ({
  user,
  children,
}) => {
  return (
    <userContext.Provider value={user}>
      <Link
        href={`/connect/profile/${user.id}`}
        className="flex w-full flex-col rounded-xl border-2 border-gray-200 bg-white p-3 duration-500 hover:scale-[1.02] hover:border-orange-500"
      >
        <ul className="flex flex-row items-center gap-2">
          {user?.avatar_url ? (
            <li className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gray-300">
              <Image
                src={user?.avatar_url}
                alt={user.username}
                fill
                className="rounded-full object-cover"
              />
            </li>
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200">
              <IoPerson className="self-center text-2xl text-red-500" />
            </div>
          )}

          <h3 className="text-lg font-semibold">{user.real_name}</h3>
          <h4 className="text-sm font-light text-gray-500">@{user.username}</h4>
        </ul>
        {children}
      </Link>
    </userContext.Provider>
  );
};

export default UserItem;
