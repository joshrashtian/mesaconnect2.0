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
import JoinButton from "./(components)/JoinButton";
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
    .select(
      "id, created_at, name, description, styles, private, members, interests",
    )
    .match({ id: params.id })
    .single();

  let { data: CoverImage, error: ImageError } = await supabase.storage
    .from("communities")
    .download(`${params.id}/cover.png`);

  const image = CoverImage ? URL.createObjectURL(CoverImage) : null;

  console.error(`${params.id}/cover.png`, CoverImage, ImageError);
  if (!data || error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <main
      style={data.styles?.container}
      className="flex h-screen flex-col rounded-3xl bg-zinc-200 pb-24 font-eudoxus dark:bg-zinc-700"
    >
      <ul
        style={data.styles?.header}
        className={`relative flex h-64 w-full flex-row items-center justify-center rounded-t-3xl ${ImageError && "bg-gradient-to-br from-orange-400 to-red-500"}`}
      >
        {image && (
          <Image
            src={image}
            fill
            className="rounded-t-3xl object-contain"
            alt="CommunityImage"
          />
        )}
        <p className="absolute bottom-2 left-2 z-10 text-3xl font-bold text-white mix-blend-difference">
          {data?.name}
        </p>

        <div className="left-right absolute bottom-2 right-2 z-10 text-3xl font-bold">
          <JoinButton id={data.id} />
        </div>
      </ul>

      <header className="m-3 flex flex-row items-center gap-2 rounded-xl bg-zinc-300 p-2 text-sm dark:bg-zinc-800/50 dark:text-gray-300">
        <IoPeople
          className="text-4xl drop-shadow-lg"
          style={data.styles?.icon}
        />
        <ul>
          <p className="flex flex-row items-center gap-2 font-light lg:text-xl">
            {params.id}
          </p>
        </ul>
        <ul className="mx-3 h-1 w-1 rounded-full bg-zinc-600 dark:bg-zinc-400" />
        <ul>
          <p className="flex flex-row items-center gap-2 font-light lg:text-xl">
            {data.members} members
          </p>
        </ul>
        <ul className="mx-3 h-1 w-1 rounded-full bg-zinc-600 dark:bg-zinc-400" />
        <ul>
          <p className="flex flex-row items-center gap-2 font-light lg:text-xl dark:text-slate-200">
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
        <ul className="flex flex-row gap-2 p-2 capitalize">
          {data.interests?.map((interest: string) => (
            <p key={interest} className="rounded-md bg-slate-200 p-1 px-2">
              {interest}
            </p>
          ))}
        </ul>
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
