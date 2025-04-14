"use client";
import React, { useEffect, useState } from "react";
import { DataTable } from "./(tables)/posts/datatable";
import { PathwayColumns } from "./(tables)/posts/columns";
import { Separator } from "@/components/ui/separator";
import { supabase } from "../../../../../../config/mesa-config";

export type Pathway = {
  university?: string;
  major: string;
  college: string;
  id: string;
  tag: boolean;
  assist_link?: string;
  pathway?: {
    igetc?: boolean;
    guaranteed?: boolean;
    semesters: {
      classes: {
        id: string;
        type: "Major Prep" | "General Ed" | "Recommendation";
      }[];
    }[];
  };
  colors: string[];
};

const PathwayBuilder = () => {
  const [pathways, setPathways] = useState<Pathway[]>([]);

  useEffect(() => {
    const fetchPathways = async () => {
      const { data, error } = await supabase
        //@ts-ignore
        .from("pathway")
        .select("id, college, major, university, tag, colors");

      if (error) {
        console.error(error);
      }
      setPathways(data as unknown as Pathway[]);
    };
    fetchPathways();
  }, []);
  return (
    <div>
      {" "}
      <h1 className="text-2xl font-bold">Pathway Builder</h1>
      <Separator />
      <DataTable columns={PathwayColumns} data={pathways} />
    </div>
  );
};

export default PathwayBuilder;
