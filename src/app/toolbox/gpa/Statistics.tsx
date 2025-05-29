"use client";
import React, { useMemo } from "react";
import { useGPA } from "./GPAProvider";
import { ClassType } from "@/app/(connect)/connect/builder/(buildercomponents)/ClassRelations";
import {
  IoChevronDown,
  IoChevronDownCircle,
  IoChevronUp,
  IoChevronUpCircle,
} from "react-icons/io5";
import { motion } from "framer-motion";

const Statistics = () => {
  const { gpa } = useGPA();
  const top3WorstInfluences = useMemo(() => {
    const allCourses = gpa.flatMap((semester) => semester.courses);

    const filtered = allCourses.filter(
      (course): course is ClassType & { influence: number } =>
        typeof course.influence === "number" && course.influence < 0,
    );

    const sorted = filtered.sort((a, b) => a.influence! - b.influence!);

    return sorted.slice(0, 5);
  }, [gpa]);

  const top3BestInfluences = useMemo(() => {
    const allCourses = gpa.flatMap((semester) => semester.courses);

    const filtered = allCourses.filter(
      (course): course is ClassType & { influence: number } =>
        typeof course.influence === "number" && course.influence > 0,
    );

    const sorted = filtered.sort((a, b) => b.influence! - a.influence!);

    return sorted.slice(0, 5);
  }, [gpa]);

  if (!gpa || gpa.length === 0) return null;
  return (
    <motion.div
      className="mt-2 flex w-full flex-col gap-4 rounded-xl bg-white p-7 shadow-lg"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-lg font-bold">Statistics</h1>

      <div className="text-lg font-bold">Biggest Impacts to GPA</div>
      <section className="grid grid-cols-2 gap-2">
        <div className="flex flex-col gap-2 text-sm text-muted-foreground">
          {top3WorstInfluences.map((course) => (
            <div
              className="rounded-xl bg-zinc-50 p-2 px-4 text-2xl"
              key={course.name}
            >
              <p>{course.name}</p>
              <p className="text-lg text-muted-foreground">
                {course.units} units / {course.grade} Grade
              </p>
              <p className="flex flex-row items-center gap-2 text-red-500">
                <IoChevronDownCircle />
                {course.influence}
              </p>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-2 text-sm text-muted-foreground">
          {top3BestInfluences.map((course) => (
            <div
              className="rounded-xl bg-zinc-50 p-2 px-4 text-2xl"
              key={course.name}
            >
              <p>{course.name}</p>
              <p className="text-lg text-muted-foreground">
                {course.units} units / {course.grade} Grade
              </p>
              <p className="flex flex-row items-center gap-2 text-green-500">
                <IoChevronUpCircle />
                {course.influence}
              </p>
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  );
};

export default Statistics;
