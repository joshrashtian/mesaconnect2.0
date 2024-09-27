"use server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import React from "react";
import { cookies } from "next/headers";
import TitleComponent from "@/(mesaui)/title";
import SelectFile from "./SelectFile";
import { FileObject } from "@supabase/storage-js";

const CommunityFilesPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const supabase = createServerComponentClient({ cookies });
  const { data, error } = await supabase.storage.from("communities").list(id);
  if (error || data.length === 0) return <div>Error: {error?.message}</div>;
  return (
    <div className="flex flex-col p-4">
      <TitleComponent size="small" style={{ marginBottom: 5 }}>
        Files
      </TitleComponent>
      <SelectFile files={data} />
    </div>
  );
};

export default CommunityFilesPage;
