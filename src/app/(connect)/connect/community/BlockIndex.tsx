"use client";
import Link from "next/link";
import { type PageContent } from "./[id]/functions";
import { createContext, useContext } from "react";
import TextBlockComponent from "./[id]/(components)/TextBlock";

export type CommunityBlockIndex = {
  type: PageContent;
  data: any;
  size?: "small" | "medium" | "large";
  className?: string;
};

export const BlockCommunityItemContext =
  createContext<CommunityBlockIndex | null>(null);

const BlockCommunityItemProvider = ({
  children,
  type,
  data,
  size,
  className,
}: {
  children: React.ReactNode;
  type: PageContent;
  data: any;
  size: "small" | "medium" | "large";
  className?: string;
}) => {
  return (
    <BlockCommunityItemContext.Provider value={{ type, data }}>
      <ul
        className={`flex flex-col gap-2 rounded-md bg-white p-4 dark:bg-zinc-600 ${size === "small" ? "h-32 w-[49%]" : size === "medium" ? "h-64 w-[49%]" : "h-64 w-full"} ${className}`}
      >
        {children}
      </ul>
    </BlockCommunityItemContext.Provider>
  );
};

export function useBlock() {
  const block = useContext(BlockCommunityItemContext);
  return block;
}

BlockCommunityItemProvider.displayName = "BlockCommunityItemProvider";

BlockCommunityItemProvider.TextBlock = TextBlockComponent;

BlockCommunityItemProvider.CanvasBlock = function CanvasBlockComponent() {
  const block = useBlock();
  return <Link href={`/connect/community/${block?.data}`}>{block?.data}</Link>;
};

export default BlockCommunityItemProvider;
