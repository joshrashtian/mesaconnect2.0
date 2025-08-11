"use server";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import React from "react";
import type { Pathway } from "@/app/(connect)/connect/(admindashboard)/admin/PathwayBuilder";
import { SVGMaps } from "@/(mesaui)/UniSVG";
import {
  IoArrowForward,
  IoBook,
  IoChevronForward,
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

  const classes = pathway?.pathway?.semesters.flatMap((semester: any) =>
    semester.classes.map((Class: any) => Class.id),
  );

  const { data: courseData, error: coursesError } = (await supabase
    .schema("information")
    .from("classes")
    .select("*")
    //@ts-ignore
    .in("id", classes)) as { data: any[]; error: any };
  let courseMap = new Map<string, any>();
  courseData?.forEach((course) => {
    courseMap.set(course.id, course);
  });

  const mathCourses =
    pathway.pathway?.semesters.flatMap((semester) =>
      semester.classes
        .map((classId) => courseMap.get(classId.id))
        .filter((course) => course?.category === "MATH"),
    ) || [];

  const highestMath =
    mathCourses.length > 0
      ? Math.max(...mathCourses.map((course) => course.num))
      : 0;

  const hasAllHighLevel =
    mathCourses.some((course) => course.num === 213) &&
    mathCourses.some((course) => course.num === 214) &&
    mathCourses.some((course) => course.num === 215);

  const physicsCourses =
    pathway.pathway?.semesters.flatMap((semester) =>
      semester.classes
        .map((classId) => courseMap.get(classId.id))
        .filter((course) => course?.category === "PHYSIC"),
    ) || [];

  const getPhysicsLevel = () => {
    if (physicsCourses.length === 0) return 0;

    const has220 = physicsCourses.some((course) => course.num === 220);
    const has221 = physicsCourses.some((course) => course.num === 221);
    const has222 = physicsCourses.some((course) => course.num === 222);
    const hasAny100 = physicsCourses.some(
      (course) => course.num >= 100 && course.num < 200,
    );

    if (has221 && has222) return 4;
    if (has221 || has222) return 3;
    if (has220) return 2;
    if (hasAny100) return 1;
    return 0;
  };

  const physicsLevel = getPhysicsLevel();

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (!pathway) {
    return <div>Pathway not found</div>;
  }

  return (
    <div className="p-10 font-eudoxus">
      <svg style={{ position: "absolute", width: 0, height: 0 }}>
        <defs>
          <linearGradient
            id={`pathwayGradient-${pathway.id}`}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            {pathway.colors.map((color, index) => (
              <stop
                key={index}
                offset={`${(index / (pathway.colors.length - 1)) * 100}%`}
                stopColor={color}
              />
            ))}
          </linearGradient>
        </defs>
      </svg>
      <div>
        {SVG ? (
          <SVG //@ts-ignore
            className="h-32 w-64 drop-shadow-md"
            fill={`url(#pathwayGradient-${pathway.id})`}
          />
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
        <h1 className="flex flex-row items-center gap-2 text-base font-bold md:text-2xl">
          {pathway.college} <IoChevronForward />{" "}
          <Link
            href={`/pathway?university=${pathway.university}`}
            className="duration-300 hover:text-blue-600"
          >
            {pathway.university}
          </Link>
          <IoChevronForward />{" "}
          <Link
            href={`/pathway?major=${pathway.major}`}
            className="duration-300 hover:text-blue-600"
          >
            {pathway.major}
          </Link>
        </h1>
      </div>
      <section className="grid gap-4 p-5 lg:grid-cols-2">
        <div className="no-scrollbar h-[500px] overflow-y-scroll rounded-3xl bg-white/50 p-4 lg:h-[800px]">
          <h2 className="text-2xl font-bold">Recommended Courses</h2>
          <div className="flex flex-col gap-2">
            {pathway.pathway?.semesters.map((semester, index) => {
              return (
                <div key={index} className="flex flex-col gap-2">
                  <h1 className="font-bold">Semester {index + 1}</h1>
                  <div className="grid grid-cols-1 gap-2 lg:grid-cols-2 2xl:grid-cols-3">
                    {semester.classes.map((course) => (
                      <Link
                        href={`/connect/class/${course.id}`}
                        key={course.id}
                        className="group flex flex-row items-center justify-between rounded-md p-2 text-sm font-light text-black/70 duration-300 hover:rounded-xl hover:bg-zinc-200/30 hover:px-4 md:text-base lg:text-lg"
                      >
                        <div>
                          <h4 className="font-bold">
                            {courseMap.get(course.id)?.category}{" "}
                            {courseMap.get(course.id)?.num}
                          </h4>
                          <h3 className="font-light">
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
        <div className="no-scrollbar h-full overflow-y-scroll rounded-3xl bg-white/50 p-4">
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
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-bold">Math Requirements</h3>
            <div className="text-sm">
              {highestMath > 0 ? (
                <p>Highest Math Required: MATH {highestMath}</p>
              ) : (
                <p>No math courses required</p>
              )}
              {highestMath > 0 && (
                <div className="mt-3">
                  <div className="mb-1 flex justify-between text-xs">
                    <span>Low Level</span>
                    <span>Basic Calc</span>
                    <span>Advanced Calc</span>
                    <span>Beyond Calc</span>
                    <span>All High Level</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-gray-200">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${
                        hasAllHighLevel
                          ? "w-full bg-purple-600"
                          : highestMath >= 213
                            ? "w-4/5 bg-red-500"
                            : highestMath === 212
                              ? "w-3/5 bg-orange-500"
                              : highestMath >= 211
                                ? "w-2/5 bg-yellow-500"
                                : "w-1/5 bg-green-500"
                      }`}
                    />
                  </div>
                  <p className="mt-2 font-medium">
                    {hasAllHighLevel
                      ? "Mathematics Major"
                      : highestMath >= 213
                        ? "Beyond Calculus"
                        : highestMath === 212
                          ? "Advanced Calculus"
                          : highestMath >= 211
                            ? "Basic Calculus"
                            : "Low Level Math"}
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-bold">Physics Requirements</h3>
            <div className="text-sm">
              {physicsLevel > 0 ? (
                <p>Physics Level: {physicsLevel}</p>
              ) : (
                <p>No physics courses required</p>
              )}
              {physicsLevel > 0 && (
                <div className="mt-3">
                  <div className="mb-1 flex justify-between text-xs">
                    <span>None</span>
                    <span>Algebra Based</span>
                    <span>Basic Calculus</span>
                    <span>Higher Level Physics</span>
                    <span>Physics Major</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-gray-200">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${
                        physicsLevel === 4
                          ? "w-full bg-teal-600"
                          : physicsLevel === 3
                            ? "w-4/5 bg-blue-500"
                            : physicsLevel === 2
                              ? "w-3/5 bg-yellow-500"
                              : physicsLevel === 1
                                ? "w-2/5 bg-green-500"
                                : "w-1/5 bg-green-500"
                      }`}
                    />
                  </div>
                  <p className="mt-2 font-medium">
                    {physicsLevel === 4
                      ? "Physics Major"
                      : physicsLevel === 3
                        ? "Higher Level Physics"
                        : physicsLevel === 2
                          ? "Basic Calculus"
                          : physicsLevel === 1
                            ? "Algebra Based"
                            : "No Physics"}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PathwayPage;
