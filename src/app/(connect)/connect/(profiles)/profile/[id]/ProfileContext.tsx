"use client";
import { UserData } from "@/_assets/types";
import { usePathname } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../../../../../../../config/mesa-config";

type Profile = {
  id: string | undefined;
  data: UserData | undefined;
};

export const ProfileContext = createContext<Profile | null>(null);

const ProfileContextProvider = (props: any) => {
  const [user, setUser] = useState();
  const url = usePathname();

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select()
        .eq("id", url.split("/").reverse()[0])
        .single();

      if (error) {
        console.error(error);
        return;
      }

      //@ts-ignore
      setUser(data);
    };

    fetchData();
  }, []);

  return (
    //@ts-ignore
    <ProfileContext.Provider value={{ data: user, id: user?.id }}>
      {props.children}
    </ProfileContext.Provider>
  );
};

export function useProfile() {
  return useContext(ProfileContext);
}

export default ProfileContextProvider;
