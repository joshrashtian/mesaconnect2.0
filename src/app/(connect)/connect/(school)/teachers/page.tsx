"use server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import React from "react";
import { IoPerson } from "react-icons/io5";

const TeachersPage = async ({
  searchParams,
}: {
  searchParams: { college: string };
}) => {
  const supabase = createServerComponentClient({ cookies });
  const { data: teachers, error } = await supabase.from("teachers").select("*");

  return (
    <div>
      <h1 className="text-2xl font-bold">Teachers</h1>
      {teachers?.map((teacher) => (
        <Link
          className="rounded-md bg-zinc-200 p-10 hover:bg-zinc-300"
          key={teacher.id}
          href={`/connect/teachers/${teacher.id}`}
        >
          <h1>{teacher.name}</h1>
        </Link>
      ))}
    </div>
  );
};

export default TeachersPage;
