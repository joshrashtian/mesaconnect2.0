"use server";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import React from "react";
import { cookies } from "next/headers";
import UserItem from "@/(mesaui)/UserItem";

import Link from "next/link";
import StandardButton from "@/(mesaui)/StandardButton";
import TitleComponent from "@/(mesaui)/title";
import CollegeSame from "./(components)/CollegeSame";

const majors = [
  "Computer Science",
  "Biology",
  "Mathematics",
  "Physics",
  "Chemistry",
  "Mechanical Engineering",
];

const UsersPage = async ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const supabse = createServerComponentClient({ cookies });
  const filters = searchParams;

  const { data, error } = await supabse
    .from("profiles")
    .select("real_name, username, id, avatar_url, major, college")
    .match(filters)
    .not("real_name", "is", null);

  return (
    <div className="flex flex-col gap-6 font-eudoxus">
      <TitleComponent size="small">People Next To You</TitleComponent>
      <CollegeSame />

      <ul className="flex flex-col">
        <TitleComponent size="medium">Discover Users By Major</TitleComponent>
        <ul className="flex flex-row gap-3 overflow-x-scroll p-4">
          <Link
            className={`flex w-fit flex-row items-center justify-center gap-3 rounded-2xl bg-zinc-200 p-3 duration-300 hover:scale-105 hover:bg-zinc-300 dark:bg-zinc-600 dark:hover:bg-zinc-800`}
            href={`/connect/social/users`}
          >
            All
          </Link>
          {majors.map((major) => (
            <Link
              className={`flex w-fit flex-row items-center justify-center gap-3 rounded-2xl bg-zinc-200 p-3 duration-300 hover:scale-105 hover:bg-zinc-300 dark:bg-zinc-600 dark:hover:bg-zinc-800`}
              href={`/connect/social/users?major=${major}`}
              key={major}
            >
              {major}
            </Link>
          ))}
        </ul>
        {data?.map((user) => (
          <UserItem user={user} key={user.id}>
            <p>{user.major}</p>
          </UserItem>
        ))}
      </ul>
    </div>
  );
};

export default UsersPage;
