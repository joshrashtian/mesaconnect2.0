import React, { Suspense } from "react";

const EventLayout = ({ children }: { children: React.ReactNode }) => {
  return <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>;
};

export default EventLayout;
