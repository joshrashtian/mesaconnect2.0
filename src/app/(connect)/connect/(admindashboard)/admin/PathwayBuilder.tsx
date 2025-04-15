"use client";
import React, { useEffect, useState } from "react";
import { DataTable } from "./(tables)/posts/datatable";
import { PathwayColumns } from "./(tables)/posts/columns";
import { Separator } from "@/components/ui/separator";
import { supabase } from "../../../../../../config/mesa-config";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useModal } from "../../Modal";
import { IoAdd } from "react-icons/io5";
import { CreatePathway } from "./pathway/[id]/GetClass";
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
  const modal = useModal();
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
      <h1 className="text-2xl font-bold">Pathway Builder</h1>
      <Separator />
      <ol className="flex flex-row gap-2">
        <Button onClick={() => modal.CreateModal(<AddPathway />)}>
          Add Pathway
        </Button>
      </ol>
      <DataTable columns={PathwayColumns} data={pathways} />
    </div>
  );
};

function AddPathway() {
  const [information, setInformation] = useState<{
    university: string;
    major: string;
    college: string;
    colors: string[];
  }>({
    university: "",
    major: "",
    college: "",
    colors: [],
  });

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl font-bold">Add Pathway</h1>
      <Input
        value={information.university}
        onChange={(e) =>
          setInformation({ ...information, university: e.target.value })
        }
        placeholder="University"
      />
      <Input
        value={information.major}
        onChange={(e) =>
          setInformation({ ...information, major: e.target.value })
        }
        placeholder="Major"
      />
      <Input
        value={information.college}
        onChange={(e) =>
          setInformation({ ...information, college: e.target.value })
        }
        placeholder="College"
      />

      <Button
        onClick={async () => {
          if (
            !information.university ||
            !information.major ||
            !information.college
          ) {
            return;
          }
          const res = await CreatePathway(information);
          if (res?.error) {
            console.error(res?.error);
          }
        }}
      >
        <IoAdd /> Add Pathway
      </Button>
    </div>
  );
}

export default PathwayBuilder;
