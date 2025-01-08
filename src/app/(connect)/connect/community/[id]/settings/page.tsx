"use client";

import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import React from "react";
import { IoPersonRemove } from "react-icons/io5";
import { useModal } from "../../../Modal";
import DisbandModal from "./DisbandModal";

const CommunitySettings = () => {
  const params = useParams();
  const modal = useModal();
  function disbandCommunity() {
    modal.CreateModal(<DisbandModal community={params.id} />, {
      canUnmount: true,
    });
  }
  return (
    <div className="p-3">
      {" "}
      <h1 className="text-3xl font-black text-slate-700 dark:text-slate-200">
        Settings for {params.id}
      </h1>
      <section>
        <Button onClick={disbandCommunity}>
          <IoPersonRemove /> Disband
        </Button>
      </section>
    </div>
  );
};

export default CommunitySettings;
