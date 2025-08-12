"use client";

import React from "react";
import { IoCheckmarkCircle, IoCloseCircle } from "react-icons/io5";
import { useUserPathwayContext } from "../PathwayContext";
import type { Pathway } from "@/app/(connect)/connect/(admindashboard)/admin/PathwayBuilder";

interface TranscriptMatchComponentProps {
  pathway: Pathway;
  courseMap: Map<string, any>;
}

const TranscriptMatchComponent: React.FC<TranscriptMatchComponentProps> = ({
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

  // Function to check if user has completed a class with A, B, or C grade
  const hasCompletedClass = (classId: string) => {
    return getClassStatus(classId) === "completed";
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

  if (!UserTranscript || UserTranscript.length === 0) {
    return (
      <div className="rounded-lg bg-blue-50 p-4">
        <h3 className="text-lg font-semibold text-blue-800">
          Transcript Status
        </h3>
        <p className="text-sm text-blue-600">
          No transcript data available. Upload your transcript to see completion
          status.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Overall Progress */}
      <div className="rounded-lg bg-white p-4 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-800">
          Pathway Progress
        </h3>
        <div className="mt-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Overall Completion</span>
            <span
              className={`text-lg font-bold ${
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
          <div className="mt-2 h-3 w-full overflow-hidden rounded-full bg-gray-200">
            <div
              className={`h-full rounded-full transition-all duration-300 ${
                completionStats.percentage >= 80
                  ? "bg-green-500"
                  : completionStats.percentage >= 60
                    ? "bg-yellow-500"
                    : completionStats.percentage >= 40
                      ? "bg-orange-500"
                      : "bg-red-500"
              }`}
              style={{ width: `${completionStats.percentage}%` }}
            />
          </div>
          <p className="mt-1 text-xs text-gray-500">
            {completionStats.completed} completed • {completionStats.inProgress}{" "}
            in progress • {completionStats.total} total classes
          </p>
        </div>
      </div>

      {/* All Classes Status */}
      <div className="rounded-lg bg-white p-4 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-800">
          All Classes Status
        </h3>
        <div className="mt-3 space-y-2">
          {pathway?.pathway?.semesters.map(
            (semester: any, semesterIndex: number) => (
              <div key={semesterIndex} className="space-y-2">
                <h4 className="font-medium text-gray-700">
                  Semester {semesterIndex + 1}
                </h4>
                <div className="space-y-1">
                  {semester.classes.map((course: any) => {
                    const status = getClassStatus(course.id);
                    const courseData = courseMap.get(course.id);

                    const getStatusConfig = (status: string) => {
                      switch (status) {
                        case "completed":
                          return {
                            bgColor: "bg-green-50",
                            icon: (
                              <IoCheckmarkCircle className="h-4 w-4 text-green-500" />
                            ),
                            textColor: "text-green-600",
                            label: "COMPLETED",
                          };
                        case "in-progress":
                          return {
                            bgColor: "bg-blue-50",
                            icon: (
                              <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
                            ),
                            textColor: "text-blue-600",
                            label: "IN PROGRESS",
                          };
                        default:
                          return {
                            bgColor: "bg-red-50",
                            icon: (
                              <IoCloseCircle className="h-4 w-4 text-red-500" />
                            ),
                            textColor: "text-red-600",
                            label: "NEEDED",
                          };
                      }
                    };

                    const config = getStatusConfig(status);

                    return (
                      <div
                        key={course.id}
                        className={`flex items-center justify-between rounded-md ${config.bgColor} p-2`}
                      >
                        <div className="flex items-center gap-2">
                          {config.icon}
                          <div>
                            <p className="text-sm font-medium text-gray-800">
                              {courseData?.category} {courseData?.num}
                            </p>
                            <p className="text-xs text-gray-600">
                              {courseData?.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {course.type}
                            </p>
                          </div>
                        </div>
                        <span
                          className={`text-xs font-medium ${config.textColor}`}
                        >
                          {config.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ),
          )}
        </div>
      </div>
    </div>
  );
};

export default TranscriptMatchComponent;
