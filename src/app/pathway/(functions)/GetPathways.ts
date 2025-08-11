"use server";
import { serverside } from "../../../../config/serverside";

export async function getPathwaysByFilter(filter: {
  university?: string;
  college?: string;
  major?: string;
}) {
  let filterQuery = filter;

  if (filter.major === "any") {
    delete filterQuery.major;
  }

  if (filter.college === "any") {
    delete filterQuery.college;
  }

  if (filter.university === "any") {
    delete filterQuery.university;
  }

  const { data: pathwaysData, error } = await serverside
    //@ts-ignore
    .from("pathway")
    .select("university, major, college, id, colors, tag")
    .match(filterQuery);

  if (error) {
    console.log(error);
  }
  return { data: pathwaysData, error };
}