"use client";
import { EventType } from "@/_assets/types";
import { useParams } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../../../../config/mesa-config";

const SelectedContext = createContext<EventType | null>(null);

export const SelectedProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const params = useParams();

  const [event, setEvent] = useState<EventType | null>(null);

  async function fetchEvent() {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .eq("id", params.id)
      .single();

    if (error) {
      console.log(error.message);
    } else {
      //@ts-ignore
      setEvent(data);
    }
  }
  useEffect(() => {
    if (params.id) fetchEvent();
  }, [params.id]);

  return (
    <SelectedContext.Provider value={event}>
      {children}
    </SelectedContext.Provider>
  );
};

export const useSelectedEvent = () => {
  const context = useContext(SelectedContext);
  if (context === undefined) {
    throw new Error("useSelectedEvent must be used within a SelectedProvider");
  }
  return context;
};
