"use client";
import { ClassType } from "@/app/(connect)/connect/builder/(buildercomponents)/ClassRelations";
import React, { useState } from "react";
import { supabase } from "../../../../../../../../config/mesa-config";
import { useModal } from "@/app/(connect)/connect/Modal";
import { useToast } from "@/app/(connect)/InfoContext";
import { useRouter } from "next/navigation";
import { IoBook, IoSearchOutline } from "react-icons/io5";
import { IconGet } from "./CategoryIndex";
import { Button } from "@/components/ui/button";

const ClassesRegister = ({ classes }: { classes: ClassType[] }) => {
  const [filter, setFilter] = useState(classes);
  const [newSearch, setSearch] = useState<string>();
  const [selected, setSelected] = useState<string>("");
  const { CreateModal } = useModal();

  const search = async (query: string | undefined) => {
    if (!query) {
      setFilter(classes);
      return null;
    }
    const { data, error } = await supabase
      //@ts-ignore
      .schema("information")
      .from("classes")
      .select()
      .limit(3)
      .textSearch("name", query, {
        type: "websearch",
        config: "english",
      });
    if (error) {
      console.log(error);
      return;
    }
    setFilter(data);
  };

  return (
    <div>
      <ul className="mb-5 flex w-full flex-row gap-3">
        <input
          className="w-full rounded-2xl p-4 px-6 font-eudoxus shadow-md duration-300 hover:scale-[1.01] focus:scale-[1.01] focus:outline-none"
          placeholder="Enter Class Name..."
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          type="search"
        />
        <button
          onClick={() => {
            search(newSearch);
          }}
          className="w-26 scale-100 rounded-2xl bg-gradient-to-br from-red-500 to-amber-600 p-4 font-eudoxus font-bold text-white duration-300 hover:scale-110 hover:rounded-md hover:bg-indigo-700"
        >
          <IoSearchOutline size={26} color="#FFF" className="drop-shadow-2xl" />
        </button>
      </ul>
      <article className="flex flex-col gap-2">
        <ol className="flex flex-row gap-1 rounded-lg bg-zinc-200/80 p-2 px-6">
          {["CMPSCI", "MATH", "ENG", "PHYSIC", "BIOSCI"].map((classType) => (
            <Button
              key={classType}
              className={`${selected === classType && "bg-zinc-600"}`}
              onClick={() => {
                if (selected === classType) {
                  setSelected("");
                  return;
                }
                setSelected(classType);
              }}
            >
              {classType}
            </Button>
          ))}
        </ol>
        {filter
          .filter((e) =>
            e.category.toLowerCase().includes(selected?.toLowerCase()),
          )
          .map((e) => (
            <div
              className={`flex cursor-pointer flex-row items-center gap-3 rounded-2xl bg-white p-4 font-eudoxus duration-300 hover:scale-[1.01] active:scale-[0.99]`}
              onClick={() => CreateModal(<ClassModal c={e} />)}
              key={e.id}
            >
              <ul className="rounded-full bg-slate-100 p-2 text-2xl">
                {IconGet(e.category)}
              </ul>
              <ul>
                <h1 className="font-black">
                  {e.category}-{e.num}
                </h1>
                <h2 className="font-light text-slate-700">{e.name}</h2>
              </ul>
            </div>
          ))}
      </article>
    </div>
  );
};

const ClassModal = ({ c }: { c: ClassType }) => {
  const [record, setRecord] = useState<{
    teacher?: string;
    grade?: string;
    semester?: { a?: string; b?: Number };
  }>();

  const { DisarmModal } = useModal();

  const { CreateSuccessToast, CreateErrorToast } = useToast();

  const router = useRouter();

  const submit = async () => {
    const { error } = await supabase.from("userclasses").insert({
      classid: c.id,
      teacher: record?.teacher,
      grade: record?.grade,
      semester: `${record?.semester?.a} ${record?.semester?.b}`,
    });
    if (error) {
      console.error(error);
      CreateErrorToast(error.message);
      return;
    }
    CreateSuccessToast("Successfully Added Course!");
    DisarmModal();
    router.push("/connect/learning/profile");
  };

  return (
    <section className="flex h-full flex-col justify-between">
      <header>
        <h1 className="font-eudoxus text-2xl font-bold">{c.name}</h1>
        <h2 className="font-eudoxus text-lg text-slate-400">
          {c.category}-{c.num}
        </h2>
      </header>
      <section className="my-3 flex flex-col gap-1.5">
        <input
          className="w-full rounded-2xl border-2 border-slate-200 bg-zinc-50 p-3 font-eudoxus outline-slate-400"
          onChange={(e) => {
            setRecord({ ...record, teacher: e.target.value });
          }}
        />
        <div className="flex w-full flex-row gap-2">
          {["A", "B", "C", "D", "F", "P", "IP", "W"].map((value) => (
            <button
              key={value}
              onClick={() => {
                setRecord({ ...record, grade: value });
              }}
              className="rounded-full bg-slate-200 p-1 px-3 font-geist font-light duration-300 hover:scale-105 hover:bg-slate-300"
            >
              <h1>{value}</h1>
            </button>
          ))}
        </div>
        <div className="flex w-full flex-row gap-2">
          {["Spring", "Fall", "Summer", "Winter"].map((value) => (
            <button
              key={value}
              onClick={() => {
                setRecord({
                  ...record,
                  semester: { ...record?.semester, a: value },
                });
              }}
              className="rounded-full bg-slate-200 p-1 px-3 font-geist font-light duration-300 hover:scale-105 hover:bg-slate-300"
            >
              <h1>{value}</h1>
            </button>
          ))}
          <input
            maxLength={4}
            minLength={1}
            contentEditable
            onChange={(e) => {
              setRecord({
                ...record,
                semester: {
                  ...record?.semester,
                  b: parseInt(e.target.value),
                },
              });
            }}
            className="w-full rounded-2xl border-2 border-slate-200 bg-zinc-50 p-1 px-3 font-eudoxus outline-slate-400"
          />
        </div>
      </section>
      <footer className="flex flex-col gap-3 font-mono">
        <section className="rounded-xl bg-slate-200 p-2 px-5">
          <p>{record?.teacher}</p> <p>{record?.grade}</p>{" "}
          <p>
            {record?.semester?.a} {record?.semester?.b?.toString()}
          </p>
        </section>
        {record?.teacher &&
          record?.grade &&
          record?.semester?.a &&
          record?.semester?.b && (
            <button
              onClick={() => {
                submit();
              }}
              className="h-full w-32 cursor-pointer rounded-xl bg-gradient-to-br from-theme-blue to-theme-blue-2 p-2 duration-500 hover:scale-105 hover:rounded-lg hover:bg-orange-400 hover:shadow-md hover:drop-shadow-lg"
            >
              <h2 className="font-eudoxus font-bold text-white">Submit</h2>
            </button>
          )}
      </footer>
    </section>
  );
};

export default ClassesRegister;
