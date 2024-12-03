"use server";
import { MultiStepProvider } from "@/app/(connect)/connect/MutliStepContext";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

const EventKioskLayout = async ({
  params,
  children,
}: {
  params: { id: string };
  children: React.ReactNode;
}) => {
  let supabase = createServerComponentClient({ cookies });
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("id", params.id)
    .single();
  const user = await supabase.auth.getUser();

  if (!user) {
    redirect("/sign-in");
  }

  if (user.data.user?.id !== data.creator) {
    return <div>Not authorized</div>;
  }
  return (
    <MultiStepProvider>
      <div>{children}</div>
    </MultiStepProvider>
  );
};

export default EventKioskLayout;
