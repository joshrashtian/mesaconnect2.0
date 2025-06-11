"use client";

import React, { useState, useMemo } from "react";
import { IoAdd, IoBuild } from "react-icons/io5";

import type {
  BlockKey,
  BlockType,
} from "@/app/(connect)/connect/(profiles)/profile/(boxTypes)/types";
import { blockDefinitions } from "../../(boxTypes)/blockRegistry";
import { useModal } from "@/app/(connect)/connect/Modal";
import AddBlock from "./AddBlock";
import {
  InfoProvider,
  useInfo,
} from "@/app/(connect)/connect/(profiles)/profile/[id]/(infoblockscreator)/InfoContext";

// split out the “inner” component so we can wrap it in our provider
const DashboardInner: React.FC<{ blocks: BlockType[] }> = ({ blocks }) => {
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const { CreateModal } = useModal();
  const { setData, data } = useInfo();

  // build a fast lookup from block-type → its definition in your Index[]
  const defLookup = useMemo(
    () =>
      Object.values(blockDefinitions).reduce<
        Record<string, (typeof blockDefinitions)[keyof typeof blockDefinitions]>
      >((acc, def) => {
        acc[def.title] = def;
        return acc;
      }, {}),
    [],
  );

  const handleSelect = (block: BlockType) => {
    const def = defLookup[block.type];
    if (!def) return;
    setActiveKey(def.title);
    setData(block);
  };

  const activeDef = activeKey ? defLookup[activeKey] : null;

  return (
    <main className="h-[410px] min-w-[110ch] max-w-[120ch] pb-10 font-eudoxus">
      <h1 className="flex items-center gap-2 text-4xl font-bold dark:text-slate-300">
        <IoBuild /> Infoblocks
      </h1>

      <div className="my-3 flex h-[90%] w-full bg-slate-200/20 p-2 dark:bg-zinc-600/70">
        {/* Sidebar */}
        <nav className="no-scrollbar w-72 flex-col gap-1 overflow-y-auto p-2">
          {blocks.map((blk) => {
            const def = defLookup[blk.type];
            if (!def) return null;
            return (
              <FormBlockButton
                key={blk.id}
                onClick={() => handleSelect(blk)}
                className="w-48 bg-white capitalize dark:bg-zinc-500/50"
              >
                {def.icon}
                {def.title}
              </FormBlockButton>
            );
          })}
        </nav>

        {/* Details / Create form */}
        <section className="flex-1 p-4">
          {activeDef ? (
            <div>
              {activeDef.EditForm ? (
                // @ts-ignore
                <activeDef.EditForm data={data!} />
              ) : (
                <em>Missing EditForm for {activeDef.title}</em>
              )}
            </div>
          ) : (
            <p className="text-gray-500">Select a block to edit…</p>
          )}
        </section>
      </div>

      {/* Add new block */}
      <div className="-mt-12 mr-2 flex justify-end">
        <button
          onClick={() => CreateModal(<AddBlock Blocks={blocks} />)}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-700 p-1 text-white shadow-lg"
          aria-label="Add Info Block"
        >
          <IoAdd size={24} />
        </button>
      </div>
    </main>
  );
};

// wrap in provider so useInfo() never errors
const InfoBlockDashboard: React.FC<{ Blocks?: BlockType[] }> = ({
  Blocks = [],
}) => (
  <InfoProvider>
    <DashboardInner blocks={Blocks} />
  </InfoProvider>
);

export default InfoBlockDashboard;

// memo’d button stays the same
export const FormBlockButton = React.memo(
  (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
    <button
      {...props}
      className={`ring-offset-3 flex items-center justify-center gap-2 rounded-lg p-3 text-xl ring-white transition-all hover:scale-105 hover:ring-1 hover:ring-amber-600 active:scale-95 ${props.className}`}
    >
      {props.children}
    </button>
  ),
);

FormBlockButton.displayName = "FormBlockButton";
