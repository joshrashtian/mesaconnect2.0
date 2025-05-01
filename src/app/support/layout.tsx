import React from "react";
import HomePageHeader from "../news/(homepage)/header";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="p-14 font-eudoxus">
      <HomePageHeader title="Support" />
      {children}
    </main>
  );
};

export default Layout;
