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
    .eq("userid", (await serverside.auth.getUser()).data.user?.id);

  if (error) redirect("/error");

  if (!data) return <LoadingPage />;

  return (
    <main className="flex flex-col absolute min-h-screen w-screen pt-32 left-0 top-0 gap-12">
      <header className="h-28 flex fixed items-center px-10 w-full bg-gradient-to-b from-zinc-200 to-transparent top-0 left-0">
        <h1 className="inline-block bg-clip-text text-transparent bg-gradient-to-br from-orange-500 to-teal-600 font-bold font-eudoxus text-5xl ">
          MESApolls
        </h1>
      </header>

      <section className="gap-10 flex flex-col p-10">
        <FeaturedPolls />
        {data.map((e) => (
          <ClassPollList key={e.classid} classid={e.classid} />
        ))}
      </section>
    </main>
  );
};

export default PollsHome;
