"use server";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import List from "./List";
import { ClassType } from "../../builder/(buildercomponents)/ClassRelations";

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
    .eq("college", college || "")
    .order("num", { ascending: true });

  if (error) {
    console.error(error);
  }

  const classes = data || [];

  const mathClasses = classes.filter((c: ClassType) => c.category === "MATH");

  const scienceClasses = classes.filter(
    (c: ClassType) =>
      c.category === "BIOSCI" ||
      c.category === "CHEM" ||
      c.category === "PHYSIC",
  );
  const codingClasses = classes.filter(
    (c: ClassType) => c.category === "CMPSCI",
  );
  return (
    <div className="pb-24">
      <h1 className="text-5xl font-bold text-gray-500">From {college}</h1>
      <List classes={mathClasses} title="Math" />
      <List classes={scienceClasses} title="Science" />
      <List classes={codingClasses} title="Programming? No Problem." />
      <List classes={classes} title="All Classes" />
    </div>
  );
};

export default ClassesPage;
