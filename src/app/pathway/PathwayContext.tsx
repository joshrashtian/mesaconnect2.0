"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Pathway } from "../(connect)/connect/(admindashboard)/admin/PathwayBuilder";
import { supabase } from "../../../config/mesa-config";
import { useUser } from "../AuthContext";

const PathwayContext = createContext<PathwayContextType | null>(null);

type PathwayContextType = {
  UserPathways: Pathway[];
  UserTranscript: any;
  loading: boolean;
};

const PathwayContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [UserPathways, setUserPathways] = useState<Pathway[]>([]);
  const [UserTranscript, setUserTranscript] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [ClassData, setClassData] = useState<Map<string, any>>(new Map());
  const { user } = useUser();

  async function getData() {
    setLoading(true);
    console.log("Getting data");
    const { data: transcriptData, error: transcriptError } = await supabase
      .from("transcripts")
      .select("*")
      .eq("userid", user?.id as string);

    if (transcriptError) {
      console.warn(transcriptError);
    }
    setUserTranscript(transcriptData);

    const { data: pathwaysData, error: pathwaysError } =
      //@ts-ignore
      await supabase.rpc("get_user_pathways");

    setUserPathways(pathwaysData as Pathway[]);

    let classIds: string[] = [];

    //@ts-ignore
    pathwaysData.forEach((p: any) => {
      p.pathway.semesters.forEach((s: any) => {
        s.classes.forEach((c: any) => {
          classIds.push(c.id);
        });
      });
    });

    const { data: classData, error: classError } = await supabase
      //@ts-ignore
      .schema("information")
      //@ts-ignore
      .from("classes")
      .select("*")
      .in("id", classIds);
    if (classError) {
      console.warn(classError);
    }

    setClassData(new Map(classData?.map((c: any) => [c.id, c])));
    setLoading(false);
    console.log("Data loaded");
  }

  useEffect(() => {
    getData();
  }, [user]);

  return (
    <PathwayContext.Provider value={{ UserPathways, UserTranscript, loading }}>
      {children}
    </PathwayContext.Provider>
  );
};

export const useUserPathwayContext = () => {
  const context = useContext(PathwayContext);
  if (!context) {
    throw new Error(
      "usePathwayContext must be used within a PathwayContextProvider",
    );
  }
  return context;
};

export default PathwayContextProvider;
