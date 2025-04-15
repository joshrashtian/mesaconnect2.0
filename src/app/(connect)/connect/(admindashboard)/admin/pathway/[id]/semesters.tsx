"use client";

import { useEffect, useMemo, useState } from "react";
import { Pathway } from "../../PathwayBuilder";
import { ClassType } from "@/app/(connect)/connect/builder/(buildercomponents)/ClassRelations";
import { useModal } from "@/app/(connect)/connect/Modal";
import { supabase } from "../../../../../../../../config/mesa-config";
import { useUser } from "@/app/AuthContext";
import { IoTrash } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { GetClassBySearch } from "./GetClass";
import { Editor } from "@monaco-editor/react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/app/(connect)/InfoContext";
import { Separator } from "@/components/ui/separator";

const Semesters = ({
  semesters,
  classes,
  id,
}: {
  semesters: Pathway["pathway"];
  classes: any[];
  id: string;
}) => {
  const [classesMap, setClassesMap] = useState<Map<string, any>>(
    new Map(classes.map((e) => [e.id, e])),
  );

  const colors = useMemo(() => {
    return [
      "bg-red-500",
      "bg-blue-500",
      "bg-green-500",
      "bg-yellow-500",
      "bg-purple-500",
      "bg-orange-500",
    ];
  }, []);

  const [options, setOptions] = useState<any[] | null>(null);
  const [newSemester, setNewSemester] = useState<Pathway["pathway"]>(semesters);
  const [search, setSearch] = useState<string>("");
  const toast = useToast();
  async function getClasses() {
    const { data, error } = await supabase
      //@ts-ignore
      .schema("information")
      //@ts-ignore
      .from("classes")
      .select("*")
      .not("id", "in", `(${classes.map((e) => e.id).join(",")})`);

    if (error) {
      console.log(error);
    }
    setOptions(data);
  }

  useEffect(() => {
    getClasses();
  }, [semesters]);
  return (
    <div>
      <ol className="flex w-full flex-row items-center justify-center gap-2 rounded-md bg-zinc-200/30 p-2">
        <h4 className="my-4 text-lg font-semibold text-zinc-700">
          {newSemester?.semesters.length} semesters /{" "}
          {newSemester?.semesters.reduce(
            (acc, curr) => acc + curr.classes.length,
            0,
          )}{" "}
          classes /{" "}
          {newSemester?.semesters.reduce(
            (acc, curr) =>
              acc +
              curr.classes.reduce(
                (acc, curr) => acc + classesMap.get(curr.id)?.units,
                0,
              ),
            0,
          )}{" "}
          units
        </h4>
      </ol>
      <Separator />
      <header className="flex flex-col items-center justify-between rounded-md bg-zinc-200 p-3">
        <h1>Add Class</h1>
        <ol className="flex w-3/4 flex-row gap-2">
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for a class"
            className="w-full"
          />
          <Button
            className="w-32 bg-zinc-700"
            onClick={async () => {
              const { data, error } = await GetClassBySearch(search);
              setOptions(data);
            }}
          >
            Search
          </Button>
        </ol>
        <ol className="flex h-64 w-[95%] flex-col flex-wrap gap-2 overflow-x-scroll p-3">
          {options?.map((e) => (
            <motion.li
              className="group relative h-28 w-64 rounded-md bg-white/70 p-4 shadow-lg"
              key={e.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <p> {e.name}</p>
              <p>
                {e.category} {e.num}
              </p>
              <ol className="absolute bottom-0 left-0 flex w-full translate-y-1 flex-row justify-center gap-2 gap-3 opacity-0 duration-300 group-hover:-translate-y-2 group-hover:opacity-100">
                {Array.from({ length: newSemester?.semesters.length || 0 }).map(
                  (_, i) => (
                    <button
                      onClick={() => {
                        let newMap = new Map(classesMap);
                        newMap.set(e.id, e);

                        setClassesMap(newMap);

                        setNewSemester({
                          ...newSemester,
                          //@ts-ignore
                          semesters: newSemester?.semesters.map(
                            (a, newIndex) =>
                              newIndex === i
                                ? {
                                    ...a,
                                    classes: [
                                      ...a.classes,
                                      { id: e.id, type: "Major Prep" },
                                    ],
                                  }
                                : a,
                          ),
                        });
                      }}
                      key={i}
                      className={`flex h-5 w-5 flex-row items-center justify-center rounded-full text-white ${colors[i]}`}
                    >
                      <p>{i + 1}</p>
                    </button>
                  ),
                )}
              </ol>
            </motion.li>
          ))}
        </ol>
      </header>
      {newSemester?.semesters ? (
        newSemester?.semesters.map((e, i) => {
          let units = 0;
          e.classes.forEach((e) => {
            units += classesMap.get(e.id)?.units;
          });
          return (
            <div className="relative" key={i}>
              <h2 className="my-4 text-2xl font-bold">
                Semester {i + 1} - {units} units
              </h2>
              <button className="absolute right-2 top-2">
                <IoTrash />
              </button>
              <div className="flex flex-col gap-2">
                <AnimatePresence>
                  {e.classes && e.classes.length > 0 ? (
                    e.classes.map((e) => {
                      return (
                        <motion.div
                          className="flex w-full flex-row items-center justify-between rounded-md bg-white/30 p-4 shadow-lg"
                          key={e.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ul>
                            <h1 className="text-lg font-bold">
                              {classesMap.get(e.id)?.category}{" "}
                              {classesMap.get(e.id)?.num}
                            </h1>
                            <p className="text-sm text-zinc-500">
                              {classesMap.get(e.id)?.units} units
                            </p>
                          </ul>
                          <h2 className="text-lg font-light">
                            {classesMap.get(e.id)?.name}
                          </h2>
                          <button
                            onClick={() => {
                              setNewSemester({
                                ...newSemester,
                                //@ts-ignore
                                semesters: newSemester?.semesters.map(
                                  (a, index) =>
                                    index === i
                                      ? {
                                          ...a,
                                          classes: a.classes.filter(
                                            (b) => b.id !== e.id,
                                          ),
                                        }
                                      : a,
                                ),
                              });
                            }}
                          >
                            <IoTrash />
                          </button>
                        </motion.div>
                      );
                    })
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <p className="text-zinc-500">
                        No classes in this semester.
                      </p>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          );
        })
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <p>No semesters</p>
        </div>
      )}
      {newSemester?.semesters && newSemester?.semesters.length < 6 && (
        <button
          className="my-6 h-10 w-full rounded-md bg-zinc-200 p-2"
          onClick={() => {
            setNewSemester({
              ...newSemester,
              //@ts-ignore
              semesters: [
                ...newSemester?.semesters,
                {
                  classes: [],
                },
              ],
            });
          }}
        >
          Add New Semester
        </button>
      )}

      <Button
        onClick={async () => {
          const { data, error } = await supabase
            //@ts-ignore
            .from("pathway")
            //@ts-ignore
            .update({ pathway: newSemester })
            .eq("id", id);

          if (error) {
            toast.CreateErrorToast(error.message);
            return;
          }

          toast.CreateSuccessToast("Pathway updated");
        }}
      >
        Save
      </Button>
    </div>
  );
};

export default Semesters;
