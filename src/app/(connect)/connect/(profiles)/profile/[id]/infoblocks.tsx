"use client";

import { Index } from "@/app/(connect)/connect/(profiles)/profile/boxTypes";
import { useEffect, useState } from "react";
import { supabase } from "../../../../../../../config/mesa-config";
import { motion } from "framer-motion";
import { IoAdd, IoAddCircle } from "react-icons/io5";
import { useModal } from "@/app/(connect)/connect/Modal";
import InfoBlockDashboard from "@/app/(connect)/connect/(profiles)/profile/[id]/(infoblockscreator)/InfoBlockDashboard";

export type InfoBlockType = {
  id: string;
  userid: string;
  created_at: Date;
  data: {
    length?: number;
  };
  type: string;
  visible: "public" | "private" | "friends";
};

const Infoblocks = (props: any) => {
  const [blocks, setBlocks] = useState<InfoBlockType[]>([]);
  const Modal = useModal();

  useEffect(() => {
    async function getBlocks() {
      const { data, error } = await supabase
        .from("infoblocks")
        .select()
        .eq("userid", props.user.id);
      if (error) {
        console.error(error.message);
        return;
      }
      // @ts-ignore
      setBlocks(data.length != 0 ? data : null);
    }
    getBlocks();
  }, [props.user.id]);

  // @ts-ignore
  const DashboardEnable = () => {
    Modal.CreateModal(<InfoBlockDashboard Blocks={blocks} />);
  };

  return (
    <section className="w-full rounded-3xl bg-zinc-200/30 p-5 px-10 dark:bg-zinc-900/60">
      <ul className="flex items-center justify-between">
        <h2 className="mb-3 font-eudoxus text-3xl font-bold dark:text-white">
          Inside {props.user.real_name}
        </h2>
        <button
          onClick={DashboardEnable}
          className="text-whiteshadow-lg relative right-0 rounded-full bg-orange-400 p-2 text-2xl"
        >
          <IoAdd />
        </button>
      </ul>
      <ul className="grid h-full w-full grid-cols-2 gap-2 font-eudoxus">
        {blocks ? (
          blocks.map((e: any, index: number) => {
            return (
              <motion.section
                transition={{ delay: 2, duration: 1 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                key={index}
                className="min-h-full w-full origin-bottom rounded-xl bg-white p-5 shadow-lg dark:bg-zinc-600/30 dark:text-slate-200"
              >
                {Index.map((d: any, i: number) => {
                  if (d.title.toLowerCase() === e.type.toLowerCase()) {
                    return (
                      <div key={i}>
                        <h1 className="mb-2 font-bold dark:text-white/80">
                          {d.title}
                        </h1>
                        <d.component data={e} />
                      </div>
                    );
                  }
                })}
              </motion.section>
            );
          })
        ) : (
          <h1>No InfoBlocks.</h1>
        )}
      </ul>
    </section>
  );
};

export default Infoblocks;
