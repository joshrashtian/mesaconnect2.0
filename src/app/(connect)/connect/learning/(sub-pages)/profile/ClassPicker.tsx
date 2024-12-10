"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "../../../../../../../config/mesa-config";
import { useUser } from "@/app/AuthContext";
import ClassCard from "./ClassCard";
import Link from "next/link";
import { IoAdd } from "react-icons/io5";
import { AiOutlineLoading } from "react-icons/ai";
import MenuButton from "@/(mesaui)/MenuButton";
import { useRouter } from "next/navigation";
import { sortClasses } from "./ClassFunctions";

const ClassPicker = () => {
  const [classes, setClasses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [semesters, setSemesters] = useState<Set<string>>(new Set());
  const { user, userData } = useUser();
  const router = useRouter();
  useEffect(() => {
    //old code
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
      let newClasses = await sortClasses(data);
      setClasses(newClasses);
      setLoading(false);
      newClasses?.map((c: any) => {
        setSemesters((s) => s.add(c.semester));
      });
    };
    fetchClasses();
  }, [user?.id]);

  if (loading)
    return <AiOutlineLoading className="animate-spin p-4 text-7xl" />;

  return (
    <section className="flex flex-col gap-5">
      <MenuButton
        title="Add New Class"
        icon={<IoAdd />}
        onClick={() => router.push("/connect/learning/profile/newclass")}
        color="bg-gradient-to-br from-blue-600 to-teal-400"
      />
      <h1 className="font-eudoxus text-3xl font-bold dark:text-white/50">
        Your Courses
      </h1>
      <h2 className="font-eudoxus text-2xl font-black">{userData?.college}</h2>
      <section className="no-scrollbar flex w-full flex-col gap-3 pb-32">
        {classes.length > 0 ? (
          Array.from(semesters).map((s) => {
            return (
              <>
                <h3 className="text-xl font-semibold">{s}</h3>
                {classes
                  .filter((c) => c.semester === s)
                  .map((classItem: any) => {
                    return <ClassCard class={classItem} key={classItem.id} />;
                  })}
              </>
            );
          })
        ) : (
          <h1 className="text-2xl font-light">
            Currently, you have no classes attached to your profile.
          </h1>
        )}
      </section>
    </section>
  );
};

export default ClassPicker;
