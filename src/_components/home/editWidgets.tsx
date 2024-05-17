"use client";
import React, { useContext } from "react";
import { motion } from "framer-motion";
import { widgets } from "../widgets";
import { supabase } from "../../../config/mesa-config";
import { MenuContext } from "@/app/(connect)/InfoContext";
import { userContext } from "@/app/AuthContext";

const EditWidgets = ({ current }: { current: any }) => {
  const toast: any = useContext(MenuContext);
  const user = useContext(userContext);

  const updateWidgets = async (e: any) => {
    const NewWidget = [{ name: e }];


    const { data, error } = await supabase
      .from("profiles")
      .update({
        widgets: current ? [...current, ...NewWidget] : [...NewWidget],
      })
        // @ts-ignore
        .eq("id", user.user?.id);

    if (error) {
      toast.toast("Error updating widgets: " + error.message, "error");
      console.log(error);
      return;
    }

    toast.toast("Updated Widgets!", "success");
    location.reload();
  };

  return (
    <>
      <motion.main
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        drag
        whileDrag={{ scale: 1.05 }}
        dragConstraints={{ bottom: 40 }}
        dragMomentum={false}
        transition={{ duration: 0.4 }}
        className="absolute bottom-10 left-[10%] w-[80%] h-1/4 resize min-h-1/4 rounded-3xl flex flex-col justify-center gap-2 p-10 px-10 overflow-x-scroll no-scrollbar shadow-2xl opacity-80 bg-zinc-100"
      >
        <h1 className="font-bold text-xl">Add Widgets</h1>

        <section className="flex flex-row items-center">
          {widgets.map((widget) => {
            return (
              <div key={widget.name} className="flex flex-col gap-0.5 items-center">
                <button
                  className="hover:scale-105 hover:shadow-md rounded-3xl duration-300"
                  onClick={() => {
                    updateWidgets(widget.name);
                  }}
                >
                  <widget.showcase />
                </button>
                <p>{widget.name}</p>
              </div>
            );
          })}
        </section>
      </motion.main>
    </>
  );
};

export default EditWidgets;
