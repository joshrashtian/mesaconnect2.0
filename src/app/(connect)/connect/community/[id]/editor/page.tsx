"use server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import React from "react";
import { cookies } from "next/headers";
import BlocksEditorPreview from "./Blocks";

const page = async ({ params }: { params: { id: string } }) => {
  const supabase = createServerComponentClient({ cookies });
  const { data, error } = await supabase
    .from("communities")
    .select("blocks, private, description")
    .eq("id", params.id)
    .single();

  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <div className="h-full w-full p-4">
      <h1 className="text-3xl font-black text-slate-700 dark:text-slate-200">
        Community Editor / {params.id}
      </h1>
      <BlocksEditorPreview blocks={data.blocks} />
    </div>
  );
};

export default page;
