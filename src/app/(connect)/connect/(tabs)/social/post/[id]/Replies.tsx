"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "../../../../../../../../config/mesa-config";
import Reply from "./Reply";
import { ContextProps } from "@/app/AuthContext";
import {AnimatePresence} from "framer-motion";

export type ReplyType = {
  id: string;
  user_id: string;
  post_id: string;
  reply: string;
  private: boolean;
  creator: {
    realname: string;
    avatar_url: string;
    username: string;
  };
  created_at: Date;
};
const Replies = ({
  id,
  user,
  creator,
}: {
  id: string;
  user: ContextProps;
  creator: string;
}) => {
  const [data, setData] = useState<ReplyType[]>();
  useEffect(() => {
    const fetchReplies = async () => {
      const { data, error } = await supabase
        .from("replies")
        .select()
        .eq("post_id", id)
        .limit(10);

      if (error) {
        console.error(error);
        return;
      }
      //@ts-ignore
      setData(data);
      return;
    };

    fetchReplies();
  }, []);

  useEffect(() => {

    const channels = supabase.channel('custom-all-channel')
        .on(
            'postgres_changes',
            { event: '*', schema: 'public', table: 'replies' },
            (payload) => {
              //@ts-ignore
              if(payload.eventType === 'INSERT') setData(e => [payload.new, ...e])
              if(payload.eventType === 'DELETE') setData(e => e?.filter(d => d.id !== payload.old.id))
            }
        )
        .subscribe()

    return () => {
      channels.unsubscribe()
    }
  }, [supabase]);

  return (
    <div className="flex flex-col gap-1">
      <AnimatePresence>
      {data &&
        data.map((e, i) => {
          if (e.private) {
            if (user.user?.id === creator || user.user?.id === e.user_id)
              return <Reply contents={e} key={i} />;
            else return;
          }
          return <Reply contents={e} key={i} />;
        })}
      </AnimatePresence>
    </div>
  );
};

export default Replies;
