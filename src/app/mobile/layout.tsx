"use server";

const MobileLayout: React.FC<any> = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // Implement your component logic here

  return <main className="p-10 bg-black/70 min-h-screen">{children}</main>;
};

export default MobileLayout;
