"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import Panels from "./Panels";
import { EventType } from "@/_assets/types";
import EventUsers from "./users";

const TabsForEvent = ({ data }: { data: EventType }) => {
  return (
    <Tabs
      defaultValue="information"
      className="flex w-full flex-col items-center"
    >
      <TabsList className="w-1/3">
        <TabsTrigger className="w-full" value="information">
          Information
        </TabsTrigger>
        <TabsTrigger className="w-full" value="users">
          Users
        </TabsTrigger>
      </TabsList>
      <TabsContent value="information">
        <Panels data={data} />
      </TabsContent>
      <TabsContent value="users">
        <EventUsers event={data} />
      </TabsContent>
    </Tabs>
  );
};

export default TabsForEvent;
