"use client";
import React, { useState } from "react";
import { FiFile } from "react-icons/fi";
import FileComponent from "./FileComponent";
import { type FileObject } from "@supabase/storage-js";
import FilePreview from "./FilePreview";

interface FileObjectProps {
  files: FileObject[];
}

const SelectFile = ({ files }: FileObjectProps) => {
  const [selected, setSelected] = useState<FileObject>();
  return (
    <div className="flex h-96 flex-row gap-4 p-4">
      <ul className="flex flex-col gap-2">
        {files.map((file) => (
          <FileComponent
            key={file.id}
            file={file}
            click={(file) => setSelected(file)}
          />
        ))}
      </ul>
      {selected && <FilePreview file={selected} />}
    </div>
  );
};
export default SelectFile;
