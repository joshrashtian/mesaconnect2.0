"use client";
import Input from "@/_components/Input";
import React, { useState } from "react";
import { IoPencil, IoSchool } from "react-icons/io5";
import { supabase } from "../../../../../../../config/mesa-config";
import { useToast } from "@/app/(connect)/InfoContext";
import { useModal } from "../../../Modal";
import { VscLoading } from "react-icons/vsc";

const CollegeModal = ({
  bio,
  user,
}: {
  bio: string | undefined;
  user: string | undefined;
}) => {
  const [biograph, setBio] = useState<string | undefined>(bio);
  const [submitting, setSubmitting] = useState(false);
  const { DisarmModal } = useModal();
  const { CreateSuccessToast, CreateErrorToast } = useToast();
  return (
    <div>
      <h4 className="font-eudoxus text-2xl font-bold">Change Bio</h4>
      <Input
        value={biograph}
        onChange={(e) => setBio(e.target.value)}
        contentEditable
        icon={<IoSchool />}
      />
      <button
        onClick={async () => {
          if (!submitting) {
            setSubmitting(true);
            if (biograph) {
              const { error } = await supabase
                .from("profiles")
                .update({
                  //@ts-ignore
                  college: biograph,
                })
                //@ts-ignore
                .eq("id", user);
              if (error) {
                CreateErrorToast(error.message);
                setSubmitting(false);
              } else {
                CreateSuccessToast("Succesfully Updated College!");
                DisarmModal();
              }
            }
          }
        }}
        className={`flex h-12 w-1/3 items-center justify-center duration-500 hover:scale-105 ${
          submitting ? "bg-theme-blue-2" : "bg-orange-500 hover:bg-orange-400"
        } z-40 rounded-2xl font-bold text-white shadow-lg`}
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

export default CollegeModal;
