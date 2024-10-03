"use client";
import { useUser } from "@/app/AuthContext";
import React from "react";

const BottomOnboarding = () => {
  const { user, userData: data } = useUser();
  return <main className="h-screen">{data?.real_name}</main>;
};

export default BottomOnboarding;
