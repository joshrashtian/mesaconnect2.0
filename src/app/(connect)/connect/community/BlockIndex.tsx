"use client";
import Link from "next/link";
import { type PageContent } from "./[id]/functions";
import { createContext, use, useContext, useEffect, useState } from "react";
import TextBlockComponent from "./[id]/(components)/TextBlock";
import { Editor } from "@monaco-editor/react";
import parse from "html-react-parser";
import { motion } from "framer-motion";
import Input from "@/_components/Input";
export type CommunityBlockIndex = {
  id: number;
  type: PageContent;
  data: any;

  size?: "small" | "medium" | "large";
  className?: string;
  editor?: boolean;
  onEdited?: (blocks: any) => void;
};

export const BlockCommunityItemContext =
  //@ts-ignore
  createContext<CommunityBlockIndex>(null);

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
      value={{ type, data, editor, onEdited, id: Math.random() }}
    >
      <motion.ul
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`relative flex h-fit flex-col gap-2 rounded-md bg-white p-4 dark:bg-zinc-600 ${size === "small" ? "h-32 w-[49%]" : size === "medium" ? "h-fit w-[49%]" : "h-fit w-full"} ${className}`}
      >
        {children}
      </motion.ul>
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

BlockCommunityItemProvider.TextBlockEditor = function TextBlockEditorComponent({
  onChangeText,
}: {
  onChangeText: (value: {
    text: string | undefined;
    className: string | undefined;
  }) => void;
}) {
  const { data } = useBlock();
  const [text, setText] = useState<string | undefined>(data?.data);
  const [className, setClassName] = useState<string | undefined>(
    data?.className,
  );

  useEffect(() => {
    onChangeText({ text, className });
  }, [text, className]);
  return (
    <>
      <h1>Text Block</h1>
      {text}
      <Input onChange={(e) => setText(e.target.value)} />
      <p>Style (using TailwindCSS)</p>
      <Input onChange={(e) => setClassName(e.target.value)} />
    </>
  );
};

BlockCommunityItemProvider.HTMLEditor = function HTMLEditorComponent({
  onChangeText,
}: {
  onChangeText: (value: string | undefined) => void;
}) {
  const data = useBlock();
  const parser = require("html-react-parser");
  const cleaner = require("dompurify");
  const [html, setHTML] = useState<string | undefined>(data?.data);

  return (
    <>
      <h1>Custom Block</h1>
      <p className="text-xs">
        * for Styling, We Recommend Using Class Objects, As Your Page May Run
        Into Style Errors As A Result.
      </p>
      <Editor
        language="html"
        theme="vs-dark"
        className="b resize- min-h-52 bg-zinc-700"
        value={data?.data}
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
