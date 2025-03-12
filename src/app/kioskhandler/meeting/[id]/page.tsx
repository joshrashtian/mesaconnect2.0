"use client";
import React, { useEffect, useState } from "react";
import KioskInput from "../../(kioskui)/input";
import LoadingObject from "@/(mesaui)/LoadingObject";
import ZoomMtgEmbedded from "@zoom/meetingsdk/embedded";
import generateSignature from "./getSignature";
import { LockIcon, MailIcon, UserIcon } from "lucide-react";
const ZoomMeeting = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const [userDetails, setUserDetails] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [inMeeting, setInMeeting] = useState(false);
  const zoom = ZoomMtgEmbedded.createClient();

  async function joinMeeting() {
    try {
      setLoading(true);

      const meetingSDKElement = document.getElementById("meetingSDKElement");
      if (!meetingSDKElement) {
        throw new Error("Meeting SDK element not found");
      }
      await zoom.init({
        zoomAppRoot: meetingSDKElement,
        language: "en-US",
        patchJsMedia: true,
        leaveOnPageUnload: true,
      });

      zoom.join({
        sdkKey: process.env.NEXT_PUBLIC_ZOOM_CLIENT_ID!,
        signature: await generateSignature(id, 0),
        meetingNumber: id,
        password: userDetails.password,
        userName: userDetails.username,
      });
    } catch (error) {
      console.error(error);
      setLoading(false);
    } finally {
      setInMeeting(true);
    }
  }
  useEffect(() => {}, []);

  if (loading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <LoadingObject className="h-10 w-10" color="white" />
      </div>
    );
  }
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div id="meetingSDKElement" />
      {!inMeeting ? (
        <div className="flex h-96 w-96 flex-col items-center justify-center gap-2 rounded-md bg-zinc-700/30 p-5">
          <KioskInput
            name="username"
            icon={<UserIcon />}
            placeholder="Zoom Username"
            onChange={(e) =>
              setUserDetails({ ...userDetails, username: e.target.value })
            }
          />
          <KioskInput
            icon={<MailIcon />}
            name="email"
            placeholder="Email..."
            onChange={(e) =>
              setUserDetails({ ...userDetails, email: e.target.value })
            }
          />
          <KioskInput
            icon={<LockIcon />}
            placeholder="Password"
            type="password"
            name="password"
            onChange={(e) =>
              setUserDetails({ ...userDetails, password: e.target.value })
            }
          />
          <button
            className="w-full max-w-md rounded-md bg-blue-500 p-2 text-white"
            onClick={joinMeeting}
          >
            Enter
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default ZoomMeeting;
