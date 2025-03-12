import React, { useState } from "react";
import KioskInput from "./input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
const JoinMeeting = () => {
  const [meetingId, setMeetingId] = useState<string>("");
  const router = useRouter();
  return (
    <div className="flex h-60 min-w-[200px] snap-start flex-col items-start justify-between rounded-md bg-white p-3 shadow-sm transition-all duration-300 hover:bg-gray-100 hover:shadow-white/40">
      <Input
        name="meetingId"
        placeholder="Meeting ID"
        value={meetingId}
        onChange={(e) => setMeetingId(e.target.value)}
      />
      <Button
        className="w-full"
        onClick={() => {
          const audio = new Audio("/ui_button.mp3");
          audio.play();
          audio.volume = 1;
          router.push(`/kioskhandler/meeting/${meetingId}`);
        }}
      >
        Join Meeting
      </Button>
    </div>
  );
};

export default JoinMeeting;
