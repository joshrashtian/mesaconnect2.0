"use client";

import { MenuContext } from "@/app/(connect)/InfoContext";
import { userContext } from "@/app/AuthContext";
import { useContext, useEffect, useMemo, useState } from "react";
import { ChangeSections } from "./ChangeIndex";

const SkillsSection = () => {
  const [skills, setSkills] = useState<string | undefined>();
  const [preview, setPreview] = useState<string[]>();

  const user = useContext<any>(userContext);
  const toast = useContext<any>(MenuContext);

  useEffect(() => {
    const getSkillsIntital = async () => {
      if (!user) return;
      const boxlist = user.userData?.boxlist;
      boxlist?.map((e: any) => {
        if (e.type === "skills") {
          setSkills(e.skills.join(", "));
        }
      });
    };

    getSkillsIntital();
  }, [user]);

  useMemo(() => {
    const newPreview = skills?.split(",");
    setPreview(newPreview);
  }, [skills]);

  const changeSkills = async () => {
    if (!skills) {
      console.log("Missing something...");
      return;
    }
    if (!user.userData) return;

    const json = {
      type: "skills",
      skills: preview,
    };
    ChangeSections(user.userData, "skills", json);
  };
  return (
    <main className="gap-3 flex flex-col">
      <h1 className="font-bold text-3xl">Skills Section</h1>
      <input
        contentEditable
        value={skills}
        onChange={(e: any) => {
          setSkills(e.target.value);
        }}
        className="p-2 px-4 w-full shadow-lg"
        placeholder="premiere pro, java, etc."
      />
      <ul className="flex flex-row flex-wrap gap-3 w-full">
        {preview &&
          preview.map((e: string, index: number) => {
            return (
              <div
                key={index}
                className="bg-slate-white shadow-lg text-xl focus:outline-none hover:shadow-sm hover:scale-105 duration-300 w-48 rounded-full px-5 p-3"
              >
                {e}
              </div>
            );
          })}
      </ul>
      <button
        onClick={() => {
          toast.toast("Skills Has Been Updated!", "success");
          changeSkills();
        }}
        className={`p-3 w-full rounded-full ${
          !preview || preview.length < 2
            ? "bg-slate-200"
            : "bg-orange-500 text-white"
        } duration-300 `}
      >
        <p>Submit</p>
      </button>
    </main>
  );
};

export default SkillsSection;
