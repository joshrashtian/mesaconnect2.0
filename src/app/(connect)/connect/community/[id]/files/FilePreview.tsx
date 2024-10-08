"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { type FileObject } from "@supabase/storage-js";
import Link from "next/link";
import { supabase } from "../../../../../../../config/mesa-config";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useToast } from "@/app/(connect)/InfoContext";

function formatBytes(bytes: number, decimals = 2) {
  if (!+bytes) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = [
    "Bytes",
    "KiB",
    "MiB",
    "GiB",
    "TiB",
    "PiB",
    "EiB",
    "ZiB",
    "YiB",
  ];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

const FilePreview = ({ file }: { file: FileObject }) => {
  const [blob, setBlob] = useState<Blob | null>();
  const { id } = useParams();
  const toast = useToast();
  const download = async () => {
    const { data, error } = await supabase.storage
      .from("communities")
      .download(`${id}/${file.name}`);

    if (error) toast.CreateErrorToast(error.message);

    setBlob(data);
  };

  useEffect(() => {
    download();
  }, [file]);

  return (
    <motion.article className="w-full rounded-3xl p-6 dark:bg-zinc-800/50 dark:text-white">
      {file.metadata?.mimetype.includes("image") && blob && (
        <Image
          src={URL.createObjectURL(blob)}
          width={48}
          height={48}
          alt={file.name}
        />
      )}
      <h1>{file.name}</h1>
      <p>{formatBytes(file.metadata?.size)}</p>
      <p>File Type: {file.metadata?.mimetype}</p>
      <p>Created At: {file.created_at}</p>

      {blob && (
        <Link download href={URL.createObjectURL(blob)}>
          Download
        </Link>
      )}
    </motion.article>
  );
};

export default FilePreview;
