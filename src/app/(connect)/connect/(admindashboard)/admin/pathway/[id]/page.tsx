"use server";

import React from "react";
import { serverside } from "../../../../../../../../config/serverside";
import { useParams } from "next/navigation";
import { IoChevronForward } from "react-icons/io5";
import { supabase } from "../../../../../../../../config/mesa-config";
import Semesters from "./semesters";
import GeneralInfo from "./GeneralInfo";
const PathwayPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const pathwayId = (await params).id;

  const { data, error } = await serverside
    .from("pathway")
    .select("*")
    .eq("id", pathwayId)
    .single();

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  let classesIds: string[] = [];

  data?.pathway?.semesters.forEach((semester: any) => {
    semester.classes.forEach((Class: any) => {
      classesIds.push(Class.id);
    });
  });

  const { data: classesData, error: classesDataError } = await serverside
    //@ts-ignore
    .schema("information")
    //@ts-ignore
    .from("classes")
    .select("*")
    .in("id", classesIds);

  if (classesDataError) {
    return <div>Error: {classesDataError.message}</div>;
  }

  return (
    <div className="flex flex-col gap-2 pb-20">
      <h1 className="text-2xl font-bold">Pathway Editor</h1>
      <div className="flex flex-row items-end justify-between gap-2">
        <ul>
          <h2 className="text-xl font-semibold text-zinc-700">
            {data.college}
          </h2>
          <h2
            className="text-2xl font-bold"
            style={{ color: data?.colors && data?.colors[0] }}
          >
            {data?.major}
          </h2>
        </ul>
        <IoChevronForward className="h-10 w-10" />
        <h2
          className="text-2xl font-bold"
          style={{ color: data?.colors && data?.colors[0] }}
        >
          {data.university}
        </h2>
      </div>

      <ul className="my-5 h-0.5 w-full bg-zinc-500" />

      <GeneralInfo pathway={data} />

      {classesData && (
        <Semesters
          semesters={data.pathway}
          classes={classesData}
          id={pathwayId}
        />
      )}
    </div>
  );
};

export default PathwayPage;
