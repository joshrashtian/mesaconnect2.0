"use client";
import React, { useCallback } from "react";
import { IoInformationCircle } from "react-icons/io5";
import { useModal } from "../../Modal";

const InformationButton = () => {
  const modal = useModal();
  const info = useCallback(() => {
    modal.CreateDialogBox(
      <div className="w-[400px]">
        <h1 className="text-2xl font-bold">What are these?</h1>
        <p>
          These are the RateMyProfessors for popular / recommend professors
          using the MESA Recommendations. Be aware not all RateMyProfessors are
          accurate, and make sure to click and view the teachers reviews
          directly. This uses official data from the RateMyProfessors website.
        </p>
      </div>,
      () => {},
    );
  }, []);

  return (
    <button className="absolute right-5 top-5" onClick={info}>
      <IoInformationCircle className="text-4xl text-gray-500" />
    </button>
  );
};

export default InformationButton;
