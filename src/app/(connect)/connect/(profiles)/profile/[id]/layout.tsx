"use server";

import { serverside } from "../../../../../../../config/serverside";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const { data, error } = await serverside
    .from("profiles")
    .select("real_name, bio, avatar_url, major")
    .eq("id", params.id);

  const description = () => {
    if (!data) {
      return "Error Fetching Bio";
    }
    if (data[0].bio && data[0].major) {
      return `${data[0].major} - ${data[0].bio}`;
    }
    if (data[0].bio) {
      return data[0].bio;
    }
    if (data[0].major) {
      return data[0].major;
    } else return "No Bio Set.";
  };
  return {
    title: data
      ? `${data[0].real_name}`
      : error
        ? "Error Fetching User"
        : "Fetching Name",
    opengraph: {
      title: data
        ? `${data[0].real_name}`
        : error
          ? "Error Fetching User"
          : "Fetching Name",
      description,
      images: data ? (data[0].avatar_url ? data[0].avatar_url : "") : "",
      url: `https://mesaconnect.io/connect/profile/${params.id}`,
      type: "website",
      locale: "en_US",
    },
  };
}

import React from "react";

const LayoutProfile = async ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};

export default LayoutProfile;
