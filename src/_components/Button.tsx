import React from "react";

const Button = ({
  children,
  style,
  pressed,
}: {
  children: React.ReactNode;
  style: string;
  pressed: () => void;
}) => {

  return (
    <div
      className={`${style} cursor-pointer hover:scale-105 duration-300 justify-center flex items-center`}
      onClick={pressed}
    >
      {children}
    </div>
  );
};

export default Button;
