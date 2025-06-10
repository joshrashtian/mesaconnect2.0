"use server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import React from "react";

const TeachersPage = async ({
  searchParams,
}: {
  searchParams: { college: string };
}) => {
  const supabase = createServerComponentClient({ cookies });
  const { data: teachers, error } = await supabase.from("teachers").select("*");

  if (error) {
    console.error(error);
  }
  return (
    <div>
      {teachers?.map((teacher) => (
        <div key={teacher.id}>
          <h1>{teacher.name}</h1>
        </div>
      ))}
    </div>
  );
};

export default TeachersPage;
