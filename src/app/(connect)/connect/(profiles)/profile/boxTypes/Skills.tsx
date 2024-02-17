import React from "react";

const Skills = (e: any) => {
  const data = e.e
  return (
    <div className="flex h-full flex-col gap-2">
      <h1 className="font-bold">Skills</h1>
      <ul className="gap-3 flex flex-row flex-wrap">
      {data.skills.map((a: string) => (
        <ul className="p-1 px-3 rounded-full bg-slate-100">
          <li className="font-light" key={a}>{a}</li>
        </ul>
      ))}
      </ul>
    </div>
  );
};

export default Skills;
