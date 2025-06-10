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

type InfoContextType = {
  data: BlockType | null;
  setData: Dispatch<SetStateAction<BlockType | null>>;
};

const InfoContext = createContext<InfoContextType | undefined>(undefined);

export const InfoProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [data, setData] = useState<BlockType | null>(null);
  return (
    <InfoContext.Provider value={{ data, setData }}>
      {children}
    </InfoContext.Provider>
  );
};

export function useInfo(): InfoContextType {
  const ctx = useContext(InfoContext);
  if (!ctx) throw new Error("useInfo must be used within <InfoProvider>");
  return ctx;
}
