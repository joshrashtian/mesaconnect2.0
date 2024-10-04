"use client";

import { MenuContext } from "@/app/(connect)/InfoContext";
import { userContext } from "@/app/AuthContext";
import { useContext, useEffect, useMemo, useState } from "react";
import { ChangeSections } from "./ChangeIndex";
import Input from "@/_components/Input";
import { IoPencil } from "react-icons/io5";

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
    <main className="flex flex-col gap-3">
      <h1 className="text-3xl font-bold">Skills Section</h1>
      <Input
        contentEditable
        value={skills}
        onChange={(e: any) => {
          setSkills(e.target.value);
        }}
        icon={<IoPencil />}
        placeholder="premiere pro, java, etc."
      />
      <ul className="flex w-full flex-row flex-wrap gap-3">
        {preview &&
          preview.map((e: string, index: number) => {
            return (
              <div
                key={index}
                className="bg-slate-white h-12 rounded-full p-3 px-5 text-xl shadow-lg duration-300 hover:scale-105 hover:shadow-sm focus:outline-none"
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
        className={`w-full rounded-full p-3 ${
          !preview || preview.length < 2
            ? "bg-slate-200"
            : "bg-orange-500 text-white"
        } duration-300`}
      >
        <p>Submit</p>
      </button>
    </main>
  );
};

export default SkillsSection;
