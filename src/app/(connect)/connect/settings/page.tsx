"use client";
import React from "react";
import { IoPersonRemoveOutline, IoSettingsOutline } from "react-icons/io5";
import { useUser } from "@/app/AuthContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
import InviteKeys from "./InviteKeys";
import Settings from "@/app/(connect)/connect/settings/settings";
import TitleComponent from "@/(mesaui)/title";
import { config } from "../../../../../config/mesa-config";

const SettingsPage = () => {
  const user = useUser();
  const router = useRouter();
  return (
    <main className="flex flex-col gap-10 pb-32 font-eudoxus">
      <header className="">
        <IoSettingsOutline
          size={70}
          className="duration-300 hover:animate-spin hover:text-orange-500 dark:text-white"
        />
        <TitleComponent size="medium">User Settings</TitleComponent>
      </header>
      <section className="flex flex-col gap-3 font-eudoxus">
        <h1 className="font-eudoxus text-2xl dark:text-slate-200">
          Your Settings Document
        </h1>
        <Settings />
      </section>

      <section className="flex flex-col gap-3 font-eudoxus">
        <h1 className="font-eudoxus text-2xl dark:text-white">
          Account Information
        </h1>
        <ul className="flex flex-row items-center rounded-3xl bg-zinc-200/30 p-3 duration-200 hover:bg-zinc-200/70 dark:bg-zinc-700 dark:text-zinc-200">
          <div className="flex flex-col items-center rounded-xl p-2 py-5">
            <li className="relative h-24 w-24 rounded-full">
              {user.userData?.avatar_url && (
                <Image
                  src={user.userData?.avatar_url}
                  alt="profile picture"
                  fill
                  className="rounded-full object-cover"
                />
              )}
            </li>
          </div>
          <div className="mx-4">
            <h1 className="font-bold">{user.userData?.real_name}</h1>
            <p className="font-light">{user.userData?.username}</p>
            <p className="font-light">
              {user.userData?.college} | {user.userData?.major}{" "}
            </p>
          </div>
        </ul>
        <ul className="flex flex-row items-center rounded-3xl bg-zinc-200/30 p-3 duration-200 hover:bg-zinc-200/70 dark:bg-zinc-700 dark:text-zinc-200">
          <p className="font-light">Current Version: {config.versionNumber}</p>
        </ul>
        <button
          onClick={() => {
            user.signOut();
            router.push("/");
          }}
          className="flex w-48 flex-row items-center justify-center gap-1.5 rounded-full bg-gradient-to-tr from-orange-600 to-red-600 p-3 font-eudoxus text-white duration-300 hover:scale-105"
        >
          <IoPersonRemoveOutline size={20} />
          <h1>Sign Out</h1>
        </button>
      </section>
    </main>
  );
};

export default SettingsPage;
