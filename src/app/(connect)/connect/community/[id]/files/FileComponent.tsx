"use client";
import React from "react";
import { FiFile } from "react-icons/fi";
import { type FileObject } from "@supabase/storage-js";

interface FileObjectProps {
  file: FileObject;
  click: (file: FileObject) => void;
}

const FileComponent = ({ file, click }: FileObjectProps) => {
  return (
    <button
      onClick={() => click(file)}
      className="flex w-full flex-row rounded-xl bg-white p-3 duration-300 lg:w-96 dark:bg-zinc-800/50 dark:text-slate-200"
    >
      <FiFile className="text-2xl" />
      <p>{file.name}</p>
    </button>
  );
};

export default FileComponent;
