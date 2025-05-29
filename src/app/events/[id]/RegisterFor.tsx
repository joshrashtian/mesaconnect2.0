"use client";
import Input from "@/_components/Input";
import {
  MultiStepProvider,
  useMultiStep,
} from "@/app/(connect)/connect/MutliStepContext";
import { useUser } from "@/app/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import React from "react";
import {
  IoCheckmarkCircle,
  IoCloseCircle,
  IoIdCard,
  IoLogoApple,
  IoLogoGoogle,
  IoMail,
} from "react-icons/io5";
import { supabase } from "../../../../config/mesa-config";
import { EventType } from "@/_assets/types";

const RegisterFor = ({
  event,
  active,
}: {
  event: EventType;
  active: boolean;
}) => {
  const mutlistep = useMultiStep();
  const { user, userData } = useUser();
  const [studentId, setStudentId] = React.useState<number>();

  const components = [
    <div key="a">
      <ul className="mt-4 rounded-3xl bg-zinc-300/30 p-10">
        <h3 className="font-black">Use MESA Card</h3>
        <Avatar className="h-12 w-12 shadow-lg">
          <AvatarImage src={userData?.avatar_url} />
          <AvatarFallback>{userData?.real_name[0]}</AvatarFallback>
        </Avatar>
        <h5 className="text-xl font-bold">{userData?.real_name}</h5>
        <p className="text-lg font-light">{user?.email}</p>
        <p className="mb-2 flex w-fit flex-row gap-1 rounded-2xl bg-zinc-300/50 p-2 text-3xl text-zinc-600">
          {user?.identities?.map((e) => {
            switch (e.provider) {
              case "google":
                return <IoLogoGoogle />;
              case "apple":
                return <IoLogoApple />;
              case "email":
                return <IoMail />;
            }
          })}
        </p>
        <Input
          icon={<IoIdCard />}
          onChange={(e) => {
            setStudentId(parseInt(e.target.value));
          }}
          type="number"
          placeholder="student id..."
        />
        <Button
          className="mt-2"
          onClick={async () => {
            const { data, error } = await supabase
              .from("eventinterest")
              .insert({
                data: {
                  name: userData?.real_name,
                  email: user?.email,
                  student_id: studentId,
                  major: userData?.major,
                  college: userData?.college,
                },
                event_id: event.id,
                user_id: user?.id,
              });

            if (error) alert(error.message);
            else {
              alert("Registered for event!");
              mutlistep.close();
            }
          }}
        >
          Submit
        </Button>
      </ul>
    </div>,
  ];

  if (active)
    return (
      <div className="m-3 flex w-full flex-row items-center gap-1.5 rounded-2xl bg-zinc-100 p-3 lg:px-6">
        <IoCheckmarkCircle className="text-xl text-green-500" />
        <p>Already Registered!</p>
        <Button
          onClick={async () => {
            const { data, error } = await supabase
              .from("eventinterest")
              .delete()
              .eq("event_id", event.id)
              .eq("user_id", user?.id ?? "");

            if (error) alert(error.message);
            else {
              alert("Unregistered from event!");
            }
          }}
          className="ml-auto"
        >
          <IoCloseCircle className="text-xl text-red-500" />
          <p>Unregister</p>
        </Button>
      </div>
    );

  return (
    <Button
      onClick={() => {
        mutlistep.create({
          title: "Register for event",
          components,
          options: {},
        });
      }}
    >
      Register
    </Button>
  );
};

export default RegisterFor;
