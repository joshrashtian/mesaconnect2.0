"use server"
import { redirect } from "next/navigation";
import { serverside } from "../../../../../../../../config/serverside";

export async function GetClassBySearch(search: string) {
  const { data, error } = await serverside
    //@ts-ignore
    .schema("information")
    .from("classes")
    .select("*")
    .textSearch("search_class", search);


  return { data, error};

}

export async function CreatePathway(information: {
  university: string;
  major: string;
  college: string;
  colors: string[];
}) {

  const { data, error } = await serverside
    //@ts-ignore
    .from("pathway")
    .insert({
        university: information.university,
        major: information.major,
        college: information.college,
        pathway: {
            igetc: false,
            guaranteed  : false,
            semesters: [],
        },
        tag: false,
    
    })
    .single();  


    if(error){
        return {
            data: null,
            error: error.message
        }
    }
    else {
        return {
            data: data,
            error: null
        }
    }

}
