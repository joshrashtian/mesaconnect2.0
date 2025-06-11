"use server";
import TeacherSearch from "./[id]/TeacherSearch";
import React from "react";

const TeacherLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <TeacherSearch />
      {children}
    </div>
  );
};

export default TeacherLayout;
