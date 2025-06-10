"use client";
import React, { useRef } from "react";
import { ClassType } from "../../builder/(buildercomponents)/ClassRelations";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import ClassCard from "./ClassCard";

type Props = {
  classes: ClassType[];
  title: string;
};

const List = ({ classes, title }: Props) => {
  const scrollContainer = useRef<HTMLDivElement>(null);

  const scrollByAmount = (distance: number) => {
    if (scrollContainer.current) {
      scrollContainer.current.scrollBy({ left: distance, behavior: "smooth" });
    }
  };

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">{title}</h1>
        <div className="space-x-2"></div>
      </div>

      <div className="group relative flex h-96 w-full flex-col">
        <div
          ref={scrollContainer}
          className="no-scrollbar grid h-full auto-cols-[24rem] grid-flow-col grid-rows-2 gap-4 overflow-x-auto overflow-y-hidden scroll-smooth"
        >
          {classes.map((c) => (
            <ClassCard key={c.id} content={c} />
          ))}
        </div>
        <button
          onClick={() => scrollByAmount(-600)}
          className="absolute left-0 h-full rounded bg-gray-200/40 px-3 py-1 text-3xl opacity-0 duration-300 hover:bg-gray-300/40 group-hover:opacity-100"
        >
          <IoChevronBack />
        </button>
        <button
          onClick={() => scrollByAmount(600)}
          className="absolute right-0 h-full rounded bg-gray-200/40 px-3 py-1 text-3xl opacity-0 duration-300 hover:bg-gray-300/40 group-hover:opacity-100"
        >
          <IoChevronForward />
        </button>
      </div>
    </div>
  );
};

export default List;
