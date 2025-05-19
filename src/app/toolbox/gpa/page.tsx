"use client";
import { ClassType } from "@/app/(connect)/connect/builder/(buildercomponents)/ClassRelations";
import React, { createContext, useContext, useEffect, useState } from "react";
import GPAChart from "./GPAChart";
import { Button } from "@/components/ui/button";
import { supabase } from "../../../../config/mesa-config";
import { useUser } from "@/app/AuthContext";
import { useGPA } from "./layout";

const GPACalculator = () => {
  const { courses, setCourses, coursesBySemester, gpa } = useGPA();
  const { user } = useUser();
  return (
    <div className="flex flex-col items-center justify-center font-eudoxus">
      <h1 className="text-2xl font-bold">GPACalculator</h1>
      <GPAChart />
      <Button
        onClick={async () => {
          const { data, error } = await supabase
            .from("transcripts")
            .select("*")
            .eq("userid", user?.id ?? "");

          if (error) {
            console.error(error);
          } else {
            //@ts-ignore
            setCourses(data);
          }
        }}
      >
        Import Classes
      </Button>

      <pre>{JSON.stringify(coursesBySemester, null, 2)}</pre>
    </div>
  );
};

export default GPACalculator;
