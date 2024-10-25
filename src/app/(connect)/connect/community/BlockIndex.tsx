"use client";
import Link from "next/link";
import { type PageContent } from "./[id]/functions";
import { createContext, useContext, useState } from "react";
import TextBlockComponent from "./[id]/(components)/TextBlock";
import { Editor } from "@monaco-editor/react";
import parse from "html-react-parser";
export type CommunityBlockIndex = {
  type: PageContent;
  data: any;

  size?: "small" | "medium" | "large";
  className?: string;
  editor?: boolean;
  onEdited?: (blocks: any) => void;
};

export const BlockCommunityItemContext =
  createContext<CommunityBlockIndex | null>(null);

const BlockCommunityItemProvider = ({
  children,
  type,
  data,
  size,
  className,
  editor = false,
  onEdited,
}: {
  children: React.ReactNode;
  type: PageContent;
  data: any;
  size: "small" | "medium" | "large";
  className?: string;
  editor?: boolean;
  onEdited?: (blocks: any) => void;
}) => {
  return (
    <BlockCommunityItemContext.Provider
      value={{ type, data, editor, onEdited }}
    >
      <ul
        className={`flex flex-col gap-2 rounded-md bg-white p-4 dark:bg-zinc-600 ${size === "small" ? "h-32 w-[49%]" : size === "medium" ? "h-fit w-[49%]" : "h-fit w-full"} ${className}`}
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

BlockCommunityItemProvider.TextBlockEditor =
  function TextBlockEditorComponent() {
    return <div>TextBlockEditorComponent</div>;
  };

BlockCommunityItemProvider.HTMLEditor = function HTMLEditorComponent({
  onChangeText,
}: {
  onChangeText: (value: string | undefined) => void;
}) {
  const [html, setHTML] = useState<string | undefined>("");
  const parser = require("html-react-parser");
  const cleaner = require("dompurify");

  return (
    <>
      <h1>HTML Block</h1>
      <p className="text-xs">
        * for Styling, We Recommend Using Class Objects, As Your Page May Run
        Into Style Errors As A Result.
      </p>
      <Editor
        language="html"
        theme="vs-dark"
        className="min-h-40 border-2 border-green-400"
        onChange={(e) => {
          setHTML(e);
          onChangeText(e);
        }}
      />
      {parse(cleaner.sanitize(html))}
    </>
  );
};

export default BlockCommunityItemProvider;
