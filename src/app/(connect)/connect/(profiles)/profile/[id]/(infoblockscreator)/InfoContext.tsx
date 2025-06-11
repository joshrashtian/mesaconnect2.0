"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import type { BlockType } from "@/app/(connect)/connect/(profiles)/profile/(boxTypes)/types";
import { useParams } from "next/navigation";

type InfoContextType = {
  data: BlockType | null;
  setData: Dispatch<SetStateAction<BlockType | null>>;
  userid: string;
};

const InfoContext = createContext<InfoContextType | undefined>(undefined);

export const InfoProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const params = useParams();
  const userid = params.id as string;
  const [data, setData] = useState<BlockType | null>(null);
  return (
    <InfoContext.Provider value={{ data, setData, userid }}>
      {children}
    </InfoContext.Provider>
  );
};

export function useInfo(): InfoContextType {
  const ctx = useContext(InfoContext);
  if (!ctx) throw new Error("useInfo must be used within <InfoProvider>");
  return ctx;
}
