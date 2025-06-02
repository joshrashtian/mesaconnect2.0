"use client";
import React, {
  createContext,
  Suspense,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ClassType } from "@/app/(connect)/connect/builder/(buildercomponents)/ClassRelations";
import {
  calculateDeltaInfluence,
  groupCoursesByYearAndSemester,
  sortBySemester,
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
  netGPA: number;
  setNetGPA: (netGPA: number) => void;
  AddClassToSemester: (course: ClassType) => void;
  omittedCourses: ClassType[];
  setOmittedCourses: (omittedCourses: ClassType[]) => void;
  RemoveClassFromSemester: (course: ClassType) => void;
  omitClass: (course: ClassType) => void;
  unOmitClass: (course: ClassType) => void;
  AddClassesToSemester: (courses: ClassType[]) => void;
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
  netGPA: 0,
  setNetGPA: (netGPA: number) => {},
  AddClassToSemester: (course: ClassType) => {},
  omittedCourses: [] as ClassType[],
  setOmittedCourses: (omittedCourses: ClassType[]) => {},
  RemoveClassFromSemester: (course: ClassType) => {},
  omitClass: (course: ClassType) => {},
  unOmitClass: (course: ClassType) => {},
  AddClassesToSemester: (courses: ClassType[]) => {},
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
  const [omittedCourses, setOmittedCourses] = useState<ClassType[]>([]);
  const [coursesBySemester, setCoursesBySemester] = useState<
    Record<string, Record<string, ClassType[]>>
  >({} as Record<string, Record<string, ClassType[]>>);
  const [gpa, setGpa] = useState<
    { semester: string; gpa: number; courses: ClassType[]; netAtTime: number }[]
  >([]);
  const [netGPA, setNetGPA] = useState<number>(0);
  const calculateGPA = async () => {
    if (!courses) return;
    const dedupedCourses = Array.from(
      new Map(courses.map((c) => [c.name + c.semester, c])).values(),
    );

    console.log(
      "Course units:",
      courses.map((c) => ({ name: c.name, units: c.units })),
    );

    let sortedCourses = await sortBySemester(dedupedCourses);
    let influence = await calculateDeltaInfluence(
      sortedCourses,
      omittedCourses,
    );

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
        const courses = sortedBySemester[year][semester];
        if (courses.length === 0) continue;

        const filteredCourses = courses.filter(
          (course) =>
            course.units > 0 &&
            gradeToGPA[course.grade as keyof typeof gradeToGPA] !== undefined &&
            !["NP", "W", "IP", "P"].includes(course.grade) &&
            !omittedCourses.find((c) => c.name === course.name),
        );

        const semesterUnits = filteredCourses.reduce(
          (acc, c) => acc + c.units,
          0,
        );
        if (semesterUnits === 0) continue;

        const semesterGradePoints = filteredCourses.reduce(
          (acc, course) =>
            acc +
            gradeToGPA[course.grade as keyof typeof gradeToGPA] * course.units,
          0,
        );

        const semesterGPA = semesterGradePoints / semesterUnits;

        totalGPA += semesterGradePoints;
        totalUnits += semesterUnits;

        const netAtTime = totalGPA / totalUnits;

        semesters.push({
          semester: `${semester} ${year}`,
          gpa: Number(semesterGPA.toFixed(3)),
          courses,
          netAtTime: Number(netAtTime.toFixed(3)),
        });
      }
    }
    const finalNetGPA = totalUnits > 0 ? totalGPA / totalUnits : 0;
    console.log("Final Net GPA:", finalNetGPA, totalGPA, totalUnits);
    setNetGPA(finalNetGPA);

    setCoursesBySemester(sortedBySemester);
    return semesters;
  };

  useEffect(() => {
    calculateGPA().then((gpa) => {
      setGpa(gpa as any);
    });
  }, [courses, omittedCourses]);

  function AddClassToSemester(course: ClassType) {
    setCourses((prev) => [...prev, course]);
  }

  function AddClassesToSemester(courses: ClassType[]) {
    setCourses((prev) => [...prev, ...courses]);
  }

  function unOmitClass(course: ClassType) {
    setOmittedCourses(omittedCourses.filter((c) => c.id !== course.id));
  }

  function omitClass(course: ClassType) {
    setOmittedCourses([...omittedCourses, course]);
  }

  function RemoveClassFromSemester({
    id,
    name,
  }: {
    id?: string;
    name?: string;
  }) {
    if (id) {
      setCourses(courses.filter((c) => c.id !== id));
    } else if (name) {
      setCourses(courses.filter((c) => c.name !== name));
    }
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <GPAContext.Provider
        value={{
          gpa,
          setGpa,
          courses,
          setCourses,
          setCoursesBySemester,
          coursesBySemester,
          netGPA,
          setNetGPA,
          AddClassToSemester,
          omittedCourses,
          setOmittedCourses,
          RemoveClassFromSemester,
          omitClass,
          unOmitClass,
          AddClassesToSemester,
        }}
      >
        {children}
      </GPAContext.Provider>
    </Suspense>
  );
};

export default GPAProvider;
