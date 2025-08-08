"use server";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import React from "react";
import type { Pathway } from "@/app/(connect)/connect/(admindashboard)/admin/PathwayBuilder";
import { SVGMaps } from "@/(mesaui)/UniSVG";
import {
  IoArrowForward,
  IoBook,
  IoOpen,
  IoPeople,
  IoTime,
} from "react-icons/io5";
import Link from "next/link";

const PathwayPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const supabase = createServerComponentClient({ cookies });
  const { data: pathway, error } = (await supabase
    .from("pathway")
    .select("*")
    .eq("id", id)
    .single()) as { data: Pathway; error: any };

  const SVG = SVGMaps[pathway.university as keyof typeof SVGMaps];

  const classes = pathway?.pathway?.semesters.map((semester: any) =>
    semester.classes.map((Class: any) => Class.id),
  );

  const { data: courseData, error: coursesError } = (await supabase
    .schema("information")
    .from("classes")
    .select("*")
    //@ts-ignore
    .in("id", classes)) as { data: any[]; error: any };

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (!pathway) {
    return <div>Pathway not found</div>;
  }

  let courseMap = new Map<string, any>();
  courseData?.forEach((course) => {
    courseMap.set(course.id, course);
  });

  return (
    <div className="p-10 font-eudoxus">
      <div>
        {SVG ? (
          //@ts-ignore
          <SVG className="h-32 w-64" fill={pathway.colors[0]} />
        ) : (
          <h3
            className="bg-clip-text text-8xl font-black text-transparent"
            style={{
              background: `linear-gradient(to right, ${pathway.colors.join(
                ", ",
              )})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {pathway.university}
          </h3>
        )}
        <h1 className="flex flex-row items-center gap-2 text-2xl font-bold">
          {pathway.college} <IoArrowForward /> {pathway.major}
        </h1>
      </div>
      <section className="grid grid-cols-2 gap-4 p-5">
        <div className="rounded-lg bg-white/50 p-4">
          <h2 className="text-2xl font-bold">Recommended Courses</h2>
          <div className="flex flex-col gap-2">
            {pathway.pathway?.semesters.map((semester, index) => {
              return (
                <div key={index} className="flex flex-col gap-2">
                  <h1 className="font-bold">Semester {index + 1}</h1>
                  <div className="flex flex-col gap-2">
                    {semester.classes.map((course) => (
                      <Link
                        href={`/connect/class/${course.id}`}
                        key={course.id}
                        className="group flex flex-row items-center justify-between rounded-md p-2 text-lg font-light text-black/70 duration-300 hover:rounded-xl hover:bg-zinc-200/30 hover:px-4"
                      >
                        <div>
                          <h4 className="text-lg font-bold">
                            {courseMap.get(course.id)?.category}{" "}
                            {courseMap.get(course.id)?.num}
                          </h4>
                          <h3 className="text-lg font-light">
                            {courseMap.get(course.id)?.name}
                          </h3>
                          <h6>{course.type}</h6>
                        </div>
                        <div className="flex flex-row items-center gap-2">
                          <IoOpen className="text-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="rounded-lg bg-white/50 p-4">
          <h3 className="text-2xl font-bold">Pathway Details</h3>
          <div className="flex-col items-center gap-2 p-2">
            <IoTime className="text-2xl" />
            <h5 className="text-xl">
              {pathway?.pathway?.semesters.length} semesters
            </h5>
          </div>
          <div className="flex-col items-center gap-2 p-2">
            <IoPeople className="text-2xl" />
            <h5 className="text-xl">
              {pathway?.pathway?.semesters.reduce(
                (acc, curr) => acc + curr.classes.length,
                0,
              )}{" "}
              classes
            </h5>
          </div>
          <div className="flex-col items-center gap-2 p-2">
            <IoBook className="text-2xl" />
            <h5 className="text-xl">
              {pathway?.pathway?.semesters.reduce(
                (acc, curr) =>
                  acc +
                  curr.classes.reduce(
                    (acc, curr) => acc + courseMap.get(curr.id)?.units,
                    0,
                  ),
                0,
              )}{" "}
              units
            </h5>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PathwayPage;
