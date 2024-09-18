"use client";

import React, { useMemo } from "react";

const temp = [
  "College of the Canyons Canyon Country",
  "College of the Canyons",
];

const AutocompleteCampus = ({
  input,
  onChange,
}: {
  input: string;
  onChange: any;
}) => {
  const results = useMemo(() => {
    return temp
      .filter((x) => x.toLowerCase().includes(input ? input.toLowerCase() : ""))
      .splice(0, 3);
  }, [input]);

  return (
    <section className="-z-10 flex flex-col items-center justify-center rounded-b-xl bg-white shadow-md dark:bg-zinc-600">
      <h1 className="mt-3 font-semibold">Campuses</h1>
      <ul className="flex w-full flex-row px-2">
        {results.length > 0 ? (
          results.map((value: string) => (
            <ul
              key={value}
              onClick={() => {
                onChange(value);
              }}
              className="group w-full cursor-pointer p-3 text-center duration-300 hover:scale-105"
            >
              <h1 className="">{value}</h1>
            </ul>
          ))
        ) : (
          <h1>No Results.</h1>
        )}
      </ul>
    </section>
  );
};

export default AutocompleteCampus;
