// utils/transformTranscript.ts

import { ClassType } from "@/app/(connect)/connect/builder/(buildercomponents)/ClassRelations";

// <-- Replace this import path with wherever ClassType actually lives in your project

/**
 * serverJson:
 *   {
 *     studentInfo: { name: string; id: string; dob: string; },
 *     terms: [
 *       {
 *         termName: string,              // e.g. "FALL 2023"
 *         courses: [
 *           {
 *             category: string;         // e.g. "CMPSCI"
 *             number: string;           // e.g. "122"
 *             name: string;             // e.g. "Architecture/Assembly Language"
 *             grade: string;            // e.g. "A" or "IP"
 *             unitsAttempted: number;    // e.g. 3
 *             unitsEarned: number;       // e.g. 3 or 0
 *             gradePoints: number;       // e.g. 12 or 0
 *           },
 *           ...
 *         ]
 *       },
 *       ...
 *     ],
 *     totals: { overall: { attemptedUnits: number; earnedUnits: number; gpa: number; } }
 *   }
 *
 * We need to convert each { category, number, name, grade, unitsAttempted, … }
 * into a ClassType. Adapt fields as needed if ClassType has extra properties.
 */
export function transcriptJsonToClassTypeArray(serverJson: {
  studentInfo: { name: string; id: string; dob: string };
  terms: Array<{
    termName: string;
    courses: Array<{
      category: string;
      number: string;
      name: string;
      grade: string;
      unitsAttempted: number;
      unitsEarned: number;
      gradePoints: number;
    }>;
  }>;
  
  totals: { overall: { attemptedUnits: number; earnedUnits: number; gpa: number } };
}): ClassType[] {
  const classes: ClassType[] = [];

  for (const term of serverJson.terms) {
    const semesterLabel = term.termName; // e.g. "SUMMER 2023", "FALL 2023", etc.

    for (const course of term.courses) {
      // Build a unique ID. Here we just concatenate category+number+semester,
      // but you can adapt to your needs.
      const id = `${course.category}-${course.number}-${semesterLabel}`.replace(
        /\s+/g,
        ""
      ); // remove spaces

      if (course.grade === "F") continue;

      classes.push({
        id,
        category: course.category,
        num: parseInt(course.number),
        name: course.name,
        grade: course.grade,
        units: course.unitsAttempted,
        semester: `${semesterLabel.split(" ")[0].toLowerCase().includes("summer") ? "Summer" : semesterLabel.split(" ")[0].toLowerCase().includes("winter") ? "Winter" : semesterLabel.split(" ")[0].toLowerCase().includes("spring") ? "Spring" : "Fall"} ${semesterLabel.split(" ")[1]}`,
      
      } as ClassType);
    }
  }

  return classes;
}
