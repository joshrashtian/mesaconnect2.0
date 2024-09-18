import React from "react";
import { InfoBlockType } from "../infoblocks";
import { Index } from "@/app/(connect)/connect/(profiles)/profile/boxTypes";
import { IoBrowsers } from "react-icons/io5";
const AddBlock = ({ Blocks }: { Blocks: InfoBlockType[] | undefined }) => {
  return (
    <div>
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
          return <div key={block.title}>{block.title}</div>;
        })}
    </div>
  );
};

export default AddBlock;
