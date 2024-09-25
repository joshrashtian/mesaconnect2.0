import React from "react";
import { type CommunityBlockIndex } from "../BlockIndex";

interface CommunityBlocksProps {
  blocks: CommunityBlockIndex[];
}

const CommunityBlocks: React.FC<CommunityBlocksProps> = ({ blocks }) => {
  return (
    <div>
      {blocks.map((e, index) => {
        switch (e.type) {
          case "location":
            return <div>Location</div>;
          case "text_block":
            return <div>Text Block</div>;
          case "canvas":
            return <div>Canvas</div>;
        }
      })}
    </div>
  );
};

export default CommunityBlocks;
