import React from "react";
import { IoBookSharp } from "react-icons/io5";
import ClassPicker from "./ClassPicker";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your Courses | MESA Connect",
};

const ProfileLearning = () => {
  return (
    <main>
      <IoBookSharp
        size={70}
        className="duration-300 hover:scale-105 hover:text-indigo-500"
      />
      <h1 className="z-10 gap-3 text-center font-eudoxus text-3xl font-black text-indigo-900 drop-shadow-2xl duration-300 md:text-4xl lg:text-left lg:text-6xl dark:text-pink-400/70">
        Learning Profile
      </h1>
      <ClassPicker />
    </main>
  );
};

export default ProfileLearning;
