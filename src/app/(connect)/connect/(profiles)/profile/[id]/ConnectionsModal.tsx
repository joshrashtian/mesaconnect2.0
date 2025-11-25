import React from "react";
import { Connection } from "./ProfileContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

const ConnectionsModal = ({
  connections,
}: {
  connections: Connection[] | undefined;
}) => {
  console.log(connections);

  return (
    <div className="font-eudoxus">
      <h1 className="text-2xl font-bold">Connections</h1>
      <ul className="flex max-h-[500px] flex-col gap-2 overflow-y-scroll">
        {connections?.map((connection) => (
          <Link
            href={`/connect/profile/${connection.id}`}
            key={connection.id}
            className="flex flex-row items-center gap-2"
          >
            <Avatar>
              <AvatarImage src={connection.avatar_url} />
              <AvatarFallback>{connection.full_name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <p>{connection.full_name}</p>
              <p>{connection.username}</p>
            </div>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default ConnectionsModal;
