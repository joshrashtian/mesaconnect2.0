"use client";
import React, { useState } from "react";
import { supabase } from "../../../../../../../config/mesa-config";
import { useUser } from "@/app/AuthContext";
import { useModal } from "../../../Modal";
import { useToast } from "@/app/(connect)/InfoContext";
import { VscLoading } from "react-icons/vsc";

const AddTabModal = ({ tab }: { tab: string }) => {
  const { userData } = useUser();
  const [submitting, setSubmitting] = useState(false);
  const { DisarmModal } = useModal();
  const { CreateSuccessToast, CreateErrorToast } = useToast();

  async function addTab() {
    if (submitting) return;

    setSubmitting(true);

    // Check if tab already exists
    const existingTab = userData?.visibility?.tabs?.find((t) => t.name === tab);

    if (existingTab) {
      CreateErrorToast("This tab already exists in your profile!");
      setSubmitting(false);
      return;
    }

    const { error } = await supabase
      .from("profiles")
      .update({
        //@ts-ignore
        visibility: {
          ...userData?.visibility,
          tabs: [
            ...(userData?.visibility?.tabs || []),
            { name: tab, status: "current", visibility: "public" },
          ],
        },
      })
      .eq("id", userData?.id as string);

    if (error) {
      CreateErrorToast(error.message);
      setSubmitting(false);
      return;
    }

    CreateSuccessToast(`Successfully added ${tab} tab!`);
    DisarmModal();
  }

  return (
    <div className="font-eudoxus">
      <h4 className="mb-4 text-2xl font-bold">Add Tab</h4>
      <p className="mb-6 text-lg">
        Are you sure you want to add{" "}
        <span className="font-bold text-orange-500">{tab}</span> to your
        profile?
      </p>
      <div className="flex gap-3">
        <button
          onClick={() => DisarmModal()}
          disabled={submitting}
          className="flex h-12 w-1/3 items-center justify-center rounded-2xl bg-gray-300 font-bold text-gray-700 shadow-lg duration-500 hover:scale-105 hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          onClick={addTab}
          disabled={submitting}
          className={`flex h-12 w-2/3 items-center justify-center duration-500 hover:scale-105 ${
            submitting ? "bg-theme-blue-2" : "bg-orange-500 hover:bg-orange-400"
          } z-40 rounded-2xl font-bold text-white shadow-lg disabled:cursor-not-allowed disabled:opacity-50`}
        >
          {submitting ? (
            <VscLoading className="animate-spin text-center" />
          ) : (
            "Add Tab"
          )}
        </button>
      </div>
    </div>
  );
};

export default AddTabModal;
