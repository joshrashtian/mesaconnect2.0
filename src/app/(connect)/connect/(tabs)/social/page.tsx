import { RecentPostsHome } from "@/_components/socialhub/RecentPostsHome.1";
import Link from "next/link";
import React from "react";
import UpcomingEvents from "../UpcomingEvents";

const Social = () => {
  return (
    <main className="min-h-full flex flex-col items-center xl:items-start gap-7 ">
      <header className="w-full flex flex-row justify-between">
        <h1 className="text-transparent bg-clip-text font-bold text-5xl bg-gradient-to-tr from-slate-600 to-orange-900 ">
          Social
        </h1>
        <Link href='/connect/social/search'>
          <h1>Search</h1>
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
