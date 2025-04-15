"use client";
import { useUser } from "@/app/AuthContext";
import React, { useEffect, useState } from "react";
import {
  IoBook,
  IoCode,
  IoFlask,
  IoGameController,
  IoPencil, IoTrash,
} from "react-icons/io5";
import { supabase } from "../../../../../../config/mesa-config";
import { icons, Interest } from "../../(tabs)/social/community/InterestButtons";
import { AnimatePresence, Reorder, motion } from "framer-motion";
import { useModal } from "../../Modal";
import { IoMdArrowDropdown } from "react-icons/io";
import {deleteInterest, submitInterests} from "./EventBuilder/InterestFunctions";
import {useContextMenu, useToast} from "@/app/(connect)/InfoContext";

const Interests = () => {
  const [interest, setInterests] = useState<Interest[]>([]);

  const { CreateModal } = useModal();
  const { createContext } = useContextMenu()
  const { CreateErrorToast } = useToast()
  const { user } = useUser();

  useEffect(() => {
    const channels = supabase.channel('custom-insert-channel')
        .on(
            'postgres_changes',
            { event: '*', schema: 'public', table: 'interests', filter: `userid=eq.${user?.id}` },
            (payload) => {

              if(payload.eventType === 'INSERT') {
                // @ts-ignore
                setInterests(e => [...e, payload.new])
              } else if (payload.eventType === "DELETE") {
                setInterests((e) => e?.filter((d) => d.id !== payload.old.id))
              }
            }
        )
        .subscribe()

        return () => {
        channels.unsubscribe()
        }
  }, [supabase]);

  useEffect(() => {
    const getInterests = async () => {
      const { data, error } = await supabase
        .from("interests")
        .select("*")
        .eq("userid", user?.id as string)
        .limit(4);

      if (error) {
        console.log(error);
        return;
      }
      setInterests(data as Interest[]);
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
            <AnimatePresence>
            {interest?.map((interest) => (
              <Reorder.Item
                className="p-5 cursor-pointer bg-white hover:bg-slate-50 shadow-md"
                key={interest.id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                value={interest}
                onContextMenu={(e: any) => createContext(e, [{
                  name: "Delete Interest",
                  visible: true,
                  function: async () => {
                    let { data, error } = await deleteInterest(interest)
                    if(error) {
                      CreateErrorToast(error.message)
                    }
                  },
                  icon: <IoTrash />
                }]) }
              >
                {icons.find((e) => interest.fieldtype === e.name)?.icon}
                <h1>{interest.interest}</h1>
                <p className="text-slate-400">{interest.fieldtype}</p>
              </Reorder.Item>
            ))}
            </AnimatePresence>
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
  userinterests
}: {
  userinterests: Interest[] | undefined;
}) => {
  const [interests, setInterests] = useState<Interest[]>();
  const [custom, setCustom] = useState(false);
  const [dropdownCustom, setDropdownCustom] = useState(false);
  const [category, setCategory] = useState<string>();
  const [toAdd, setToAdd] = useState<string>();

  const { user } = useUser();
  const toast = useToast()

  useEffect(() => {
    const getInterests = async () => {
      const { data, error } = await supabase
        .from("availableinterests")
        .select("*")
        .limit(6).order("popularity", {ascending: false}) .not('id','in',`(${userinterests?.map((e) => e.interestid)})`)

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
                      // eslint-disable-next-line react/jsx-key
                    <p
                      onClick={() => {
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
                fieldtype: category,
              });
              if(error) {
                toast.CreateErrorToast(error.message)
              } else {
                toast.CreateSuccessToast(`Successfully Added ${ toAdd } As An Interest!`)
              }
            }}

            className={` scale-0 flex p-1 rounded-md hover:scale-105 -translate-x-6 w-32 bg-gradient-to-br from-theme-blue to-theme-blue-2 justify-center translate-y-1 items-center gap-3 duration-500 ${
              custom && "scale-100"
            }`}
          >
            Submit
          </motion.button>
        </motion.ul>
        {interests?.map((interest) => (
          <button
            onClick={async () => {
              const { data, error } = await submitInterests({
                interest: interest.interest,
                fieldtype: interest.fieldtype,
                id: interest.id,
              });
              if(error) {
                toast.CreateErrorToast(error.message)
              } else {
                toast.CreateSuccessToast(`Successfully Added ${interest.interest} As An Interest!`)
                setInterests(e => e?.filter(d => d.id !== interest.id))
              }
            }}

            key={interest.id}
            className="p-2 flex justify-between items-center bg-slate-100"
          >
            <li className="flex gap-3 items-center">
              {icons.find((e) => interest.fieldtype === e.name)?.icon}
              <h1>{interest.interest}</h1>
            </li>
            <h2 className="text-slate-400">{interest.fieldtype}</h2>
          </button>
        ))}
      </menu>
    </div>
  );
};

export default Interests;
