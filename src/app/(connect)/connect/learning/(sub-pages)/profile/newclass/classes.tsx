"use client";
import { ClassType } from "@/app/(connect)/connect/builder/(buildercomponents)/ClassRelations";
import React, { useState } from "react";
import { supabase } from "../../../../../../../../config/mesa-config";
import { useModal } from "@/app/(connect)/connect/Modal";
import { useToast } from "@/app/(connect)/InfoContext";
import { useRouter } from "next/navigation";
import { IoBook, IoSearchOutline } from "react-icons/io5";
import { IconGet } from "./CategoryIndex";

const ClassesRegister = ({ classes }: { classes: ClassType[] }) => {
  const [filter, setFilter] = useState(classes);
  const [newSearch, setSearch] = useState<string>();
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
      <ul className="flex flex-row mb-5 gap-3 w-full">
        <input
          className="p-4 shadow-md font-eudoxus focus:outline-none hover:scale-[1.01] focus:scale-[1.01] duration-300 w-full rounded-2xl px-6"
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
          className="p-4 w-26 scale-100 rounded-2xl font-eudoxus hover:rounded-md bg-gradient-to-br from-red-500 to-amber-600 hover:bg-indigo-700 text-white hover:scale-110 duration-300 font-bold"
        >
          <IoSearchOutline
            size={26}
            color="#FFF"
            className="drop-shadow-2xl
          "
          />
        </button>
      </ul>
      <article className="flex flex-col gap-2">
        {filter.map((e) => (
          <div
            className={`p-4 flex-row flex items-center gap-3 cursor-pointer bg-white font-eudoxus hover:scale-[1.01] active:scale-[0.99] rounded-2xl duration-300`}
            onClick={() => CreateModal(<ClassModal c={e} />)}
            key={e.id}
          >
            <ul className="text-2xl p-2 bg-slate-100 rounded-full">
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
    <section className="flex flex-col h-full justify-between">
      <header>
        <h1 className="font-eudoxus font-bold text-2xl">{c.name}</h1>
        <h2 className="font-eudoxus text-lg  text-slate-400">
          {c.category}-{c.num}
        </h2>
      </header>
      <section className="flex flex-col gap-1.5 my-3">
        <input
          className="p-3 w-full bg-zinc-50 border-slate-200 outline-slate-400 rounded-2xl border-2 font-eudoxus "
          onChange={(e) => {
            setRecord({ ...record, teacher: e.target.value });
          }}
        />
        <div className="w-full flex flex-row gap-2">
          {["A", "B", "C", "D", "F", "P", "IP", "W"].map((value) => (
            <button
              key={value}
              onClick={() => {
                setRecord({ ...record, grade: value });
              }}
              className="bg-slate-200 hover:bg-slate-300 font-geist font-light p-1 px-3 rounded-full hover:scale-105 duration-300"
            >
              <h1>{value}</h1>
            </button>
          ))}
        </div>
        <div className="w-full flex flex-row gap-2">
          {["Spring", "Fall", "Summer", "Winter"].map((value) => (
            <button
              key={value}
              onClick={() => {
                setRecord({
                  ...record,
                  semester: { ...record?.semester, a: value },
                });
              }}
              className="bg-slate-200 hover:bg-slate-300 font-geist font-light p-1 px-3 rounded-full hover:scale-105 duration-300"
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
            className="p-1 px-3 w-full bg-zinc-50 border-slate-200 outline-slate-400 rounded-2xl border-2 font-eudoxus "
          />
        </div>
      </section>
      <footer className="font-mono flex flex-col gap-3">
        <section className="p-2 px-5 bg-slate-200 rounded-xl">
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
              className=" cursor-pointer bg-gradient-to-br p-2 from-theme-blue to-theme-blue-2 hover:drop-shadow-lg hover:bg-orange-400 hover:scale-105 hover:shadow-md duration-500 h-full rounded-xl hover:rounded-lg w-32"
            >
              <h2 className="font-bold font-eudoxus text-white">Submit</h2>
            </button>
          )}
      </footer>
    </section>
  );
};

export default ClassesRegister;
