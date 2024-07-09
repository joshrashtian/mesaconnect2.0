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

export const metadata: Metadata = {
  title: "Recent Activity",
};

const Social = () => {
  return (
    <main className="min-h-full flex flex-col font-eudoxus items-center xl:items-start gap-7 pb-28 ">
      <header className="w-full flex flex-row justify-between">
        <h1
          className={`font-black p-1 font-eudoxus text-5xl ${gradientTextDefault} drop-shadow-xl`}
        >
          MESA Community
        </h1>
        <Link
          className="hover:scale-105 duration-300 gap-6 px-4 absolute flex flex-row items-center justify-between right-16 top-28 bg-gradient-to-tr rounded-full text-white from-indigo-600 to-orange-600 p-2 "
          href="/connect/social/search"
        >
          <IoSearchSharp size={30} />
          <h1 className="font-mono">Search</h1>
        </Link>
      </header>
      <section className="w-full h-full flex flex-col gap-10 xl:flex-row justify-normal lg:justify-between">
        <RecentPostsHome />
        <UpcomingEvents />
      </section>
    </main>
  );
};

export default Social;
