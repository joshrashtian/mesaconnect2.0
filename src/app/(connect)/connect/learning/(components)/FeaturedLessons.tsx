import { Lesson } from "@/_assets/types";
import React from "react";
import LessonCard from "./LessonCard";

const FeaturedLessons = () => {
  const sample: Lesson[] | any = [
    {
      id: "a4a",
      title: "Trig Work",
      desc: "Ok",
    },
  ];

  return (
    <main className="flex flex-col gap-2">
      <h2 className="font-semibold text-zinc-700 text-3xl">Featured Lessons</h2>
      {sample.map((e: Lesson) => {
        return <LessonCard lesson={e} />;
      })}
    </main>
  );
};

export default FeaturedLessons;
