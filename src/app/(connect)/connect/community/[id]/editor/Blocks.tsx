"use client";
import React, { useState } from "react";
import { InfoBlockType } from "../../../(profiles)/profile/[id]/infoblocks";
import BlockCommunityItemProvider, {
  CommunityBlockIndex,
} from "../../BlockIndex";

const BlocksEditorPreview = ({ blocks }: { blocks: CommunityBlockIndex[] }) => {
  const [newBlocks, setBlocks] = useState<CommunityBlockIndex[]>(blocks);
  return (
    <section className="*: grid grid-cols-2 gap-5">
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
      <pre>{JSON.stringify(newBlocks, null, 2)}</pre>
    </section>
  );
};

export default BlocksEditorPreview;
