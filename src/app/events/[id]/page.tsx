"use server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import React from "react";
import { cookies } from "next/headers";
import Image from "next/image";
import {
  IoAtCircle,
  IoCheckmarkCircle,
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

async function DecidatedEventPage({ params }: { params: { id: string } }) {
  let supabase = createServerComponentClient({ cookies });
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("id", params.id)
    .single();
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
                new Date(data.start) > new Date(Date.now())
                  ? "bg-yellow-500"
                  : new Date(data.endtime) > new Date(Date.now())
                    ? "animate-pulse bg-green-700"
                    : "bg-red-500"
              } `}
            />
            <p>
              {new Date(data.endtime) < new Date(Date.now())
                ? `Ended on ${new Date(data.end ?? data.start).toLocaleDateString()}`
                : new Date(data.endtime) > new Date(Date.now())
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
          {data.creator !== user.data.user?.id ? (
            CurrentInterest ? (
              <RegisterFor event={data} />
            ) : (
              <div className="m-3 flex flex-row items-center gap-1.5 rounded-2xl bg-zinc-100 p-3 lg:px-6">
                <IoCheckmarkCircle className="text-xl text-green-500" />
                <p>Already Registered!</p>
              </div>
            )
          ) : (
            <p>You are the owner of this event.</p>
          )}
          <Separator className="my-4" />
          <TabsForEvent data={data} />
        </article>
      </main>
    </MultiStepProvider>
  );
}

export default DecidatedEventPage;
