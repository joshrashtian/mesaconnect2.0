import React from "react";
import { IoChevronForward } from "react-icons/io5";
import Link from "next/link";
import { SVGMaps } from "@/(mesaui)/UniSVG";
import type { Pathway } from "@/app/(connect)/connect/(admindashboard)/admin/PathwayBuilder";

interface PathwayHeaderProps {
  pathway: Pathway;
}

const PathwayHeader: React.FC<PathwayHeaderProps> = ({ pathway }) => {
  const SVG = SVGMaps[pathway.university as keyof typeof SVGMaps];
  const colors = pathway.colors || ["#000000"]; // Fallback to black if no colors

  return (
    <div>
      <svg style={{ position: "absolute", width: 0, height: 0 }}>
        <defs>
          <linearGradient
            id={`pathwayGradient-${pathway.id}`}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            {colors.map((color, index) => (
              <stop
                key={index}
                offset={`${colors.length === 1 ? 0 : (index / (colors.length - 1)) * 100}%`}
                stopColor={color}
              />
            ))}
          </linearGradient>
        </defs>
      </svg>
      <div>
        {SVG ? (
          <SVG
            //@ts-ignore
            className="h-48 w-96 drop-shadow-md"
            fill={`url(#pathwayGradient-${pathway.id})`}
          />
        ) : (
          <h3
            className="bg-clip-text text-8xl font-black text-transparent"
            style={{
              background: `linear-gradient(to right, ${colors.join(", ")})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {pathway.university}
          </h3>
        )}
        <h1 className="flex flex-row items-center gap-2 text-base font-bold md:text-2xl">
          {pathway.college} <IoChevronForward />{" "}
          <Link
            href={`/pathway?university=${pathway.university}`}
            className="duration-300 hover:text-blue-600"
          >
            {pathway.university}
          </Link>
          <IoChevronForward />{" "}
          <Link
            href={`/pathway?major=${pathway.major}`}
            className="duration-300 hover:text-blue-600"
          >
            {pathway.major}
          </Link>
        </h1>
      </div>
    </div>
  );
};

export default PathwayHeader;
