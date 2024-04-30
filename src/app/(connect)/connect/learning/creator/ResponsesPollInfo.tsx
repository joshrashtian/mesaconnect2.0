"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { supabase } from "../../../../../../config/mesa-config";
import Link from "next/link";

type Response = {
  response_id: string;
  time_responsed: Date;
  responder_id: string;
  response: number;
  question_id: string;
  responder_name: string;
};
const ResponsesPollInfo = ({
  id,
  options,
}: {
  id: string;
  options: string[];
}) => {
  const [data, setData] = useState<Response[]>();
  const [filter, setFilter] = useState<string>();
  const [filtered, setFiltered] = useState<Response[]>();

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("questionRepsonses")
        .select()
        .eq("question_id", id);

      if (error) {
        console.error(error);
        return;
      }

      setData(data);
      setFiltered(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!filter) {
      setFiltered(data);
      return;
    }
    setFiltered(data?.filter((e) => options[e.response] === filter));
  }, [filter]);

  if (!data) return;
  if (data.length === 0) return <h1>There is no responses (yet).</h1>;

  return (
    <section className="p-5 px-5 h-40 rounded-2xl shadow-md bg-opacity-15 bg-gray-200 justify-between flex flex-col">
      <section className="flex flex-row items-center font-eudoxus gap-10">
        <h1 className="text-xl font-bold">Replies</h1>
        <ul className="flex flex-row gap-3 items-center">
          <ul
            onClick={() => {
              setFilter(undefined);
            }}
            className="px-2 py-0.5 text-center border-2 hover:bg-gray-200 duration-300 rounded-xl cursor-pointer"
          >
            Clear Filter
          </ul>

          {options.map((e) => {
            return (
              <ul
                key={e}
                onClick={() => {
                  setFilter(e);
                }}
                className={`px-2 py-0.5 text-center hover:bg-gray-200 duration-300 rounded-xl cursor-pointer ${
                  filter === e && "font-bold"
                }`}
              >
                {e}
              </ul>
            );
          })}
        </ul>
      </section>
      <section className="overflow-x-scroll flex gap-2 p-1 no-scrollbar">
        {filtered?.map((response: Response, i: number) => (
          <ul
            key={i}
            className="p-2 h-20 w-36 shadow-md justify-center flex flex-col items-center text-center overflow-hidden bg-white rounded-xl"
          >
            <h1 className="font-eudoxus">
              <Link href={`/connect/profile/${response.responder_id}`}>
                {response.responder_name}
              </Link>
              {"\n"}
              <span className="font-mono">{options[response.response]} </span>
            </h1>
          </ul>
        ))}
      </section>
    </section>
  );
};

export default ResponsesPollInfo;
