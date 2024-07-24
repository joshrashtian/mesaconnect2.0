"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "../../../../../../../config/mesa-config";
import { useUser } from "@/app/AuthContext";
import ClassCard from "./ClassCard";
import Link from "next/link";
import { IoAdd } from "react-icons/io5";
import { AiOutlineLoading } from "react-icons/ai";

const ClassPicker = () => {
  const [classes, setClasses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, userData } = useUser();

  useEffect(() => {
    /*const fetchClasses = async () => {
      //@ts-ignore
      let { data, error } = await supabase.rpc("get_users_class", {
        usersid: user?.id,
      });
      if (error) {
        console.error(error);
        setLoading(false);
        return;
      }
      //@ts-ignore
      setClasses(data);
      setLoading(false);
    };*/
    const fetchClasses = async () => {
      //@ts-ignore
      let { data, error } = await supabase
        .from("transcripts")
        .select()
        .eq("userid", user?.id);
      if (error) {
        console.error(error);
        setLoading(false);
        return;
      }
      //@ts-ignore
      setClasses(data);
      setLoading(false);
    };
    fetchClasses();
  }, [user?.id]);

  if (loading)
    return <AiOutlineLoading className="animate-spin text-7xl p-4" />;

  return (
    <section className=" flex flex-col gap-5">
      <h1 className=" font-eudoxus font-bold text-3xl">Your Courses</h1>
      <h2 className="font-eudoxus font-black text-2xl">{userData?.college}</h2>
      <section className="flex flex-row gap-3 p-4 overflow-x-scroll no-scrollbar w-full">
        {classes.length > 0 ? (
          classes.map((c) => {
            return <ClassCard class={c} key={c.id} />;
          })
        ) : (
          <h1 className="text-2xl font-light">
            Currently, you have no classes attached to your profile.
          </h1>
        )}
      </section>
      <Link className="w-64" href="/connect/learning/profile/newclass">
        <div
          className="bg-gradient-to-br p-4 text-xl text-white from-blue-600 to-teal-400 duration-500 active:scale-90 hover:scale-105 hover:bg-indigo-300 rounded-2xl hover:opacity-80 shadow-lg
             h-24 flex flex-col-reverse "
        >
          <h1 className="font-eudoxus">Add New Class</h1>
          <IoAdd />
        </div>
      </Link>
    </section>
  );
};

export default ClassPicker;
