"use server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import React from "react";
import { cookies } from "next/headers";
import Image from "next/image";
import {
  IoAtCircle,
  IoCheckmarkCircle,
  IoCloseCircle,
  IoLocate,
  IoLocation,
  IoPencil,
  IoPin,
  IoTabletPortrait,
  IoVideocam,
} from "react-icons/io5";
import RegisterFor from "./RegisterFor";
import { MultiStepProvider } from "@/app/(connect)/connect/MutliStepContext";
import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Panels from "./Panels";
import TabsForEvent from "./Tabs";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { IoIosClock, IoMdClock } from "react-icons/io";

async function DecidatedEventPage({ params }: { params: { id: string } }) {
  let supabase = createServerComponentClient({ cookies });
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("id", params.id)
    .single();

  const { data: occurences, error: occurencesError } = await supabase
    .from("event_occurrences")
    .select("*")
    .eq("event_id", params.id)
    .order("occurrence_time", { ascending: true });

  const user = await supabase.auth.getUser();

  const { data: user_data } = await supabase
    .from("profiles")
    .select()
    .eq("id", user.data.user?.id)
    .single();

  const { data: CurrentInterest, error: UserError } = await supabase
    .from("eventinterest")
    .select()
    .eq("user_id", user.data.user?.id)
    .eq("event_id", params.id)
    .single();

  if (error) {
    return <p>{error.message}</p>;
  }

  const start = new Date(data.start);

  let duration = data.duration.split(":").reverse();
  let end = data.duration ? new Date(data.start) : null;

  if (end) {
    end.setHours(start.getHours() + parseInt(duration[2]));
    end.setMinutes(start.getMinutes() + parseInt(duration[1]));
    end.setSeconds(start.getSeconds() + parseInt(duration[0]));
  }

  duration = duration.map((item: string) => parseInt(item));

  let nextOccurence = occurences?.[0]?.occurrence_time
    ? new Date(occurences?.[0]?.occurrence_time)
    : null;

  let state =
    start > new Date(Date.now())
      ? "upcoming"
      : nextOccurence && nextOccurence < new Date(Date.now())
        ? "ongoing"
        : "ended";

  return (
    <MultiStepProvider>
      <main className="h-screen">
        <header
          className={`relative -z-0 ${data?.image?.url ? "h-60 xl:h-96" : "backdrop: h-48 bg-gradient-to-br from-purple-400 to-teal-500 backdrop-blur-xl"} w-full shadow-inner`}
        >
          {data?.image?.url && (
            <Image
              src={data?.image.url}
              alt="cover"
              fill
              className="object-cover"
            />
          )}
          {user.data.user?.id === data?.creator && (
            <Button className="absolute bottom-12 left-4">
              <Link
                href={`/events/console/${params.id}`}
                className="group flex flex-row items-center gap-3"
              >
                <IoPencil className="origin-bottom duration-300 group-hover:scale-110" />
                Edit Event
              </Link>
            </Button>
          )}
          <ol className="absolute bottom-12 right-4 flex h-12 w-fit origin-bottom-right flex-row items-center justify-center rounded-3xl bg-white px-2 font-eudoxus text-sm shadow-2xl shadow-black/90 drop-shadow-2xl lg:w-[500px] lg:text-base">
            <ul
              className={`mx-2 h-4 w-4 rounded-full ${
                state === "upcoming"
                  ? "bg-yellow-500"
                  : state === "ongoing"
                    ? "animate-pulse bg-green-700"
                    : "bg-red-500"
              } `}
            />
            <p>
              {state === "ended"
                ? `Ended on ${new Date(data.end ?? data.start).toLocaleDateString()}`
                : state === "ongoing"
                  ? "Ongoing Event"
                  : "Upcoming Event"}
            </p>
          </ol>
        </header>
        <article className="relative z-0 h-full max-h-screen -translate-y-10 rounded-t-3xl bg-white p-7">
          <h2 className="text-3xl font-black xl:text-5xl">{data.name}</h2>
          <h4 className="mt-2 text-xl font-light text-slate-500 xl:text-2xl">
            {data.desc}
          </h4>

          <Separator className="my-4" />
          {["admin", "tutor"].includes(user_data?.role) && (
            <>
              <Button className="my-3">
                <Link
                  className="flex flex-row items-center gap-3"
                  href={`/events/${params.id}/kiosk`}
                >
                  <IoTabletPortrait />
                  <p>Kiosk Mode</p>
                </Link>
              </Button>
            </>
          )}
          <div className="flex w-full flex-row gap-2">
            {data.creator !== user.data.user?.id ? (
              <RegisterFor event={data} active={CurrentInterest} />
            ) : (
              <p>You are the owner of this event.</p>
            )}
          </div>
          <Separator className="my-4" />
          <div className="flex flex-row gap-2">
            <div className="flex flex-col rounded-2xl bg-zinc-100 p-3">
              <h4 className="flex flex-row items-center gap-1 text-xl font-bold">
                <IoIosClock className="text-xl" /> Time
              </h4>
              <p>
                {duration[2] !== 0 &&
                  `${duration[2]} hour${duration[2] > 1 ? "s" : ""} `}
                {duration[1] !== 0 &&
                  `${duration[1]} minute${duration[1] > 1 ? "s" : ""} `}
                {duration[0] !== 0 &&
                  `${duration[0]} second${duration[0] > 1 ? "s" : ""}`}
              </p>
              <p className="text-sm font-light text-slate-500">
                {start.toLocaleString().split(",")[1]} -{" "}
                {end?.toLocaleString().split(",")[1]}
              </p>
              {data.repeat_type && (
                <p className="text-sm font-light capitalize text-slate-500">
                  {data.repeat_type}
                </p>
              )}
            </div>

            {occurences?.map((occurence, index) => (
              <div
                className="flex flex-col rounded-2xl bg-zinc-100 p-3 pr-8 duration-300 hover:bg-zinc-200"
                key={occurence.id}
              >
                <p
                  className={` ${
                    new Date(occurence.occurrence_time) < new Date(Date.now())
                      ? "text-red-500"
                      : "text-slate-500"
                  } ${index === 0 ? "text-xl" : "text-base"}`}
                >
                  {index === 0 ? "Next Occurence" : `Occurence ${index + 1}`}
                </p>
                <p className="font-mono text-xl font-bold">
                  {new Date(occurence.occurrence_time).toLocaleDateString()}
                </p>
              </div>
            ))}
            <div className="flex flex-col rounded-2xl bg-zinc-100 p-3 pr-8 duration-300 hover:bg-zinc-200">
              <p className="text-xl text-slate-500">Event Expires</p>
              <p className="font-mono text-xl font-bold">
                {data.repeat_until
                  ? new Date(data.repeat_until).toLocaleDateString()
                  : "Does Not Repeat"}
              </p>
            </div>
          </div>

          <Separator className="my-4" />
          <TabsForEvent data={data} />
        </article>
      </main>
    </MultiStepProvider>
  );
}

export default DecidatedEventPage;
