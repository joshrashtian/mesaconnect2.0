"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ClassType } from "@/app/(connect)/connect/builder/(buildercomponents)/ClassRelations";
import {
  groupCoursesByYearAndSemester,
  calculateDeltaInfluence,
  sortByYear,
} from "./functions";
type GPAContextType = {
  gpa: {
    semester: string;
    gpa: number;
    courses: ClassType[];
    netAtTime: number;
  }[];
  setGpa: (
    gpa: {
      semester: string;
      gpa: number;
      courses: ClassType[];
      netAtTime: number;
    }[],
  ) => void;
  courses: any;
  setCourses: (courses: any) => void;
  coursesBySemester: Record<string, Record<string, ClassType[]>>;
  setCoursesBySemester: (
    coursesBySemester: Record<string, Record<string, ClassType[]>>,
  ) => void;
};

const GPAContext = createContext<GPAContextType>({
  gpa: [] as {
    semester: string;
    gpa: number;
    courses: ClassType[];
    netAtTime: number;
  }[],
  courses: {} as any,
  setGpa: (
    gpa: {
      semester: string;
      gpa: number;
      courses: ClassType[];
      netAtTime: number;
    }[],
  ) => {},
  coursesBySemester: {} as Record<string, Record<string, ClassType[]>>,
  setCoursesBySemester: (
    coursesBySemester: Record<string, Record<string, ClassType[]>>,
  ) => {},
  setCourses: (courses: any) => {},
});

export const useGPA = () => {
  const context = useContext(GPAContext);
  if (!context) {
    throw new Error("useGPA must be used within a GPAProvider");
  }
  return context;
};

export const gradeToGPA = {
  A: 4,
  B: 3,
  C: 2,
  D: 1,
  F: 0,
  P: 0,
  NP: 0,
  W: 0,
  I: 0,
  S: 0,
  U: 0,
} as const;

const GPAProvider = ({ children }: { children: React.ReactNode }) => {
  const [courses, setCourses] = useState<ClassType[]>([]);
  const [coursesBySemester, setCoursesBySemester] = useState<
    Record<string, Record<string, ClassType[]>>
  >({} as Record<string, Record<string, ClassType[]>>);
  const [gpa, setGpa] = useState<
    { semester: string; gpa: number; courses: ClassType[]; netAtTime: number }[]
  >([]);
  const [netGPA, setNetGPA] = useState<number>(0);
  const calculateGPA = async () => {
    if (!courses) return;

    let filter = courses.filter(
      (course: ClassType) =>
        course.grade !== "NP" &&
        course.grade !== "W" &&
        course.grade !== "IP" &&
        course.grade !== "P",
    );

    let influence = await calculateDeltaInfluence(filter);

    let sortedBySemester = await groupCoursesByYearAndSemester(influence);

    let semesters: {
      semester: string;
      gpa: number;
      courses: ClassType[];
      netAtTime: number;
    }[] = [];

    let totalGPA = 0;
    let totalUnits = 0;

    for (const year in sortedBySemester) {
      for (const semester in sortedBySemester[year]) {
        let courses = sortedBySemester[year][semester];
        let gpa =
          courses.reduce(
            (acc, course) =>
              acc +
              gradeToGPA[course.grade as keyof typeof gradeToGPA] *
                course.units,
            0,
          ) / courses.reduce((acc, course) => acc + course.units, 0);
        totalGPA +=
          gpa * courses.reduce((acc, course) => acc + course.units, 0);
        totalUnits += courses.reduce((acc, course) => acc + course.units, 0);
        semesters.push({
          semester: `${semester} ${year}`,
          gpa: gpa,
          courses: courses,
          netAtTime: totalGPA / totalUnits,
        });
        setNetGPA(totalGPA / totalUnits);
      }
    }

    setCoursesBySemester(sortedBySemester);
    return semesters;
  };

  useEffect(() => {
    calculateGPA().then((gpa) => {
      setGpa(gpa as any);
    });
  }, [courses]);

  return (
    <GPAContext.Provider
      value={{
        gpa,
        setGpa,
        courses,
        setCourses,
        setCoursesBySemester,
        coursesBySemester,
      }}
    >
      {children}
    </GPAContext.Provider>
  );
};

const _layout = ({ children }: { children: React.ReactNode }) => {
  return <GPAProvider>{children}</GPAProvider>;
};

export default _layout;
