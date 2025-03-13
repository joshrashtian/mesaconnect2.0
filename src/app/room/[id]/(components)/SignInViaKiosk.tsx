import { useModal } from "@/app/(connect)/connect/Modal";
import { useMultiStep } from "@/app/(connect)/connect/MutliStepContext";
import { EventUserRecord } from "@/app/events/[id]/kiosk/page";
import React, { useState } from "react";
import { supabase } from "../../../../../config/mesa-config";
import { useRoomContext } from "../../RoomContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const SignInViaKiosk = () => {
  const [data, setData] = useState<EventUserRecord | unknown>({
    temporary: true,
  });
  const modal = useModal();
  const { data: eventData } = useRoomContext();

  async function submitThruKiosk() {
    //@ts-ignore
    if (!data?.name || !data?.student_id) return;
    const { error } = await supabase
      .from("eventinterest")
      //@ts-ignore
      .insert({
        //@ts-ignore
        event_id: eventData?.event?.id,
        data: data,
        //@ts-ignore
        student_id: data.student_id,
      });

    console.log(error);
    if (error) {
      alert(error.message);
    } else {
      modal.DisarmModal();
    }
  }
  return (
    <div>
      <h5>Required Field</h5>
      <Input
        placeholder="name... (required)"
        onChange={(e) => {
          setData({ ...(data as object), name: e.target.value });
        }}
        required
      />
      <Input
        placeholder="student_id... (required)"
        onChange={(e) => {
          setData({ ...(data as object), student_id: e.target.value });
        }}
        required
      />
      <h5>Optional</h5>
      <Input
        placeholder="email address... (optional)"
        onChange={(e) =>
          setData({ ...(data as object), email: e.target.value })
        }
      />
      <Input
        placeholder="major... (optional)"
        onChange={(e) =>
          setData({ ...(data as object), major: e.target.value })
        }
      />
      <Button type="submit" onClick={submitThruKiosk}>
        Submit
      </Button>
    </div>
  );
};

export default SignInViaKiosk;
