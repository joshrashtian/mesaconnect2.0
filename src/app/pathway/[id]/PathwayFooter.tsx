"use client";

import React from "react";
import { IoArrowBack } from "react-icons/io5";
import Link from "next/link";
import { useUserPathwayContext } from "../PathwayContext";
import type { Pathway } from "@/app/(connect)/connect/(admindashboard)/admin/PathwayBuilder";

interface PathwayFooterProps {
  pathway: Pathway;
  courseMap: Map<string, any>;
}

const PathwayFooter: React.FC<PathwayFooterProps> = ({
  pathway,
  courseMap,
}) => {
  const { UserTranscript } = useUserPathwayContext();

  // Function to get class status
  const getClassStatus = (classId: string) => {
    if (!UserTranscript || !UserTranscript.length) return "not-started";

    const transcriptItem = UserTranscript.find(
      (item: any) => item.id === classId,
    );
    if (!transcriptItem || !transcriptItem.grade) return "not-started";

    const grade = transcriptItem.grade.toUpperCase();

    if (grade === "A" || grade === "B" || grade === "C") {
      return "completed";
    } else if (grade === "IP" || grade === "P") {
      return "in-progress";
    } else {
      return "not-started";
    }
  };

  // Calculate completion statistics
  const getCompletionStats = () => {
    if (!pathway?.pathway?.semesters)
      return { completed: 0, inProgress: 0, total: 0, percentage: 0 };

    let completed = 0;
    let inProgress = 0;
    let total = 0;

    pathway.pathway.semesters.forEach((semester: any) => {
      semester.classes.forEach((course: any) => {
        total++;
        const status = getClassStatus(course.id);
        if (status === "completed") {
          completed++;
        } else if (status === "in-progress") {
          inProgress++;
        }
      });
    });

    return {
      completed,
      inProgress,
      total,
      percentage: total > 0 ? Math.round((completed / total) * 100) : 0,
    };
  };

  const completionStats = getCompletionStats();

  return (
    <footer className="fixed bottom-0 left-0 flex h-24 w-full origin-bottom-left flex-row items-center justify-center">
      <div className="flex h-16 w-96 flex-row items-center justify-between rounded-3xl bg-white px-6 shadow-lg">
        <Link href="/pathway">
          <IoArrowBack className="text-2xl" />
        </Link>
        <div className="flex flex-col items-center">
          <span className="text-sm text-gray-600">Overall Progress</span>
          <span
            className={`text-xl font-black ${
              completionStats.percentage >= 80
                ? "text-green-600"
                : completionStats.percentage >= 60
                  ? "text-yellow-600"
                  : completionStats.percentage >= 40
                    ? "text-orange-600"
                    : "text-red-600"
            }`}
          >
            {completionStats.percentage}%
          </span>
        </div>
        <div className="w-8"></div> {/* Spacer for centering */}
      </div>
    </footer>
  );
};

export default PathwayFooter;
