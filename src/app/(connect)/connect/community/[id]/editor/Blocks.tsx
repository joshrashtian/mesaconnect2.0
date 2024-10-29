"use client";
import React, { useState } from "react";
import { InfoBlockType } from "../../../(profiles)/profile/[id]/infoblocks";
import BlockCommunityItemProvider, {
  CommunityBlockIndex,
} from "../../BlockIndex";
import { IoAdd } from "react-icons/io5";
import { useModal } from "../../../Modal";

const BlocksEditorPreview = ({ blocks }: { blocks: CommunityBlockIndex[] }) => {
  const { CreateModal } = useModal();
  const [newBlocks, setBlocks] = useState<CommunityBlockIndex[]>(blocks);
  return (
    <section className="*: relative grid grid-cols-2 gap-5">
      {blocks.map((block) => {
        switch (block.type) {
          case "text":
            return (
              <BlockCommunityItemProvider
                type="text"
                size="large"
                key={block.id}
                data={block.data}
                editor
              >
                <BlockCommunityItemProvider.TextBlock />
              </BlockCommunityItemProvider>
            );
          case "html":
            return (
              <BlockCommunityItemProvider
                type="html"
                size="large"
                key={block.id}
                data={block.data}
                editor
              >
                <BlockCommunityItemProvider.HTMLEditor
                  onChangeText={(e) => {
                    setBlocks((blocks) =>
                      blocks.map((b) =>
                        b.id === block.id ? { ...b, data: e } : b,
                      ),
                    );
                  }}
                />
              </BlockCommunityItemProvider>
            );
        }
      })}

      <button
        onClick={() => {
          CreateModal(
            <div>
              {["html", "text"].map((type) => (
                <button className="capitalize" key={type}>
                  {type}
                </button>
              ))}
            </div>,
          );
        }}
        className="absolute right-4 top-4 rounded-full bg-orange-500 p-1"
      >
        <IoAdd className="text-2xl text-white" />
      </button>
    </section>
  );
};

export default BlocksEditorPreview;
