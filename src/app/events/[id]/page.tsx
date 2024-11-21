"use server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import React from "react";
import { cookies } from "next/headers";
import Image from "next/image";
import { IoAtCircle } from "react-icons/io5";

async function DecidatedEventPage({ params }: { params: { id: string } }) {
  let supabase = createServerComponentClient({ cookies });
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error) {
    return <p>{error.message}</p>;
  }
  return (
    <main className="h-screen">
      <header className="relative z-20 h-96 w-full shadow-inner">
        {data?.image?.url && (
          <Image
            src={data?.image.url}
            alt="cover"
            fill
            className="object-cover"
          />
        )}
        <ol className="absolute bottom-12 right-4 flex h-12 w-[500px] origin-bottom-right flex-row items-center justify-center rounded-3xl bg-white font-eudoxus shadow-2xl shadow-black/90 drop-shadow-2xl">
          <ul
            className={`mx-2 h-4 w-4 rounded-full ${
              new Date(data.end).getTime() < new Date(Date.now()).getTime() ||
              (!data.end &&
                new Date(data.start).getTime() < new Date(Date.now()).getTime())
                ? "bg-red-500"
                : new Date(data.end).getTime() >
                      new Date(Date.now()).getTime() &&
                    new Date(data.start).getTime() <
                      new Date(Date.now()).getTime()
                  ? "animate-pulse bg-green-500"
                  : "bg-yellow-500"
            } `}
          />
          <p>
            {new Date(data.end) < new Date(Date.now())
              ? `Ended on ${new Date(data.end ?? data.start).toLocaleDateString()}`
              : new Date(data.end) > new Date(Date.now())
                ? "Ongoing Event"
                : "Upcoming Event"}
          </p>
        </ol>
      </header>
      <article className="relative z-30 h-full max-h-screen -translate-y-10 rounded-t-3xl bg-white p-7">
        <h2 className="text-5xl font-black">{data.name}</h2>
        <h4 className="mt-2 text-2xl font-light text-slate-500">{data.desc}</h4>
      </article>
    </main>
  );
}

export default DecidatedEventPage;
