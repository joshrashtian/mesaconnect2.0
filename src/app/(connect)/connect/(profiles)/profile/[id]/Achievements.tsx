"use client";
import React from "react";
import { useProfile } from "./ProfileContext";

const Achievements = () => {
  const profile = useProfile();
  return <div>{profile?.data?.major}</div>;
};

export default Achievements;
