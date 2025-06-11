"use client";
import React from "react";

const Skills = (e: any) => {
  const data = e.e;
  return (
    <div className="flex h-full flex-col gap-2">
      <ul className="flex flex-row flex-wrap gap-3">
        {data.skills.map((a: string) => (
          <ul key={a} className="rounded-full bg-slate-100 p-1 px-3">
            <li className="font-light">{a}</li>
          </ul>
        ))}
      </ul>
    </div>
  );
};

export default Skills;
