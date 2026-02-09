import React, { useEffect, useState } from "react";
import { supabase } from "../../../../../../config/mesa-config";

export type ClassType = {
  id: string;
  num: number;
  category: string;
  name: string;
  units: number;
  semester: string;
  influence?: number | "N/A";
  grade: "A" | "B" | "C" | "D" | "F" | "P" | "NP" | "W" | "IP";
};

const ClassRelations = ({
  exist,
  onChange,
  onChangeClass,
  getClass,
  value,
}: {
  exist: boolean;
  onChange?: (e: string[]) => void;
  onChangeClass?: (e: ClassType[]) => void;
  getClass?: (e: ClassType) => void;
  value?: ClassType[];
}) => {
  const [classes, setClasses] = useState<ClassType[]>(value ? value : []);
  const [selectedClasses, setSelectedClasses] = useState<ClassType[]>([]);
  const [newSearch, setSearch] = useState<string>();
  if (!exist) return null;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (!selectedClasses) return;
    if (onChange) onChange(selectedClasses.map((e) => e.id));
    if (onChangeClass) onChangeClass(selectedClasses);
  }, [selectedClasses]);

  async function fetchClasses() {
    const { data, error } = await supabase
      // @ts-ignore
      .schema("information")
      //@ts-ignore
      .from("classes")
      .select();

    if (error) {
      console.log(error);
      return;
    } else setClasses(data as any[]);
  }

  const search = async (query: string | undefined) => {
    if (!query) {
      await fetchClasses();
      return null;
    }

    const { data, error } = await supabase
      // @ts-ignore
      .schema("information")
      //@ts-ignore
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
    //@ts-ignore
    setClasses(data);
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    fetchClasses();
  }, []);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2">
        <input
          className="min-w-0 flex-1 rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm text-zinc-900 placeholder-zinc-400 transition-colors focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-500"
          placeholder="Search classes..."
          value={newSearch ?? ""}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), search(newSearch))}
          type="search"
        />
        <button
          type="button"
          onClick={() => search(newSearch)}
          className="shrink-0 rounded-xl bg-orange-500 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 dark:ring-offset-zinc-900"
        >
          Search
        </button>
      </div>
      <ul className="max-h-48 overflow-y-auto rounded-xl border border-zinc-200 dark:border-zinc-600">
        {classes?.map((e, i) => (
          <li
            key={e.id ?? i}
            role="button"
            tabIndex={0}
            onClick={() => {
              selectedClasses.includes(e)
                ? setSelectedClasses(selectedClasses.filter((c) => c.id !== e.id))
                : setSelectedClasses([...selectedClasses, e]);
              if (getClass) getClass(e);
            }}
            onKeyDown={(ev) => {
              if (ev.key === "Enter" || ev.key === " ") {
                ev.preventDefault();
                selectedClasses.includes(e)
                  ? setSelectedClasses(selectedClasses.filter((c) => c.id !== e.id))
                  : setSelectedClasses([...selectedClasses, e]);
                if (getClass) getClass(e);
              }
            }}
            className={`border-b border-zinc-100 px-4 py-3 text-sm last:border-b-0 dark:border-zinc-600 ${
              selectedClasses.includes(e)
                ? "bg-orange-50 font-medium text-orange-800 dark:bg-orange-900/30 dark:text-orange-200"
                : "text-zinc-700 hover:bg-zinc-50 dark:text-zinc-300 dark:hover:bg-zinc-700/50"
            } cursor-pointer transition-colors`}
          >
            {e.category} {e.num}: {e.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClassRelations;
