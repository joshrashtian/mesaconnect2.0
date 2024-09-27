"use server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import React from "react";
import { cookies } from "next/headers";
import FileObject from "./FileObject";

const CommunityFilesPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const supabase = createServerComponentClient({ cookies });
  const { data, error } = await supabase.storage.from("communities").list(id);
  if (error || data.length === 0) return <div>Error: {error?.message}</div>;
  return (
    <div className="flex flex-col p-4">
      <h1>Files</h1>
      <ul className="flex flex-col gap-2">
        {data?.map((file) => <FileObject key={file.id} file={file} />)}
      </ul>{" "}
    </div>
  );
};

export default CommunityFilesPage;
