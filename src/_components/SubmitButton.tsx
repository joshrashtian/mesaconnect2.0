import React from "react";
import { VscLoading } from "react-icons/vsc";

type SubmitProps = {
  submitting: boolean;
  setSubmitting: (bool: boolean) => void;
  onClick: () => Promise<void>;
};

const SubmitButton = (props: SubmitProps) => {
  return (
    <button
      onClick={async () => {
        if (!props.submitting) {
          props.setSubmitting(true);
          props.onClick();
        }
      }}
      className={`w-1/3 h-12 hover:scale-105 duration-500 justify-center flex items-center ${
        props.submitting
          ? "bg-theme-blue-2"
          : "bg-orange-500 hover:bg-orange-400"
      } shadow-lg z-40 text-white font-bold rounded-2xl`}
    >
      {props.submitting ? (
        <VscLoading className="animate-spin text-center" />
      ) : (
        "Submit"
      )}
    </button>
  );
};

export default SubmitButton;
