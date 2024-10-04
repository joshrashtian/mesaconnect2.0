import CurrentEventSegment from "../socialhub/CurrentEventSegment";
import { RecentPostsHome } from "../socialhub/RecentPostsHome.1";

export const widgets = [
  {
    name: "Your Events",
    size: "tall",
    style: "bg-zinc-200",
    widget: () => <CurrentEventSegment />,
    showcase: () => (
      <section
        className={`flex h-32 w-32 flex-col items-center justify-center gap-2 rounded-xl bg-zinc-200 p-5 dark:bg-zinc-600`}
      >
        <h1 className="text-md text-left font-light dark:text-white">
          Your Events
        </h1>
        <ul className="h-full w-full rounded-xl bg-white dark:bg-zinc-800/40" />
        <ul className="h-full w-full rounded-xl bg-white dark:bg-zinc-800/40" />
        <ul className="h-full w-full rounded-xl bg-white dark:bg-zinc-800/40" />
      </section>
    ),
  },
  {
    name: "Recent Posts",
    size: "tall",
    style: "bg-zinc-200",
    widget: () => (
      <ul className="pb-24">
        <RecentPostsHome />
      </ul>
    ),
    showcase: () => (
      <section
        className={`flex h-32 w-32 flex-col items-center justify-center gap-2 rounded-xl bg-white p-5 dark:bg-zinc-600`}
      >
        <h1 className="text-md text-left font-light dark:text-white">
          Recent Posts
        </h1>
        <ul className="h-full w-full rounded-xl bg-gradient-to-tr from-purple-600 to-red-500 dark:bg-zinc-800/40" />
        <ul className="h-full w-full rounded-xl bg-zinc-500 dark:bg-zinc-800/40" />
        <ul className="h-full w-full rounded-xl bg-zinc-500 dark:bg-zinc-800/40" />
      </section>
    ),
  },
];
