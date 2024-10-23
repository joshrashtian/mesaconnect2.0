"use server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
const EditorLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) => {
  const supabase = createServerComponentClient({ cookies });

  const { data, error } = await supabase
    .from("communityrelations")
    .select("role")
    .match({
      userid: (await supabase.auth.getUser()).data.user?.id,
      communityid: params.id,
    })
    .single();

  if (error) {
    console.error(error);
  }

  if (data?.role !== "founder") {
    redirect(`/connect/community/${params.id}`);
  }

  return <div>{children}</div>;
};

export default EditorLayout;
