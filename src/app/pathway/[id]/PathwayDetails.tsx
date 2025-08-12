import React from "react";
import { IoBook, IoPeople, IoTime } from "react-icons/io5";
import type { Pathway } from "@/app/(connect)/connect/(admindashboard)/admin/PathwayBuilder";

interface PathwayDetailsProps {
  pathway: Pathway;
  courseMap: Map<string, any>;
  highestMath: number;
  hasAllHighLevel: boolean;
  physicsLevel: number;
}

const PathwayDetails: React.FC<PathwayDetailsProps> = ({
  pathway,
  courseMap,
  highestMath,
  hasAllHighLevel,
  physicsLevel,
}) => {
  return (
    <div className="no-scrollbar h-full overflow-y-scroll rounded-3xl bg-white/50 p-4">
      <h3 className="text-2xl font-bold">Pathway Details</h3>
      <div className="flex-col items-center gap-2 p-2">
        <IoTime className="text-2xl" />
        <h5 className="text-xl">
          {pathway?.pathway?.semesters.length} semesters
        </h5>
      </div>
      <div className="flex-col items-center gap-2 p-2">
        <IoPeople className="text-2xl" />
        <h5 className="text-xl">
          {pathway?.pathway?.semesters.reduce(
            (acc, curr) => acc + curr.classes.length,
            0,
          )}{" "}
          classes
        </h5>
      </div>
      <div className="flex-col items-center gap-2 p-2">
        <IoBook className="text-2xl" />
        <h5 className="text-xl">
          {pathway?.pathway?.semesters.reduce(
            (acc, curr) =>
              acc +
              curr.classes.reduce(
                (acc, curr) => acc + courseMap.get(curr.id)?.units,
                0,
              ),
            0,
          )}{" "}
          units
        </h5>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-bold">Math Requirements</h3>
        <div className="text-sm">
          {highestMath > 0 ? (
            <p>Highest Math Required: MATH {highestMath}</p>
          ) : (
            <p>No math courses required</p>
          )}
          {highestMath > 0 && (
            <div className="mt-3">
              <div className="mb-1 flex justify-between text-xs">
                <span>Low Level</span>
                <span>Basic Calc</span>
                <span>Advanced Calc</span>
                <span>Beyond Calc</span>
                <span>All High Level</span>
              </div>
              <div className="h-2 w-full rounded-full bg-gray-200">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${
                    hasAllHighLevel
                      ? "w-full bg-purple-600"
                      : highestMath >= 213
                        ? "w-4/5 bg-red-500"
                        : highestMath === 212
                          ? "w-3/5 bg-orange-500"
                          : highestMath >= 211
                            ? "w-2/5 bg-yellow-500"
                            : "w-1/5 bg-green-500"
                  }`}
                />
              </div>
              <p className="mt-2 font-medium">
                {hasAllHighLevel
                  ? "Mathematics Major"
                  : highestMath >= 213
                    ? "Beyond Calculus"
                    : highestMath === 212
                      ? "Advanced Calculus"
                      : highestMath >= 211
                        ? "Basic Calculus"
                        : "Low Level Math"}
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-bold">Physics Requirements</h3>
        <div className="text-sm">
          {physicsLevel > 0 ? (
            <p>Physics Level: {physicsLevel}</p>
          ) : (
            <p>No physics courses required</p>
          )}
          {physicsLevel > 0 && (
            <div className="mt-3">
              <div className="mb-1 flex justify-between text-xs">
                <span>None</span>
                <span>Algebra Based</span>
                <span>Basic Calculus</span>
                <span>Higher Level Physics</span>
                <span>Physics Major</span>
              </div>
              <div className="h-2 w-full rounded-full bg-gray-200">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${
                    physicsLevel === 4
                      ? "w-full bg-teal-600"
                      : physicsLevel === 3
                        ? "w-4/5 bg-blue-500"
                        : physicsLevel === 2
                          ? "w-3/5 bg-yellow-500"
                          : physicsLevel === 1
                            ? "w-2/5 bg-green-500"
                            : "w-1/5 bg-green-500"
                  }`}
                />
              </div>
              <p className="mt-2 font-medium">
                {physicsLevel === 4
                  ? "Physics Major"
                  : physicsLevel === 3
                    ? "Higher Level Physics"
                    : physicsLevel === 2
                      ? "Basic Calculus"
                      : physicsLevel === 1
                        ? "Algebra Based"
                        : "No Physics"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PathwayDetails;
