"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { IoAdd } from "react-icons/io5";

import { useModal } from "@/app/(connect)/connect/Modal";
import { supabase } from "../../../../../../../config/mesa-config";
import InfoBlockDashboard from "@/app/(connect)/connect/(profiles)/profile/[id]/(infoblockscreator)/InfoBlockDashboard";

import type {
  BlockKey,
  BlockType,
} from "@/app/(connect)/connect/(profiles)/profile/(boxTypes)/types";
import { useUser } from "@/app/AuthContext";
import { blockDefinitions } from "../(boxTypes)/blockRegistry";
import { Card } from "@/components/ui/card";
import { useProfile } from "./ProfileContext";

export default function Infoblocks() {
  const profile = useProfile();
  const user = profile?.data;
  const [blocks, setBlocks] = useState<BlockType[]>([]);
  const Modal = useModal();

  useEffect(() => {
    let mounted = true;
    supabase
      .from("infoblocks")
      .select("*")
      .eq("userid", user?.id || "")
      .then(({ data, error }) => {
        if (error) console.error(error.message);
        else if (mounted) setBlocks(data as unknown as BlockType[]);
      });
    return () => {
      mounted = false;
    };
  }, [user?.id]);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      key="infoblocks"
    >
      <button
        onClick={() =>
          Modal.CreateModal(<InfoBlockDashboard Blocks={blocks} />)
        }
        className="mb-4 flex flex-row items-center justify-center gap-2 rounded-full bg-blue-500 p-2 px-5 text-white shadow-lg"
      >
        Add Block
        <IoAdd size={32} />
      </button>

      <div className="grid grid-cols-2 gap-4">
        {blocks.map((block) => {
          const def = blockDefinitions[block.type as BlockKey];
          if (!def) return null;
          return (
            <Card className="p-4" key={block.id}>
              <h3>{def.title}</h3>

              {def.View ? (
                // @ts-ignore
                <def.View data={block.data} />
              ) : (
                <em>Missing View for {def.title}</em>
              )}
            </Card>
          );
        })}
      </div>
    </motion.section>
  );
}
