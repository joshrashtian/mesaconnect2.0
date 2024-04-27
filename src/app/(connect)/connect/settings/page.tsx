"use client";
import React from "react";
import {
  IoPersonRemoveOutline,
  IoSettings,
  IoSettingsOutline,
} from "react-icons/io5";
import { useUser } from "@/app/AuthContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
import InviteKeys from "./InviteKeys";

const SettingsPage = () => {
  const user = useUser();
  const router = useRouter();
  return (
    <main className=" font-eudoxus ">
      <header className="">
        <IoSettingsOutline size={70} />
        <h1 className="font-eudoxus z-10 text-3xl drop-shadow-2xl md:text-4xl lg:text-6xl font-bold text-center lg:text-left gap-3 text-indigo-900 duration-300">
          User Settings
        </h1>
      </header>
      <section className="flex flex-col font-eudoxus gap-3">
        <h1 className="font-eudoxus text-2xl">Account Information</h1>
        <ul className="p-6 bg-white flex flex-row items-center">
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
          <IoPersonRemoveOutline size={20} />
          <h1>Sign Out</h1>
        </button>
      </section>
      <InviteKeys />
    </main>
  );
};

export default SettingsPage;
