"use client";

import React, { useEffect, createContext, useMemo, useState } from "react";
import { supabase } from "../../config/mesa-config";
import { User } from "@supabase/supabase-js";

export const userContext = createContext<ContextProps>({
  user: undefined,
  userData: undefined,
  signOut: () => {
    supabase.auth.signOut();
  },
});
export interface ContextProps {
  user: User | undefined;
  userData: {
    avatar_url: string
    boxlist: {

    }
    classes?: {

    }
    id: string
    real_name: string
    role: string
    updated_at: Date
    username: string
    website: string
  } | undefined;
  signOut: () => void;
}

const AuthContext = ({ children }: { children: React.ReactNode }) => {
  const [u, setUser] = useState<User>();
  const [userdata, setData] = useState();

  const value = useMemo(() => {
    return {
      user: u,
      userData: userdata,
      signOut: () => {
        supabase.auth.signOut();
      },
    };
    
  }, [u, userdata]);

  const getUser = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        getUserData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getUserData = async () => {
    const userId = (await supabase.auth.getUser()).data.user?.id;

    const { data, error } = await supabase
        .from("profiles")
        .select()
        .eq("id", userId)
        .single();

      if (error) {
        console.log(error);
        return;
      }

      console.log('successfully grabbed data', data)

    setData(data)
  } 

  useEffect(() => {
    getUser();
  }, []);

  const { data } = supabase.auth.onAuthStateChange((event, session) => {
    if (event === "INITIAL_SESSION") {
      // handle initial session
    } else if (event === "SIGNED_IN") {
      console.log("signed in as" + session?.user.email)
      setUser(session?.user);
    } else if (event === "SIGNED_OUT") {
      console.warn("signed out");
      setUser(undefined);
    } else if (event === "PASSWORD_RECOVERY") {
      // handle password recovery event
    } else if (event === "TOKEN_REFRESHED") {
      // handle token refreshed event
    } else if (event === "USER_UPDATED") {
      // handle user updated event
    }
  });

  return <userContext.Provider value={value}>{children}</userContext.Provider>;
};

export default AuthContext;
