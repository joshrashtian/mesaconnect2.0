"use client";
import React, { useContext, useRef, useState } from "react";
import { supabase } from "../../../../../../config/mesa-config";
import { useRouter } from "next/navigation";
import { MenuContext } from "@/app/(connect)/InfoContext";
import { userContext } from "@/app/AuthContext";

const PollBuilder = () => {
  const [poll, setPoll] = useState<string>();
  const [options, setOptions] = useState<any[]>([]);
  const [context, setContext] = useState<File>();
  const [correct, setCorrect] = useState<number | undefined>();

  const router = useRouter();
  const modal: any = useContext(MenuContext);
  const user = useContext(userContext);
  const contextRef: any = useRef();

  const createPoll = async () => {
    if (!poll || options.length === 0) {
      return modal.toast("Please fill Out All Fields!", "error");
    }

    let err = false;

    options.map((e) => {
      if (e.length === 0) {
        modal.toast("Please fill Out All Fields!", "error");
        err = true;
        return;
      }
    });

    if (err) return;

    const pathname = context?.type.split("/")[1];

    const { data, error } = await supabase
      .from("questions")
      .insert({
        question: poll,
        options: options,
        correct: correct,
        creator: {
          id: user.user?.id,
          realname: user.userData?.real_name,
          username: user.userData?.username,
          picture: user.userData?.avatar_url,
        },
        context: context ? true : false,
        contextType: pathname,
        creatorid: user.user?.id,
      })
      .select();

    if (error) {
      console.error(error);
      return;
    }
    const responsedata = data[0].id;

    if (context) {
      const { data, error } = await supabase.storage
        .from("questionContexts")
        .upload(`${responsedata}.${pathname}`, context, {
          cacheControl: "3600",
          upsert: false,
        });

      if (error) {
        console.error(error);
        return;
      }

      console.log("Successfully Posted Picture!");
    }

    router.push("/connect/learning");
  };

  return (
    <main className="h-full w-full flex flex-col gap-5">
      <input
        type="text"
        className="p-2 px-5 w-full rounded-full"
        placeholder="Question"
        onChange={(e) => {
          setPoll(e.target.value);
        }}
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
        {options.length < 6 && (
          <button
            onClick={() => {
              setOptions((options) => [...options, ""]);
            }}
            className="w-[49%] h-32 p-4 flex justify-center items-center border-2 rounded-xl border-slate-500 border-dashed "
          >
            <h1 className="font-mono">Create New Option</h1>
          </button>
        )}
      </section>
      <section className="w-full mb-32 flex justify-center">
        <button
          className="w-1/2 p-5 rounded-full duration-300 hover:scale-105 bg-gradient-to-tr from-orange-500 to-amber-500"
          onClick={() => {
            createPoll();
          }}
        >
          <h1 className="font-mono text-white">Submit</h1>
        </button>
      </section>
    </main>
  );
};

export default PollBuilder;
