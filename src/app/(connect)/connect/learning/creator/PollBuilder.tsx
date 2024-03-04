"use client";
import React, { useRef, useState } from "react";

const PollBuilder = () => {
  const [poll, setPoll] = useState();
  const [options, setOptions] = useState<any[]>([]);
  const [context, setContext] = useState();

  const contextRef: any = useRef();

  return (
    <main className="h-full w-full flex flex-col gap-5">
      <input
        type="text"
        className="p-2 px-5 w-full rounded-full"
        placeholder="Question"
        contentEditable
      />
      {context ? (
        <>
          <h2 className="font-mono my-4">Context:</h2>
          <ul className="p-2 bg-slate-200 rounded-full w-1/3 flex justify-center">
            <h1 className="text-slate-700 font-mono">{context?.name}</h1>
          </ul>
        </>
      ) : (
        <button
          onClick={() => {
            contextRef.current.click();
          }}
          className="p-4 w-full border-2 rounded-xl border-slate-500 border-dashed"
        >
          <h1 className="font-mono text-slate-600">
            + Add Context ( Images / PDF )
          </h1>
        </button>
      )}
      <button />
      <input
        type="file"
        onChange={(e) => {
          setContext(e.target.files[0]);
        }}
        ref={contextRef}
        hidden
      />
      <section className="w-full flex flex-row flex-wrap gap-3 ">
        {options &&
          options.map((e, i) => {
            return (
              <ul
                className="w-[49%] h-32 p-4 flex flex-col justify-center items-center shadow-sm bg-slate-200 rounded-xl"
                key={i}
              >
                <input
                  type="text"
                  className=" bg-transparent "
                  onChange={(e) => {
                    setOptions((options) =>
                      options?.map((d, j) => {
                        if (j === i) {
                          return e.target.value;
                        } else {
                          return d;
                        }
                      })
                    );
                  }}
                  className="p-2 px-5 w-full rounded-full"
                  placeholder="Option"
                  contentEditable
                />
              </ul>
            );
          })}
        <button
          onClick={() => {
            setOptions((options) => [...options, ""]);
          }}
          className="w-[49%] h-32 p-4 flex justify-center items-center border-2 rounded-xl border-slate-500 border-dashed "
        >
          <h1>Create New Option</h1>
        </button>
      </section>
    </main>
  );
};

export default PollBuilder;
