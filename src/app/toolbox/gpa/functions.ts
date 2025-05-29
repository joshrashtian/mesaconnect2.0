"use server"

import { ClassType } from "@/app/(connect)/connect/builder/(buildercomponents)/ClassRelations";

const times = ["Winter", "Spring", "Summer", "Fall"];

export async function sortBySemester(courses: ClassType[]) {
  return courses.sort((a, b) => {
    const [semesterA, yearA] = a.semester.split(" ");
    const [semesterB, yearB] = b.semester.split(" ");
    const yearDiff = parseInt(yearA) - parseInt(yearB);
    if (yearDiff !== 0) return yearDiff;
    return times.indexOf(semesterA) - times.indexOf(semesterB);
  });
}

export async function groupCoursesByYearAndSemester(courses: ClassType[]) {
  const result: Record<string, Record<string, ClassType[]>> = {};


  courses.sort((a, b) => {
    const [semesterA, yearA] = a.semester.split(" ");
    const [semesterB, yearB] = b.semester.split(" ");
    if (yearA === yearB) {
      return times.indexOf(semesterA) - times.indexOf(semesterB);
    }
    return parseInt(yearA) - parseInt(yearB);
  });

  courses.forEach((course: ClassType) => {
    const [semester, year] = course.semester.split(" ");
    
    if (!result[year]) {
      result[year] = {};
    }

    if (!result[year][semester]) {
      result[year][semester] = [];
    }

    result[year][semester].push(course);
  });

  return result;
}


export async function calculateDeltaInfluence(gpaData: any[], omittedCourses: any[]) {
  const result: any[] = [];
  let runningTotal = 0;
  let runningUnits = 0;

  const gradeToGPA = {
    A: 4,
    B: 3,
    C: 2,
    D: 1,
    F: 0,
  };

  for (const d of gpaData) {
    const isSkipped = ["NP", "W", "IP", "P"].includes(d.grade);
    const isOmitted = omittedCourses.some(course => course.name === d.name);
    const currentGPA = gradeToGPA[d.grade as keyof typeof gradeToGPA];

    // Do not update GPA or influence if course is skipped or omitted
    if (isSkipped || isOmitted || currentGPA === undefined) {
      result.push({
        ...d,
        influence: "N/A",
        cumulativeGPA: runningUnits ? Number((runningTotal / runningUnits).toFixed(3)) : "N/A",
      });
      continue;
    }

    const prevGPA = runningUnits > 0 ? runningTotal / runningUnits : currentGPA;

    const semesterGradePoints = currentGPA * d.units;
    const newTotal = runningTotal + semesterGradePoints;
    const newUnits = runningUnits + d.units;
    const newGPA = newTotal / newUnits;

    const influence = newGPA - prevGPA;

    result.push({
      ...d,
      influence: Number(influence.toFixed(3)),
      cumulativeGPA: Number(newGPA.toFixed(3)),
    });

    runningTotal = newTotal;
    runningUnits = newUnits;
  }

  return result;
}

export async function sortByYear(courses: ClassType[]) {

  courses.sort((a, b) => {
    const [semesterA, yearA] = a.semester.split(" ");
    const [semesterB, yearB] = b.semester.split(" ");
    if (yearA === yearB) {
      return parseInt(semesterA) - parseInt(semesterB);
    }
    return parseInt(yearA) - parseInt(yearB);
  });

  return courses;
}

export const useRequiredGPA = (
  targetGPA: number,
  futureUnits: number,
  courses: ClassType[],
): number | 'impossible' => {
  const gradeToGPA = {
    A: 4,
    B: 3,
    C: 2,
    D: 1,
    F: 0,
  };

  const totalUnits = courses.reduce(
    (acc, course) =>
      acc +
      (typeof course.units === "string"
        ? parseFloat(course.units)
        : course.units),
    0,
  );

  const totalGradePoints = courses.reduce((acc, course) => {
    const gradeKey = (course.grade || "").toUpperCase() as keyof typeof gradeToGPA;
    const grade = gradeToGPA[gradeKey];
    if (grade === undefined) return acc;
    const units =
      typeof course.units === "string" ? parseFloat(course.units) : course.units;
    return acc + grade * units;
  }, 0);

  if (futureUnits === 0) {
    // No future units, check if target is already met
    return totalUnits > 0 && totalGradePoints / totalUnits >= targetGPA
      ? 0
      : "impossible";
  }

  const numerator = targetGPA * (totalUnits + futureUnits) - totalGradePoints;
  const requiredGPA = numerator / futureUnits;

  if (requiredGPA > 4.0) return "impossible";
  if (requiredGPA < 0) return 0;

  return parseFloat(requiredGPA.toFixed(3));
};



export const calculateBestNextSemesterGPA = (
  courses: ClassType[],
  futureUnits: number
): number => {
  const gradeToGPA = {
    A: 4,
    B: 3,
    C: 2,
    D: 1,
    F: 0,
  };

  const totalUnits = courses.reduce((acc, course) => {
    const units = typeof course.units === "string" ? parseFloat(course.units) : course.units;
    return acc + units;
  }, 0);

  const totalGradePoints = courses.reduce((acc, course) => {
    const grade = gradeToGPA[course.grade as keyof typeof gradeToGPA];
    if (grade === undefined) return acc;
    const units = typeof course.units === "string" ? parseFloat(course.units) : course.units;
    return acc + grade * units;
  }, 0);

  const futureGradePoints = 4.0 * futureUnits; // assuming perfect semester
  const newTotalPoints = totalGradePoints + futureGradePoints;
  const newTotalUnits = totalUnits + futureUnits;

  return parseFloat((newTotalPoints / newTotalUnits).toFixed(3));
};
