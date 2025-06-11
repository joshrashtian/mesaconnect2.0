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
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Teachers</h1>
      {teachers?.map((teacher) => (
        <Link href={`/teacher/${teacher.id}`} key={teacher.id}>
          <div className="rounded-md bg-white p-4 hover:bg-zinc-100">
            <h1>{teacher.name}</h1>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default TeachersPage;
