"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRoomContext } from "@/app/room/RoomContext";
import { Environment } from "../RoomType";
import { Input } from "@/components/ui/input";
import { Editor } from "@monaco-editor/react";

const CreateEnvironment = () => {
  const { setEnvironment } = useRoomContext();
  const [newEnvironment, setNewEnvironment] = useState<Environment | null>(
    null,
  );

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setNewEnvironment(
      //@ts-ignore
      {
        ...newEnvironment,
        type: "color",
        [e.target.name]: e.target.value,
      },
    );
  }
  return (
    <div className="flex flex-col gap-2">
      <Input
        name="name"
        value={newEnvironment?.name}
        placeholder="Environment Name"
        onChange={handleChange}
      />
      <Input
        name="content"
        value={newEnvironment?.content}
        placeholder="Content"
        onChange={handleChange}
      />
      <Editor
        height="100px"
        width="100%"
        language="json"
        theme="vs-dark"
        options={{
          minimap: {
            enabled: false,
          },
          tabSize: 2,
        }}
        onChange={(value) => {
          setNewEnvironment(JSON.parse(value || "{}"));
        }}
        value={JSON.stringify(newEnvironment, null, 2)}
      />
      <Button onClick={() => setEnvironment(newEnvironment)}>
        Create Environment
      </Button>
    </div>
  );
};

export default CreateEnvironment;
