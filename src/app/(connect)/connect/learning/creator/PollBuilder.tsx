"use client";
import React, { useContext, useRef, useState } from "react";
import { supabase } from "../../../../../../config/mesa-config";
import { useRouter } from "next/navigation";
import { MenuContext } from "@/app/(connect)/InfoContext";
import { ContextProps, userContext } from "@/app/AuthContext";
import ClassRelations from "../../builder/(buildercomponents)/ClassRelations";
import Input from "@/_components/Input";
import { IoAdd, IoChevronDown, IoChevronUp, IoPencil } from "react-icons/io5";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
const PollBuilder = () => {
  const [poll, setPoll] = useState<string>();
  const [options, setOptions] = useState<any[]>([]);
  const [context, setContext] = useState<File>();
  const [correct, setCorrect] = useState<number | undefined>();
  const [relation, setRelation] = useState<string[]>([]);
  const [contextOpen, openclose] = useState<boolean>();

  const router = useRouter();
  const modal: any = useContext(MenuContext);
  const user: ContextProps = useContext(userContext);
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

    // @ts-ignore
    const { data, error } = await supabase
      .from("questions")
      // @ts-ignore
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
        context: !!context,
        contextType: pathname,
        creatorid: user.user?.id,
        relations: relation,
      })
      .select();

    if (error) {
      console.error(error);
      return;
    }
    const responsedata = data[0].id;

    if (context) {
      const { error } = await supabase.storage
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
      <Input
        type="text"
        icon={<IoPencil color={"rgb(220 38 38)"} />}
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
              // eslint-disable-next-line jsx-a11y/alt-text
              <img
                alt={"context"}
                src={URL.createObjectURL(context)}
                className=" w-40 h-40 object-contain "
              />
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
          className="p-4 w-full rounded-xl flex flex-row items-center justify-center gap-2 bg-white hover:bg-slate-50 duration-300"
        >
          <IoAdd />
          <h1 className="font-eudoxus font-black text-slate-600">Add Image</h1>
        </button>
      )}
      <button />
      {options.length === 1 && (
        <ul className="p-4  w-full group rounded-xl flex flex-row items-center justify-between px-10 gap-2 bg-white hover:bg-slate-50 duration-300">
          <p className="font-eudoxus font-black text-slate-600">
            Tip: Click The Number To Select An Answer. Select no answer to make
            it a poll.
          </p>
        </ul>
      )}
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
          options.map((_e, i) => {
            return (
              <ul
                className={`${
                  i === correct
                    ? "bg-green-200/50 hover:bg-green-200/30"
                    : "bg-zinc-200/50 hover:bg-zinc-200/30"
                } w-[49%] duration-500 h-32 p-4 flex flex-row justify-center items-center shadow-sm  rounded-xl`}
                key={i}
              >
                <h1
                  onClick={() => {
                    correct != i ? setCorrect(i) : setCorrect(undefined);
                  }}
                  className={`text-2xl cursor-pointer hover:scale-125 duration-500 ${
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
            className="w-[49%] h-32 p-6 flex flex-col items-end justify-end rounded-xl bg-white hover:bg-slate-50 duration-300 "
          >
            <IoPencil className="text-3xl" />
            <h1 className="font-eudoxus font-black text-2xl">
              Create New Option
            </h1>
          </button>
        )}
      </section>
      <section>
        <button
          onClick={() => {
            openclose(!contextOpen);
          }}
          className="p-4 w-full group rounded-xl flex flex-row items-center justify-between px-10 gap-2 bg-white hover:bg-slate-50 duration-300"
        >
          <h1 className="font-eudoxus font-black text-slate-600">
            {contextOpen ? "Close" : "Open Relations Panel"}
          </h1>
          <ul>
            <IoChevronDown
              className={`${
                contextOpen ? "scale-0" : "scale-100"
              } duration-300 absolute`}
            />
            <IoChevronUp
              className={`${
                contextOpen ? "scale-100" : "scale-0"
              } duration-300`}
            />
          </ul>
        </button>
        <AnimatePresence>
          {contextOpen && (
            <motion.section
              initial={{ opacity: 0, y: -6, scaleY: 0, scaleX: 0.3 }}
              animate={{ opacity: 1, y: 0, scaleY: 1, scaleX: 1 }}
              exit={{ opacity: 0, y: -6, scaleY: 0, scaleX: 0.3 }}
              transition={{
                scaleX: { duration: 0.2 },
                scaleY: { duration: 0.5 },
                type: "spring",
              }}
              className="origin-top"
            >
              <ClassRelations
                exist={true}
                onChange={(e) => {
                  setRelation(e);
                }}
              />
            </motion.section>
          )}
        </AnimatePresence>
      </section>
      <section className="w-full mb-32 flex justify-center">
        <button
          className="w-1/2 p-5 rounded-full duration-300 hover:scale-105 bg-gradient-to-tr from-orange-500 to-amber-500"
          onClick={() => {
            createPoll();
          }}
        >
          {correct !== undefined && (
            <h1 className="font-mono text-white">
              Answer: {options[correct] ? options[correct] : `#${correct + 1}`}
            </h1>
          )}
          <h1 className="font-mono text-white">Submit</h1>
        </button>
      </section>
    </main>
  );
};

export default PollBuilder;
