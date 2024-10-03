"use client";

import EditWidgets from "@/_components/home/editWidgets";
import { userContext } from "@/app/AuthContext";
import React, { useContext, useState } from "react";
import { widgets } from "@/_components/widgets";
import { AnimatePresence, motion } from "framer-motion";
import { supabase } from "../../../../config/mesa-config";
import { MenuContext } from "../InfoContext";

const HomeScreenWidgets = () => {
  const user = useContext(userContext);
  const toast: any = useContext(MenuContext);
  const [mode, setMode] = useState(0);

  const eventStyles = [
    {
      size: "tall",
      style: "h-full gap-x-4 flex flex-row dark:bg-zinc-700/50 justify-between",
    },
  ];

  const deleteWidget = async (e: any) => {
    console.log(e.name);

    const { error } = await supabase
      .from("profiles")
      .update({
        widgets: user.userData?.widgets?.filter(
          (widget) => widget?.name !== e.name,
        ),
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

  if (!user.userData) return <section className="h-full w-full" />;

  return (
    <>
      <div
        onClick={() => {
          setMode(mode === 0 ? 1 : 0);
        }}
        className={`absolute top-16 flex h-16 w-16 cursor-pointer items-center justify-center duration-500 hover:scale-110 ${
          mode === 1 ? "bg-red-600" : "bg-blue-600"
        } right-16 rounded-full`}
      >
        <h1
          className={`translate-x-2 text-3xl text-white delay-75 duration-500 ${
            mode === 1 && "translate-x-0 scale-0"
          } `}
        >
          +
        </h1>
        <h1
          className={`-translate-x-2.5 text-3xl text-white delay-75 duration-500 ${
            mode === 0 && "translate-x-0 scale-0"
          }`}
        >
          x
        </h1>
      </div>
      <motion.section
        className={`flex min-h-[90%] w-full flex-row justify-center gap-3 p-10 duration-1000 dark:text-white ${
          mode === 1 && "scale-[0.85] rounded-3xl bg-white dark:bg-zinc-900/50"
        } `}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        {!user.userData?.widgets || user.userData?.widgets?.length < 1 ? (
          <motion.h1
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-2xl font-light"
          >
            You can edit your dashboard by clicking Edit Widgets in the top
            corner!
          </motion.h1>
        ) : (
          user.userData?.widgets?.map((d: { name: string }, i: number) => {
            return (
              <motion.section key={i}>
                {widgets.map((e, i) => {
                  if (!d) return;
                  if (d.name !== e.name) return null;
                  return (
                    <section
                      key={i}
                      className={`no-scrollbar h-full w-full overflow-y-scroll rounded-3xl p-3 font-eudoxus ${
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
                            className="absolute flex h-12 w-12 -translate-x-10 -translate-y-10 cursor-pointer flex-row items-center justify-center rounded-full bg-zinc-300 text-xl font-bold dark:bg-zinc-800"
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
      </motion.section>
      <AnimatePresence>
        {mode === 1 && <EditWidgets current={user.userData.widgets} />}
      </AnimatePresence>
    </>
  );
};

export default HomeScreenWidgets;
