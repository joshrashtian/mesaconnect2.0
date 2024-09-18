"use client";
import React from "react";
import {
  IoPersonRemoveOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import { useUser } from "@/app/AuthContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
import InviteKeys from "./InviteKeys";
import Settings from "@/app/(connect)/connect/settings/settings";
import TitleComponent from "@/(mesaui)/title";

const SettingsPage = () => {
  const user = useUser();
  const router = useRouter();
  return (
      <main className=" font-eudoxus flex flex-col gap-10 ">
        <header className="">
          <IoSettingsOutline
              size={70}
              className=" hover:animate-spin dark:text-white hover:text-orange-500 duration-300"
          />
          <TitleComponent size="medium">
            User Settings
          </TitleComponent>
        </header>
        <section className="flex flex-col font-eudoxus gap-3">
          <h1 className="font-eudoxus dark:text-slate-200 text-2xl">Your Settings Document</h1>
          <Settings />
        </section>
        <InviteKeys/>
        <section className="flex flex-col font-eudoxus gap-3">
            <h1 className="font-eudoxus text-2xl dark:text-white">Account Information</h1>
            <ul className="p-6 bg-white dark:bg-zinc-700 dark:text-zinc-200 rounded-3xl flex flex-row items-center">
              <div className="flex flex-col items-center">
                <li className="relative w-16 h-16 rounded-full">
                  {user.userData?.avatar_url && (
                      <Image
                          src={user.userData?.avatar_url}
                          alt="profile picture"
                          fill
                          className="rounded-full"
                      />
                  )}
                </li>
                <h1 className="mt-3">Your Profile Picture</h1>
              </div>
              <div>
                <h1>{user.userData?.real_name}</h1>
              </div>
            </ul>
            <button
                onClick={() => {
                  user.signOut();
                  router.push("/");
                }}
                className="p-3 w-48 flex flex-row items-center justify-center gap-1.5 hover:scale-105 rounded-full bg-gradient-to-tr from-orange-600 to-red-600 text-white font-eudoxus duration-300"
            >
              <IoPersonRemoveOutline size={20}/>
              <h1>Sign Out</h1>
            </button>
          </section>
      </main>
);
};

export default SettingsPage;
