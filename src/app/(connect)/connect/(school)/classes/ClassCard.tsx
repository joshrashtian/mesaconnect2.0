"use client";
import { ClassType } from "../../builder/(buildercomponents)/ClassRelations";
import React from "react";
import { IconGet } from "../../learning/(sub-pages)/profile/newclass/CategoryIndex";
import Tilt from "react-parallax-tilt";
import Link from "next/link";

const ClassCard = ({ content }: { content: ClassType }) => {
  return (
    <Tilt
      className="h-40 w-96 flex-shrink-0 rounded-lg bg-white shadow-md"
      tiltMaxAngleX={10}
      tiltMaxAngleY={10}
    >
      <Link
        href={`/connect/class/${content.id}`}
        className="flex h-full w-full flex-col p-4"
      >
        <h2>{IconGet(content.category)}</h2>
        <h2 className="text-xl font-bold">{content.name}</h2>
        <p className="text-sm text-gray-500">
          {content.category} {content.num}
        </p>
        <p className="text-sm text-gray-500">{content.units} units</p>
      </Link>
    </Tilt>
  );
};

export default ClassCard;
