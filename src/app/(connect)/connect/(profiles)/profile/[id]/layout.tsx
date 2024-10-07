"use server";

import { Metadata, ResolvingMetadata } from "next";
import { serverside } from "../../../../../../../config/serverside";

export async function generateMetadata(
  {
    params,
    searchParams,
  }: { params: { id: string }; searchParams: URLSearchParams },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { data, error } = await serverside
    .from("profiles")
    .select("real_name, bio, avatar_url, major")
    .eq("id", params.id);

  let description: string;
  if (!data) {
    description = "Error Fetching Bio";
  } else if (data[0].bio && data[0].major) {
    description = `${data[0].major} - ${data[0].bio}`;
  } else if (data[0].bio) {
    description = data[0].bio;
  } else if (data[0].major) {
    description = data[0].major;
  } else {
    description = "No Bio Set.";
  }

  return {
    title: data
      ? `${data[0].real_name}`
      : error
        ? "Error Fetching User"
        : "Fetching Name",
    openGraph: {
      title: data
        ? `${data[0].real_name}`
        : error
          ? "Error Fetching User"
          : "Fetching Name",
      description,
      images: data ? (data[0].avatar_url ? data[0].avatar_url : "") : "",
      url: `https://mesaconnect.io/connect/profile/${params.id}`,
      type: "profile",
      locale: "en_US",
    },
  };
}

import React from "react";

const LayoutProfile = async ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};

export default LayoutProfile;
