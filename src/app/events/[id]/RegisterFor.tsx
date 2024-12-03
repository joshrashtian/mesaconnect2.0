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
import { IoIdCard, IoLogoApple, IoLogoGoogle, IoMail } from "react-icons/io5";
import { supabase } from "../../../../config/mesa-config";
import { EventType } from "@/_assets/types";

const RegisterFor = ({ event }: { event: EventType }) => {
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
