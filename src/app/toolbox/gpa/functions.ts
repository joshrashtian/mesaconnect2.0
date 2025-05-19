"use server"

import { ClassType } from "@/app/(connect)/connect/builder/(buildercomponents)/ClassRelations";
import { gradeToGPA } from "./layout";

const times = ["Winter", "Spring", "Summer", "Fall"];
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


export async function calculateDeltaInfluence(gpaData: any) {
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
  gpaData?.forEach((d: any, i: any) => {
    const prevGPA = runningUnits ? runningTotal / runningUnits : d.gpa;
    runningTotal += gradeToGPA[d.grade as keyof typeof gradeToGPA] * d.units;
    runningUnits += d.units;
    const newGPA = runningTotal / runningUnits;

    result.push({
      ...d,
      influence: newGPA - prevGPA, // delta
    });
  });

  return result;
};

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
