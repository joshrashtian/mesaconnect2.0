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

const UserItem: React.FC<
  UserItemProps & { children: React.ReactNode; size?: "standard" | "compact" }
> = ({ user, children, size = "standard" }) => {
  return (
    <userContext.Provider value={user}>
      <Link
        href={`/connect/profile/${user.id}`}
        className={`relative flex ${size === "standard" ? "w-full border-2 border-gray-200" : "min-h-56 min-w-96 items-start justify-start"} flex-col rounded-xl bg-white p-3 duration-500 hover:scale-[1.02] hover:border-orange-500 dark:border-gray-800 dark:bg-zinc-800`}
      >
        <ul className={`flex flex-row items-center gap-2`}>
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
              <IoPerson className="self-center text-2xl text-red-500 dark:text-orange-400" />
            </div>
          )}

          <h3 className="text-lg font-semibold dark:text-slate-200">
            {user.real_name}
          </h3>
          {size !== "compact" && (
            <h4 className="text-sm font-light text-gray-500 dark:text-white">
              @{user.username}
            </h4>
          )}
        </ul>
        {children}
      </Link>
    </userContext.Provider>
  );
};

export default UserItem;
