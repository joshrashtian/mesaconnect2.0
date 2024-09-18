import { RecentPostsHome } from "@/_components/socialhub/RecentPostsHome.1";
import Link from "next/link";
import React from "react";
import UpcomingEvents from "../UpcomingEvents";
import {
  IoSearchCircle,
  IoSearchCircleOutline,
  IoSearchSharp,
} from "react-icons/io5";
import { Metadata } from "next";
import { gradientTextDefault } from "@/colors";
import MeetUsers from "@/_components/socialhub/Users";

export const metadata: Metadata = {
  title: "Recent Activity",
};

const Social = () => {
  return (
    <main className="flex min-h-full flex-col items-center gap-7 pb-28 font-eudoxus xl:items-start">
      <header className="flex w-full flex-row justify-between">
        <h1
          className={`p-1 font-eudoxus text-5xl font-black ${gradientTextDefault} drop-shadow-xl`}
        >
          MESA Community
        </h1>
        <Link
          className="absolute right-16 top-28 flex flex-row items-center justify-between gap-6 rounded-full bg-gradient-to-tr from-indigo-600 to-orange-600 p-2 px-4 text-white duration-300 hover:scale-105"
          href="/connect/social/search"
        >
          <IoSearchSharp size={30} />
          <h1 className="font-mono">Search</h1>
        </Link>
      </header>
      <section className="flex h-full w-full flex-col justify-normal gap-10 lg:justify-between xl:flex-row">
        <RecentPostsHome />
        <UpcomingEvents />
      </section>
      <MeetUsers />
    </main>
  );
};

export default Social;
