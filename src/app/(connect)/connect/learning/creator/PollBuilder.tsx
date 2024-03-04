"use client";
import React, { useRef, useState } from "react";

const PollBuilder = () => {
  const [poll, setPoll] = useState();
  const [options, setOptions] = useState<any[]>([]);
  const [context, setContext] = useState<File>();
  const [correct, setCorrect] = useState<number | undefined>();

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
          <section>
            {context.type.includes("image/") && (
              <img src={URL.createObjectURL(context)} className=" w-28 " />
            )}
            <ul className="p-2 px-5 bg-slate-200 rounded-full w-1/3 flex justify-between items-center">
              <p />
              <h1 className="text-slate-700 font-mono">{context?.name}</h1>
              <button
                onClick={() => {
                  setContext(undefined);
                }}
                className="font-mono text-red-600"
              >
                x
              </button>
            </ul>
          </section>
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
          if (!e.target.files) return;
          setContext(e.target?.files[0]);
        }}
        accept=".jpg, .png, .jpeg, .gif, .pdf"
        ref={contextRef}
        hidden
      />
      <section className="w-full flex flex-row flex-wrap gap-3 ">
        {options &&
          options.map((e, i) => {
            return (
              <ul
                className={`${
                  i === correct ? "bg-green-200" : "bg-zinc-200"
                } w-[49%] duration-500 h-32 p-4 flex flex-row justify-center items-center shadow-sm  rounded-xl`}
                key={i}
              >
                <h1
                  onClick={() => {
                    correct != i ? setCorrect(i) : setCorrect(undefined);
                  }}
                  className={`text-2xl ${
                    i === correct ? "text-green-800" : "text-teal-600"
                  } `}
                >
                  {i + 1}
                </h1>
                <input
                  type="text"
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
                  className="p-2 px-5 w-full text-2xl text-zinc-600 rounded-full outline-none bg-transparent"
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
          <h1 className="font-mono">Create New Option</h1>
        </button>
      </section>
      <section className="w-full flex justify-center">
        <button onClick={() => {}}>
          <h1>Submit</h1>
        </button>
      </section>
    </main>
  );
};

export default PollBuilder;
