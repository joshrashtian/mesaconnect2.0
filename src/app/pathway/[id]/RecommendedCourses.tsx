import React from "react";
import { IoOpen } from "react-icons/io5";
import Link from "next/link";
import type { Pathway } from "@/app/(connect)/connect/(admindashboard)/admin/PathwayBuilder";

interface RecommendedCoursesProps {
  pathway: Pathway;
  courseMap: Map<string, any>;
}

const RecommendedCourses: React.FC<RecommendedCoursesProps> = ({
  pathway,
  courseMap,
}) => {
  return (
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
  );
};

export default RecommendedCourses;
