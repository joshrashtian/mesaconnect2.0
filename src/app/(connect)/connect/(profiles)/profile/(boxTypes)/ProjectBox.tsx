"use client";
import React from "react";
import { ProjectLinks } from "../../../builder/(profbuildercomponents)/Projects";
import Link from "next/link";

const ProjectBox = (e: any) => {
  const data = e.e;
  // @ts-ignore
  return (
    <main className="flex flex-row flex-wrap gap-2">
      {data.contents.length === 0 && <p>No links found.</p>}
      {data.contents.map((item: ProjectLinks) => (
        <Link
          key={item.name}
          //@ts-ignore
          href={item.link}
          passHref={true}
          className="flex w-1/3 flex-row items-center justify-center gap-3 rounded-2xl bg-zinc-100 p-3 duration-300 hover:scale-105 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-white dark:hover:bg-orange-950"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="h-7 w-7 rounded-full"
            src={item.website?.icon && item.website?.icon}
            //@ts-ignore
            alt={item.website}
          />
          <p className="text-lg">{item.name}</p>
        </Link>
      ))}
    </main>
  );
};

export default ProjectBox;
