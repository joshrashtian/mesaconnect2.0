"use client";
import React, { useState } from "react";
import { IoBrowsers } from "react-icons/io5";

import { FormBlockButton } from "./InfoBlockDashboard";
import { blockDefinitions } from "../../(boxTypes)/blockRegistry";
import type {
  BlockType,
  BlockKey,
} from "@/app/(connect)/connect/(profiles)/profile/(boxTypes)/types";

interface AddBlockProps {
  Blocks?: BlockType[];
}

export default function AddBlock({ Blocks }: AddBlockProps) {
  // We store just the “type” key of the active block
  const [activeType, setActiveType] = useState<BlockKey | null>(null);

  // Derive the CreateForm component for that key, if any
  const ActiveForm = activeType
    ? blockDefinitions[activeType].CreateForm
    : null;

  return (
    <div className="flex h-[600px] w-[800px] flex-col gap-4 p-4">
      <h1 className="flex items-center text-2xl font-bold">
        <IoBrowsers className="mr-2" />
        Add Block
      </h1>

      <div className="flex flex-row">
        {/* 1) Sidebar: list all blocks you haven’t already added */}
        <ul className="w-32 space-y-2">
          {(
            Object.values(blockDefinitions) as Array<
              (typeof blockDefinitions)[BlockKey]
            >
          )
            // only show definitions whose `type` isn't already in `Blocks`
            .filter((def) => !Blocks?.some((b) => b.type === def.type))
            .map((def) => (
              <FormBlockButton
                key={def.type}
                onClick={() => setActiveType(def.type)}
                className="bg-white capitalize"
              >
                {def.icon}
                {def.title}
              </FormBlockButton>
            ))}
        </ul>

        {/* 2) Main area: show the selected block’s form */}
        <div className="flex-1 p-4">
          {ActiveForm ? (
            // Render the form component
            <ActiveForm />
          ) : (
            <p className="text-gray-500">Select a block type to add…</p>
          )}
        </div>
      </div>
    </div>
  );
}
