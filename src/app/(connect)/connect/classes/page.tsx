"use server";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import List from "./List";

const ClassesPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ college: string }>;
}) => {
  const supabase = createServerComponentClient({ cookies });
  const college = (await searchParams).college;

  const { data, error } = await supabase
    // @ts-ignore
    .schema("information")
    // @ts-ignore
    .from("classes")
    .select("*")
    .eq("college", college || "");

  if (error) {
    console.error(error);
  }

  const classes = data || [];

  return (
    <div>
      <List classes={classes} />
    </div>
  );
};

export default ClassesPage;
