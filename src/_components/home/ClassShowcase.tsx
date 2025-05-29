"use client";

import { ClassType } from "@/app/(connect)/connect/builder/(buildercomponents)/ClassRelations";
import { IconGet } from "@/app/(connect)/connect/learning/(sub-pages)/profile/newclass/CategoryIndex";
import { IoSchool } from "react-icons/io5";
import React from "react";
import Tilt from "react-parallax-tilt";
const sampleClasses: {
  college: string;
  num: number;
  category: string;
  id: string;
  name: string;
  units: number;
}[] = [
  {
    id: "1",
    name: "Calculus I",
    num: 211,
    category: "Math",
    college: "College of the Canyons",
    units: 5,
  },
  {
    id: "2",
    num: 212,
    category: "Math",
    name: "Calculus II",
    college: "College of the Canyons",
    units: 5,
  },

  {
    id: "5",
    num: 107,
    category: "BIOSCI",
    name: "Cellular Biology",
    college: "College of the Canyons",
    units: 4,
  },
  {
    id: "7",
    num: 111,
    category: "CMPSCI",
    name: "Introduction to Java",
    college: "College of the Canyons",
    units: 4,
  },
  {
    id: "8",
    num: 235,
    category: "CMPSCI",
    name: "C Programming",
    college: "College of the Canyons",
    units: 3,
  },
  {
    id: "10",
    num: 220,
    category: "PHYSIC",
    name: "Mechanics of Solids Fluids",
    college: "College of the Canyons",
    units: 4,
  },
  {
    id: "11",
    num: 221,
    category: "PHYSIC",
    name: "Electricity and Magnetism",
    college: "College of the Canyons",
    units: 4,
  },

  {
    id: "14",
    num: 255,
    category: "CHEM",
    name: "Organic Chemistry",
    college: "College of the Canyons",
    units: 5,
  },
];

const ClassShowcase = () => {
  return (
    <section className="flex w-full flex-col items-start justify-start gap-2 overflow-hidden whitespace-nowrap rounded-2xl border-slate-300 p-5 py-20 font-eudoxus text-sm text-slate-400 lg:p-10">
      <h1 className="border-collapse bg-gradient-to-r from-red-500 to-purple-500 bg-clip-text text-2xl font-bold text-transparent drop-shadow-md lg:text-5xl">
        View Your Classes.
      </h1>
      <p className="text-sm text-slate-500 dark:text-slate-100/80 lg:text-lg">
        Access your college&apos;s courses, get information, see other
        students&apos; opinions and questions, and use the MESA Toolbox to
        upgrade your community college experience.
      </p>
      <div className="flex animate-loop-scroll flex-row items-center justify-start gap-3 overflow-hidden whitespace-nowrap p-2 px-10">
        {sampleClasses.map((cls) => (
          <Tilt
            tiltEnable={true}
            key={cls.id}
            tiltMaxAngleX={10}
            tiltMaxAngleY={10}
            perspective={1000}
            scale={1.05}
            transitionSpeed={1000}
            className="flex h-48 w-96 cursor-crosshair flex-col justify-center rounded-xl border-2 border-slate-300 bg-zinc-100/30 p-2 px-10 text-black shadow-lg duration-300 selection:bg-orange-200/50 selection:text-orange-500 hover:scale-105 hover:border-slate-400"
          >
            <h2 className="flex flex-row items-center justify-start gap-2 text-2xl font-bold text-slate-500 dark:text-slate-100/80">
              {IconGet(cls.category) || <IoSchool />}
              <span>{cls.name}</span>
            </h2>
            <div className="flex flex-row items-center justify-start gap-2">
              <p className="font-mono text-lg text-slate-500 dark:text-slate-100/80">
                {cls.category.toUpperCase()} {cls.num} / {cls.units} Units
              </p>
            </div>
            <div className="flex flex-row items-center justify-start gap-2">
              <p className="text-lg text-slate-500 dark:text-slate-100/80">
                {cls.college}
              </p>
            </div>
          </Tilt>
        ))}
        {sampleClasses.map((cls) => (
          <Tilt
            tiltEnable={true}
            key={cls.id + "2"}
            className="flex h-48 w-96 cursor-crosshair flex-col justify-center rounded-xl border-2 border-slate-300 bg-zinc-100/30 p-2 px-10 text-black shadow-lg duration-300 selection:bg-orange-200/50 selection:text-orange-500 hover:scale-105 hover:border-slate-400"
            tiltMaxAngleX={10}
            tiltMaxAngleY={10}
            perspective={1000}
            scale={1.05}
            transitionSpeed={1000}
          >
            <h2 className="flex flex-row items-center justify-start gap-2 text-2xl font-bold text-slate-500 dark:text-slate-100/80">
              {IconGet(cls.category) || <IoSchool />}
              <span>{cls.name}</span>
            </h2>
            <div className="flex flex-row items-center justify-start gap-2">
              <p className="font-mono text-lg text-slate-500 dark:text-slate-100/80">
                {cls.category.toUpperCase()} {cls.num} / {cls.units} Units
              </p>
            </div>
            <div className="flex flex-row items-center justify-start gap-2">
              <p className="text-lg text-slate-500 dark:text-slate-100/80">
                {cls.college}
              </p>
            </div>
          </Tilt>
        ))}
      </div>
    </section>
  );
};

export default ClassShowcase;
