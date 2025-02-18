"use server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import React from "react";
import { cookies } from "next/headers";
import { IconGet } from "../../learning/(sub-pages)/profile/newclass/CategoryIndex";
import { IoBook, IoSchool } from "react-icons/io5";
import RateMyProfessors from "./RateMyProfessors";
const ClassPage = async ({ params }: { params: { id: string } }) => {
  const supabase = createServerComponentClient({ cookies });
  const { data: classInfo, error } = await supabase
    .schema("information")
    .from("classes")
    .select("*")
    .eq("id", params.id)
    .single();

  const { data: sections, error: sectionsError } = await supabase
    .from("userclasses")
    .select("*")
    .match({
      classid: params.id,
      userid: (await supabase.auth.getUser()).data.user?.id,
    });

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <main className="flex flex-col gap-4">
      <header className="">
        <h1 className="flex flex-row items-center gap-2 text-5xl font-black">
          {IconGet(classInfo?.category)}
          {classInfo?.name}
        </h1>
        <p className="text-xl font-semibold">{classInfo?.college}</p>
      </header>
      {sections && sections.length > 0 && (
        <section className="flex flex-col gap-4 rounded-lg bg-white p-4">
          <h3 className="font-bold">Your Sections</h3>
          <ol className="flex flex-row flex-wrap gap-2">
            {sections?.map((section) => (
              <div
                className="flex w-48 flex-col gap-0.5 rounded-lg bg-zinc-100 p-5"
                key={section.id}
              >
                <h4 className="font-bold">{section.semester}</h4>
                <h5 className="text-sm font-light">
                  {section.teacher} - {section.grade}
                </h5>
              </div>
            ))}
          </ol>
        </section>
      )}
      <div className="flex flex-col gap-2 rounded-lg bg-white p-8">
        <h3 className="text-2xl font-bold">Class Information</h3>
        <p className="text-lg font-light">
          {classInfo.about ?? "There is no description for this class (yet)..."}
        </p>
        <div className="flex flex-row gap-2">
          <div className="flex flex-row items-center gap-2 rounded-lg bg-zinc-100 p-2 p-4">
            <IoSchool />
            {classInfo.college}
          </div>
          <div className="flex flex-row items-center gap-2 rounded-lg bg-zinc-100 p-2 p-4">
            <IoBook />
            {classInfo.units} Units
          </div>
        </div>
      </div>
      <RateMyProfessors classInfo={classInfo} />
    </main>
  );
};

export default ClassPage;
