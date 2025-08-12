"use server";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import React from "react";
import type { Pathway } from "@/app/(connect)/connect/(admindashboard)/admin/PathwayBuilder";
import { SVGMaps } from "@/(mesaui)/UniSVG";
import TranscriptMatchComponent from "./TranscriptMatchComponent";
import NavigationMenu from "./NavigationMenu";
import PathwayHeader from "./PathwayHeader";
import RecommendedCourses from "./RecommendedCourses";
import PathwayDetails from "./PathwayDetails";
import PathwayFooter from "./PathwayFooter";

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
    <div className="relative p-10 font-eudoxus">
      <NavigationMenu />
      <PathwayHeader pathway={pathway} />

      <section className="grid gap-4 p-5 lg:grid-cols-2">
        <RecommendedCourses pathway={pathway} courseMap={courseMap} />
        <PathwayDetails
          pathway={pathway}
          courseMap={courseMap}
          highestMath={highestMath}
          hasAllHighLevel={hasAllHighLevel}
          physicsLevel={physicsLevel}
        />
      </section>

      {/* Transcript Match Component */}
      <section id="transcript-match" className="mt-8 p-5">
        <TranscriptMatchComponent pathway={pathway} courseMap={courseMap} />
      </section>

      <PathwayFooter pathway={pathway} courseMap={courseMap} />
    </div>
  );
};

export default PathwayPage;
