"use client";
import React from "react";
import { InfoBlockType } from "../../../(profiles)/profile/[id]/infoblocks";
import BlockCommunityItemProvider from "../../BlockIndex";

const BlocksEditorPreview = ({ blocks }: { blocks: InfoBlockType[] }) => {
  return (
    <pre>
      {blocks.map((block) => {
        switch (block.type) {
          case "text":
            return (
              <BlockCommunityItemProvider
                type="text"
                size="medium"
                key={block.id}
                data={block.data}
                editor
              >
                <BlockCommunityItemProvider.TextBlock />
              </BlockCommunityItemProvider>
            );
        }
      })}
    </pre>
  );
};

export default BlocksEditorPreview;
