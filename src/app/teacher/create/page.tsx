"use server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import React from "react";
import CreateComponent from "./createComponent";

const CreateTeacher = async () => {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: userData, error: userDataError } = await supabase
    .from("profiles")
    .select("verified")
    .eq("id", user?.id)
    .single();

  if (!user || !userData?.verified) {
    return <div>You must be verified to add a teacher.</div>;
  }

  const { data: classes } = await supabase
    .schema("information")
    .from("classes")
    .select("id, name, category, num")
    .order("category", { ascending: true })
    .order("num", { ascending: true });

  return (
    <div className="flex flex-col items-center justify-center p-10 font-eudoxus">
      <h1 className="mb-2 text-4xl font-black">Add Teacher</h1>
      <CreateComponent classes={classes ?? []} />
    </div>
  );
};

export default CreateTeacher;
