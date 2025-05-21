"use client";
import { ClassType } from "@/app/(connect)/connect/builder/(buildercomponents)/ClassRelations";
import React, { createContext, useContext, useEffect, useState } from "react";
import GPAChart from "./GPAChart";
import { Button } from "@/components/ui/button";
import { supabase } from "../../../../config/mesa-config";
import { useUser } from "@/app/AuthContext";
import { useGPA } from "./layout";
import GPAList from "./GPAList";
import dynamic from "next/dynamic";
import Saves from "./saves";
import Statistics from "./Statistics";
const GPACalculator = () => {
  const { courses, setCourses, coursesBySemester, gpa } = useGPA();
  const { user } = useUser();

  const AddClass = dynamic(() => import("./AddClass"), { ssr: false });

  return (
    <div className="flex flex-col p-7 font-eudoxus">
      <h1 className="mb-5 text-2xl font-bold">GPACalculator</h1>
      <GPAChart />

      <div className="grid grid-cols-1 gap-2 lg:grid-cols-2 2xl:grid-cols-3">
        <AddClass />
        <GPAList />
        <Saves />
        <Statistics />
      </div>
    </div>
  );
};

export default GPACalculator;
