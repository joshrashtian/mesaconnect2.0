"use server";
import React from "react";
import FeaturedPolls from "../../_components/FeaturedPolls";
import ClassPollList from "../../_components/ClassSpecific";
import { serverside } from "../../../../../../../config/serverside";
import { redirect } from "next/navigation";
import LoadingPage from "@/_components/LoadingPage";

const PollsHome = async () => {
  const { data, error } = await serverside
    .from("userclasses")
    .select("classid")
    .match({
      userid: (await serverside.auth.getUser()).data.user?.id,
      grade: "IP",
    });

  if (error) redirect("/error");

  if (!data) return <LoadingPage />;

  return (
    <main className="absolute left-0 top-0 flex min-h-screen w-screen flex-col gap-12 pt-32">
      <header className="fixed left-0 top-0 flex h-28 w-full items-center bg-gradient-to-b from-zinc-200 to-transparent px-10">
        <h1 className="font-eudoxus text-5xl font-bold text-slate-500">
          <span className="text-orange-500">MESA</span>Polls
        </h1>
      </header>

      <section className="flex flex-col gap-10 p-10">
        <FeaturedPolls />
        {data.map((e) => (
          <ClassPollList key={e.classid} classid={e.classid} />
        ))}
      </section>
    </main>
  );
};

export default PollsHome;
