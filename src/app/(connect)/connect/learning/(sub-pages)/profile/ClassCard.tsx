"use client";
import React, {useState} from "react";
import {useModal} from "../../../Modal";
import EditableField from "../../_components/EditableField";
import {useContextMenu, useToast} from "@/app/(connect)/InfoContext";
import {IoTrailSignOutline} from "react-icons/io5";
import {supabase} from "../../../../../../../config/mesa-config";
import {updateClass} from "@/app/(connect)/connect/learning/(sub-pages)/profile/ClassFunctions";
import {AiOutlineLoading} from "react-icons/ai";

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
      className="p-5 w-1/5 origin-top cursor-pointer hover:scale-105 duration-300 text-slate-500 bg-white shadow-lg rounded-lg"
    >
      <h2 className="font-black text-slate-800">
        {c.category} {c.num}
      </h2>
      <h1>{c.name}</h1>
      <h1>{c.teacher}</h1>
    </div>
  );
};

const DeleteBox = ({ cla }: { cla: any }) => {
  return (
    <div>
      <h1 className="font-bold text-lg font-eudoxus">
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
  const [submitting, setSubmitting] = useState(false)
  const modal = useModal()
  const { CreateErrorToast } = useToast()

  return (
    <section className="font-eudoxus flex flex-col gap-4">
      <div>
        <h1 className="text-2xl">{e.name}</h1>
        <h2 className="text-xl text-slate-500">
          {e.category} {e.num}
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
        <button onClick={async () => {
          if (newClass === e) return;
          setSubmitting(true)
          let {error} = await updateClass(newClass);
          if (error) {
            CreateErrorToast(error.message)
            return;
          }
          else modal.DisarmModal()
        }}
                className={`font-eudoxus p-3 px-5 ${(newClass !== e) ? 'bg-indigo-600 text-white' : 'bg-white'} rounded-xl duration-300`}
        >
          <h1>{ submitting ? <AiOutlineLoading className="animate-spin" /> : 'Submit' }</h1>
        </button>
      </section>
    </section>
  );
};

export default ClassCard;
