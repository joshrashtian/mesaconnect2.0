"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "../../../../../config/mesa-config";
import { useUser } from "@/app/AuthContext";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { IoCopyOutline, IoKeyOutline, IoTrashBin } from "react-icons/io5";
import { useModal } from "../Modal";

export type Key = {
  id: string;
  created_at: Date;
  creator: string;
  redeemer: string;
};

const InviteKeys = () => {
  const [activeKeys, setKeys] = useState<Key[]>();
  const [modal, setModal] = useState<boolean>(false);
  const { user } = useUser();
  const { CreateModal } = useModal();

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("invitekeys")
        .select()
        .eq("creator", user?.id);
      if (error) {
        console.error(error);
        return;
      }
      setKeys(data);
    };
    if (user) fetchData();
  }, [user]);

  if (!activeKeys) return;

  return (
    <section>
      <h1 className="text-transparent mb-5 inline-block bg-clip-text font-eudoxus text-3xl bg-gradient-to-br from-indigo-600 to-blue-500 ">
        Invite Keys
      </h1>

      {activeKeys?.length > 0 ? (
        <ul className="flex flex-col ">
          <AnimatePresence>
            {activeKeys?.map((key) => (
              <motion.li
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                key={key.id}
                className="flex flex-row odd:bg-white even:bg-zinc-50 w-full p-3 text-xl justify-between gap-2 items-center"
              >
                <p className=" font-geist font-light ">{key.id}</p>
                <p className="font-eudoxus text-xl">{key.redeemer}</p>
                <li className="flex gap-2">
                  <button className="duration-300 bg-blue-400 hover:scale-105 text-white rounded-full active:scale-90 active:bg-orange-400 p-2">
                    <IoCopyOutline
                      onClick={() => {
                        navigator.clipboard.writeText(key.id);
                      }}
                    />
                  </button>
                  <button className="duration-300 bg-red-400 hover:scale-105 text-white rounded-full active:scale-90 active:bg-orange-400 p-2">
                    <IoTrashBin
                      onClick={async () => {
                        const { error } = await supabase
                          .from("invitekeys")
                          .delete()
                          .eq("id", key.id);

                        if (error) {
                          console.error(error);
                          return;
                        }
                        setKeys(activeKeys.filter((k) => k.id !== key.id));
                      }}
                    />
                  </button>
                </li>
              </motion.li>
            ))}
            {activeKeys?.length < 3 && (
              <button
                onClick={() => {
                  CreateModal(<InviteModal />);
                }}
                className="flex flex-row bg-slate-100 hover:bg-slate-200 duration-300 w-full p-3 text-xl justify-between gap-2 items-center"
              >
                <IoKeyOutline /> Create Key
              </button>
            )}
          </AnimatePresence>
        </ul>
      ) : (
        <>
          <p className="font-eudoxus text-xl">
            You currently have no active invite keys.
          </p>
          <button
            onClick={() => {
              CreateModal(<InviteModal />);
            }}
            className="text-lg text-theme-blue duration-500 hover:text-black"
          >
            So, Let's Create Some.
          </button>
        </>
      )}
    </section>
  );
};

const InviteModal = () => {
  const { user } = useUser();
  const [key, setKey] = useState<Key>();
  const a = useModal();

  useEffect(() => {
    const createKey = async () => {
      console.log("Creating new key...");
      const { data, error } = await supabase
        .from("invitekeys")
        .insert({
          creator: user?.id,
        })
        .select()
        .single();

      if (error) {
        console.error(error);
        return;
      }
      setKey(data);
    };

    createKey();
  }, []);

  return (
    <section className="flex flex-col h-full justify-between">
      <section>
        <h1 className="text-2xl">Here Is Your New Key.</h1>
        <p className="text-slate-600">It will expire in 7 days.</p>
      </section>

      <p className="p-3 flex flex-row justify-between items-center bg-white shadow-sm">
        {key ? key.id : "Loading Key..."}
        <button className="duration-300 bg-blue-400 hover:scale-105 text-white rounded-full active:scale-90 active:bg-orange-400 p-2">
          <IoCopyOutline
            onClick={() => {
              //@ts-ignore
              navigator.clipboard.writeText(key?.id);
            }}
          />
        </button>
      </p>
      <button
        onClick={() => {
          a.DisarmModal();
          window.location.reload();
        }}
        className=" p-3 w-full duration-500 hover:scale-105 hover:bg-orange-400 text-white font-eudoxus bg-orange-500 rounded-2xl"
      >
        Confirm
      </button>
    </section>
  );
};

export default InviteKeys;
