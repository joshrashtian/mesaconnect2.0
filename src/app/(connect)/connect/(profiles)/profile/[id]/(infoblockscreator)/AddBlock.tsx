"use client";
import React from "react";
import { InfoBlockType } from "../infoblocks";
import { Index } from "@/app/(connect)/connect/(profiles)/profile/boxTypes";
import { IoBrowsers } from "react-icons/io5";
import { FormBlockButton } from "./InfoBlockDashboard";
const AddBlock = ({ Blocks }: { Blocks: InfoBlockType[] | undefined }) => {
  const [Active, setActive] = React.useState<any>();
  return (
    <div className="flex h-[600px] w-[800px] flex-col gap-4">
      <h1>
        <IoBrowsers /> Add Block
      </h1>
      <section className="flex flex-row">
        <ul className="w-24">
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
                  onClick={() => {
                    setActive(block.add);
                  }}
                  className="w-48 bg-white capitalize"
                >
                  {block.icon}
                  {block.title}
                </FormBlockButton>
              );
            })}
        </ul>
        <ul className="translate-x-28">{Active}</ul>
      </section>
    </div>
  );
};

export default AddBlock;
