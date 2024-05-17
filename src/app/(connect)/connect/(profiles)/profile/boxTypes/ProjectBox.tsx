import React from "react";
import { ProjectLinks } from "../../../builder/(profbuildercomponents)/Projects";
import Link from "next/link";

const ProjectBox = (e: any) => {
  const data = e.e;
  // @ts-ignore
  return (
    <main className="flex flex-row flex-wrap gap-2">
      {data.contents.map((item: ProjectLinks) => (
        <Link
          key={item.name}
          //@ts-ignore
          href={item.link}
          passHref={true}
          className="w-1/3 hover:scale-105 hover:bg-zinc-100 duration-300 flex flex-row items-center justify-center gap-3 shadow-md rounded-full p-3"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="w-7 h-7"
            src={item.website?.icon && item.website?.icon}
           //@ts-ignore
            alt={item.website}/>
          <p className="text-lg font-bold">{item.name}</p>
        </Link>
      ))}
    </main>
  );
};

export default ProjectBox;
