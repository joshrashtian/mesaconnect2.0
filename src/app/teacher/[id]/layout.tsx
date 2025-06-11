"use server";
import TeacherSearch from "./TeacherSearch";
import React from "react";

const TeacherLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-gradient-to-b from-orange-50 to-white">
      <TeacherSearch />
      {children}
    </div>
  );
};

export default TeacherLayout;
