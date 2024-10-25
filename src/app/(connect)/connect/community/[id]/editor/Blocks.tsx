"use client";
import React from "react";
import { InfoBlockType } from "../../../(profiles)/profile/[id]/infoblocks";
import BlockCommunityItemProvider from "../../BlockIndex";

const BlocksEditorPreview = ({ blocks }: { blocks: InfoBlockType[] }) => {
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
                  onChangeText={(e) => {}}
                />
              </BlockCommunityItemProvider>
            );
        }
      })}
    </section>
  );
};

export default BlocksEditorPreview;
