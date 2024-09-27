"use client";
import React from "react";
import { FiFile } from "react-icons/fi";

interface FileObjectProps {
  file: any;
}

const FileObject = ({ file }: FileObjectProps) => {
  return (
    <button className="flex flex-row bg-white p-3">
      <FiFile className="text-2xl" />
      <p>{file.name}</p>
    </button>
  );
};

export default FileObject;
