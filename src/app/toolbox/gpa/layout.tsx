import GPAProvider from "./GPAProvider";

const _layout = ({ children }: { children: React.ReactNode }) => {
  return <GPAProvider>{children}</GPAProvider>;
};

export default _layout;
