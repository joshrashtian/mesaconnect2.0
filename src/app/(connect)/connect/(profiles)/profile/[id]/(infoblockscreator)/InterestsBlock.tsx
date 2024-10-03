"use client";
import React, { useCallback, useEffect, useState } from "react";
import Switch from "@/app/(connect)/connect/(profiles)/profile/[id]/(infoblockscreator)/Switch";
import { supabase } from "../../../../../../../../config/mesa-config";
import { useUser } from "@/app/AuthContext";
import { useToast } from "@/app/(connect)/InfoContext";
import DeleteButton from "@/(mesaui)/DeleteButton";
import { useInfo } from "./InfoBlockDashboard";
import { deleteBlock } from "../../boxTypes/EditBox";
import Input from "@/_components/Input";
import { IoCalendarNumber } from "react-icons/io5";

const InterestsBlock = () => {
  const [visible, setVisible] = React.useState(false);
  const [exists, setExists] = React.useState(false);
  const { user } = useUser();
  const { CreateErrorToast } = useToast();
  const { data } = useInfo();

  useEffect(() => {
    async function get() {
      const { data, error } = await supabase
        .from("infoblocks")
        .select("id, visible")
        .match({ userid: user?.id, type: "interests" })
        .single();
      if (error) {
        setExists(false);
        return;
      }
      if (!data) {
        setExists(false);
      } else {
        setVisible(data.visible);
        setExists(true);
      }
    }
    get();
  }, []);

  const changeVisibiity = async () => {
    const { data, error } = await supabase
      .from("infoblocks")
      .update({ visible: visible ? "private" : "public" })
      .match({ userid: user?.id, type: "interests" })
      .select();

    if (error) CreateErrorToast(error.message);
    else setVisible(!visible);
  };

  if (!exists) return null;
  return (
    <div>
      <h1>Interests</h1>
      <p>Visability For Public</p>
      <Switch click={changeVisibiity} toggled={visible} />
      <DeleteButton
        function={async () => {
          let { error } = await deleteBlock(data.id);
          if (error) CreateErrorToast(error.message);
          else window.location.reload();
        }}
      />
    </div>
  );
};

export function CreateInterest() {
  const [values, setValues] = useState<number>(0);

  return (
    <>
      <h1 className="mb-3 font-eudoxus text-3xl font-bold">Create Interest</h1>
      <p>min 1, max 8</p>
      <Input
        type="number"
        placeholder="number of interests to show"
        contentEditable
        value={values}
        max={10}
        icon=<IoCalendarNumber />
        onChange={(e) => {
          if (parseInt(e.target.value) > 0 && parseInt(e.target.value) < 9)
            setValues(parseInt(e.target.value));
        }}
      />
      {values > 0 && (
        <button
          className={`mt-4 flex h-12 w-1/3 items-center justify-center rounded-2xl bg-blue-400 font-bold text-white shadow-lg duration-500 hover:scale-105`}
          onClick={async () => {
            const { data, error } = await supabase.from("infoblocks").insert({
              data: {
                length: values,
              },
              type: "interests",
            });
            if (error) console.error(error);
            else window.location.reload();
          }}
        >
          Create
        </button>
      )}
    </>
  );
}

export default InterestsBlock;
