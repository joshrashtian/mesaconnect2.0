"use server";

const MobileLayout: React.FC<any> = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // Implement your component logic here

  return <main className="min-h-screen bg-black/70">{children}</main>;
};

export default MobileLayout;
