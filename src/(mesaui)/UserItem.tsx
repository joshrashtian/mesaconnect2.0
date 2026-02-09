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
  UserItemProps & {
    children?: React.ReactNode;
    size?: "standard" | "compact" | "sidebar";
  }
> = ({ user, children, size = "standard" }) => {
  const isSidebar = size === "sidebar";
  const isCompact = size === "compact";

  return (
    <userContext.Provider value={user}>
      <Link
        href={`/connect/profile/${user.id}`}
        className={`relative flex ${
          isSidebar
            ? "w-full flex-row items-center gap-3 rounded-xl border border-zinc-200/80 bg-white p-2.5 transition hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:hover:bg-zinc-700/80"
            : isCompact
              ? "min-h-56 min-w-96 flex-col items-start justify-start rounded-xl border-2 border-gray-200 bg-white p-3 duration-500 hover:scale-[1.02] hover:border-orange-500 dark:border-gray-800 dark:bg-zinc-800"
              : "w-full flex-col rounded-xl border-2 border-gray-200 bg-white p-3 duration-500 hover:scale-[1.02] hover:border-orange-500 dark:border-gray-800 dark:bg-zinc-800"
        }`}
      >
        <ul className="flex w-full flex-row items-center gap-2">
          {user?.avatar_url ? (
            <li
              className={`relative shrink-0 rounded-full bg-gray-300 ${
                isSidebar ? "h-9 w-9" : "h-10 w-10"
              }`}
            >
              <Image
                src={user?.avatar_url}
                alt={user.username}
                fill
                className="rounded-full object-cover"
              />
            </li>
          ) : (
            <div
              className={`flex shrink-0 items-center justify-center rounded-full bg-gray-200 dark:bg-zinc-600 ${
                isSidebar ? "h-9 w-9" : "h-10 w-10"
              }`}
            >
              <IoPerson className="text-xl text-red-500 dark:text-orange-400" />
            </div>
          )}

          <span className="min-w-0 flex-1">
            <h3
              className={`truncate font-semibold dark:text-slate-200 ${
                isSidebar ? "text-sm" : "text-lg"
              }`}
            >
              {user.real_name}
            </h3>
            {!isCompact && (
              <h4
                className={`text-gray-500 dark:text-white ${
                  isSidebar ? "truncate text-xs" : "text-sm font-light"
                }`}
              >
                @{user.username}
              </h4>
            )}
            {children && isSidebar && (
              <div className="truncate text-xs text-zinc-500 dark:text-zinc-400">
                {children}
              </div>
            )}
          </span>
        </ul>
        {children && !isSidebar && <div className="mt-1">{children}</div>}
      </Link>
    </userContext.Provider>
  );
};

export default UserItem;
