"use client";

import EditWidgets from "@/_components/home/editWidgets";
import CurrentEventSegment from "@/_components/socialhub/CurrentEventSegment";
import { userContext } from "@/app/AuthContext";
import React, { useContext, useState } from "react";
import { widgets } from "@/_components/widgets";
import { AnimatePresence, motion } from "framer-motion";
import { supabase } from "../../../../config/mesa-config";
import { MenuContext } from "../InfoContext";

const HomeScreenWidgets = () => {
  const user = useContext(userContext);
  const toast = useContext(MenuContext);
  const [mode, setMode] = useState(0);

  const eventStyles = [
    {
      size: "tall",
      style: "h-full gap-x-4 flex flex-row justify-between",
    },
  ];

  const deleteWidget = async (e: any) => {
    console.log(e.name);

    const { data, error } = await supabase
      .from("profiles")
      .update({
        widgets: user.userData?.widgets?.filter(
          (widget) => widget?.name !== e.name
        ),
      })
      .eq("id", user.user?.id);

    if (error) {
      toast.toast("Error updating widgets: " + error.message, "error");
      console.log(error);
      return;
    }

    toast.toast("Updated Widgets!", "success");
    location.reload();
  };

  if (!user.userData) return <section className="w-full h-full" />;

  return (
    <motion.section
      className="w-full min-h-full flex flex-row justify-center p-10 gap-3 "
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.8 }}
    >
      <div
        onClick={() => {
          setMode(mode === 0 ? 1 : 0);
        }}
        className="absolute top-10 right-10"
      >
        Edit Widgets
      </div>
      {!user.userData?.widgets || user.userData?.widgets?.length < 1 ? (
        <motion.h1
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="font-light text-2xl"
        >
          You can edit your dashboard by clicking Edit Widgets in the top
          corner!
        </motion.h1>
      ) : (
        user.userData?.widgets?.map((d: { name: string }) => {
          return (
            <motion.section>
              {widgets.map((e, i) => {
                if (!d) return;
                if (d.name !== e.name) return null;
                return (
                  <section
                    key={i}
                    className={`w-full h-full shadow-md overflow-y-scroll no-scrollbar rounded-3xl p-3 ${
                      e.style
                    } ${eventStyles.map((f) => {
                      if (e.size === f.size) return f.style;
                    })}`}
                  >
                    <AnimatePresence>
                      {mode === 1 && (
                        <motion.button
                          initial={{ x: -30, y: -50, scale: 0, opacity: 0 }}
                          animate={{ x: -30, y: -30, scale: 1, opacity: 1 }}
                          exit={{ x: -30, y: -50, scale: 0, opacity: 0 }}
                          transition={{ type: "spring", duration: 0.6 }}
                          className="bg-zinc-300 font-bold cursor-pointer text-xl w-12 h-12 absolute flex flex-row justify-center items-center -translate-x-10 -translate-y-10 rounded-full"
                          onClick={() => {
                            deleteWidget(e);
                          }}
                        >
                          x
                        </motion.button>
                      )}
                    </AnimatePresence>
                    {e.widget()}
                  </section>
                );
              })}
            </motion.section>
          );
        })
      )}
      <AnimatePresence>
        {mode === 1 && <EditWidgets current={user.userData.widgets} />}
      </AnimatePresence>
    </motion.section>
  );
};

export default HomeScreenWidgets;
