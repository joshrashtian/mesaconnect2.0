"use client";
import React, { useState } from "react";
import { VscLoading } from "react-icons/vsc";

type DeleteButtonProps = {
  function: () => void;
} & React.HTMLAttributes<HTMLButtonElement>;

const DeleteButton = (props: DeleteButtonProps) => {
  const [state, setState] = useState(false);
  const [running, setRunning] = useState(false);
  return (
    <button
      className={`flex h-12 w-64 flex-col items-center justify-center rounded-md ${state ? "bg-red-400" : "bg-red-500"} p-5 text-white duration-300 hover:scale-105 hover:bg-red-400/70 focus:scale-90 focus:bg-red-400/50 ${props.className}`}
      onClick={() => {
        if (state) {
          setRunning(true);
          props.function();
        } else setState(true);
      }}
    >
      {!running ? (
        <>
          <p
            className={`duration-500 ${state ? "translate-y-3 opacity-100" : "opacity-0"} `}
          >
            {" "}
            Are You Sure?
          </p>
          <p
            className={`duration-500 ${!state ? "-translate-y-3 opacity-100" : "opacity-0"} `}
          >
            Delete
          </p>
        </>
      ) : (
        <>
          <VscLoading className="absolute w-full animate-spin text-center opacity-100" />
        </>
      )}
    </button>
  );
};

export default DeleteButton;
