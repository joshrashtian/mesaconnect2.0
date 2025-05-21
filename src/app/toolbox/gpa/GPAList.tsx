import React, { useState } from "react";
import { useGPA } from "./layout";
import { ClassType } from "@/app/(connect)/connect/builder/(buildercomponents)/ClassRelations";
import { Button } from "@/components/ui/button";
const GPAList = () => {
  const {
    gpa,
    netGPA,
    courses,
    omittedCourses,
    setOmittedCourses,
    RemoveClassFromSemester,
    unOmitClass,
    omitClass,
  } = useGPA();
  const [focuedClass, setFocusedClass] = useState<ClassType | null>(null);
  return (
    <div className="mt-2 flex h-96 w-full flex-col gap-4 overflow-y-scroll rounded-xl bg-white p-3 shadow-lg">
      <div className="flex flex-col gap-2">
        <div className="text-base font-bold">Net GPA</div>
        <h3 className="text-base text-muted-foreground">{netGPA.toFixed(3)}</h3>
      </div>
      {gpa.map((semester) => (
        <div
          key={semester.semester}
          className="flex flex-col gap-2 bg-zinc-50 p-3"
        >
          <div className="flex items-center gap-2">
            <div className="text-base font-bold">{semester.semester}</div>
            <h4 className="text-base text-muted-foreground">
              {semester.gpa.toFixed(2)}
            </h4>
          </div>
          <div className="flex flex-col gap-2">
            {semester.courses.map((course) => (
              <button
                key={course.name}
                className={`flex flex-col justify-between gap-2 duration-300 ${
                  focuedClass?.name === course.name
                    ? "h-40 bg-zinc-100 p-4"
                    : "h-8"
                }`}
                onMouseEnter={() => setFocusedClass(course)}
                onMouseLeave={() => setFocusedClass(null)}
              >
                <ol className="flex flex-row justify-between gap-2">
                  <p>{course.name}</p>
                  <p>{course.grade}</p>
                  {course.influence && course.influence !== "N/A" && (
                    <p
                      className={`text-muted-foreground ${
                        course?.influence > 0
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {course.influence.toFixed(3)}
                    </p>
                  )}
                </ol>
                {focuedClass?.name === course.name && (
                  <div className="flex h-full flex-col flex-wrap gap-2 text-sm">
                    <p>Units: {course.units}</p>
                    <p>Semester: {course.semester}</p>
                    <p>Grade: {course.grade}</p>
                    <p>Influence: {course.influence}</p>

                    <Button
                      onClick={() => {
                        if (omittedCourses.some((c) => c.id === course.id)) {
                          unOmitClass(course);
                        } else {
                          omitClass(course);
                        }
                      }}
                    >
                      {omittedCourses.some((c) => c.id === course.id)
                        ? "UnOmit Course from GPA"
                        : "Omit Course from GPA"}
                    </Button>
                    <Button
                      onClick={() => {
                        RemoveClassFromSemester(course);
                      }}
                    >
                      Delete Course
                    </Button>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default GPAList;
