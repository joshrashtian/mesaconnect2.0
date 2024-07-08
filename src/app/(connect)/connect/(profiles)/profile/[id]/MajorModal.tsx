"use client";
import Input from "@/_components/Input";
import React, { useState } from "react";
import { IoPencil } from "react-icons/io5";
import { supabase } from "../../../../../../../config/mesa-config";
import { useToast } from "@/app/(connect)/InfoContext";
import { useModal } from "../../../Modal";
import { VscLoading } from "react-icons/vsc";

const MajorModal = ({
  major,
  user,
}: {
  major: string | undefined;
  user: string | undefined;
}) => {
  const [current, setMajor] = useState<string | undefined>(major);
  const [submitting, setSubmitting] = useState(false);
  const { DisarmModal } = useModal();
  const { CreateSuccessToast, CreateErrorToast } = useToast();
  return (
    <div>
      <h4 className="font-eudoxus font-bold text-2xl">Change Major</h4>
      <Input
        value={major}
        onChange={(e) => setMajor(e.target.value)}
        contentEditable
        icon={<IoPencil />}
      />
      <button
        onClick={async () => {
          if (!submitting) {
            setSubmitting(true);
            if (current) {
              const { error } = await supabase
                .from("profiles")
                .update({
                  //@ts-ignore
                  major: current,
                })
                //@ts-ignore
                .eq("id", user);
              if (error) {
                CreateErrorToast(error.message);
                setSubmitting(false);
              } else {
                CreateSuccessToast("Succesfully Updated Bio!");
                DisarmModal();
              }
            }
          }
        }}
        className={`w-1/3 h-12 hover:scale-105 duration-500 justify-center flex items-center ${
          submitting ? "bg-theme-blue-2" : "bg-orange-500 hover:bg-orange-400"
        } shadow-lg z-40 text-white font-bold rounded-2xl`}
      >
        {submitting ? (
          <VscLoading className="animate-spin text-center" />
        ) : (
          "Submit"
        )}
      </button>
    </div>
  );
};

export default MajorModal;
