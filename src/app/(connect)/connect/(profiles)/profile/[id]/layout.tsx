"use server";

import { serverside } from "../../../../../../../config/serverside";
import ProfileContextProvider from "./ProfileContext";

export async function generateMetadata({ params, searchParams }: any) {
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
      url: new URL(`https://mesaconnect.io/connect/profile/${params.id}`),
      type: "profile",
      locale: "en_US",
    },
  };
}

const LayoutProfile = async ({ children }: { children: React.ReactNode }) => {
  return <ProfileContextProvider>{children}</ProfileContextProvider>;
};

export default LayoutProfile;
