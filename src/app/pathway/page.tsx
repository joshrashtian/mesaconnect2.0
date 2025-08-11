"use client";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Pathway } from "../(connect)/connect/(admindashboard)/admin/PathwayBuilder";
import { supabase } from "../../../config/mesa-config";
import { getPathwaysByFilter } from "./(functions)/GetPathways";
import { SVGMaps, UniList } from "@/(mesaui)/UniSVG";
import Link from "next/link";
import HomePageHeader from "../news/(homepage)/header";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDownIcon, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { IoCheckmarkCircle, IoChevronForward } from "react-icons/io5";
import { useUserPathwayContext } from "./PathwayContext";
import Tilt from "react-parallax-tilt";

const PathwaySelectorPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const college = searchParams.get("college") || "College of the Canyons";
  const major = searchParams.get("major");
  const university = searchParams.get("university");

  const [pathways, setPathways] = useState<Pathway[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  const {
    UserPathways,
    UserTranscript,
    loading: pathwayLoading,
  } = useUserPathwayContext();

  // Function to calculate percentage of transcript classes that match a pathway
  const calculateTranscriptMatch = (pathway: Pathway) => {
    if (!UserTranscript || !UserTranscript.length || !pathway) {
      console.log("No transcript or pathway");
      return 0;
    }

    // Get all class IDs from the pathway
    const pathwayClassIds = new Set<string>();

    pathway.pathway?.semesters.forEach((semester: any) => {
      semester.classes.forEach((classItem: any) => {
        pathwayClassIds.add(classItem.id);
      });
    });

    // Get all class IDs from user's transcript (only A, B, or C grades)
    const transcriptClassIds = new Set<string>();
    UserTranscript.forEach((transcriptItem: any) => {
      if (transcriptItem.id && transcriptItem.grade) {
        const grade = transcriptItem.grade.toUpperCase();
        // Only count classes with A, B, or C grades
        if (grade === "A" || grade === "B" || grade === "C") {
          transcriptClassIds.add(transcriptItem.id);
        }
      }
    });

    // Calculate intersection
    let matchedClasses = 0;
    pathwayClassIds.forEach((classId) => {
      if (transcriptClassIds.has(classId)) {
        matchedClasses++;
      }
    });

    // Calculate percentage
    const totalPathwayClasses = pathwayClassIds.size;
    return totalPathwayClasses > 0
      ? Math.round((matchedClasses / totalPathwayClasses) * 100)
      : 0;
  };

  const fetchPathways = async ({
    university,
    college,
    major,
  }: {
    university: string;
    college: string;
    major: string;
  }) => {
    const { data, error } = await getPathwaysByFilter({
      college: college || "any",
      major: major || "any",
      university: university || "any",
    });

    if (error) {
      console.error(error);
    } else {
      //@ts-ignore
      setPathways(data as Pathway[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    setMounted(true);
    fetchPathways({
      university: university || "any",
      college: college || "any",
      major: major || "any",
    });
  }, [university, college, major]);

  if (!mounted) {
    return (
      <div>
        <HomePageHeader title="Pathways" />
        <div className="flex items-center justify-center p-8">
          <div>Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <HomePageHeader title="Pathways" />

      <div className="flex flex-col gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              {university && university !== "any"
                ? university
                : "Select University"}
              <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {UniList.map((uniName) => {
              const SVG = SVGMaps[uniName as keyof typeof SVGMaps];
              return (
                <DropdownMenuItem
                  key={uniName}
                  className="cursor-pointer"
                  onClick={() => {
                    router.replace(
                      `/pathway?university=${encodeURIComponent(uniName)}`,
                    );
                    fetchPathways({
                      university: uniName,
                      college: college || "any",
                      major: major || "any",
                    });
                  }}
                >
                  <div className="flex items-center gap-2">
                    {SVG ? (
                      <SVG
                        //@ts-ignore
                        className="max-h-8 max-w-8"
                      />
                    ) : (
                      <div className="flex h-8 w-8 items-center justify-center rounded bg-gray-200 text-xs font-medium">
                        {uniName.charAt(0)}
                      </div>
                    )}
                    {uniName}
                  </div>
                </DropdownMenuItem>
              );
            })}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => {
                router.replace("/pathway");
                fetchPathways({
                  university: "any",
                  college: college || "any",
                  major: major || "any",
                });
              }}
            >
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded bg-blue-100 text-xs font-medium text-blue-600">
                  A
                </div>
                All Universities
                <IoChevronForward className="ml-auto h-4 w-4" />
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {pathwayLoading || loading ? (
        <div className="flex h-full w-full items-center justify-center py-12">
          <Loader2 className="h-4 w-4 animate-spin" />
        </div>
      ) : (
        <section className="mt-12 grid grid-cols-1 gap-4 lg:grid-cols-3 xl:grid-cols-4">
          {pathways.map((pathway) => {
            const SVG = SVGMaps[pathway.university as keyof typeof SVGMaps];
            const transcriptMatchPercentage = calculateTranscriptMatch(pathway);

            return (
              <Tilt
                key={pathway.id}
                tiltMaxAngleX={5}
                tiltMaxAngleY={5}
                perspective={1000}
                transitionSpeed={1000}
                scale={1.02}
                className="max-h-52 rounded-lg bg-white pb-4 shadow-md"
              >
                <Link href={`/pathway/${pathway.id}`}>
                  <div
                    style={{
                      background:
                        pathway.colors.length > 1
                          ? `linear-gradient(135deg, ${pathway.colors.join(", ")})`
                          : pathway.colors[0],
                    }}
                    className="flex h-24 w-full rounded-t-lg p-3"
                  >
                    {SVG ? (
                      <SVG
                        //@ts-ignore
                        className="h-12 w-24 fill-white drop-shadow-lg"
                      />
                    ) : (
                      <h2 className="text-2xl font-black text-white drop-shadow-lg">
                        {pathway.university}
                      </h2>
                    )}
                  </div>
                  <div className="flex flex-col p-2 px-4">
                    <h2 className="text-2xl font-black">{pathway.major}</h2>

                    <p className="text-sm text-gray-500">{pathway.college}</p>
                    {UserTranscript && UserTranscript.length > 0 && (
                      <div className="mt-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-600">
                            Transcript Match
                          </span>
                          <span
                            className={`text-sm font-semibold ${
                              transcriptMatchPercentage >= 80
                                ? "text-green-600"
                                : transcriptMatchPercentage >= 60
                                  ? "text-yellow-600"
                                  : transcriptMatchPercentage >= 40
                                    ? "text-orange-600"
                                    : "text-red-600"
                            }`}
                          >
                            {transcriptMatchPercentage}%
                          </span>
                        </div>
                        <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-gray-200">
                          <div
                            className={`h-full rounded-full transition-all duration-300 ${
                              transcriptMatchPercentage >= 80
                                ? "bg-green-500"
                                : transcriptMatchPercentage >= 60
                                  ? "bg-yellow-500"
                                  : transcriptMatchPercentage >= 40
                                    ? "bg-orange-500"
                                    : "bg-red-500"
                            }`}
                            style={{ width: `${transcriptMatchPercentage}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </Link>
              </Tilt>
            );
          })}
        </section>
      )}
    </div>
  );
};

export default PathwaySelectorPage;
