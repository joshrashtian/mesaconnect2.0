import React from "react";

const KioskInput = ({
  name,
  placeholder,
  containerClassName,
  icon,
  ...props
}: {
  name: string;
  placeholder: string;
  containerClassName?: string;
  icon?: React.ReactNode;
} & React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <div
      className={`relative w-full rounded-md border-2 border-zinc-700 bg-zinc-800 text-xl ${containerClassName}`}
    >
      {icon && (
        <div className="absolute left-4 top-1/2 -translate-y-1/2">{icon}</div>
      )}
      <input
        className={`${props.className} ${
          icon ? "pl-12" : "pl-4"
        } h-full w-full rounded-md bg-zinc-800 p-4 text-white focus:outline-none`}
        name={name}
        placeholder={placeholder}
        {...props}
      />
    </div>
  );
};

export default KioskInput;
