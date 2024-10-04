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
      className={`flex h-12 w-1/3 items-center justify-center duration-500 hover:scale-105 ${
        props.submitting
          ? "bg-theme-blue-2"
          : "bg-orange-500 hover:bg-orange-400"
      } z-40 rounded-2xl font-bold text-white shadow-lg`}
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
