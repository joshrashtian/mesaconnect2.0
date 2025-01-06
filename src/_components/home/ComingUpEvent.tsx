"use server";
import React from "react";
import { serverside } from "../../../config/serverside";
import Link from "next/link";

export const ComingUpEvent = async () => {
  const { data: EventInterests, error: InterestErr } = await serverside
    .from("eventinterest")
    .select("event_id, id")
    .eq("user_id", (await serverside.auth.getSession()).data.session?.user.id);

  if (InterestErr) {
    console.log(InterestErr);
    return;
  }

  const interests = EventInterests.map((e) => `${e.event_id}`);

  const { data: FetchedData, error } = await serverside
    .from("events")
    .select("id, start, name, desc, location, image")
    .in("id", interests)
    .gte("start", new Date(Date.now()).toISOString())
    .order("start")
    .limit(1)
    .single();
  if (error) return;
  return (
    <Link
      href={`/events/${FetchedData.id}`}
      className="group relative h-48 w-64 rounded-2xl bg-gradient-to-tr from-blue-400 to-orange-400 shadow-lg"
    >
      <div className="absolute bottom-0 w-full origin-bottom rounded-b-2xl bg-white p-3 duration-300 group-hover:py-5 dark:bg-zinc-800">
        <p className="text-sm font-black text-slate-600 dark:text-white">
          EVENT
        </p>
        <p className="dark:text-white">{FetchedData.name}</p>
      </div>
    </Link>
  );
};
