"use client";
import React, { useState } from "react";
import { InfoBlockType } from "../../../(profiles)/profile/[id]/infoblocks";
import BlockCommunityItemProvider, {
  CommunityBlockIndex,
} from "../../BlockIndex";
import { IoAdd, IoDocument } from "react-icons/io5";
import { useModal } from "../../../Modal";
import CommunityBlock from "../../../(profiles)/profile/boxTypes/CommunityBlock";
import MenuButton from "@/(mesaui)/MenuButton";
import { updateCommunity } from "../functions";
import { useParams } from "next/navigation";

const BlocksEditorPreview = ({ blocks }: { blocks: CommunityBlockIndex[] }) => {
  const modal = useModal();
  const { id } = useParams();
  const [newBlocks, setBlocks] = useState<CommunityBlockIndex[]>(blocks);
  return (
    <>
      <section className="relative grid h-fit grid-cols-2 gap-5">
        {newBlocks.map((block) => {
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
                  <BlockCommunityItemProvider.TextBlockEditor
                    onChangeText={(e) => {
                      setBlocks((blocks) =>
                        blocks.map((b) =>
                          b.id === block.id
                            ? { ...b, data: e.text, className: e.className }
                            : b,
                        ),
                      );
                    }}
                  />
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

        {newBlocks.length < 4 && (
          <button
            onClick={() => {
              modal.CreateModal(
                <div className="flex flex-col gap-3">
                  {["html", "text"].map((type) => (
                    <button
                      onClick={() => {
                        //@ts-ignore
                        setBlocks([...newBlocks, createBlock(type)!]);
                        modal.DisarmModal();
                      }}
                      className="bg-theme-blue p-2 capitalize text-white"
                      key={type}
                    >
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
        )}
      </section>
      <MenuButton
        title="Save"
        color="mt-5 bg-gradient-to-r from-theme-blue to-theme-blue-2"
        icon={<IoDocument />}
        onClick={async () => {
          //@ts-ignore
          const { error } = await updateCommunity(id, newBlocks);
          if (error) {
            alert(error.message);
          }
        }}
      />
    </>
  );
};

export default BlocksEditorPreview;

export function createBlock(
  type: CommunityBlockIndex["type"],
): CommunityBlockIndex | undefined {
  switch (type) {
    case "html":
      return {
        id: Math.random(),
        type: type,
        data: "<div class='container'>\n  <h1>Sample of HTML</h1>\n  <p>Sample Text</p>\n  <button>Button</button>\n</div>\n<style>\n.container {\n  background-color: #eee;\n  padding: 20px\n}\n</style>",
      };
    case "text":
      return {
        id: Math.random(),
        type: "text",
        data: "sample text",
      };
  }
}
