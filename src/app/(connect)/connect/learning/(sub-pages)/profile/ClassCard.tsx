"use client";
import React, { useState } from "react";
import { useModal } from "../../../Modal";
import EditableField from "../../_components/EditableField";
import { useContextMenu, useToast } from "@/app/(connect)/InfoContext";
import { IoPencil, IoTrailSignOutline } from "react-icons/io5";
import { supabase } from "../../../../../../../config/mesa-config";
import { updateClass } from "@/app/(connect)/connect/learning/(sub-pages)/profile/ClassFunctions";
import { AiOutlineLoading } from "react-icons/ai";
import { IconGet } from "./newclass/CategoryIndex";

const ClassCard = ({ class: c }: { class: any }) => {
  const modal = useModal();
  const contextMenu = useContextMenu();

  return (
    <div
      onClick={() => modal.CreateModal(<ClassModal e={c} />)}
      onContextMenu={(e) =>
        contextMenu.createContext(e, [
          {
            name: "Delete Class",
            visible: true,
            function: () => {
              //@ts-ignore
              modal.CreateDialogBox(<DeleteBox cla={c} />, async () => {
                console.log("running dialog...");
                const { error } = await supabase
                  .from("userclasses")
                  .delete()
                  .match({
                    userid: (await supabase.auth.getUser()).data.user?.id,
                    classid: c.id,
                  });

                if (error) {
                  console.error(error);
                  return;
                }

                console.log("Success!");
              });
            },
            icon: <IoTrailSignOutline />,
          },
        ])
      }
      className="group w-full cursor-pointer rounded-xl bg-white p-3.5 px-5 font-eudoxus text-slate-500 shadow-lg duration-300 hover:scale-[1.005] hover:rounded-md hover:bg-zinc-50 dark:bg-slate-700/50 dark:hover:bg-slate-700/70"
    >
      <ul className="flex flex-row justify-between">
        <h2 className="flex flex-row items-center gap-2 font-black text-slate-800 dark:text-white">
          <p className="rounded-full bg-slate-600 p-1 text-white">
            {IconGet(c.category)}
          </p>
          {c.category} {c.num}
        </h2>

        <IoPencil className="origin-top-right scale-0 text-2xl text-black duration-300 group-hover:scale-100 group-hover:text-orange-600" />
      </ul>
      <p>
        {c.name} - {`${c.units} ${c.units > 1 ? "Units" : "Unit"} `}{" "}
      </p>
      <p className="font-light">Teacher: {c.teacher}</p>
      <p className="font-light">Grade: {c.grade}</p>
    </div>
  );
};

const DeleteBox = ({ cla }: { cla: any }) => {
  return (
    <div>
      <h1 className="font-eudoxus text-lg font-bold">
        Are You Sure You Would Like To Delete This Record?
      </h1>
      <h2 className="font-black text-slate-800">
        {cla.category} {cla.num}
      </h2>
      <h1>{cla.name}</h1>
      <h1>{cla.teacher}</h1>
    </div>
  );
};

const ClassModal = ({ e }: { e: any }) => {
  const [newClass, setNewClass] = useState(e);
  const [submitting, setSubmitting] = useState(false);
  const modal = useModal();
  const { CreateErrorToast } = useToast();

  return (
    <section className="flex flex-col gap-4 font-eudoxus">
      <div>
        <h1 className="text-2xl">{e.name}</h1>
        <h2 className="text-xl text-slate-500">
          {e.category} {e.num} - {e.classid}
        </h2>
      </div>

      <section>
        <EditableField
          value={newClass.teacher}
          onChangeText={(e) => {
            setNewClass({
              ...newClass,
              teacher: e,
            });
          }}
        >
          <h2 className="text-xl text-slate-500">{newClass.teacher}</h2>
        </EditableField>
        <EditableField
          value={newClass.grade}
          onChangeText={(e) => {
            setNewClass({
              ...newClass,
              grade: e.at(0),
            });
          }}
        >
          <h2 className="text-xl text-slate-500">{newClass.grade}</h2>
        </EditableField>
        <button
          onClick={() => setNewClass({ ...newClass, grade: "IP" })}
          className={`p-3 px-5 font-eudoxus ${
            newClass.grade !== "IP" ? "bg-indigo-600 text-white" : "bg-white"
          } mr-2 rounded-xl duration-300`}
        >
          <p>In Progress</p>
        </button>
        <button
          onClick={async () => {
            if (newClass === e) return;
            setSubmitting(true);
            let { error } = await updateClass(newClass);
            if (error) {
              CreateErrorToast(error.message);
              return;
            } else modal.DisarmModal();
          }}
          className={`p-3 px-5 font-eudoxus ${
            newClass !== e ? "bg-indigo-600 text-white" : "bg-white"
          } rounded-xl duration-300`}
        >
          <h1>
            {submitting ? (
              <AiOutlineLoading className="animate-spin" />
            ) : (
              "Submit"
            )}
          </h1>
        </button>
      </section>
    </section>
  );
};

export default ClassCard;
