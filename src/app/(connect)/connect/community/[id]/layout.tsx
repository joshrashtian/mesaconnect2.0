"use server";
import Image from "next/image";
import React, { Suspense } from "react";
import { getCommunity } from "./functions";
import { IoPeople } from "react-icons/io5";
import { Editor } from "@monaco-editor/react";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import CommunityHeader from "./(components)/CommunityHeader";
import LoadingObject from "@/(mesaui)/LoadingObject";
const CommunityPage = async ({
  params,
  children,
}: {
  params: { id: string };
  children: React.ReactNode;
}) => {
  const supabase = createServerComponentClient({ cookies });
  const { data, error } = await supabase
    .from("communities")
    .select("id, created_at, name, description, styles, private, members")
    .match({ id: params.id })
    .single();

  if (!data || error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <main
      style={data.styles?.container}
      className="flex h-screen flex-col rounded-3xl bg-zinc-200 font-eudoxus dark:bg-zinc-700"
    >
      <ul
        style={data.styles?.header}
        className="relative flex h-64 w-full flex-row items-center justify-center rounded-t-3xl"
      >
        <Image
          src={`https://gnmpzioggytlqzekuyuo.supabase.co/storage/v1/object/public/communities/${params.id}/cover.png`}
          alt="Community Icon"
          fill
          className="rounded-t-3xl object-contain"
        />
        <p className="absolute bottom-2 left-2 z-10 text-3xl font-bold">
          {data?.name}
        </p>
      </ul>

      <header className="m-3 flex flex-row items-center gap-2 rounded-xl bg-zinc-300 p-2 dark:bg-zinc-800/50 dark:text-gray-300">
        <IoPeople
          className="text-4xl drop-shadow-lg"
          style={data.styles?.icon}
        />
        <ul>
          <p className="flex flex-row items-center gap-2 text-xl font-light">
            {params.id}
          </p>
        </ul>
        <ul className="mx-3 h-1 w-1 rounded-full bg-zinc-600 dark:bg-zinc-400" />
        <ul>
          <p className="flex flex-row items-center gap-2 text-xl font-light">
            {data.members} members
          </p>
        </ul>
        <ul className="mx-3 h-1 w-1 rounded-full bg-zinc-600 dark:bg-zinc-400" />
        <ul>
          <p className="flex flex-row items-center gap-2 text-xl font-light dark:text-slate-200">
            {data.private ? "Private" : "Public"} Community
          </p>
        </ul>
      </header>
      <CommunityHeader />
      <ul className="mx-3 rounded-xl bg-zinc-100 p-3 dark:bg-zinc-800/50">
        <p className="flex flex-row items-center gap-2 text-xl font-bold dark:text-slate-100">
          About This Community
        </p>
        <p className="flex flex-row items-center gap-2 text-xl font-light dark:text-slate-300">
          {data.description}
        </p>
      </ul>
      <Suspense
        fallback={<LoadingObject size={40} className="text-orange-500" />}
      >
        {children}
      </Suspense>
    </main>
  );
};

export default CommunityPage;
