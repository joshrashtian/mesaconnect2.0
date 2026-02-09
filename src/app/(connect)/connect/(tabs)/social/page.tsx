import { RecentPostsHome } from "@/_components/socialhub/RecentPostsHome.1";
import Link from "next/link";
import React from "react";
import {
  IoCalendar,
  IoNewspaper,
  IoPeople,
  IoSearchSharp,
} from "react-icons/io5";
import { Metadata } from "next";
import { gradientTextDefault } from "@/colors";
import { SocialHubHeader } from "./SocialHubHeader";
import { SuggestedUsersWidget } from "./SuggestedUsersWidget";
import { UpcomingEventsWidget } from "./UpcomingEventsWidget";

export const metadata: Metadata = {
  title: "Recent Activity",
};

const Social = () => {
  return (
    <main className="relative flex min-h-full flex-col gap-6 pb-28 font-eudoxus">
      <SocialHubHeader>
        <h1
          className={`social-title p-1 font-eudoxus text-4xl font-black transition-all duration-200 sm:text-5xl ${gradientTextDefault} drop-shadow-xl`}
        >
          Connect.
        </h1>
        <nav className="social-nav flex flex-wrap items-center gap-2">
          <Link
            className="flex items-center gap-2 rounded-full bg-zinc-200/80 px-4 py-2.5 text-sm font-medium text-zinc-800 transition hover:bg-zinc-300 dark:bg-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-600"
            href="/connect/community"
          >
            <IoPeople className="text-lg" />
            Communities
          </Link>
          <Link
            className="flex items-center gap-2 rounded-full bg-zinc-200/80 px-4 py-2.5 text-sm font-medium text-zinc-800 transition hover:bg-zinc-300 dark:bg-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-600"
            href="/connect/social/community"
          >
            <IoNewspaper className="text-lg" />
            Posts
          </Link>
          <Link
            className="flex items-center gap-2 rounded-full bg-zinc-200/80 px-4 py-2.5 text-sm font-medium text-zinc-800 transition hover:bg-zinc-300 dark:bg-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-600"
            href="/connect/social/events"
          >
            <IoCalendar className="text-lg" />
            Events
          </Link>
          <Link
            className="flex items-center gap-2 rounded-full bg-zinc-200/80 px-4 py-2.5 text-sm font-medium text-zinc-800 transition hover:bg-zinc-300 dark:bg-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-600"
            href="/connect/social/users"
          >
            <IoPeople className="text-lg" />
            Students
          </Link>
          <Link
            className="flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-600 to-orange-600 p-2.5 text-white transition hover:opacity-90"
            href="/connect/social/search"
            aria-label="Search"
          >
            <IoSearchSharp size={22} />
          </Link>
        </nav>
      </SocialHubHeader>

      <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-[1fr_280px] lg:gap-8">
        <section className="min-w-0 flex-1">
          <RecentPostsHome compact />
        </section>
        <aside className="flex flex-col gap-5 lg:sticky lg:top-24 lg:self-start">
          <SuggestedUsersWidget />
          <UpcomingEventsWidget />
        </aside>
      </div>
    </main>
  );
};

export default Social;
