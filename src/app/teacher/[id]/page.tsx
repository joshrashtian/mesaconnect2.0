"use server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import React from "react";
import { CircularProgressBar } from "@/(mesaui)/CircularProgressBar";

const page = async ({ params }: { params: { id: string } }) => {
  const supabase = createServerComponentClient({ cookies });

  const { data: teacher, error } = await supabase
    .from("teachers")
    .select("*")
    .eq("id", params.id)
    .single();

  const { data: ratingSummary, error: ratingSummaryError } = await supabase
    .from("teacher_rating_summary")
    .select("*")
    .eq("teacher_id", teacher?.id)
    .single();

  const { data: classesTaught, error: classesTaughtError } = await supabase
    .schema("information")
    .from("classes")
    .select("name, category, num, id")
    .in("id", [teacher?.teaches]);

  if (error) {
    console.error(error);
  }

  if (ratingSummaryError) {
    console.error(ratingSummaryError);
  }

  if (classesTaughtError) {
    console.error(classesTaughtError);
  }

  return (
    <div className="flex flex-col items-center gap-4 p-4 pt-12 font-eudoxus">
      <CircularProgressBar
        percentage={(ratingSummary?.average_rating / 5) * 100}
        size={150}
        showText={false}
        color="#FFA500"
        strokeWidth={10}
        customText={`${ratingSummary?.average_rating} / 5`}
        textClassName="text-2xl font-bold text-orange-500"
      />

      <h1 className="text-5xl font-bold">{teacher?.name}</h1>
      <p>This teacher teaches:</p>
      <div className="flex w-full flex-col gap-4 lg:w-4/5 lg:flex-row">
        {classesTaught?.map((classItem) => (
          <div
            key={classItem.id}
            className="flex w-full flex-col rounded-lg bg-white p-4 shadow-md lg:w-1/2"
          >
            <h1 className="text-xl font-bold">{classItem.name}</h1>
            <p className="text-xl text-gray-500">
              {classItem.category} {classItem.num}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
