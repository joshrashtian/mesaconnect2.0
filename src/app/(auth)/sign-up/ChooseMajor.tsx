"use client";

import React, { useCallback, useEffect, useState } from "react";

export const majors = [
  "Anthropology",
  "Architecture",
  "Art",
  "Art Gallery",
  "Athletics Department",
  "Automotive",
  "Biology",
  "Business",
  "Computer Applications & Web Technologies",
  "Certified Nursing Assistant",
  "Chemistry",
  "Cinema",
  "Communication Studies",
  "Community Ed",
  "Computer Science",
  "Construction Technology",
  "Culinary Arts",
  "Dance",
  "Earth, Space and Environmental Sciences",
  "Early Childhood Education",
  "ECE Center",
  "Economics",
  "Electronic Systems",
  "EMT",
  "Engineering",
  "English",
  "ESL",
  "Fire Technology",
  "Graphic and Multimedia Design ",
  "Health Science",
  "History",
  "Hotel Restaurant",
  "Humanities",
  "Interior Design",
  "Kinesiology and Physical Education ",
  "Manufacturing Technology",
  "Mathematics",
  "Media Entertainment Arts",
  "Medical Laboratory Technician",
  "Modern Languages & Cultures",
  "Music",
  "Networking",
  "Nursing",
  "Paralegal",
  "Philosophy",
  "Photography",
  "Physics",
  "Political Science",
  "Psychology",
  "Real Estate",
  "Recreation Management",
  "Sign Language",
  "Sociology",
  "Sports Medicine",
  "Surveying",
  "Theatre",
  "Water",
  "Welding",
];

const ChooseMajor = ({
  onChangeMajor,
}: {
  onChangeMajor: (major: string) => void;
}) => {
  const [selected, setSelected] = useState("");

  useEffect(() => {
    onChangeMajor(selected);
  }, [selected]);

  return (
    <>
      <h1 className="font-eudoxus">And lastly, we need to know your major.</h1>
      <div className="w-full h-16 flex flex-row ">
        <ul className="overflow-x-scroll text-nowrap no-scrollbar flex items-center flex-row gap-6">
          {majors.map((major) => (
            <button
              key={major}
              onClick={() => {
                setSelected(major);
              }}
              className={`p-3 px-10 rounded-xl focus:shadow-lg  duration-500 ${
                major === selected
                  ? "bg-slate-400 text-white"
                  : " hover:bg-slate-300 "
              } font-eudoxus bg-slate-200 w-full`}
            >
              <h2 className="text-xl">{major}</h2>
            </button>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ChooseMajor;
