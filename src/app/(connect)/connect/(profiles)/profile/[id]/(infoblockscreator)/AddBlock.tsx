import React from "react";
import { InfoBlockType } from "../infoblocks";
import { Index } from "@/app/(connect)/connect/(profiles)/profile/boxTypes";
import { IoBrowsers } from "react-icons/io5";
import { FormBlockButton } from "./InfoBlockDashboard";
const AddBlock = ({ Blocks }: { Blocks: InfoBlockType[] | undefined }) => {
  return (
    <div className="flex h-[600px] w-[800px] flex-col gap-4">
      <h1>
        <IoBrowsers /> Add Block
      </h1>
      {Index.filter((block) => block.infoblock)
        .filter(
          (block) =>
            !Blocks?.some(
              (e) => e.type.toLowerCase() === block.title.toLowerCase(),
            ),
        )
        .map((block) => {
          return (
            <FormBlockButton
              key={block.title}
              className="w-48 bg-white capitalize"
            >
              {block.icon}
              {block.title}
            </FormBlockButton>
          );
        })}
    </div>
  );
};

export default AddBlock;
