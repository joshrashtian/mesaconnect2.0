"use client";
import Link from "next/link";
import React from "react";
import Tilt from "react-parallax-tilt";

interface Teacher {
  id: string;
  name: string;
  teaches: string[];
  category: string;
  college: string;
}

const TeacherCard = ({ teacher }: { teacher: Teacher }) => {
  return (
    <Tilt
      className="flex h-32 w-80 rounded-lg bg-gradient-to-tr from-white to-slate-50/40 p-4 shadow-lg transition-all duration-300 hover:scale-105"
      tiltMaxAngleX={10}
      tiltMaxAngleY={10}
      perspective={1000}
      transitionSpeed={1000}
    >
      <Link
        href={`/teacher/${teacher.id}`}
        className="flex h-full w-full flex-col items-start justify-end"
      >
        <h1 className="text-2xl font-bold">{teacher.name}</h1>
        <p className="text-sm text-gray-500">{teacher?.category} Professor</p>
      </Link>
    </Tilt>
  );
};

export default TeacherCard;
