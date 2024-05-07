"use client";
import { useUser } from "@/app/AuthContext";
import React, { useEffect, useState } from "react";
import {
  IoBook,
  IoCode,
  IoFlask,
  IoGameController,
  IoPencil,
} from "react-icons/io5";
import { supabase } from "../../../../../../config/mesa-config";
import { icons, Interest } from "../../(tabs)/social/community/InterestButtons";
import { AnimatePresence, Reorder, motion } from "framer-motion";
import { useModal } from "../../Modal";
import { IoMdArrowDropdown } from "react-icons/io";
import { submitInterests } from "./EventBuilder/InterestFunctions";

const Interests = () => {
  const [interest, setInterests] = useState<Interest[]>();

  const { CreateModal } = useModal();

  const { user } = useUser();

  useEffect(() => {
    const getInterests = async () => {
      const { data, error } = await supabase
        .from("interests")
        .select("*")
        .eq("userid", user?.id)
        .limit(4);

      if (error) {
        console.log(error);
        return;
      }
      setInterests(data);
    };

    getInterests();
  }, []);

  return (
    <main>
      <section className="flex flex-col gap-6">
        {interest && (
          <Reorder.Group
            className="flex flex-col gap-2"
            values={interest}
            onReorder={setInterests}
          >
            {interest?.map((interest) => (
              <Reorder.Item
                className="p-5 bg-zinc-50 shadow-md"
                key={interest.id}
                value={interest}
              >
                {icons.find((e) => interest.fieldType === e.name)?.icon}
                <h1>{interest.interest}</h1>
                <p className="text-slate-400">{interest.fieldType}</p>
              </Reorder.Item>
            ))}
          </Reorder.Group>
        )}
        <button
          onClick={() => CreateModal(<NewInterests userinterests={interest} />)}
          className="p-5 bg-zinc-50 hover:bg-zinc-100 shadow-md duration-300 hover:scale-105"
        >
          <h1>New Interest</h1>
        </button>
      </section>
    </main>
  );
};

export const NewInterests = ({
  userinterests,
}: {
  userinterests: Interest[] | undefined;
}) => {
  const [interests, setInterests] = useState<Interest[]>();
  const [custom, setCustom] = useState(false);
  const [dropdownCustom, setDropdownCustom] = useState(false);
  const [category, setCategory] = useState<string>();
  const [toAdd, setToAdd] = useState<string>();
  const { user } = useUser();
  useEffect(() => {
    const getInterests = async () => {
      const { data, error } = await supabase
        .from("availableinterests")
        .select("*")
        .limit(10);

      if (error) {
        console.log(error);
        return;
      }
      setInterests(data);
    };

    getInterests();
  }, []);

  return (
    <div className="font-eudoxus flex flex-col gap-5">
      <h1 className="text-xl">New Interest</h1>
      <menu className="flex flex-col gap-0.5 h-full no-scrollbar overflow-y-scroll">
        <motion.ul
          onClick={() => setCustom(true)}
          className={`p-2 flex ${
            custom ? "h-32" : "h-12"
          } justify-between items-center origin-top duration-500 cursor-pointer bg-zinc-100`}
        >
          <li className="flex gap-3 items-center ">
            <IoPencil
              className={`${
                custom && "scale-0 translate-y-12"
              } duration-700 origin-bottom`}
            />
            <h1
              className={`${
                custom && "-translate-y-10 text-center -translate-x-6 text-xl"
              } ease-out duration-500`}
            >
              Custom Interest
            </h1>
          </li>
          <h2
            className={`text-slate-400 duration-500 ${
              custom && "scale-0  translate-y-12"
            }`}
          >
            Click To Create
          </h2>
          <motion.ul
            onClick={(e) => e.preventDefault()}
            className={` scale-0 flex justify-center items-center gap-3 absolute translate-x-1 -translate-y-2 duration-500 ${
              custom && "scale-100 translate-y-1"
            }`}
          >
            <input
              onChange={(e) => setToAdd(e.target.value)}
              className="p-1 px-4 hover:scale-[1.02] duration-300 focus:bg-slate-50 outline-none bg-white rounded-xl shadow-sm "
            />
            <button
              onClick={() => setDropdownCustom(!dropdownCustom)}
              className="p-1 hover:scale-[1.02] duration-300 focus:bg-slate-50 outline-none bg-white rounded-xl shadow-sm "
            >
              <IoMdArrowDropdown
                className={`${
                  dropdownCustom ? "rotate-90" : " rotate-0"
                } duration-300`}
              />
            </button>

            <AnimatePresence>
              {dropdownCustom && (
                <motion.menu
                  initial={{ x: 10, scale: 0 }}
                  animate={{ x: 0, scale: 1 }}
                  exit={{ x: 20, scale: 0 }}
                  className="bg-white absolute p-2 origin-right"
                >
                  {icons.map((icon) => (
                    <p
                      onClick={() => {
                        console.log(icon.name);
                        setCategory(icon.name);
                        setDropdownCustom(false);
                      }}
                      className={`p-0.5 px-1 rounded-md hover:bg-slate-100 ${
                        category === icon.name && "bg-orange-100"
                      } duration-200`}
                    >
                      {icon.name}
                    </p>
                  ))}
                </motion.menu>
              )}
            </AnimatePresence>
          </motion.ul>
          <motion.button
            onClick={async () => {
              if (!toAdd || !category) return;
              const { data, error } = await submitInterests({
                interest: toAdd,
                fieldType: category,
              });
            }}
            className={` scale-0 flex p-1 rounded-md hover:scale-105 -translate-x-6 w-32 bg-gradient-to-br from-theme-blue to-theme-blue-2 justify-center translate-y-1 items-center gap-3 duration-500 ${
              custom && "scale-100"
            }`}
          >
            Submit
          </motion.button>
        </motion.ul>
        {interests?.map((interest) => (
          <ul className="p-2 flex justify-between items-center bg-slate-100">
            <li className="flex gap-3 items-center">
              {icons.find((e) => interest.fieldType === e.name)?.icon}
              <h1>{interest.interest}</h1>
            </li>
            <h2 className="text-slate-400">{interest.fieldType}</h2>
          </ul>
        ))}
      </menu>
    </div>
  );
};

export default Interests;
