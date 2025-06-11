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

export default function Infoblocks() {
  const { user } = useUser();
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
    <section>
      {/* … your heading and + button … */}
      <button
        onClick={() =>
          Modal.CreateModal(<InfoBlockDashboard Blocks={blocks} />)
        }
      >
        <IoAdd />
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
    </section>
  );
}
